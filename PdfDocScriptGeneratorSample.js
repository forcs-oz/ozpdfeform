/************************************
 * Type Definitions for Sample
 ************************************/
/**
 * User-defined Option
 * 
 * @typedef {{
 *      desc: string;
 *      color: string;
 * }} PdfTargetOptionRole
 * 
 * @typedef {{
 *      prefix: string;
 *      compType: string;
 *      useTimestampLabel: boolean;
 *      roles: { [postfix: string]: PdfTargetOptionRole }
 * }} PdfTargetOption
 */
/**
 * Pre-processed data structures
 * 
 * @typedef {{
 *     index: number;
 *     x: number;
 *     y: number;
 *     w: number;
 *     h: number;
 * }} PdfPage
 * 
 * @typedef {{
 *     text: string;
 *     x: number;
 *     y: number;
 *     w: number;
 *     h: number;
 *     angle: number;
 *     ascent: number;
 * }} PdfPageText
 * 
 * @typedef {{
 *     x: number;
 *     y: number;
 *     w: number;
 *     h: number;
 * }} PdfPageRectangle
 * */
/**
 * Input component settings
 * 
 * @typedef {{
 *     type: string;
 *     name: string;
 *     x: number;
 *     y: number;
 *     w: number;
 *     h: number;
 *     role: PdfTargetOptionRole;
 *     timestamp?: PdfPageRectangle;
 * }} PdfICInfo
 * */


/***********************************
 * Type Definitions for PDFjs
 ***********************************/
/**
 * @typedef {number[]} PDFjs_Rect
 * - number[4] : [x, y, w, h]
 * */
/**
 * @typedef {number[]} PDFjs_Transform
 * - number[6] : [rx, ry, dx, dy, px, py]
 * - 3x3 Matrix [[rx, dx, px], [ry, dy, py], [0, 0, 1]]
 * | Notation | Meaning |
 * | --- | --- |
 * | rx | X-axis of the rotation angle vector. (angle==0 is upward direction) |
 * | ry | Y-axis of the rotation angle vector. |
 * | dx | X-axis of the vector for the font distance from baseline. |
 * | dy | Y-axis of the vector for the font distance from baseline. |
 * | px | X-axis of the position vector. |
 * | py | Y-axis of the position vector. |
 * */
/**
 * @typedef {{
 *     offsetX: number;
 *     offsetY: number;
 *     rotation: number;
 *     scale: number;
 *     width: number;
 *     height: number;
 *     viewBox: PDFJS_Rect;
 *     transform: PDFJS_Transform;
 * }} PDFjs_Viewport
 * */
/**
 * @typedef {{
 *     str: string;
 *     width: number;
 *     height: number;
 *     transform: PDFjs_Transform;
 *     fontName: string;
 *     dir: "rtl"|"ltr";
 * }} PDFjs_TextContentItem
 *
 * @typedef {{
 *     id: string;
 *     fontFamily: string;
 *     ascent: number;
 *     descent: number;
 *     vertical: boolean;
 * }} PDFjs_TextContentStyle
 *
 * @typedef {{
 *     items: PDFjs_TextContentItem[];
 *     styles: { [id: string]: PDFjs_TextContentStyle };
 * }} PDFjs_TextContent
 */
/**
 * @typedef {{
 *     fnArray: number[];
 *     argsArray: any[];
 * }} PDFjs_OperatorList
 */
/**
 * @typedef {{
 *     getViewport(o: number|{ scale: number }): PDFjs_Viewport;
 *     getTextContent(): Promise<PDFjs_TextContent>;
 *     getOperatorList(): Promise<PDFjs_OperatorList>;
 * }} PDFjs_Page
 * */


class PdfDocScriptGeneratorSample {
    /**
     * @constructor
     * @param {string} pdfDocId
     * @param {PdfTargetOption[]} targetOptions
     * */
    constructor(pdfDocId, targetOptions) {
        this.pdfDocId = pdfDocId;
        this.targetOptions = targetOptions;
        this.scriptTemplateMarker = "/*Script_Script_Script*/";
        this.scriptCompInfoMarker = "[/*ALL_COMP_INFO*/]";

        /** @type {PdfICInfo[][]} */
        this.allCompInfo = [];
        
        /** @type {boolean} */
        this.pdfjs_over_2_1 = (() => {
            if (typeof PDFJS != "undefined" || typeof pdfjsLib == "undefined") {
                return false;
            }
            const v = pdfjsLib.version.split(".").map(s => parseInt(s));
            return v[0] >= 2 && v[1] >= 1;
        })();
        
        /** @type {string[]|undefined} */
        this.pdfjs_opNameMap = (() => {
            /** @type {{ [opName: string]: number }|undefined} */
            let ops;
            if (typeof PDFJS != "undefined") {
                ops = PDFJS.OPS;
            } else if (typeof pdfjsLib != "undefined") {
                ops = pdfjsLib.OPS;
            }
            if (!ops) {
                return undefined;
            }

            /** @type {string[]} */
            const revMap = [];
            Object.keys(ops).forEach(opKey => {
                const opValue = ops[opKey];
                revMap[opValue] = opKey;
            });
            return revMap;
        })();
    }

    /**
     * @method onPageLoaded
     * @param index {number}
     * @param page {PDFjs_Page}
     * @returns {}{Promise<void>}
     * */
    onPageLoaded(index, page) {
        return page.getTextContent().then(textContent => {
            if (!textContent) {
                return;
            }
            
            const vp = page.getViewport(this.pdfjs_over_2_1 ? { scale: 1 } : 1);
            const pageInfo = {
                index,
                x: vp.viewBox[0],
                y: vp.viewBox[1],
                w: vp.viewBox[2],
                h: vp.viewBox[3],
            };
            const textInfoList = textContent.items.filter(item => item.str.trim().length > 0).map(item => {
                return this._makeTextInfo(item, vp, textContent.styles[item.fontName]);
            });

            if (!page.getOperatorList || !this.pdfjs_opNameMap) {
                this._processPage(pageInfo, textInfoList, []);
                return;
            }

            return page.getOperatorList().then(opList => {
                const rectInfoList = this._makeRectObjects(opList, vp);
                this._processPage(pageInfo, textInfoList, rectInfoList);
            });
        });
    }

    /**
     * @method onGetScriptText
     * @returns {}string
     * */
    onGetScriptText() {
        const split = this._scriptTemplate.toString().split(this.scriptTemplateMarker);
        if (split.length != 3) {
            return "";
        }
        return split[1].replace(this.scriptCompInfoMarker, JSON.stringify(this.allCompInfo, null, 4));
    }

    /**
     * @method _makeTextInfo
     * @private
     * @param {PDFjs_TextContentItem} item
     * @param {PDFjs_Viewport} viewport
     * @param {PDFjs_TextContentStyle} style
     * @returns {}{PdfPageText}
     */
    _makeTextInfo(item, viewport, style) {
        const o = this._multiplyTransform(item.transform, viewport.transform);
        let l = Math.atan2(o[1], o[0]);
        if (style.vertical) {
            l += Math.PI / 2;
        }
        const h = Math.sqrt(o[2] * o[2] + o[3] * o[3]);
        let d = h;
        if (style.ascent) {
            d = style.ascent * d;
        } else if (style.descent) {
            d = (1 + style.descent) * d;
        }
        return {
            text: item.str,
            x: o[4] + (0 == l ? 0 : (d * Math.sin(l))),
            y: o[5] - d * (0 == l ? 1 : Math.cos(l)),
            w: item.width,
            h,
            angle: l * (180 / Math.PI),
            ascent: d,
        };
    }

    /**
     * @method _multiplyTransform
     * @private
     * @param {PDFjs_Transform} t
     * @param {PDFjs_Transform} e
     * @returns {}{PDFjs_Transform}
     * Like the result of Matrix T * Matrix E.
     */
    _multiplyTransform(t, e) {
        /** @type {PDFjs_Transform} */
        const o = [0, 0, 0, 0, 0, 0];
        o[0] = e[0] * t[0] + e[2] * t[1];
        o[1] = e[1] * t[0] + e[3] * t[1];
        o[2] = e[0] * t[2] + e[2] * t[3];
        o[3] = e[1] * t[2] + e[3] * t[3];
        o[4] = e[0] * t[4] + e[2] * t[5] + e[4];
        o[5] = e[1] * t[4] + e[3] * t[5] + e[5];
        return o;
    }

    /**
     * @method _transformRect
     * @private
     * @param {PDFjs_Rect} r
     * @param {PDFjs_Transform} e
     * @returns {}{PDFjs_Rect}
     */
    _transformRect(r, e) {
        /** @type {PDFjs_Transform[]} */
        const points = [
            [0, 0, 0, 0, r[0], r[1]],
            [0, 0, 0, 0, r[0], r[1] + r[3]],
            [0, 0, 0, 0, r[0] + r[2], r[1]],
            [0, 0, 0, 0, r[0] + r[2], r[1] + r[3]],
        ];
        const tfPoints = points.map(p => this._multiplyTransform(p, e));
        const xs = tfPoints.map(p => p[4]);
        const ys = tfPoints.map(p => p[5]);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        return [ minX, minY, maxX - minX, maxY - minY];
    }

    /**
     * @method _makeRectObjects
     * @private
     * @param {PDFjs_OperatorList} opList
     * @param {PDFjs_Viewport} viewport
     * @returns {}{PdfPageRectangle[]}
     */
    _makeRectObjects(opList, viewport) {
        const revMap = this.pdfjs_opNameMap;
        if (!opList || !revMap) {
            return [];
        }

        const fnArray = opList.fnArray;
        const argsArray = opList.argsArray;
        if (!fnArray || !argsArray) {
            return [];
        }

        /** @type {PDFjs_Rect[]} */
        const rects = [];
        /** @type {PDFjs_Rect[]} */
        const strokeRects = [];
        /** @type {PDFjs_Rect[]} */
        const fillRects = [];
        /** @type {PDFjs_Rect[]} */
        const hEdgeRects = [];
        /** @type {PDFjs_Rect[]} */
        const vEdgeRects = [];
        /** @type {PDFjs_Rect|undefined} */
        let path = undefined;
        fnArray.forEach((opValue, i) => {
            const opKey = revMap[opValue];
            const args = argsArray[i];
            switch (opKey) {
                case "constructPath":
                    if (
                        args.length >= 2
                        && args[0].length === 1
                        && args[1].length === 4
                    ) {
                        if (args[0][0] === 19 && args[1][2] * args[1][3] > 0) {
                            path = args[1];
                        } else {
                            path = undefined;
                        }
                    }
                    break;
                case "stroke":
                    if (path) {
                        const pathString = path.toString();
                        if (!strokeRects.some(p => p.toString() == pathString)) {
                            strokeRects.push(path);
                        }
                        path = undefined;
                    }
                    break;
                case "eoFill":
                    if (path) {
                        const pathString = path.toString();
                        if (path[2] >= 1) {
                            if (path[3] >= 1) {
                                if (!fillRects.some(p => p.toString() == pathString)) {
                                    fillRects.push(path);
                                }
                            } else {
                                if (!hEdgeRects.some(p => p.toString() == pathString)) {
                                    hEdgeRects.push(path);
                                }
                            }
                        } else if (path[3] >= 1) {
                            if (!vEdgeRects.some(p => p.toString() == pathString)) {
                                vEdgeRects.push(path);
                            }
                        }
                        path = undefined;
                    }
                    break;
                case "endPath":
                    path = undefined;
                    break;
            }
        });

        strokeRects.concat(fillRects).forEach(path => {
            rects.push(path);
        });

        const t = .5;
        hEdgeRects.forEach((hEdge, i) => {
            const orthogonal = vEdgeRects.filter(vE => (hEdge[1] <= vE[1] + vE[3] + t && hEdge[1] + hEdge[3] + t >= vE[1]) && (hEdge[0] <= vE[0] + vE[2] + t && hEdge[0] + hEdge[2] + t >= vE[0]));
            if (orthogonal.length <= 0) {
                return;
            }

            const parallel = hEdgeRects.slice(i + 1).filter(hE => (hEdge[0] <= hE[0] + hE[2] + t && hEdge[0] + hEdge[2] + t >= hE[0]));
            if (parallel.length <= 0) {
                return;
            }

            parallel.forEach(hE => {
                const x = Math.min(hEdge[0], hE[0]);
                const w = Math.min(hEdge[0] + hEdge[2], hE[0] + hE[2]) - x;
                if (w < 1) {
                    return;
                }

                const y = Math.min(hEdge[1] + hEdge[3], hE[1] + hE[3]);
                const h = Math.max(hEdge[1], hE[1]) - y;
                if (h < 1) {
                    return;
                }

                const lEdgeRects = orthogonal.filter(vE => (x + t >= vE[0] && x <= vE[0] + vE[2] + t && y + t >= vE[1] && y + h <= vE[1] + vE[3] + t));
                const rEdgeRects = orthogonal.filter(vE => (x + w + t >= vE[0] && x + w <= vE[0] + vE[2] + t && y + t >= vE[1] && y + h <= vE[1] + vE[3] + t));
                if (lEdgeRects.length <= 0 || rEdgeRects.length <= 0) {
                    return;
                }

                if (lEdgeRects.some(lE => rEdgeRects.some(rE => lE != rE))) {
                    rects.push([ x, y, w, h ]);
                }
            });
        });

        return rects.map(rect => {
            const tfRect = this._transformRect(rect, viewport.transform);
            /** @type {PdfPageRectangle} */
            const rectInfo = {
                x: tfRect[0],
                y: tfRect[1],
                w: tfRect[2],
                h: tfRect[3],
            };
            return rectInfo;
        });
    }

    /**
     * @method _processPage
     * @private
     * @param {PdfPage} page
     * @param {PdfPageText[]} texts
     * @param {PdfPageRectangle[]} rectangles
     * @returns {}{void}
     * */
    _processPage(page, texts, rectangles) {
        this.allCompInfo[page.index] = [];
        const pageCompInfo = this.allCompInfo[page.index];

        this.targetOptions.forEach(o => {
            const compType = o.compType;
            Object.keys(o.roles).forEach(postfix => {
                const role = o.roles[postfix];
                const targetText = `${o.prefix}_${postfix}`;
                const foundItems = this._findMatchedTextItems(targetText, texts);
                if (foundItems.length < 1) {
                    return;
                }

                const targetTimestampText = `${o.prefix}TIME_${postfix}`;
                const foundTimestamps = o.useTimestampLabel ? this._findMatchedTextItems(targetTimestampText, texts) : [];
                const matchedTimestamps = this._findGreedyClosestPairs(foundItems, foundTimestamps);

                foundItems.forEach((item, index) => {
                    const referRects = rectangles.filter(r => (
                        r.x < item.x
                        && r.y < item.y
                        && r.x + r.w > item.x + item.w
                        && r.y + r.h > item.y + item.h
                    )).sort((a, b) => {
                        const dw = a.w - b.w;
                        if (dw != 0) {
                            return dw;
                        }
                        return a.h - b.h;
                    });
                    const compName = `PdfPage${page.index}_IC${pageCompInfo.length}_${compType}`;
                    const referRect = referRects.shift() || this._getResizeRect(item, page, 30, 20);
                    const timestamp = matchedTimestamps[index] || undefined;
                    pageCompInfo.push({
                        type: compType,
                        name: compName,
                        x: referRect.x,
                        y: referRect.y,
                        w: referRect.w,
                        h: referRect.h,
                        role,
                        timestamp: timestamp ? this._getResizeRect(timestamp, page) : undefined,
                    });
                })
            });
        });
    }

    /**
     * @method _findMatchedTextItems
     * @private
     * @param {string} targetText
     * @param {PdfPageText[]} allItems
     * @returns {PdfPageText[]}
     */
    _findMatchedTextItems(targetText, allItems) {
        /** @type {PdfPageText[]} foundItems */
        const foundItems = [];
        const query = targetText.replace(/ /gi, "");
        for (let i = 0; i < allItems.length; i++) {
            const item = allItems[i];
            const itemText = item.text.replace(/ /gi, "");
            if (!query.startsWith(itemText)) {
                continue;
            }

            if (itemText.startsWith(query)) {
                foundItems.push(item);
                continue;
            }

            /** @type {PdfPageText[]} pieces */
            const pieces = [];
            let nextIndex = itemText.length;
            for (let j = i + 1; j < allItems.length && nextIndex < query.length; j++) {
                const nextItem = allItems[j];
                const nextItemText = nextItem.text.replace(/ /gi, "");
                const nextQuery = query.slice(nextIndex);
                if (!nextQuery.startsWith(nextItemText)) {
                    pieces.length = 0;
                    break;
                }

                nextIndex += nextItemText.length;
                pieces.push(nextItem);
            }

            if (nextIndex >= query.length && pieces.length > 0) {
                let s = item.text;
                let l = item.x;
                let t = item.y;
                let r = item.x + item.w;
                let b = item.y + item.h;
                pieces.forEach(p => {
                    s += p.text;
                    l = Math.min(l, p.x);
                    t = Math.min(t, p.y);
                    r = Math.max(r, p.x + p.w);
                    b = Math.max(b, p.y + p.h);
                });
                foundItems.push({
                    text: s,
                    x: l,
                    y: t,
                    w: r - l,
                    h: b - t,
                });
                i += pieces.length;
            }
        }
        return foundItems;
    }

    /**
     * @method _findGreedyClosestPairs
     * @private
     * @param {PdfPageText[]} compItems
     * @param {PdfPageText[]} timestamps
     * @returns {(PdfPageRectangle|null)[]}
     */
    _findGreedyClosestPairs(compItems, timestamps) {
        /**
         * @type {(PdfPageRectangle|null)[]}
         * */
        const result = Array(compItems.length).fill(null);
        if (compItems.length < 1 || timestamps.length < 1) {
            return result;
        }

        /**
         * @type {{
         *      compIndex: number;
         *      tsIndex: number;
         *      distance: number;
         * }[]}
         */
        const allPairs = [];
        compItems.forEach((c, compIndex) => {
            timestamps.forEach((l, tsIndex) => {
                const dx = (c.x + c.w / 2) - (l.x + l.w / 2);
                const dy = (c.y + c.h / 2) - (l.y + l.h / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                allPairs.push({
                    compIndex,
                    tsIndex,
                    distance
                });
            });
        });
        allPairs.sort((a, b) => a.distance - b.distance);

        /** @type {Set<number>} */
        const matchedIndices = new Set();
        for (const p of allPairs) {
            if (result[p.compIndex] === null && !matchedIndices.has(p.tsIndex)) {
                const labelItem = timestamps[p.tsIndex];
                result[p.compIndex] = {
                    x: labelItem.x,
                    y: labelItem.y,
                    w: Math.max(labelItem.w, 120),
                    h: Math.max(labelItem.h, 20),
                };
                matchedIndices.add(p.tsIndex);
            }
            if (matchedIndices.size == timestamps.length) {
                break;
            }
        }
        return result;
    }

    /**
     * @method _getResizeRect
     * @private
     * @param {PdfPageRectangle} src
     * @param {PdfPageRectangle} max
     * @param {number|undefined} paddingH
     * @param {number|undefined} paddingV
     * @returns {PdfPageRectangle}
     */
    _getResizeRect(src, max, paddingH = 0, paddingV = 0) {
        return {
            x: Math.max(src.x - paddingH, max.x),
            y: Math.max(src.y - paddingV, max.y),
            w: Math.min(src.w + paddingH * 2, max.x + max.w - src.x),
            h: Math.min(src.h + paddingV * 2, max.y + max.h - src.y),
        };
    }

    /**
     * @method _scriptTemplate
     * @private
     * @description the template for OZR javascript text. Never used by function call.
     * */
    _scriptTemplate() {
        /*Script_Script_Script*/
        var pageCount = This.GetPageCount();
        /** @type {PdfICInfo[][]} */
        var allICInfo = [/*ALL_COMP_INFO*/];
        for (var pageIndex = 0; pageIndex < pageCount; pageIndex++) {
            var pageICInfo = allICInfo[pageIndex];          // 0 ~ pageCount-1
            if (!pageICInfo || pageICInfo.length <= 0) {
                continue;
            }
            var page = This.GetPageByIndex(pageIndex + 1);  // 1 ~ pageCount
            if (!page) {
                continue;
            }
            for (var i = 0; i < pageICInfo.length; i++) {
                var icInfo = pageICInfo[i];
                var comp = page.AddNewInputComponent(
                    icInfo.type, icInfo.name,
                    icInfo.x, icInfo.y, icInfo.w, icInfo.h
                );
                if (!comp) {
                    continue;
                }
                comp.SetTransparent(true);
                comp.SetBorderColor(icInfo.role.color);
                comp.SetTopBorderDash("2 2");
                comp.SetRightBorderDash("2 2");
                comp.SetBottomBorderDash("2 2");
                comp.SetLeftBorderDash("2 2");
                comp.SetTopBorderThickness(2);
                comp.SetRightBorderThickness(2);
                comp.SetBottomBorderThickness(2);
                comp.SetLeftBorderThickness(2);

                var tsInfo = icInfo.timestamp;
                if (tsInfo) {
                    var tsName = icInfo.name + "_TIME";
                    var tsComp = page.AddNewInputComponent(
                        "None", tsName,
                        tsInfo.x, tsInfo.y, tsInfo.w, tsInfo.h
                    );
                    if (!tsComp) {
                        continue;
                    }
                    tsComp.SetTextColor(icInfo.role.color);
                    tsComp.SetBorderColor(icInfo.role.color);

                    comp.SetEventScript("OnValueChanged", [
                        "var d = _FormatDate((new Date()).getTime(), \"yyyy-MM-dd hh:mm:ss\");",
                        "var tsName = \"" + tsName + "\";",
                        "var tsComp = This.GetInputComponent(tsName);",
                        "if (tsComp) tsComp.SetText(d);"
                    ].join("\n"));
                }
            }
        }
        /*Script_Script_Script*/
    }

}