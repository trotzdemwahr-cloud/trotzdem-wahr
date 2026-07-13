/*
=========================================================
trotzdem.wahr
PDF V4
=========================================================
*/


/* =========================================================
   ELEMENTE
========================================================= */

const pdf = document.getElementById("pdf");

const template = document.getElementById("template");



/* =========================================================
   EINSTELLUNGEN
========================================================= */

const STORAGE_KEY = "trotzdemWahrWorkbookV4";

const workbookData = loadWorkbook();



/* =========================================================
   START
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    initialisePDF

);



async function initialisePDF(){

    buildPDF();

    await waitForRender();

    await exportPDF();

}



/* =========================================================
   LOCAL STORAGE
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
   PDF ERSTELLEN
========================================================= */

function buildPDF(){

    renderCover();

    renderIntroduction();

    renderSteps();

    renderEnding();

    addPageNumbers();

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

    const page = createPage();

    page.classList.add("intro-page");

    page.innerHTML = `

        <section class="pdf-card">

            <div class="pdf-badge">

                Willkommen

            </div>

            <h2>

                Schön, dass du da bist.

            </h2>

            <p>

                Vielleicht bist du neugierig auf Psychologie.
                Vielleicht möchtest du dich selbst besser verstehen.
                Vielleicht bist du über trotzdem.wahr hier gelandet.

            </p>

            <p>

                Ganz gleich,
                warum du dieses Workbook geöffnet hast –
                hier geht es nicht um richtige oder falsche Antworten,
                sondern darum,
                dir selbst ehrlich zu begegnen.

            </p>

            <p>

                Nimm dir Zeit,
                beantworte nur das,
                was sich für dich stimmig angefühlt hat
                und nimm dieses Dokument
                als Erinnerung an deine Gedanken mit.

            </p>

        </section>

    `;

    pdf.append(page);

}



/* =========================================================
   SCHRITTE
========================================================= */

function renderSteps(){

    const sections = template.querySelectorAll(".step");

    sections.forEach(section=>{

        renderStep(section);

    });

}

function renderStep(section){

    const page = createPage();

    const clone = section.cloneNode(true);

    replaceFeelingMindmap(clone);

    replaceCheckboxGroups(clone);

    replaceRadioGroups(clone);

    replaceTextareas(clone);

    removeEmptyReflectionCards(clone);

    page.append(clone);

    pdf.append(page);

}



/* =========================================================
   SEITE ERSTELLEN
========================================================= */

function createPage(){

    const page = document.createElement("section");

    page.className = "page";

    return page;

}



/* =========================================================
   ALLE CHECKBOXEN
   (außer feelings)
========================================================= */

function replaceCheckboxGroups(section){

    const groups = section.querySelectorAll(".reflection-group");

    groups.forEach(group=>{

        const checkboxes = [

            ...group.querySelectorAll('input[type="checkbox"]')

        ];

        if(!checkboxes.length){

            return;

        }

        /* feelings wird von der Mindmap übernommen */

        if(checkboxes[0].name==="feelings"){

            return;

        }

        const values = workbookData[checkboxes[0].name] || [];

        if(values.length===0){

            group.remove();

            return;

        }

        const title =

            group.querySelector("label")

                .textContent

                .trim();

        const card = document.createElement("article");

        card.className = "answer-card";

        card.innerHTML = `

            <h3>

                ${escapeHtml(title)}

            </h3>

            <div class="chips">

                ${values.map(value=>`

                    <span class="chip">

                        ${escapeHtml(value)}

                    </span>

                `).join("")}

            </div>

        `;

        group.replaceWith(card);

    });

}



/* =========================================================
   GEFÜHLE ALS MINDMAP
========================================================= */

function replaceFeelingMindmap(section){

    const feelings = workbookData.feelings;

    if(

        !Array.isArray(feelings) ||

        feelings.length===0

    ){

        const empty = section.querySelector(

            'input[name="feelings"]'

        )?.closest(".reflection-group");

        if(empty){

            empty.remove();

        }

        return;

    }

    const group = section.querySelector(

        'input[name="feelings"]'

    )?.closest(".reflection-group");

    if(!group){

        return;

    }

    const card = document.createElement("article");

    card.className = "answer-card";

    card.innerHTML = `

        <h3>

            Welche Gefühle begleiten dich im Moment besonders häufig?

        </h3>

        <div class="mindmap">

            <div class="mindmap__center">

                ICH

            </div>

            ${feelings.map(feeling=>`

                <div class="mindmap__item">

                    ${escapeHtml(feeling)}

                </div>

            `).join("")}

        </div>

    `;

    group.replaceWith(card);

}
/* =========================================================
   RADIO BUTTONS
========================================================= */

function replaceRadioGroups(section){

    const groups = section.querySelectorAll(".reflection-group");

    groups.forEach(group=>{

        const radios = [

            ...group.querySelectorAll(

                'input[type="radio"]'

            )

        ];

        if(!radios.length){

            return;

        }

        const value = workbookData[radios[0].name];

        if(!value){

            group.remove();

            return;

        }

        const title = group
            .querySelector("label")
            .textContent
            .trim();

        const card = document.createElement("article");

        card.className = "answer-card";

        card.innerHTML = `

            <h3>

                ${escapeHtml(title)}

            </h3>

            <p>

                ${escapeHtml(value)}

            </p>

        `;

        group.replaceWith(card);

    });

}



/* =========================================================
   TEXTAREAS
========================================================= */

function replaceTextareas(section){

    const textareas = [

        ...section.querySelectorAll("textarea")

    ];

    textareas.forEach(textarea=>{

        const value = workbookData[textarea.id];

        const group = textarea.closest(".reflection-group");

        if(!group){

            return;

        }

        if(

            !value ||

            value.trim()===""

        ){

            group.remove();

            return;

        }

        const title = group
            .querySelector("label")
            .textContent
            .trim();

        const card = document.createElement("article");

        card.className = "answer-card";

        card.innerHTML = `

            <h3>

                ${escapeHtml(title)}

            </h3>

            <div class="journal">

                ${escapeHtml(value)}

            </div>

        `;

        group.replaceWith(card);

    });

}



/* =========================================================
   LEERE REFLEXIONSKARTEN ENTFERNEN
========================================================= */

function removeEmptyReflectionCards(section){

    section.querySelectorAll(".card--reflection")

        .forEach(card=>{

            if(

                !card.querySelector(".answer-card")

            ){

                card.remove();

            }

        });

}


/* =========================================================
   ABSCHLUSSSEITE
========================================================= */

function renderEnding(){

    const page = createPage();

    page.innerHTML = `

        <section class="ending">

            <h2>

                Danke.

            </h2>

            <p>

                Danke,
                dass du dir Zeit
                für dich genommen hast.

            </p>

            <p>

                Vielleicht wirst du dieses Workbook
                in einigen Monaten noch einmal öffnen.

                Es kann spannend sein,
                welche Antworten du dann gibst
                und welche neuen Gedanken
                entstanden sind.

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
   SEITENNUMMERN
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
   HTML ESCAPEN
========================================================= */

function escapeHtml(text){

    return String(text)

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}



/* =========================================================
   RENDER ABWARTEN
========================================================= */

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

                    ".journal",

                    ".mindmap"

                ]

            }

        })

        .from(pdf)

        .save();

}
