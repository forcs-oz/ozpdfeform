/**
 * User-defined Option
 * 
 * @typedef {{
 *      desc: string;
 *      color?: string;
 * }} PdfTargetOptionRole
 * 
 * @typedef {{
 *      prefix: string;
 *      id: string;
 *      compType: string;
 *      useTimestampLabel?: boolean;
 *      bgColorBeforeInput?: string;
 *      bgColorAfterInput?: string;
 *      roles: { [postfix: string]: PdfTargetOptionRole }
 * }} PdfTargetOption
 */

/** @type {PdfTargetOption[]} */
const sampleTargets = [
    {
        prefix: "@",
        id: "SIGN",
        compType: "SignPad",
        useTimestampLabel: true,
        bgColorBeforeInput: "#F0F0F0",
        bgColorAfterInput: "#FFFFFF",
        roles: {
            "DR": {
                desc: "担当医署名",
            },
            "PA": {
                desc: "患者署名",
            },
            "AG": {
                desc: "代理人署名",
            }
        }
        /**
         * - Text `@SIGN_DR` -> SignPad (id=`SIGN_DR`); Text `@SIGNTIME_DR` -> Timestamp Label (id=`SIGNTIME_DR`)
         * - Text `@SIGN_PA` -> SignPad (id=`SIGN_PA`); Text `@SIGNTIME_PA` -> Timestamp Label (id=`SIGNTIME_PA`)
         * - Text `@SIGN_AG` -> SignPad (id=`SIGN_AG`); Text `@SIGNTIME_AG` -> Timestamp Label (id=`SIGNTIME_AG`)
         */
    }, {
        prefix: "@",
        id: "TEXT",
        compType: "TextBox",
        roles: {
            "PANAME": {
                desc: "患者氏名"
            },
            "PAID": {
                desc: "患者ID"
            },
            "PAADDRESS": {
                desc: "患者住所"
            },
            "AGNAME": {
                desc: "代理人氏名"
            },
            "AGADDRESS": {
                desc: "代理人住所"
            },
            "DRNAME": {
                desc: "担当医氏名"
            },
            "DPT": {
                desc: "担当医科"
            },
            "OPNAME": {
                desc: "手術名"
            },
            "OPNEED": {
                desc: "手術目的"
            },
            "OPMETHOD": {
                desc: "術式"
            },
            "NOTE": {
                desc: "その他"
            }
        }
    }, {
        prefix: "@",
        id: "DATE",
        compType: "DateTimePicker",
        roles: {
            "OP": {
                desc: "手術予定日"
            }
        }
    }, {
        prefix: "@",
        id: "TEST",
        compType: "SignPad",
        useTimestampLabel: true,
        roles: {
            "DR": {
                desc: "担当医",
                color: "#AA0000"
            },
            "PA": {
                desc: "患者",
                color: "#0000AA"
            },
            "AG": {
                desc: "代理人",
                color: "#00AA00"
            }
        }
    }
];

/** @type {{ [paramKey: string]: any }} */
const ozViewerParams = {
    // Required
    "information.debug": true,
    "connection.servlet": "https://dev-test.oz4cs.com/oz/server",
    "viewer.emptyframe": true,
    "eform.allow_duplicated_formid": true,
    // Optional
    "global.language": "ja_JP",
    "viewer.viewmode": "fittowidth",
    "eform.signpad_viewtype": "fittoframe",
    "comment.all": true,
};
const ozViewerOpt = {
    "pdf_page_handler": (pdfDocId) => new PdfDocScriptGeneratorSample(pdfDocId, sampleTargets),
};
const ozViewerId = "OZViewer";
const selectedPdf = {
    name: "",
    url: "",
};


/**
 * @type {{
 *      sendToActionScript(paramKey: string, paramValue: string): void;
 *      Script(command: string): void;
 *      MakeOZBinaryURL(binData: ArrayBuffer): string;
 *      CreateReportEx(param: string, sep: string): void;
 * }}
 * */
const ozViewer = document.getElementById(ozViewerId);

function SetOZParamters_OZViewer() {
    Object.keys(ozViewerParams).forEach(paramKey => {
        let paramValue = ozViewerParams[paramKey];
        if (typeof paramValue == "object") {
            paramValue = JSON.stringify(paramValue);
        } else if (typeof paramValue != "string") {
            paramValue = paramValue.toString();
        }
        ozViewer.sendToActionScript(paramKey, paramValue);
    });
    return true;
}

/** @type {HTMLInputElement} */
const elemPdfInput = document.getElementById("input-pdf");
elemPdfInput.value = null;
elemPdfInput.addEventListener("change", ev => {
    if (!elemPdfInput.files || elemPdfInput.files.length < 1) {
        elemPdfInput.value = null;
        updateControls();
        return;
    }

    const file = elemPdfInput.files[0];
    if (file.type != "application/pdf") {
        const curFileInfo = {
            name: file.name,
            type: file.type,
        };
        alert(`<!> You can upload only PDF file.\n current: ${JSON.stringify(curFileInfo, null, 4)}`)
        elemPdfInput.value = null;
        updateControls();
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        if (!reader.result || typeof reader.result == "string" || reader.readyState != 2) {
            updateControls();
            return;
        }
        
        const formName = ozViewer.MakeOZBinaryURL(reader.result);
        selectedPdf.name = file.name;
        selectedPdf.url = formName || "";
        updateControls();
    };
    reader.readAsArrayBuffer(file);
});

/** @type {HTMLButtonElement} */
const elemRunButton = document.getElementById("button-run");
elemRunButton.disabled = true;
elemRunButton.addEventListener("click", ev => {
    ozViewer.Script("closeall");
    if (!selectedPdf.url) {
        updateControls();
        return;
    }

    const alias = selectedPdf.name;
    ozViewerParams["viewer.emptyframe"] = false;
    ozViewerParams["connection.reportname"] = alias;
    ozViewerParams["repository_agent.item_fetch_src.pcount"] = 1;
    ozViewerParams["repository_agent.item_fetch_src.args1"] = `ozp:///${alias}=${selectedPdf.url}`;

    const paramSep = "\n";
    const paramText = Object.keys(ozViewerParams).map(paramKey => {
        let paramValue = ozViewerParams[paramKey];
        if (typeof paramValue == "object") {
            paramValue = JSON.stringify(paramValue);
        } else if (typeof paramValue != "string") {
            paramValue = paramValue.toString();
        }
        return `${paramKey}=${paramValue}`;
    }).join(paramSep);

    ozViewer.CreateReportEx(paramText, paramSep);
    updateControls();
});

function updateControls() {
    elemRunButton.disabled = selectedPdf.url.length <= 0;
}

start_ozjs(ozViewerId, `${location.href}/ozhv/`, ozViewerOpt);