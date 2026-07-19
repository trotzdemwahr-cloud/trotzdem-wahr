/* ==========================================================
   trotzdem.wahr
   Workbook PDF
   Version 2.0
========================================================== */


/* ==========================================================
   STORAGE
========================================================== */

const STORAGE_KEY = "trotzdem-wahr-workbook-v5";

let workbookData = {};


/* ==========================================================
   DOM
========================================================== */

const pdf = document.getElementById("pdf");
const pdfPages = document.getElementById("pdfPages");


/* ==========================================================
   INIT
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initWorkbookPdf
);

async function initWorkbookPdf(){

    loadWorkbookData();

    await renderWorkbook();

    await prepareWorkbook();

    await exportPdf();

}
/* ==========================================================
   LOAD DATA
========================================================== */

function loadWorkbookData(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(!saved){

        workbookData = {};
        return;

    }

    try{

        workbookData = JSON.parse(saved) || {};

    }

    catch(error){

        console.error(
            "Workbook konnte nicht geladen werden.",
            error
        );

        workbookData = {};

    }

}


/* ==========================================================
   DATA HELPERS
========================================================== */

function getText(key){

    const value = workbookData[key];

    return typeof value === "string"

        ? value.trim()

        : "";

}


function getArray(key){

    const value = workbookData[key];

    return Array.isArray(value)

        ? value

        : [];

}


function hasValue(value){

    return String(value ?? "").trim().length > 0;

}


/* ==========================================================
   HTML HELPERS
========================================================== */

function escapeHtml(text=""){

    return String(text)

        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


function nl2br(text=""){

    return escapeHtml(text)

        .replace(/\n/g,"<br>");

}
/* ==========================================================
   RENDER
========================================================== */

async function renderWorkbook(){

    pdfPages.innerHTML = [

        createCover(),

        createForeword(),

        createChapter1(),

        createChapter2(),

        createChapter3(),

        createChapter4(),

        createChapter5(),

        createChapter6()

    ].join("");

}


/* ==========================================================
   PREPARE
========================================================== */

async function prepareWorkbook(){

    await waitForFonts();

    await nextFrame();
    await nextFrame();

    fitAnswerBoxes();

    await nextFrame();

    await wait(120);

}


/* ==========================================================
   FONT LOADING
========================================================== */

async function waitForFonts(){

    if(!document.fonts){

        return;

    }

    try{

        await document.fonts.ready;

    }

    catch(error){

        console.warn(
            "Fonts konnten nicht vollständig geladen werden."
        );

    }

}


/* ==========================================================
   FRAME HELPERS
========================================================== */

function nextFrame(){

    return new Promise(resolve=>{

        requestAnimationFrame(resolve);

    });

}


function wait(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}
/* ==========================================================
   PAGE
========================================================== */

function createPage(content){

    return `

<section class="page">

    <div class="page__content">

        ${content}

    </div>

</section>

`;

}


/* ==========================================================
   HEADER
========================================================== */

function createHeader(number,title,subtitle){

    return `

<header class="page-header">

    <div class="chapter-number">

        ${escapeHtml(number)}

    </div>

    <h2 class="chapter-title">

        ${escapeHtml(title)}

    </h2>

    <p class="chapter-subtitle">

        ${escapeHtml(subtitle)}

    </p>

</header>

`;

}


/* ==========================================================
   FOOTER
========================================================== */

function createFooter(page){

    return `

<footer class="page-footer">

    <div class="footer">

        <span>

            trotzdem.wahr

        </span>

        <span>

            Seite ${page} / 8

        </span>

    </div>

</footer>

`;

}


/* ==========================================================
   LAYOUT HELPERS
========================================================== */

function oneColumn(content){

    return content;

}


function twoColumns(left,right){

    return `

<div class="card-grid">

    ${left}

    ${right}

</div>

`;

}
/* ==========================================================
   INFO CARD
========================================================== */

function infoCard(title,text){

    return `

<section class="card card--info">

    <h3>

        ${escapeHtml(title)}

    </h3>

    <p>

        ${text}

    </p>

</section>

`;

}


/* ==========================================================
   ANSWER CARD
========================================================== */

function answerCard(title,key){

    const answer = getText(key);

    return `

<section class="card card--reflection">

    <h3 class="answer-title">

        ${escapeHtml(title)}

    </h3>

    <div class="answer">

        <div class="answer-box fit">

            ${hasValue(answer)

                ? nl2br(answer)

                : "Keine Antwort eingetragen."}

        </div>

    </div>

</section>

`;

}


/* ==========================================================
   CHIP CARD
========================================================== */

function chipCard(title,key){

    const chips = getArray(key);

    return `

<section class="card card--reflection">

    <h3>

        ${escapeHtml(title)}

    </h3>

    <div class="chip-group">

        ${chips.length

            ? chips.map(chip=>`

                <span class="badge">

                    ${escapeHtml(chip)}

                </span>

            `).join("")

            : `<span class="badge">Keine Auswahl</span>`}

    </div>

</section>

`;

}


/* ==========================================================
   PSYCHOLOGY CARD
========================================================== */

function psychologyCard(text){

    return `

<section class="card card--psychology card--full">

    <div class="badge">

        Ein Blick in die Psychologie

    </div>

    <p>

        ${text}

    </p>

</section>

`;

}


/* ==========================================================
   TAKEAWAY CARD
========================================================== */

function takeawayCard(text){

    return `

<section class="card card--takeaway card--full">

    <div class="badge">

        Für heute

    </div>

    <p>

        ${text}

    </p>

</section>

`;

}
