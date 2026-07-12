/*
=========================================================
trotzdem.wahr
Workbook PDF V3
=========================================================
*/


/* =========================================================
   KONSTANTEN
========================================================= */

const STORAGE_KEY = "trotzdemWahrWorkbookV3";

const pdf = document.getElementById("pdf");

const answers = loadWorkbook();



/* =========================================================
   WORKBOOK
========================================================= */

const workbook = [

    {
        number:1,
        id:"step-1",
        title:"Ankommen",
        answers:[]
    },

    {
        number:2,
        id:"step-2",
        title:"Wahrnehmen",

        answers:[

            {
                key:"feelings",
                title:"Gefühle",
                type:"mindmap"
            },

            {
                key:"thoughts",
                title:"Gedanken",
                type:"chips"
            },

            {
                key:"energy",
                title:"Was kostet mich im Moment Kraft?",
                type:"journal"
            }

        ]

    },

    {
        number:3,
        id:"step-3",
        title:"Verstehen",

        answers:[

            {
                key:"stress",
                title:"Meine Stressreaktion",
                type:"highlight"
            },

            {
                key:"patterns",
                title:"Wiederkehrende Muster",
                type:"chips"
            },

            {
                key:"reflection",
                title:"Eigene Reflexion",
                type:"journal"
            }

        ]

    },

    {
        number:4,
        id:"step-4",
        title:"Erkennen",

        answers:[

            {
                key:"relationshipExperiences",
                title:"Eigene Erfahrungen",
                type:"chips"
            },

            {
                key:"warningSigns",
                title:"Warnsignale",
                type:"grid"
            },

            {
                key:"realisation",
                title:"Meine Gedanken",
                type:"journal"
            }

        ]

    },

    {
        number:5,
        id:"step-5",
        title:"Stärken",

        answers:[

            {
                key:"resources",
                title:"Meine Ressourcen",
                type:"grid"
            },

            {
                key:"strengths",
                title:"Meine Stärken",
                type:"mindmap"
            },

            {
                key:"gratitude",
                title:"Darauf bin ich stolz",
                type:"journal"
            }

        ]

    },

    {
        number:6,
        id:"step-6",
        title:"Weitergehen",

        answers:[

            {
                key:"takeaway",
                title:"Das nehme ich mit",
                type:"chips"
            },

            {
                key:"support",
                title:"Das unterstützt mich",
                type:"grid"
            },

            {
                key:"insight",
                title:"Meine wichtigste Erkenntnis",
                type:"journal"
            },

            {
                key:"nextStep",
                title:"Mein nächster Schritt",
                type:"journal"
            },

            {
                key:"futureMessage",
                title:"Brief an mein zukünftiges Ich",
                type:"letter"
            }

        ]

    }

];



/* =========================================================
   START
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    initialisePDF

);



async function initialisePDF(){

    clearPDF();

    renderCover();

    renderIntroduction();

    renderWorkbook();

    renderEnding();

    addPageNumbers();

    await waitForRender();

    await exportPDF();

}



/* =========================================================
   DATEN
========================================================= */

function loadWorkbook(){

    try{

        return JSON.parse(

            localStorage.getItem(STORAGE_KEY)

        ) || {};

    }

    catch{

        return {};

    }

}



/* =========================================================
   PDF LEEREN
========================================================= */

function clearPDF(){

    pdf.innerHTML="";

}
/* =========================================================
   WORKBOOK RENDERN
========================================================= */

function renderWorkbook(){

    workbook.forEach(step=>{

        renderChapter(step);

    });

}



/* =========================================================
   KAPITEL
========================================================= */

function renderChapter(step){

    const source = document.getElementById(step.id);

    if(!source) return;

    const page = createPage();

    renderChapterHeader(page,source);

    renderInformation(page,source);

    renderAnswers(page,step);

    renderTakeaway(page,source);

    pdf.append(page);

}



/* =========================================================
   SEITE
========================================================= */

function createPage(){

    const page = document.createElement("section");

    page.className="page";

    return page;

}



/* =========================================================
   KAPITELKOPF
========================================================= */

function renderChapterHeader(page,source){

    const header = source.querySelector(".step__header");

    if(!header) return;

    const clone = header.cloneNode(true);

    clone.classList.add("pdf-header");

    page.append(clone);

}



/* =========================================================
   INFORMATIONEN
========================================================= */

function renderInformation(page,source){

    const cards = source.querySelectorAll(

        ".card:not(.card--reflection):not(.card--takeaway):not(.card--ending)"

    );

    cards.forEach(card=>{

        page.append(

            cloneCard(card)

        );

    });

}



/* =========================================================
   TAKEAWAY
========================================================= */

function renderTakeaway(page,source){

    const takeaway = source.querySelector(".card--takeaway");

    if(takeaway){

        page.append(

            cloneCard(takeaway)

        );

    }

    const ending = source.querySelector(".card--ending");

    if(ending){

        page.append(

            cloneCard(ending)

        );

    }

}



/* =========================================================
   KARTE KLONEN
========================================================= */

function cloneCard(card){

    const clone = card.cloneNode(true);

    clone.classList.add("pdf-card");

    return clone;

}

/* =========================================================
   ANTWORTEN RENDERN
========================================================= */

function renderAnswers(page, step){

    if(!step.answers.length) return;

    const section = document.createElement("section");

    section.className = "pdf-answers";

    step.answers.forEach(answer=>{

        const value = answers[answer.key];

        if(!hasContent(value)) return;

        switch(answer.type){

            case "mindmap":

                renderMindmap(
                    section,
                    answer.title,
                    value
                );

                break;

            case "chips":

                renderChips(
                    section,
                    answer.title,
                    value
                );

                break;

            case "grid":

                renderGrid(
                    section,
                    answer.title,
                    value
                );

                break;

            case "journal":

                renderJournal(
                    section,
                    answer.title,
                    value
                );

                break;

            case "highlight":

                renderHighlight(
                    section,
                    answer.title,
                    value
                );

                break;

            case "letter":

                renderLetter(
                    section,
                    answer.title,
                    value
                );

                break;

        }

    });

    if(section.children.length){

        page.append(section);

    }

}



/* =========================================================
   SICHTBARKEIT
========================================================= */

function hasContent(value){

    if(value === undefined) return false;

    if(value === null) return false;

    if(Array.isArray(value)){

        return value.length > 0;

    }

    return String(value).trim() !== "";

}



/* =========================================================
   STANDARDKARTE
========================================================= */

function createAnswerCard(title){

    const card = document.createElement("article");

    card.className = "answer-card";

    const heading = document.createElement("h3");

    heading.textContent = title;

    card.append(heading);

    return card;

}



/* =========================================================
   JOURNAL
========================================================= */

function renderJournal(parent,title,value){

    const card = createAnswerCard(title);

    const journal = document.createElement("div");

    journal.className = "journal";

    journal.innerHTML = escapeHtml(value)
        .replace(/\n/g,"<br>");

    card.append(journal);

    parent.append(card);

}



/* =========================================================
   HIGHLIGHT
========================================================= */

function renderHighlight(parent,title,value){

    const card = createAnswerCard(title);

    const box = document.createElement("div");

    box.className = "highlight-box";

    box.textContent = value;

    card.append(box);

    parent.append(card);

}
/* =========================================================
   CHIPS
========================================================= */

function renderChips(parent,title,values){

    const card = createAnswerCard(title);

    const container = document.createElement("div");

    container.className = "chip-container";

    const list = Array.isArray(values)
        ? values
        : [values];

    list.forEach(item=>{

        const chip = document.createElement("span");

        chip.className = "chip";

        chip.textContent = item;

        container.append(chip);

    });

    card.append(container);

    parent.append(card);

}



/* =========================================================
   GRID
========================================================= */

function renderGrid(parent,title,values){

    const card = createAnswerCard(title);

    const grid = document.createElement("div");

    grid.className = "answer-grid";

    const list = Array.isArray(values)
        ? values
        : [values];

    list.forEach(item=>{

        const box = document.createElement("div");

        box.className = "answer-grid__item";

        box.textContent = item;

        grid.append(box);

    });

    card.append(grid);

    parent.append(card);

}



/* =========================================================
   MINDMAP
========================================================= */

function renderMindmap(parent,title,values){

    const card = createAnswerCard(title);

    const map = document.createElement("div");

    map.className = "mindmap";

    const center = document.createElement("div");

    center.className = "mindmap__center";

    center.textContent = "ICH";

    map.append(center);

    const list = Array.isArray(values)
        ? values
        : [values];

    list.slice(0,10).forEach((item,index)=>{

        const node = document.createElement("div");

        node.className =
            `mindmap__item position-${index+1}`;

        node.textContent = item;

        map.append(node);

    });

    card.append(map);

    parent.append(card);

}



/* =========================================================
   BRIEFKARTE
========================================================= */

function renderLetter(parent,title,value){

    const card = createAnswerCard(title);

    card.classList.add("letter-card");

    const intro = document.createElement("p");

    intro.className = "letter-intro";

    intro.textContent =
        "Eine Nachricht an dein zukünftiges Ich";

    const message = document.createElement("div");

    message.className = "letter-message";

    message.innerHTML = escapeHtml(value)
        .replace(/\n/g,"<br>");

    card.append(intro);

    card.append(message);

    parent.append(card);

}
/* =========================================================
   COVER
========================================================= */

function renderCover(){

    const page = createPage();

    page.classList.add("cover-page");

    page.innerHTML = `

        <section class="cover">

            <div class="cover__badge">

                Kostenloses Workbook

            </div>

            <h1 class="cover__title">

                Zurück zu dir

            </h1>

            <p class="cover__subtitle">

                Ein Workbook über Selbstreflexion,
                psychologische Zusammenhänge
                und neue Perspektiven.

            </p>

            <div class="cover__circle">

                <div class="cover__logo">

                    trotzdem.wahr

                </div>

            </div>

        </section>

    `;

    pdf.append(page);

}



/* =========================================================
   EINLEITUNG
========================================================= */

function renderIntroduction(){

    const hero = document.querySelector(".hero");

    if(!hero) return;

    const page = createPage();

    page.classList.add("intro-page");

    const clone = hero.cloneNode(true);

    clone.classList.add("pdf-introduction");

    const button = clone.querySelector("button");

    if(button){

        button.remove();

    }

    page.append(clone);

    pdf.append(page);

}



/* =========================================================
   ABSCHLUSS
========================================================= */

function renderEnding(){

    const page = createPage();

    page.classList.add("ending-page");

    page.innerHTML = `

        <section class="ending">

            <h2>

                Danke.

            </h2>

            <p>

                Danke,
                dass du dir Zeit
                für dich selbst genommen hast.

            </p>

            <p>

                Vielleicht wirst du dieses Workbook
                in einigen Monaten noch einmal öffnen.

                Es kann spannend sein,
                welche Antworten du dann gibst
                und welche neuen Gedanken entstanden sind.

            </p>

            <p>

                Entwicklung bedeutet nicht,
                perfekt zu werden.

                Entwicklung bedeutet,
                immer wieder
                freundlich zu sich selbst
                zurückzufinden.

            </p>

            <div class="ending__footer">

                trotzdem.wahr

            </div>

        </section>

    `;

    pdf.append(page);

}



/* =========================================================
   FUSSZEILEN
========================================================= */

function addPageNumbers(){

    const pages = pdf.querySelectorAll(".page");

    pages.forEach((page,index)=>{

        const footer = document.createElement("footer");

        footer.className = "pdf-footer";

        footer.innerHTML = `

            <span>

                trotzdem.wahr

            </span>

            <span>

                Seite ${index+1}

            </span>

        `;

        page.append(footer);

    });

}



/* =========================================================
   HILFSFUNKTIONEN
========================================================= */

function escapeHtml(text){

    return String(text)

        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}



function waitForRender(){

    return new Promise(resolve=>{

        requestAnimationFrame(()=>{

            requestAnimationFrame(resolve);

        });

    });

}



/* =========================================================
   PDF EXPORT
========================================================= */

async function exportPDF(){

    await html2pdf()

        .set({

            margin:0,

            filename:"trotzdem.wahr_Workbook.pdf",

            image:{
                type:"jpeg",
                quality:1
            },

            html2canvas:{
                scale:2,
                useCORS:true,
                scrollY:0,
                backgroundColor:"#F8F5F1"
            },

            jsPDF:{
                unit:"mm",
                format:"a4",
                orientation:"portrait"
            },

            pagebreak:{
                mode:["css","legacy"],
                avoid:[
                    ".pdf-card",
                    ".answer-card",
                    ".mindmap",
                    ".journal",
                    ".letter-card",
                    ".answer-grid"
                ]
            }

        })

        .from(pdf)

        .save();

}
