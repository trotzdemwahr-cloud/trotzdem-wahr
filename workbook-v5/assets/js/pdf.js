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

    const html =

        createCover() +

        createForeword() +

        createChapter1() +

        createChapter2() +

        createChapter3() +

        createChapter4() +

        createChapter5() +

        createChapter6();

    pdfPages.innerHTML = html;

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

    if(length<=100){

        return "";

    }

    if(length<=180){

        return "text-small";

    }

    if(length<=260){

        return "text-smaller";

    }

    return "text-smallest";

}



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

    return card;

}



function twoColumns(left,right){

    return `

<div class="pdf-grid">

    ${left}

    ${right}

</div>

`;

}



/* ==========================================================
   KARTEN
========================================================== */

function infoCard(title,text){

    return `

<section class="pdf-card">

    <div class="pdf-card__title">

        ${escapeHtml(title)}

    </div>

    <div class="pdf-card__text">

        ${text}

    </div>

</section>

`;

}



function answerCard(title,key){

    const answer = getText(key);

    if(!hasValue(answer)){

        return `

<section class="pdf-card pdf-card--reflection">

    <div class="pdf-card__title">

        ${escapeHtml(title)}

    </div>

    <div class="pdf-card__empty">

        Keine Antwort eingetragen.

    </div>

</section>

`;

    }

    return `

<section class="pdf-card pdf-card--reflection">

    <div class="pdf-card__title">

        ${escapeHtml(title)}

    </div>

    <div class="answer-box ${getFontClass(answer)}">

        ${escapeHtml(answer)}

    </div>

</section>

`;

}



function chipCard(title,key){

    const chips = getArray(key);

    if(!chips.length){

        return `

<section class="pdf-card pdf-card--reflection">

    <div class="pdf-card__title">

        ${escapeHtml(title)}

    </div>

    <div class="pdf-card__empty">

        Keine Auswahl.

    </div>

</section>

`;

    }

    return `

<section class="pdf-card pdf-card--reflection">

    <div class="pdf-card__title">

        ${escapeHtml(title)}

    </div>

    <div class="chip-group">

        ${chips.map(chip=>`

            <span class="chip">

                ${escapeHtml(chip)}

            </span>

        `).join("")}

    </div>

</section>

`;

}



function psychologyCard(text){

    return `

<section class="pdf-card pdf-card--psychology">

    <div class="pdf-badge">

        Ein Blick in die Psychologie

    </div>

    <div class="pdf-card__text">

        ${text}

    </div>

</section>

`;

}



function takeawayCard(text){

    return `

<section class="pdf-card pdf-card--takeaway">

    <div class="pdf-badge">

        Für heute

    </div>

    <div class="pdf-card__text">

        ${text}

    </div>

</section>

`;

}
/* ==========================================================
   COVER
========================================================== */

function createCover(){

    return createPage(`

<div class="cover">

    <h1 class="cover__title">

        Zurück zu dir

    </h1>

    <p class="cover__subtitle">

        Dieses Workbook enthält deine persönlichen
        Antworten aus trotzdem.wahr.

        <br><br>

        Nimm dir Zeit,
        lies sie in Ruhe
        und erinnere dich daran:

        Entwicklung beginnt nicht
        mit Perfektion,
        sondern mit Ehrlichkeit.

    </p>

    <div class="cover__logo">

        trotzdem.wahr

    </div>

</div>

`);

}



/* ==========================================================
   VORWORT
========================================================== */

function createForeword(){

    return createPage(`

${createHeader(

    "Vorwort",

    "Willkommen",

    "Deine Antworten an einem Ort."

)}

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

`);

}



/* ==========================================================
   KAPITEL 1
========================================================== */

function createChapter1(){

    return createPage(`

${createHeader(

    "Kapitel 1",

    "Ankommen",

    "Du musst heute nichts leisten."

)}

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

    Gefühle wahrzunehmen
    aktiviert Bereiche im Gehirn,
    die emotionale Belastung
    besser regulieren können.

    <br><br>

    Allein das Benennen
    eines Gefühls
    kann bereits helfen,
    mehr Abstand zu gewinnen
    und bewusster zu handeln.

    `

)}

${takeawayCard(

    `

    Alles darf da sein.

    Es gibt heute
    kein richtig
    und kein falsch.

    `

)}

${createFooter(3)}

`);

}

/* ==========================================================
   KAPITEL 2
========================================================== */

function createChapter2(){

    return createPage(`

${createHeader(

    "Kapitel 2",

    "Wer bin ich geworden?",

    "Ein Blick zurück hilft oft, sich heute besser zu verstehen."

)}

${infoCard(

    "Vergangenheit und Gegenwart",

    `

    Jeder Mensch verändert sich.

    Manche Eigenschaften begleiten uns
    ein Leben lang,
    andere entwickeln sich erst
    durch Erfahrungen.

    <br><br>

    Dieses Kapitel lädt dich ein,
    dein früheres und dein heutiges Ich
    wertfrei zu betrachten.

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

    Unser Selbstbild verändert sich
    ständig.

    Erfahrungen,
    Beziehungen
    und Herausforderungen
    beeinflussen,
    wie wir über uns denken.

    <br><br>

    Sich diese Entwicklung bewusst
    anzuschauen,
    stärkt die Selbstwahrnehmung.

    `

)}

${takeawayCard(

    `

    Entwicklung bedeutet nicht,
    jemand anderes zu werden.

    Entwicklung bedeutet,
    dich selbst
    immer besser kennenzulernen.

    `

)}

${createFooter(4)}

`);

}



/* ==========================================================
   KAPITEL 3
========================================================== */

function createChapter3(){

    return createPage(`

${createHeader(

    "Kapitel 3",

    "Verstehen",

    "Muster zu erkennen verändert den Blick."

)}

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
    wie er zukünftig handeln möchte.

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

    Deshalb entstehen viele Reaktionen
    automatisch.

    <br><br>

    Erst wenn wir sie bewusst erkennen,
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

    `

)}

${createFooter(5)}

`);

}
/* ==========================================================
   KAPITEL 4
========================================================== */

function createChapter4(){

    return createPage(`

${createHeader(

    "Kapitel 4",

    "Erkennen",

    "Nicht alles, was vertraut ist, tut uns gut."

)}

${infoCard(

    "Warnsignale erkennen",

    `

    Manche Situationen fühlen sich
    zunächst normal an,
    obwohl sie uns langfristig
    nicht guttun.

    <br><br>

    Warnsignale früh zu erkennen,
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

    Gerade deshalb fällt es oft schwer,
    ungesunde Dynamiken
    frühzeitig zu erkennen.

    Bewusstsein ist der erste Schritt
    zu Veränderung.

    `

)}

${takeawayCard(

    `

    Deiner Wahrnehmung
    zu vertrauen
    ist ein wichtiger Teil
    von Selbstfürsorge.

    `

)}

${createFooter(6)}

`);

}



/* ==========================================================
   KAPITEL 5
========================================================== */

function createChapter5(){

    return createPage(`

${createHeader(

    "Kapitel 5",

    "Stärken",

    "Du bist mehr als deine schwierigsten Tage."

)}

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
    auf deine Ressourcen.

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
    niemals zu fallen.

    Sondern immer wieder
    einen Weg zurück
    in die eigene Stabilität
    zu finden.

    <br><br>

    Jede Stärke beginnt
    mit kleinen Erfahrungen.

    `

)}

${takeawayCard(

    `

    Erinnere dich daran,
    wie viel du bereits
    geschafft hast.

    Deine Stärken
    gehören zu dir.

    `

)}

${createFooter(7)}

`);

}



/* ==========================================================
   KAPITEL 6
========================================================== */

function createChapter6(){

    return createPage(`

${createHeader(

    "Kapitel 6",

    "Weitergehen",

    "Jeder kleine Schritt zählt."

)}

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

${takeawayCard(

    `

    Du musst heute
    nicht den ganzen Weg kennen.

    Es reicht,
    den nächsten Schritt
    zu sehen.

    `

)}

${createFooter(8)}

`);

}
/* ==========================================================
   ANTWORTBOXEN ANPASSEN
========================================================== */

function fitAnswerBoxes(){

    const boxes = document.querySelectorAll(".answer-box");

    boxes.forEach(box=>{

        while(

            box.scrollHeight > box.clientHeight

        ){

            if(box.classList.contains("text-smallest")){

                break;

            }

            if(box.classList.contains("text-smaller")){

                box.classList.remove("text-smaller");
                box.classList.add("text-smallest");
                continue;

            }

            if(box.classList.contains("text-small")){

                box.classList.remove("text-small");
                box.classList.add("text-smaller");
                continue;

            }

            box.classList.add("text-small");

        }

    });

}



/* ==========================================================
   PDF EXPORT
========================================================== */

function exportPdf(){

    const element = document.getElementById("pdf");

    const options={

        margin:0,

        filename:"trotzdem-wahr-workbook.pdf",

        image:{
            type:"jpeg",
            quality:1
        },

        html2canvas:{

            scale:2,

            useCORS:true,

            backgroundColor:"#F7F4EF",

            scrollX:0,

            scrollY:0

        },

        jsPDF:{

            unit:"mm",

            format:"a4",

            orientation:"portrait"

        },

        pagebreak:{

            mode:["css","legacy"]

        }

    };

    html2pdf()

        .set(options)

        .from(element)

        .save();

}
