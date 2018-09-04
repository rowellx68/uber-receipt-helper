import { UberInvoiceDownloader } from "./common";

UberInvoiceDownloader.createNewTableColumn();
UberInvoiceDownloader.createDownloadButtons();

chrome.runtime.onMessage.addListener((request) => {
    if (request.name === "history-changed") {
        const location = window.location.href;
        if (location !== request.data) {
            window.setTimeout(() => {
                UberInvoiceDownloader.createNewTableColumn();
                UberInvoiceDownloader.createDownloadButtons();
            }, 1000);
        }
    }
});
