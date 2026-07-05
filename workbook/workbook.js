/*
========================================================

Zurück zu dir
Digitales Workbook

trotzdem.wahr

workbook.js
Version 2.0

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

    finished: false,

    pdfMode: false

};


// ======================================================
// INITIALISIERUNG
// ======================================================

document.addEventListener(

    "DOMContentLoaded",

    initializeWorkbook

);


function initializeWorkbook(){

    loadWorkbook();

    cacheElements();

    bindEvents();

    restoreAnswers();

    showChapter(state.currentChapter);

    updateProgress();

    updateReflectionCards();

    state.started = true;

}


// ======================================================
// ELEMENTE
// ======================================================

const ui = {

    chapters:[],

    progress:null,

    pdf:null

};


function cacheElements(){

    ui.chapters=[

        ...document.querySelectorAll(".chapter")

    ];

    ui.progress=document.getElementById("progress");

    ui.pdf=document.getElementById("pdf-export");

}
// ======================================================
// NAVIGATION
// ======================================================

function showChapter(chapterNumber){

    if(
        chapterNumber < 1 ||
        chapterNumber > WORKBOOK.totalChapters
    ){
        return;
    }

    ui.chapters.forEach(chapter=>{

        chapter.classList.remove("active");

    });

    const active=document.getElementById(

        `chapter-${chapterNumber}`

    );

    if(!active){

        return;

    }

    active.classList.add("active");

    state.currentChapter=chapterNumber;

    updateProgress();

    saveWorkbook();

    scrollToTop();

}


function nextChapter(){

    if(state.currentChapter>=WORKBOOK.totalChapters){

        finishWorkbook();

        return;

    }

    showChapter(

        state.currentChapter+1

    );

}


function previousChapter(){

    if(state.currentChapter<=1){

        return;

    }

    showChapter(

        state.currentChapter-1

    );

}


// ======================================================
// FORTSCHRITT
// ======================================================

function updateProgress(){

    if(!ui.progress){

        return;

    }

    ui.progress.textContent=

        `Kapitel ${state.currentChapter} von ${WORKBOOK.totalChapters}`;

}


// ======================================================
// SCROLL
// ======================================================

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
// ======================================================
// EVENTS
// ======================================================

function bindEvents(){

    document
        .querySelectorAll("[data-next]")
        .forEach(button=>{

            button.addEventListener(

                "click",

                nextChapter

            );

        });

    document
        .querySelectorAll("[data-back]")
        .forEach(button=>{

            button.addEventListener(

                "click",

                previousChapter

            );

        });

    document
        .querySelectorAll("input, textarea")
        .forEach(field=>{

            const event=

                field.tagName==="TEXTAREA"

                ? "input"

                : "change";

            field.addEventListener(

                event,

                handleAnswer

            );

        });

}


// ======================================================
// ANTWORTEN
// ======================================================

function handleAnswer(event){

    const field=event.target;

    const question=field.name;

    if(!question){

        return;

    }


    // Textfelder

    if(field.tagName==="TEXTAREA"){

        state.answers[question]=

            field.value;

        saveWorkbook();

        return;

    }


    // Checkboxen

    if(field.type==="checkbox"){

        state.answers[question]=

            [...document.querySelectorAll(

                `input[name="${question}"]:checked`

            )]

            .map(item=>item.value);

    }


    // Radiobuttons

    else{

        state.answers[question]=

            field.value;

    }


    updateReflectionCards();

    saveWorkbook();

}
// ======================================================
// SPEICHERN
// ======================================================

function saveWorkbook(){

    localStorage.setItem(

        WORKBOOK.storageKey,

        JSON.stringify(state)

    );

}


function loadWorkbook(){

    const saved=

        localStorage.getItem(

            WORKBOOK.storageKey

        );

    if(!saved){

        return;

    }

    try{

        const data=JSON.parse(saved);

        state.currentChapter=

            data.currentChapter || 1;

        state.answers=

            data.answers || {};

        state.finished=

            data.finished || false;

    }

    catch(error){

        console.warn(

            "Workbook konnte nicht geladen werden.",

            error

        );

    }

}


// ======================================================
// WIEDERHERSTELLEN
// ======================================================

function restoreAnswers(){

    Object.entries(state.answers)

        .forEach(([question,value])=>{

        // Checkboxen

        if(Array.isArray(value)){

            value.forEach(answer=>{

                const checkbox=document.querySelector(

                    `input[name="${question}"][value="${answer}"]`

                );

                if(checkbox){

                    checkbox.checked=true;

                }

            });

            return;

        }


        // Radio

        const radio=document.querySelector(

            `input[type="radio"][name="${question}"][value="${value}"]`

        );

        if(radio){

            radio.checked=true;

            return;

        }


        // Textarea

        const textarea=document.querySelector(

            `textarea[name="${question}"]`

        );

        if(textarea){

            textarea.value=value;

            return;

        }

    });

}
// ======================================================
// PDF
// ======================================================

function exportWorkbook(){

    preparePDF();

    window.setTimeout(()=>{

        window.print();

    },200);

}


function preparePDF(){

    state.pdfMode=true;

    document.body.classList.add(

        "pdf-mode"

    );

    if(ui.pdf){

        ui.pdf.hidden=false;

    }

    fillPDF();

}


function cleanupPDF(){

    state.pdfMode=false;

    document.body.classList.remove(

        "pdf-mode"

    );

    if(ui.pdf){

        ui.pdf.hidden=true;

    }

}


window.addEventListener(

    "afterprint",

    cleanupPDF

);


// ======================================================
// PDF INHALTE
// ======================================================

function fillPDF(){

    fillPDFDate();

    fillPDFAnswers();

}


function fillPDFDate(){

    const date=document.getElementById(

        "pdf-date"

    );

    if(!date){

        return;

    }

    date.textContent=

        new Date().toLocaleDateString(

            "de-DE"

        );

}


function fillPDFAnswers(){

    document

        .querySelectorAll(

            "[data-pdf-answer]"

        )

        .forEach(element=>{

            const key=

                element.dataset.pdfAnswer;

            const value=

                state.answers[key];

            if(value===undefined){

                element.textContent="—";

                return;

            }

            if(Array.isArray(value)){

                element.textContent=

                    value.join(", ");

                return;

            }

            if(value===""){

                element.textContent="—";

                return;

            }

            element.textContent=value;

        });

}
// ======================================================
// REFLECTION CARDS
// ======================================================

function updateReflectionCards(){

    document
        .querySelectorAll(".reflection-card")
        .forEach(card=>{

            card.classList.remove("visible");

            const question=card.dataset.question;
            const trigger=card.dataset.value;

            if(!question || !trigger){

                return;

            }

            const answer=state.answers[question];

            if(Array.isArray(answer)){

                if(answer.includes(trigger)){

                    card.classList.add("visible");

                }

                return;

            }

            if(answer===trigger){

                card.classList.add("visible");

            }

        });

}


// ======================================================
// ABSCHLUSS
// ======================================================

function finishWorkbook(){

    state.finished=true;

    saveWorkbook();

    showChapter(WORKBOOK.totalChapters);

}


// ======================================================
// ZURÜCKSETZEN
// ======================================================

function resetWorkbook(){

    if(!confirm(

        "Möchtest du wirklich alle Antworten löschen?"

    )){

        return;

    }

    localStorage.removeItem(

        WORKBOOK.storageKey

    );

    state.currentChapter=1;

    state.answers={};

    state.finished=false;

    location.reload();

}


// ======================================================
// HILFSFUNKTIONEN
// ======================================================

function hasAnswers(){

    return Object.keys(

        state.answers

    ).length>0;

}


window.addEventListener(

    "beforeunload",

    ()=>{

        if(hasAnswers()){

            saveWorkbook();

        }

    }

);


// ======================================================
// ÖFFENTLICHE API
// ======================================================

window.Workbook={

    next:nextChapter,

    back:previousChapter,

    reset:resetWorkbook,

    exportPDF:exportWorkbook,

    state

};
