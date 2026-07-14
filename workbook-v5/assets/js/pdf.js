/* ==========================================================
   trotzdem.wahr
   Workbook PDF V6
========================================================== */


/* ==========================================================
   KONSTANTEN
========================================================== */

const STORAGE_KEY = "trotzdem-wahr-workbook-v5";



/* ==========================================================
   DATEN
========================================================== */

let workbookData = {};



/* ==========================================================
   DOM
========================================================== */

const pdfPages = document.getElementById("pdfPages");



/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initWorkbookPdf

);



function initWorkbookPdf(){

    loadWorkbookData();

    renderWorkbook();

}



/* ==========================================================
   DATEN LADEN
========================================================== */

function loadWorkbookData(){

    const saved = localStorage.getItem(STORAGE_KEY);



    workbookData = saved

        ? JSON.parse(saved)

        : {};

}



/* ==========================================================
   WORKBOOK RENDERN
========================================================== */

function renderWorkbook(){

    pdfPages.innerHTML = "";



    const pages = [

        createCover(),

        createForeword(),

        createChapter1(),

        createChapter2(),

        createChapter3(),

        createChapter4(),

        createChapter5(),

        createChapter6()

    ];



    pdfPages.insertAdjacentHTML(

        "beforeend",

        pages.join("")

    );



    fitAnswerBoxes();



    requestAnimationFrame(()=>{

        exportPdf();

    });

}
/* ==========================================================
   DATEN HELFER
========================================================== */

function getText(key){

    const value = workbookData[key];

    if(typeof value !== "string"){

        return "";

    }

    return value.trim();

}



function getArray(key){

    const value = workbookData[key];

    if(Array.isArray(value)){

        return value;

    }

    return [];

}



/* ==========================================================
   HILFSFUNKTIONEN
========================================================== */

function hasValue(value){

    return String(value).trim().length > 0;

}



function escapeHtml(text){

    return String(text)

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}



/* ==========================================================
   SCHRIFTGRÖSSE
========================================================== */

function getFontClass(text){

    const length = text.length;

    if(length <= 100){

        return "";

    }

    if(length <= 180){

        return "text-small";

    }

    if(length <= 260){

        return "text-smaller";

    }

    return "text-smallest";

}



/* ==========================================================
   TEXTE
========================================================== */

const PDF_TEXT = {

    cover:{

        title:"Zurück zu dir",

        subtitle:"Dieses Workbook fasst deine persönlichen Antworten zusammen. Nimm dir Zeit, lies sie in Ruhe und erinnere dich daran: Entwicklung beginnt nicht mit Perfektion, sondern mit Ehrlichkeit.",

        logo:"trotzdem.wahr"

    },



    foreword:{

        title:"Willkommen",

        subtitle:"Dein persönliches Workbook",

        text:`

            Dieses PDF enthält alle Antworten,

            die du während des Workbooks

            festgehalten hast.

            <br><br>

            Es soll dir helfen,

            Zusammenhänge zu erkennen,

            Entwicklungen sichtbar zu machen

            und jederzeit auf deine Gedanken

            zurückblicken zu können.

            <br><br>

            Alles, was du hier liest,

            hast du selbst geschrieben.

        `

    }

};
/* ==========================================================
   SEITEN
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

        <div class="page__number">

            ${number}

        </div>

        <h1 class="page__title">

            ${title}

        </h1>

        <p class="page__subtitle">

            ${subtitle}

        </p>

    `;

}



/* ==========================================================
   FOOTER
========================================================== */

function createFooter(page){

    return `

        <footer class="footer">

            <span>

                trotzdem.wahr

            </span>

            <span>

                Seite ${page} / 8

            </span>

        </footer>

    `;

}



/* ==========================================================
   LAYOUT
========================================================== */

function oneColumn(card){

    return `

        ${card}

    `;

}



function twoColumns(left,right){

    return `

        <div
            style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:5mm;
                margin-bottom:5mm;
            ">

            ${left}

            ${right}

        </div>

    `;

}
