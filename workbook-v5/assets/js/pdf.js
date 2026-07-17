/* ==========================================================
   trotzdem.wahr
   Workbook PDF
========================================================== */


/* ==========================================================
   KONSTANTEN
========================================================== */

const STORAGE_KEY = "trotzdem-wahr-workbook-v5";

let workbookData = {};

const pdfPages = document.getElementById("pdfPages");



/* ==========================================================
   START
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initWorkbookPdf
);



async function initWorkbookPdf(){

    loadWorkbookData();

    renderWorkbook();

}



/* ==========================================================
   DATEN LADEN
========================================================== */

function loadWorkbookData(){

    const saved = localStorage.getItem(STORAGE_KEY);

    try{

        workbookData = saved
            ? JSON.parse(saved)
            : {};

    }catch(error){

        console.error("Workbook konnte nicht geladen werden.", error);

        workbookData = {};

    }

}



/* ==========================================================
   WORKBOOK RENDERN
========================================================== */

function renderWorkbook(){

    pdfPages.innerHTML = "";

    const html = [

        createCover(),
        createForeword(),
        createChapter1(),
        createChapter2(),
        createChapter3(),
        createChapter4(),
        createChapter5(),
        createChapter6()

    ].join("");

    pdfPages.innerHTML = html;

    requestAnimationFrame(()=>{

        fitAnswerBoxes();

        requestAnimationFrame(()=>{

            validatePages();

            exportPdf();

        });

    });

}
/* ==========================================================
   DATEN HELFER
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

    if(length <= 100) return "";
    if(length <= 180) return "text-small";
    if(length <= 260) return "text-smaller";

    return "text-smallest";

}



/* ==========================================================
   ANTWORTBOXEN ANPASSEN
========================================================== */

function fitAnswerBoxes(){

    const boxes = document.querySelectorAll(".answer-box");

    boxes.forEach(box=>{

        let fontSize = parseFloat(
            window.getComputedStyle(box).fontSize
        );

        while(

            box.scrollHeight > box.clientHeight &&
            fontSize > 8

        ){

            fontSize -= 0.5;

            box.style.fontSize = fontSize + "px";
            box.style.lineHeight = (fontSize * 1.45) + "px";

        }

    });

}



/* ==========================================================
   SEITEN PRÜFEN
========================================================== */

function validatePages(){

    const pages = document.querySelectorAll(".page");

    pages.forEach((page,index)=>{

        if(page.scrollHeight > page.clientHeight){

            console.warn(

                `Seite ${index+1} ist zu hoch.`

            );

        }

    });

}
/* ==========================================================
   PDF EXPORT
========================================================== */

function exportPdf(){

    const element = document.getElementById("pdf");

    const options = {

        margin:0,

        filename:"trotzdem-wahr-workbook.pdf",

        image:{
            type:"jpeg",
            quality:1
        },

        html2canvas:{

            scale:3,

            useCORS:true,

            backgroundColor:"#F7F4EF",

            scrollX:0,
            scrollY:0,

            logging:false

        },

        jsPDF:{

            unit:"mm",

            format:"a4",

            orientation:"portrait",

            compress:true

        },

        pagebreak:{

            mode:["css"]

        }

    };

    html2pdf()

        .set(options)

        .from(element)

        .save();

}
