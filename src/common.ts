import axios from "axios";

export namespace UberInvoiceDownloader {
    let tripTable: HTMLTableElement;
    const invoiceBaseUrl = "https://riders.uber.com/invoice-gen";

    export function createNewTableColumn() {
        tripTable = <HTMLTableElement>document.getElementById("trips-table");

        const existing: Element[] = Array.prototype.slice.call(document.getElementsByClassName("invoice-downloader"));

        if (existing.length > 0) {
            existing.forEach(el => {
                el.parentNode.removeChild(el);
            });
        }

        const tableHead = tripTable.querySelector("thead");
        const headRow = tableHead.querySelector("tr");

        const extra = document.createElement("th");
        extra.className = "invoice-downloader";
        extra.innerText = "Action";

        headRow.appendChild(extra);
    }

    export async function createDownloadButtons() {
        const tableBody = tripTable.querySelector("tbody");
        const rows: Element[] = Array.prototype.slice.call(tableBody.getElementsByClassName("trip-expand__origin"));

        rows.forEach(row => {
            const id = row.getAttribute("data-target")
                .replace("#trip-", "");

            axios.get(`https://riders.uber.com/get_invoices?q=%7B%22trip_uuid%22%3A%22${id}%22%7D`)
                .then((response) => {
                    if (!response) {
                        return;
                    }

                    const newCell = document.createElement("td");
                    newCell.className = "invoice-downloader";

                    const invoice = response.data;
                    if (!invoice || invoice.length === 0) {
                        row.appendChild(newCell);
                        return;
                    }

                    const icon = document.createElement("span");
                    icon.className = "icon icon_download gamma";

                    const anchor = document.createElement("a");
                    anchor.className = "btn btn--primary";
                    anchor.href = "#";
                    anchor.appendChild(icon);

                    anchor.addEventListener("click", (ev: Event) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        window.location.href = `${invoiceBaseUrl}${invoice[0].document_path}`;
                    });

                    newCell.appendChild(anchor);

                    row.appendChild(newCell);
                });
        });
    }
}