/*
========================================================

Zurück zu dir
Digitales Workbook

Projekt:
trotzdem.wahr

Datei:
workbook.js

Version:
1.0

========================================================
*/


// ======================================================
// KONFIGURATION
// ======================================================

const WORKBOOK = {

    totalChapters: 6,

    storageKey: "zurueckZuDirWorkbook",

    animationDuration: 300

};


// ======================================================
// STATUS
// ======================================================

const state = {

    currentChapter: 1,

    answers: {},

    started: false,

    finished: false

};


// ======================================================
// INITIALISIERUNG
// ======================================================

document.addEventListener("DOMContentLoaded", initializeWorkbook);


function initializeWorkbook() {

    loadWorkbook();

    bindEvents();

    restoreAnswers();

    showChapter(state.currentChapter);

    updateProgress();

    state.started = true;

}


// ======================================================
// EVENTS
// ======================================================

function bindEvents() {

    document.querySelectorAll("[data-next]").forEach(button => {

        button.addEventListener("click", nextChapter);

    });


    document.querySelectorAll("[data-back]").forEach(button => {

        button.addEventListener("click", previousChapter);

    });


    document.querySelectorAll("input").forEach(input => {

    input.addEventListener("change", handleAnswer);

});

document.querySelectorAll("textarea").forEach(textarea => {

    textarea.addEventListener("input", handleAnswer);

});

}


// ======================================================
// ANTWORTEN
// ======================================================

function handleAnswer(event) {

    const element = event.target;

    const question = element.name;

    let value;

if (element.tagName === "TEXTAREA") {

    state.answers[question] = element.value;

    saveWorkbook();

    return;

}
    if (element.type === "checkbox") {

        value = Array.from(

            document.querySelectorAll(

                `input[name="${question}"]:checked`

            )

        ).map(item => item.value);

    }

    else {

        value = element.value;

    }


    state.answers[question] = value;

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

        state.currentChapter = data.currentChapter || 1;

        state.answers = data.answers || {};

        state.finished = data.finished || false;

    }

    catch {

        console.warn("Workbook konnte nicht geladen werden.");

    }

}
// ======================================================
// WIEDERHERSTELLEN
// ======================================================

function restoreAnswers() {

    Object.entries(state.answers).forEach(([question, value]) => {

        if (Array.isArray(value)) {

            value.forEach(answer => {

                const input = document.querySelector(
                    `input[name="${question}"][value="${answer}"]`
                );

                if (input) {
                    input.checked = true;
                }

            });

            return;

        }

        const input = document.querySelector(
            `input[name="${question}"][value="${value}"]`
        );

        if (input) {

            input.checked = true;
            return;

        }

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

    document
        .querySelectorAll(".chapter")
        .forEach(chapter => {

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

    scrollToTop();

    saveWorkbook();

}


function nextChapter() {

    if (state.currentChapter >= WORKBOOK.totalChapters) {

        finishWorkbook();

        return;

    }

    showChapter(state.currentChapter + 1);

}


function previousChapter() {

    if (state.currentChapter <= 1) {

        return;

    }

    showChapter(state.currentChapter - 1);

}


// ======================================================
// FORTSCHRITT
// ======================================================

function updateProgress() {

    const progress = document.getElementById(
        "progress"
    );

    if (!progress) {

        return;

    }

    progress.textContent =
        `Kapitel ${state.currentChapter} von ${WORKBOOK.totalChapters}`;

}
// ======================================================
// DYNAMISCHE EINBLENDUNGEN
// ======================================================

function updateReflectionCards() {

    document
        .querySelectorAll(".reflection-card")
        .forEach(card => {

            card.classList.remove("visible");

        });

    document
        .querySelectorAll(".reflection-card")
        .forEach(card => {

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
// WORKBOOK ABSCHLIESSEN
// ======================================================

function finishWorkbook() {

    state.finished = true;

    saveWorkbook();

    const ending = document.getElementById(
        "workbook-finished"
    );

    if (ending) {

        ending.classList.add("active");

        scrollToTop();

    }

}


// ======================================================
// WORKBOOK ZURÜCKSETZEN
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
// PDF EXPORT
// ======================================================

function exportWorkbook() {

    preparePDF();

    setTimeout(() => {

        window.print();

    }, 300);

}
function preparePDF() {

    document.body.classList.add("pdf-export");

    document
        .querySelectorAll(".chapter")
        .forEach(chapter => {

            chapter.classList.add("active");

        });

}


function cleanupPDF() {

    document.body.classList.remove("pdf-export");

    showChapter(state.currentChapter);

}

// ======================================================
// HILFSFUNKTIONEN
// ======================================================

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


function isAnswered(question) {

    return question in state.answers;

}


function getAnswers() {

    return state.answers;

}
// ======================================================
// VALIDIERUNG
// ======================================================

function hasUnsavedChanges() {

    return Object.keys(state.answers).length > 0;

}

window.addEventListener("beforeunload", function (event) {

    if (!hasUnsavedChanges()) {

        return;

    }

    saveWorkbook();

});


// ======================================================
// TASTATURBEDIENUNG
// ======================================================

document.addEventListener("keydown", function (event) {

    // Pfeil rechts = Weiter
    if (event.key === "ArrowRight") {

        nextChapter();

    }

    // Pfeil links = Zurück
    if (event.key === "ArrowLeft") {

        previousChapter();

    }

});


// ======================================================
// DEBUG (nur Entwicklung)
// ======================================================

function debugWorkbook() {

    console.log("Aktuelles Kapitel:", state.currentChapter);

    console.log("Antworten:", state.answers);

    console.log("Workbook beendet:", state.finished);

}


// ======================================================
// ÖFFENTLICHE FUNKTIONEN
// ======================================================

window.Workbook = {

    next: nextChapter,

    back: previousChapter,

    reset: resetWorkbook,

    exportPDF: exportWorkbook,

    debug: debugWorkbook,

    state

};
window.addEventListener("afterprint", cleanupPDF);
