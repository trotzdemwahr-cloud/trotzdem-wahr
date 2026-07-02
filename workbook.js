// ======================================
// trotzdem.wahr – Workbook 01
// workbook.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Workbook geladen.");

});

// ======================================
// Alle Eingabefelder finden
// ======================================

const inputs = document.querySelectorAll(
    "input, textarea"
);

console.log(inputs.length + " Eingabefelder gefunden.");

// ======================================
// Antworten speichern
// ======================================

inputs.forEach((input) => {

    // Hat das Feld eine ID?
    if (!input.id) return;

    input.addEventListener("input", () => {

        localStorage.setItem(input.id, input.value);

    });

    input.addEventListener("change", () => {

        if (input.type === "checkbox" || input.type === "radio") {

            localStorage.setItem(input.id, input.checked);

        }

    });

});

// ======================================
// Antworten laden
// ======================================

inputs.forEach((input) => {

    if (!input.id) return;

    const savedValue = localStorage.getItem(input.id);

    if (savedValue === null) return;

    if (input.type === "checkbox") {

        input.checked = savedValue === "true";

    } else if (input.type === "radio") {

        input.checked = savedValue === "true";

    } else {

        input.value = savedValue;

    }

});

// ======================================
// Workbook-Seiten
// ======================================

const pages = document.querySelectorAll(".workbook-page");

let currentPage = 0;

function showPage(index){

    pages.forEach(page => {

        page.classList.remove("active");

    });

    pages[index].classList.add("active");

}

showPage(currentPage);

// ======================================
// Navigation
// ======================================

const nextButtons = document.querySelectorAll(".next-page");
const prevButtons = document.querySelectorAll(".prev-page");

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(currentPage < pages.length - 1){

            currentPage++;

            showPage(currentPage);

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        }

    });

});

prevButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(currentPage > 0){

            currentPage--;

            showPage(currentPage);

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        }

    });

});

// ======================================
// Workbook zurücksetzen
// ======================================

function resetWorkbook() {

    if (!confirm("Möchtest du wirklich alle Antworten löschen?")) {
        return;
    }

    inputs.forEach(input => {

        if (!input.id) return;

        localStorage.removeItem(input.id);

        if (input.type === "checkbox" || input.type === "radio") {

            input.checked = false;

        } else {

            input.value = "";

        }

    });

}

// ======================================
// PDF-Download
// ======================================

const downloadButton = document.getElementById("downloadWorkbook");

if (downloadButton) {

    downloadButton.addEventListener("click", downloadWorkbook);

}

function downloadWorkbook() {

    alert("Die PDF-Funktion wird jetzt erstellt.");

}
