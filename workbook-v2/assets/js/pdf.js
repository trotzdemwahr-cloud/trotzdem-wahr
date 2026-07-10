/*
========================================================

trotzdem.wahr
PDF

========================================================
*/


/* ==========================================
   ELEMENTE
========================================== */

const pdf = document.getElementById("pdf");

const STORAGE_KEY = "trotzdemWahrWorkbook";

const answers = JSON.parse(

    localStorage.getItem(STORAGE_KEY)

) || {};



/* ==========================================
   START
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    initialisePDF

);



/* ==========================================
   INITIALISIEREN
========================================== */

async function initialisePDF(){

    createCover();

    createWorkbook();

    await waitForRendering();

    await generatePDF();

}
/* ==========================================
   COVER
========================================== */

function createCover(){

    pdf.insertAdjacentHTML(

        "beforeend",

        `

        <section class="cover page">

            <div class="cover__badge">

                Kostenloses Workbook

            </div>

            <h1 class="cover__title">

                Zurück zu dir

            </h1>

            <p class="cover__subtitle">

                Dein persönliches Workbook
                von trotzdem.wahr.

                Dieses Dokument enthält
                deine eigenen Gedanken,
                Reflexionen und Erkenntnisse.

            </p>

            <div class="cover__footer">

                trotzdem.wahr

            </div>

        </section>

        `

    );

}
/* ==========================================
   SCHRITTE
========================================== */

const workbook = [

    {

        title:"Ankommen",

        quote:"„Du musst heute nichts leisten.“",

        answers:[]

    },

    {

        title:"Wahrnehmen",

        quote:"„Alles beginnt damit, ehrlich hinzuschauen.“",

        answers:[

            ["Gefühle","feelings"],

            ["Gedanken","thoughts"],

            ["Was kostet Kraft?","energy"]

        ]

    },

    {

        title:"Verstehen",

        quote:"„Verstehen verändert den Blick.“",

        answers:[

            ["Stressreaktion","stress"],

            ["Verhaltensmuster","patterns"],

            ["Reflexion","reflection"]

        ]

    },

    {

        title:"Erkennen",

        quote:"„Verstehen schafft Orientierung.“",

        answers:[

            ["Erfahrungen","relationshipExperiences"],

            ["Warnsignale","warningSigns"],

            ["Gedanken","realisation"]

        ]

    },

    {

        title:"Stärken",

        quote:"„Du bist mehr als deine schwierigsten Tage.“",

        answers:[

            ["Ressourcen","resources"],

            ["Stärken","strengths"],

            ["Darauf bin ich stolz","gratitude"]

        ]

    },

    {

        title:"Weitergehen",

        quote:"„Jeder Weg entsteht Schritt für Schritt.“",

        answers:[

            ["Erkenntnis","insight"],

            ["Nächster Schritt","nextStep"],

            ["Nachricht an mich","futureMessage"]

        ]

    }

];
/* ==========================================
   WORKBOOK
========================================== */

function createWorkbook(){

    workbook.forEach(step=>{

        createStep(step);

    });

}
/* ==========================================
   SCHRITT ERSTELLEN
========================================== */

function createStep(step){

    const page = document.createElement("section");

    page.className = "page";



    page.innerHTML = `

        <section class="step">

            <h2 class="step__title">

                ${step.title}

            </h2>

            <p class="step__quote">

                ${step.quote}

            </p>

        </section>

    `;



    step.answers.forEach(answer=>{

        createCard(

            page,

            answer[0],

            answers[answer[1]]

        );

    });



    page.insertAdjacentHTML(

        "beforeend",

        `

        <footer class="pdf-footer">

            <p>

                trotzdem.wahr

            </p>

        </footer>

        `

    );



    pdf.appendChild(page);

}
/* ==========================================
   KARTE ERSTELLEN
========================================== */

function createCard(

    page,

    title,

    value

){

    if(

        value===undefined ||

        value===null ||

        value==="" ||

        (Array.isArray(value) && value.length===0)

    ){

        return;

    }



    const card=document.createElement("article");



    card.className="card";



    card.innerHTML=`

        <div class="card__badge">

            ${title}

        </div>

        <div class="card__content">

            ${formatAnswer(value)}

        </div>

    `;



    adaptFontSize(

        card.querySelector(".card__content")

    );



    page.appendChild(card);

}
/* ==========================================
   FORMATIEREN
========================================== */

function formatAnswer(value){

    if(Array.isArray(value)){

        return `

            <ul>

                ${value.map(item=>`

                    <li>${escapeHtml(item)}</li>

                `).join("")}

            </ul>

        `;

    }



    return escapeHtml(value)

        .replace(/\n/g,"<br>");

}
/* ==========================================
   HTML ESCAPEN
========================================== */

function escapeHtml(text){

    return String(text)

        .replaceAll("&","&amp;")

        .replaceAll("<","&lt;")

        .replaceAll(">","&gt;")

        .replaceAll('"',"&quot;")

        .replaceAll("'","&#039;");

}
/* ==========================================
   SCHRIFTGRÖSSE
========================================== */

function adaptFontSize(element){

    const length = element.innerText.length;

    if(length > 1800){

        element.classList.add("font-tiny");

    }

    else if(length > 1200){

        element.classList.add("font-small");

    }

    else if(length > 700){

        element.classList.add("font-medium");

    }

    else{

        element.classList.add("font-large");

    }

}
/* ==========================================
   RENDERN ABWARTEN
========================================== */

function waitForRendering(){

    return new Promise(resolve=>{

        requestAnimationFrame(()=>{

            requestAnimationFrame(resolve);

        });

    });

}
/* ==========================================
   PDF ERSTELLEN
========================================== */

async function generatePDF(){

    const options={

        margin:0,

        filename:"trotzdem.wahr_Workbook_Zurück-zu-dir.pdf",

        image:{

            type:"jpeg",

            quality:1

        },

        html2canvas:{

            scale:2,

            useCORS:true,

            scrollY:0

        },

        jsPDF:{

            unit:"mm",

            format:"a4",

            orientation:"portrait"

        },

        pagebreak:{

            mode:["css","avoid-all"]

        }

    };



    await html2pdf()

        .set(options)

        .from(pdf)

        .save();



    finishPDF();

}
/* ==========================================
   ABSCHLUSS
========================================== */

function finishPDF(){

    setTimeout(()=>{

        window.location.href="index.html";

    },500);

}
