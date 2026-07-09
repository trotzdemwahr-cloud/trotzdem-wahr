/*
========================================================

Zurück zu dir
Digitales Workbook

trotzdem.wahr

workbook.js

========================================================
*/


// ======================================================
// KONFIGURATION
// ======================================================

const WORKBOOK = {

    totalChapters: 6,

    storageKey: "zurueckZuDirWorkbook"

};


// ======================================================
// STATUS
// ======================================================

const state = {

    currentChapter: 1,

    answers: {},

    finished: false,

    pdfMode: false

};


// ======================================================
// UI
// ======================================================

const ui = {

    progress: null,

    chapters: [],

    pdf: null

};


// ======================================================
// START
// ======================================================

document.addEventListener(

    "DOMContentLoaded",

    initializeWorkbook

);
// ======================================================
// INITIALISIERUNG
// ======================================================

function initializeWorkbook() {

    cacheUI();

    loadWorkbook();

    bindEvents();

    restoreAnswers();

    showChapter(state.currentChapter);

    updateProgress();

    updateReflectionCards();

}


// ======================================================
// UI REFERENZEN
// ======================================================

function cacheUI() {

    ui.progress = document.getElementById(
        "progress"
    );

    ui.chapters = [

        ...document.querySelectorAll(
            ".chapter"
        )

    ];

    ui.pdf = document.getElementById(
        "pdf-export"
    );

}
// ======================================================
// EVENTS
// ======================================================

function bindEvents() {

    document
        .querySelectorAll("[data-next]")
        .forEach(button => {

            button.addEventListener(
                "click",
                nextChapter
            );

        });

    document
        .querySelectorAll("[data-back]")
        .forEach(button => {

            button.addEventListener(
                "click",
                previousChapter
            );

        });

    document
        .querySelectorAll("input")
        .forEach(input => {

            input.addEventListener(
                "change",
                handleAnswer
            );

        });

    document
        .querySelectorAll("textarea")
        .forEach(textarea => {

            textarea.addEventListener(
                "input",
                handleAnswer
            );

        });

}


// ======================================================
// ANTWORTEN
// ======================================================

function handleAnswer(event) {

    const field = event.target;

    const question = field.name;

    if (!question) {

        return;

    }

    // Textfelder

    if (field.tagName === "TEXTAREA") {

        state.answers[question] = field.value;

        saveWorkbook();

        updateReflectionCards();

        return;

    }

    // Checkboxen

    if (field.type === "checkbox") {

        state.answers[question] = [

            ...document.querySelectorAll(

                `input[name="${question}"]:checked`

            )

        ].map(input => input.value);

    }

    // Radiobuttons

    else {

        state.answers[question] = field.value;

    }

    saveWorkbook();

    updateReflectionCards();

}
// ======================================================
// SPEICHERN
// ======================================================

function saveWorkbook() {

    localStorage.setItem(

        WORKBOOK.storageKey,

        JSON.stringify(state)

    );

}


function loadWorkbook() {

    const saved = localStorage.getItem(

        WORKBOOK.storageKey

    );

    if (!saved) {

        return;

    }

    try {

        const data = JSON.parse(saved);

        state.currentChapter =

            data.currentChapter || 1;

        state.answers =

            data.answers || {};

        state.finished =

            data.finished || false;

    }

    catch (error) {

        console.warn(

            "Workbook konnte nicht geladen werden.",

            error

        );

    }

}


// ======================================================
// WIEDERHERSTELLEN
// ======================================================

function restoreAnswers() {

    Object.entries(state.answers)

        .forEach(([question, value]) => {

            // Checkboxen

            if (Array.isArray(value)) {

                value.forEach(answer => {

                    const checkbox = document.querySelector(

                        `input[name="${question}"][value="${answer}"]`

                    );

                    if (checkbox) {

                        checkbox.checked = true;

                    }

                });

                return;

            }

            // Radiobuttons

            const radio = document.querySelector(

                `input[type="radio"][name="${question}"][value="${value}"]`

            );

            if (radio) {

                radio.checked = true;

                return;

            }

            // Textfelder

            const textarea = document.querySelector(

                `textarea[name="${question}"]`

            );

            if (textarea) {

                textarea.value = value;

            }

        });

}
// ======================================================
// KAPITEL
// ======================================================

function showChapter(chapterNumber) {

    ui.chapters.forEach(chapter => {

        chapter.classList.remove("active");

    });

    const activeChapter = document.getElementById(

        `chapter-${chapterNumber}`

    );

    if (!activeChapter) {

        return;

    }

    activeChapter.classList.add("active");

    state.currentChapter = chapterNumber;

    updateProgress();

    saveWorkbook();

    scrollToTop();

}


function nextChapter() {

    if (state.currentChapter >= WORKBOOK.totalChapters) {

        finishWorkbook();

        return;

    }

    showChapter(

        state.currentChapter + 1

    );

}


function previousChapter() {

    if (state.currentChapter <= 1) {

        return;

    }

    showChapter(

        state.currentChapter - 1

    );

}


// ======================================================
// FORTSCHRITT
// ======================================================

function updateProgress() {

    if (!ui.progress) {

        return;

    }

    ui.progress.textContent =

        `Kapitel ${state.currentChapter} von ${WORKBOOK.totalChapters}`;

}


// ======================================================
// SCROLL
// ======================================================

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
// ======================================================
// REFLECTION CARDS
// ======================================================

function updateReflectionCards() {

    document
        .querySelectorAll(".reflection-card")
        .forEach(card => {

            card.classList.remove("visible");

            const question = card.dataset.question;
            const trigger = card.dataset.value;

            if (!question || !trigger) {

                return;

            }

            const answer = state.answers[question];

            if (Array.isArray(answer)) {

                if (answer.includes(trigger)) {

                    card.classList.add("visible");

                }

                return;

            }

            if (answer === trigger) {

                card.classList.add("visible");

            }

        });

}


// ======================================================
// ABSCHLUSS
// ======================================================

function finishWorkbook() {

    state.finished = true;

    saveWorkbook();

    showChapter(

        WORKBOOK.totalChapters

    );

}
// ======================================================
// PDF
// ======================================================

async function exportWorkbook() {

    preparePDF();

    await new Promise(resolve => setTimeout(resolve, 300));

    const element = document.getElementById("pdf-export");

    const opt = {

        margin: 0,

        filename: "Zurück-zu-dir-Workbook.pdf",

        image: {
            type: "jpeg",
            quality: 0.98
        },

        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollX: 0,
            scrollY: 0
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        },

        pagebreak: {
            mode: ["css", "legacy"]
        }

    };

    await html2pdf()
        .set(opt)
        .from(element)
        .save();

    finishPDF();

}



function preparePDF() {

    state.pdfMode = true;

    document.body.classList.add(

        "pdf-mode"

    );

    if (ui.pdf) {

        ui.pdf.hidden = false;

    }

    fillPDF();

}


function cleanupPDF() {

    state.pdfMode = false;

    document.body.classList.remove(

        "pdf-mode"

    );

    if (ui.pdf) {

        ui.pdf.hidden = true;

    }

}


window.addEventListener(

    "afterprint",

    cleanupPDF

);


// ======================================================
// PDF INHALTE
// ======================================================

function fillPDF() {

    fillPDFDate();

    fillPDFAnswers();
optimizePDFLayout();
}


function fillPDFDate() {

    const date = document.getElementById(

        "pdf-date"

    );

    if (!date) {

        return;

    }

    date.textContent =

        new Date().toLocaleDateString(

            "de-DE"

        );

}


function fillPDFAnswers() {

    document

        .querySelectorAll(

            "[data-pdf-answer]"

        )

        .forEach(element => {

            const key =

                element.dataset.pdfAnswer;

            const value =

                state.answers[key];

            if (value === undefined) {

    element.innerHTML = "";

    return;

}

            if (Array.isArray(value)) {

    const answers = value.map(answer => {

        const input = document.querySelector(

            `input[value="${answer}"]`

        );

        if (!input) {

            return answer;

        }

        return input.parentElement.textContent.trim();

    });

    element.innerHTML = answers

        .map(text => `• ${text}`)

        .join("<br>");

    return;

}

            if (value === "") {

    element.innerHTML = "";

    return;

}

// Radiobuttons als vollständigen Text anzeigen

const radio = document.querySelector(

    `input[type="radio"][value="${value}"]`

);

if (radio) {

    element.textContent =

        radio.parentElement.textContent.trim();

    return;

}


// Textfelder

element.textContent = value;

        });

}
function optimizePDFLayout() {

    document.querySelectorAll(".pdf-page").forEach(page => {

        let fontSize = 16;
        let padding = 16;

        const answers = page.querySelectorAll(".pdf-answer");

        const cards = page.querySelectorAll(
            ".pdf-card, .pdf-intro-card, .pdf-note, .pdf-reflection, .pdf-science, .pdf-highlight"
        );

        while (fontSize > 12) {

            let overflow = false;

            answers.forEach(answer => {

                answer.style.fontSize = fontSize + "px";
                answer.style.lineHeight = "1.5";

                if (answer.scrollHeight > answer.clientHeight) {
                    overflow = true;
                }

            });

            cards.forEach(card => {

                card.style.padding = padding + "px";

            });

            if (!overflow) {
                break;
            }

            fontSize -= 0.5;
            padding -= 1;

        }

    });

}
// ======================================================
// ZURÜCKSETZEN
// ======================================================

function resetWorkbook() {

    if (!confirm(

        "Möchtest du wirklich alle Antworten löschen?"

    )) {

        return;

    }

    localStorage.removeItem(

        WORKBOOK.storageKey

    );

    state.currentChapter = 1;

    state.answers = {};

    state.finished = false;

    location.reload();

}


// ======================================================
// HILFSFUNKTIONEN
// ======================================================

function hasAnswers() {

    return Object.keys(

        state.answers

    ).length > 0;

}


window.addEventListener(

    "beforeunload",

    () => {

        if (hasAnswers()) {

            saveWorkbook();

        }

    }

);


// ======================================================
// ÖFFENTLICHE API
// ======================================================

window.Workbook = {

    next: nextChapter,

    back: previousChapter,

    reset: resetWorkbook,

    exportPDF: exportWorkbook,

    state

};
