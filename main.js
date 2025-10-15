const sampleTargets = [
    {
        prefix: "@SIGN",
        compType: "SignPad",
        useTimestampLabel: true,
        roles: {
            "DR": { desc: "Doctor", color: "#AA0000" },
            "PA": { desc: "Patient", color: "#0000AA" },
            "AG": { desc: "Agent", color: "#00AA00"},
        },
    }
];

/** @type {{ [paramKey: string]: any }} */
const ozViewerParams = {
    "information.debug": true,
    "connection.servlet": "https://dev-test.oz4cs.com/oz/server",
    "comment.all": true,
    "viewer.emptyframe": true,
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