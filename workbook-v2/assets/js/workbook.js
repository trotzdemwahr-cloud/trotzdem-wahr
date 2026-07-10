/*
======================================================

trotzdem.wahr
Workbook V2

======================================================
*/

document.addEventListener("DOMContentLoaded", initWorkbook);

function initWorkbook() {

    renderWorkbook();

}
function renderWorkbook() {

    const app = document.getElementById("workbook");

    app.innerHTML = "";

}
function createElement(tag, className) {

    const element = document.createElement(tag);

    if (className) {

        element.className = className;

    }

    return element;

}
function createText(tag, className, text) {

    const element = createElement(tag, className);

    element.textContent = text;

    return element;

}
