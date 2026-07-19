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
/* ==========================================================
   COVER
========================================================== */

function createCover(){

    return createPage(`

<div class="cover">

    <div class="badge">

        trotzdem.wahr

    </div>

    <h1>

        Zurück zu dir

    </h1>

    <p>

        Dieses Workbook enthält deine persönlichen
        Antworten aus trotzdem.wahr.

        <br><br>

        Nimm dir Zeit,
        lies sie in Ruhe
        und erinnere dich daran:

        <br><br>

        Entwicklung beginnt nicht
        mit Perfektion,
        sondern mit Ehrlichkeit.

    </p>

    <div class="cover-footer">

        trotzdem.wahr

    </div>

</div>

`);

}


/* ==========================================================
   FOREWORD
========================================================== */

function createForeword(){

    return createPage(`

${createHeader(

    "Vorwort",

    "Willkommen",

    "Deine Antworten an einem Ort."

)}

<div class="page-body">

${infoCard(

    "Dein persönliches Workbook",

    `

    Dieses PDF fasst alle Antworten
    zusammen,
    die du während des Workbooks
    festgehalten hast.

    <br><br>

    Es soll dir helfen,
    Zusammenhänge zu erkennen,
    Entwicklungen sichtbar zu machen
    und jederzeit zu deinen Gedanken
    zurückkehren zu können.

    <br><br>

    Alles,
    was du hier liest,
    stammt aus deinen eigenen Antworten.

    `

)}

${createFooter(2)}

</div>

`);

}
/* ==========================================================
   CHAPTER 1
========================================================== */

function createChapter1(){

    return createPage(`

${createHeader(

    "Kapitel 1",

    "Ankommen",

    "Du musst heute nichts leisten."

)}

<div class="page-body">

${infoCard(

    "Schön, dass du da bist.",

    `

    Selbstreflexion beginnt nicht
    mit der perfekten Antwort.

    Sie beginnt damit,
    ehrlich wahrzunehmen,
    was gerade da ist.

    <br><br>

    In diesem ersten Kapitel
    geht es deshalb nicht darum,
    etwas richtig zu machen.

    Sondern darum,
    dir selbst aufmerksam zuzuhören.

    `

)}

${twoColumns(

    chipCard(

        "Welche Gefühle begleiten dich momentan?",

        "feelings"

    ),

    chipCard(

        "Welche Gedanken beschäftigen dich besonders?",

        "thoughts"

    )

)}

${oneColumn(

    answerCard(

        "Was kostet dich im Moment am meisten Kraft?",

        "energy"

    )

)}

${psychologyCard(

    `

    Gefühle wahrzunehmen,
    statt sie zu verdrängen,
    hilft unserem Gehirn,
    Emotionen besser zu regulieren.

    <br><br>

    Bereits das bewusste Benennen
    eines Gefühls kann Stress reduzieren
    und den Blick auf Lösungen öffnen.

    `

)}

${takeawayCard(

    `

    Alles darf da sein.

    Es gibt heute
    kein richtig
    und kein falsch.

    Der erste Schritt
    ist Ehrlichkeit
    mit dir selbst.

    `

)}

${createFooter(3)}

</div>

`);

}
/* ==========================================================
   CHAPTER 2
========================================================== */

function createChapter2(){

    return createPage(`

${createHeader(

    "Kapitel 2",

    "Wer bin ich geworden?",

    "Ein Blick zurück hilft oft, sich heute besser zu verstehen."

)}

<div class="page-body">

${infoCard(

    "Vergangenheit und Gegenwart",

    `

    Jeder Mensch verändert sich.

    Manche Eigenschaften begleiten uns
    ein Leben lang,
    andere entwickeln sich
    durch Erfahrungen.

    <br><br>

    Dieses Kapitel lädt dich ein,
    dein früheres und dein heutiges Ich
    bewusst und ohne Bewertung
    zu betrachten.

    `

)}

${twoColumns(

    answerCard(

        "Was mochtest du früher besonders an dir?",

        "pastSelf"

    ),

    answerCard(

        "Was magst du heute besonders an dir?",

        "presentSelf"

    )

)}

${oneColumn(

    answerCard(

        "Was ist der größte Unterschied zwischen damals und heute?",

        "changeReflection"

    )

)}

${psychologyCard(

    `

    Unser Selbstbild ist nicht fest.

    Erfahrungen,
    Beziehungen
    und neue Herausforderungen
    verändern ständig,
    wie wir uns selbst wahrnehmen.

    <br><br>

    Sich diese Entwicklung bewusst
    anzusehen,
    stärkt die Selbstwahrnehmung
    und das Vertrauen
    in den eigenen Weg.

    `

)}

${takeawayCard(

    `

    Entwicklung bedeutet nicht,
    jemand anderes zu werden.

    Entwicklung bedeutet,
    dich selbst
    immer besser
    kennenzulernen.

    `

)}

${createFooter(4)}

</div>

`);

}
/* ==========================================================
   CHAPTER 3
========================================================== */

function createChapter3(){

    return createPage(`

${createHeader(

    "Kapitel 3",

    "Verstehen",

    "Muster zu erkennen verändert den Blick."

)}

<div class="page-body">

${infoCard(

    "Eigene Reaktionen verstehen",

    `

    Unser Gehirn greift häufig
    auf bekannte Reaktionen zurück.

    Dadurch entstehen Gewohnheiten,
    die uns manchmal helfen,
    manchmal aber auch belasten.

    <br><br>

    Wer seine Muster erkennt,
    kann bewusster entscheiden,
    wie er künftig handeln möchte.

    `

)}

${twoColumns(

    answerCard(

        "Wie reagierst du meistens in belastenden Situationen?",

        "stress"

    ),

    chipCard(

        "Welche Muster erkennst du bei dir?",

        "patterns"

    )

)}

${oneColumn(

    answerCard(

        "Welche Situation ist dir besonders im Gedächtnis geblieben?",

        "reflection"

    )

)}

${psychologyCard(

    `

    Unser Gehirn versucht,
    Energie zu sparen.

    Deshalb laufen viele Reaktionen
    automatisch ab.

    <br><br>

    Erst wenn wir diese Muster
    bewusst erkennen,
    entsteht die Möglichkeit,
    neue Wege auszuprobieren.

    `

)}

${takeawayCard(

    `

    Du musst deine Muster
    nicht verurteilen.

    Es reicht,
    sie wahrzunehmen.

    Denn Bewusstsein
    ist immer
    der erste Schritt
    zur Veränderung.

    `

)}

${createFooter(5)}

</div>

`);

}
/* ==========================================================
   CHAPTER 4
========================================================== */

function createChapter4(){

    return createPage(`

${createHeader(

    "Kapitel 4",

    "Erkennen",

    "Nicht alles, was vertraut ist, tut uns gut."

)}

<div class="page-body">

${infoCard(

    "Warnsignale erkennen",

    `

    Manche Situationen fühlen sich
    zunächst normal an,
    obwohl sie uns langfristig
    nicht guttun.

    <br><br>

    Warnsignale früh wahrzunehmen,
    hilft dabei,
    eigene Grenzen ernst zu nehmen
    und sich selbst besser zu schützen.

    `

)}

${twoColumns(

    chipCard(

        "Welche Erfahrungen kennst du?",

        "relationshipExperiences"

    ),

    chipCard(

        "Welche Warnsignale hast du erkannt?",

        "warningSigns"

    )

)}

${oneColumn(

    answerCard(

        "Welche Gedanken möchtest du dazu festhalten?",

        "realisation"

    )

)}

${psychologyCard(

    `

    Unser Gehirn gewöhnt sich
    erstaunlich schnell
    an wiederkehrende Situationen.

    <br><br>

    Gerade deshalb
    fallen ungesunde Dynamiken
    häufig erst spät auf.

    Wer Warnsignale erkennt,
    kann bewusster entscheiden,
    welche Beziehungen
    und Situationen
    wirklich guttun.

    `

)}

${takeawayCard(

    `

    Deiner Wahrnehmung
    zu vertrauen
    ist ein wichtiger Teil
    von Selbstfürsorge.

    Grenzen zu setzen
    ist kein Zeichen
    von Schwäche.

    `

)}

${createFooter(6)}

</div>

`);

}
/* ==========================================================
   CHAPTER 5
========================================================== */

function createChapter5(){

    return createPage(`

${createHeader(

    "Kapitel 5",

    "Stärken",

    "Du bist mehr als deine schwierigsten Tage."

)}

<div class="page-body">

${infoCard(

    "Deine Ressourcen",

    `

    Häufig sehen wir zuerst,
    was uns fehlt.

    Dabei geraten unsere Fähigkeiten,
    Erfahrungen
    und Stärken
    leicht in den Hintergrund.

    <br><br>

    Dieses Kapitel richtet
    den Blick bewusst
    auf das,
    was dich trägt.

    `

)}

${twoColumns(

    chipCard(

        "Was gibt dir Kraft?",

        "resources"

    ),

    chipCard(

        "Welche Stärken erkennst du bei dir?",

        "strengths"

    )

)}

${oneColumn(

    answerCard(

        "Worauf bist du heute stolz?",

        "gratitude"

    )

)}

${psychologyCard(

    `

    Resilienz bedeutet nicht,
    niemals zu scheitern.

    Sie beschreibt die Fähigkeit,
    nach schwierigen Erfahrungen
    wieder Stabilität zu finden.

    <br><br>

    Wer seine eigenen Ressourcen kennt,
    kann Herausforderungen
    gelassener begegnen.

    `

)}

${takeawayCard(

    `

    Du hast bereits
    viele Situationen gemeistert.

    Erinnere dich daran,
    was dir geholfen hat.

    Deine Stärken
    gehören zu dir.

    `

)}

${createFooter(7)}

</div>

`);

}
/* ==========================================================
   CHAPTER 6
========================================================== */

function createChapter6(){

    return createPage(`

${createHeader(

    "Kapitel 6",

    "Weitergehen",

    "Jeder kleine Schritt zählt."

)}

<div class="page-body">

${infoCard(

    "Ein neuer Blick nach vorne",

    `

    Dieses Workbook endet hier.

    Deine Entwicklung
    geht jedoch weiter.

    <br><br>

    Veränderungen entstehen
    nicht durch einen einzigen Moment,
    sondern durch viele kleine Schritte.

    <br><br>

    Du musst heute
    nicht alles wissen.

    Es reicht,
    den nächsten Schritt
    zu kennen.

    `

)}

${twoColumns(

    chipCard(

        "Das möchte ich mitnehmen",

        "takeaway"

    ),

    chipCard(

        "Das unterstützt mich",

        "support"

    )

)}

${twoColumns(

    answerCard(

        "Meine wichtigste Erkenntnis",

        "insight"

    ),

    answerCard(

        "Mein nächster Schritt",

        "nextStep"

    )

)}

${oneColumn(

    answerCard(

        "Brief an mein zukünftiges Ich",

        "futureMessage"

    )

)}

${psychologyCard(

    `

    Nachhaltige Veränderungen
    entstehen selten
    durch große Entscheidungen.

    <br><br>

    Meist sind es
    viele kleine,
    wiederholte Schritte,
    die langfristig
    den größten Unterschied machen.

    `

)}

${takeawayCard(

    `

    Du musst
    nicht perfekt sein.

    Bleib neugierig,
    bleib ehrlich
    und geh
    Schritt für Schritt
    weiter.

    `

)}

${createFooter(8)}

</div>

`);

}
/* ==========================================================
   ANSWER BOX FIT
========================================================== */

function fitAnswerBoxes(){

    const boxes = document.querySelectorAll(".answer-box");

    boxes.forEach(box=>{

        box.classList.remove(
            "is-small",
            "is-xsmall"
        );

        if(box.scrollHeight <= box.clientHeight){
            return;
        }

        box.classList.add("is-small");

        if(box.scrollHeight <= box.clientHeight){
            return;
        }

        box.classList.remove("is-small");
        box.classList.add("is-xsmall");

    });

}
/* ==========================================================
   PDF EXPORT
========================================================== */

async function exportPdf(){

    const element = document.getElementById("pdf");

    const options = {

        margin: 0,

        filename: "trotzdem-wahr-workbook.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {

            scale: 2,

            useCORS: true,

            backgroundColor: "#FCFAF7",

            scrollX: 0,

            scrollY: 0

        },

        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation: "portrait"

        },

        pagebreak: {

            mode: ["css"]

        }

    };

    await html2pdf()

        .set(options)

        .from(element)

        .save();

}
