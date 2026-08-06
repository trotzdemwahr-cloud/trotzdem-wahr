/* ==========================================================
   trotzdem.wahr
   PDF Workbook
========================================================== */


/* ==========================================================
   KONSTANTEN
========================================================== */

const STORAGE_KEY = "trotzdem-wahr-workbook-v5";

const TOTAL_STEPS = 6;

const PDF_WIDTH = 210;

const PDF_HEIGHT = 297;


/* ==========================================================
   STATUS
========================================================== */

let workbookData = {};


/* ==========================================================
   DOM
========================================================== */

const pdfDocument =
    document.getElementById("pdfDocument");


/* ==========================================================
   DATEN LADEN
========================================================== */

function loadWorkbook(){

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if(!saved){

        workbookData = {};

        return;

    }

    try{

        const parsed = JSON.parse(saved);

        workbookData =
            parsed && typeof parsed === "object" ? parsed : {};

    }catch(error){

        console.warn("Workbook-Daten konnten nicht gelesen werden.",error);

        workbookData = {};

    }

}


/* ==========================================================
   DATEN LESEN
========================================================== */

function getValue(key){

    return workbookData[key] || "";

}


function getArray(key){

    const value = workbookData[key];

    if(Array.isArray(value)){

        return value;

    }

    if(value){

        return [value];

    }

    return [];

}


/* ==========================================================
   TEXT SICHER AUSGEBEN
========================================================== */

function escapeHTML(text){

    if(text === null || text === undefined){

        return "";

    }

    return String(text)

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}

function hasOverflow(el){

    const tolerance = 1;

    return el.scrollHeight > el.clientHeight + tolerance ||
        el.scrollWidth > el.clientWidth + tolerance;

}


function fitTextToBox(el, minPx = 5, stepPx = 0.2){

    if(!el || !el.clientHeight || !el.clientWidth){

        return;

    }

    if(!el.dataset.baseFontSize){

        el.dataset.baseFontSize =
            window.getComputedStyle(el).fontSize;

    }

    const originalPx =
        parseFloat(el.dataset.baseFontSize);

    if(Number.isNaN(originalPx)){

        return;

    }

    el.style.fontSize = `${originalPx}px`;

    let current = originalPx;

    while(hasOverflow(el) && current > minPx){

        current = Math.max(minPx,current - stepPx);

        el.style.fontSize = `${current}px`;

    }

}


function fitAnswerBox(box){

    const content =
        box.querySelector(":scope > .answer, :scope > .chips");

    if(!content){

        return;

    }

    /*
       Antworten dürfen bis auf 5,5 px verkleinert werden. Dadurch bleiben
       auch längere Workbook-Eingaben vollständig auf derselben A4-Seite.
    */
    fitTextToBox(content,5.5,0.15);

}


function fitPageTexts(page){

    const selectors = [
        ".chapter-heading",
        ".chapter-quote",
        ".intro-card h2",
        ".intro-card p",
        ".pdf-card h3",
        ".pdf-card label",
        ".psychology-badge",
        ".psychology-card p",
        ".takeaway-title",
        ".takeaway-text",
        ".footer-left",
        ".footer-center",
        ".footer-right"
    ];

    selectors.forEach(selector => {

        page.querySelectorAll(selector).forEach(el =>
            fitTextToBox(el)
        );

    });

    page.querySelectorAll(".answer-box").forEach(fitAnswerBox);

}

function fitAllPages(){
    document.querySelectorAll(".pdf-page").forEach(page => fitPageTexts(page));
}
/* ==========================================================
   LEERER PLATZHALTER
========================================================== */

function placeholder(){

    return `

<div class="answer empty">

    Keine Antwort vorhanden.

</div>

`;

}


/* ==========================================================
   TEXTBOX
========================================================== */

function textAnswer(value){

    if(!value){
        return placeholder();
    }

    return `

<div class="answer">

    ${escapeHTML(value)}

</div>

`;
}


/* ==========================================================
   CHIPS
========================================================== */

function chips(values){

    if(!values.length){

        return placeholder();

    }

    return `

<div class="chips">

    ${values.map(item => `

        <span class="chip">

            ${escapeHTML(item)}

        </span>

    `).join("")}

</div>

`;

}


/* ==========================================================
   RADIO CHIP
========================================================== */

function radioChip(value){

    if(!value){

        return placeholder();

    }

    return `

<div class="chips">

    <span class="chip radio">

        ${escapeHTML(value)}

    </span>

</div>

`;

}

/* ==========================================================
   HEADER
========================================================== */

function createHeader(step){

    const progress = (step / TOTAL_STEPS) * 100;

    return `

<div class="pdf-header">

    <div class="pdf-logo">

        trotzdem.wahr

    </div>

    <div class="pdf-progress">

        <div class="pdf-progress-text">

            Kapitel ${step} von ${TOTAL_STEPS}

        </div>

        <div class="pdf-progress-track">

            <div
                class="pdf-progress-fill"
                style="width:${progress}%">

            </div>

        </div>

    </div>

</div>

`;

}


/* ==========================================================
   TITEL
========================================================== */

function createTitle(number,title,quote){

    return `

<section class="pdf-title">

    <div class="chapter-number">

        Kapitel ${number}

    </div>

    <h1 class="chapter-heading">

        ${title}

    </h1>

    <div class="chapter-quote">

        ${quote}

    </div>

</section>

`;

}


/* ==========================================================
   EINFÜHRUNG
========================================================== */

function createIntro(title,text){

    return `

<section class="intro-card">

    <h2>

        ${title}

    </h2>

    <p>

        ${escapeHTML(text).replace(/\n/g,"<br>")}

    </p>

</section>

`;
}


/* ==========================================================
   STANDARDKARTE
========================================================== */

function createCard(

    title,

    label,

    content,

    size = "card-medium",

    extraClass = ""

){

    return `

<article class="pdf-card ${size} ${extraClass}">

    <h3>

        ${title}

    </h3>

    <label>

        ${label}

    </label>

    <div class="answer-box">

        ${content}

    </div>

</article>

`;

}


/* ==========================================================
   PSYCHOLOGIE
========================================================== */

function createPsychology(text){

    return `

<section class="psychology-card">

    <div class="psychology-badge">

        Ein Blick in die Psychologie

    </div>

    <p>

        ${escapeHTML(text).replace(/\n/g,"<br>")}

    </p>

</section>

`;

}


/* ==========================================================
   TAKEAWAY
========================================================== */

function createTakeaway(text){

    return `

<section class="takeaway-card">

        <div class="takeaway-title">

            Für heute

        </div>

        <div class="takeaway-text">

            ${escapeHTML(text)}

        </div>

</section>

`;

}


/* ==========================================================
   FOOTER
========================================================== */

function createFooter(page){

    return `

<footer class="pdf-footer">

    <div class="footer-left">

        trotzdem.wahr

    </div>

    <div class="footer-center">

        Workbook

    </div>

    <div class="footer-right">

        Seite ${page} / 8

    </div>

</footer>

`;

}


/* ==========================================================
   SEITENLAYOUT
========================================================== */

function createPage(

    step,

    number,

    title,

    quote,

    intro,

    reflection,

    psychology,

    takeaway,

    page

){

    return `

<div class="pdf-inner">

    ${createHeader(step)}

    <div class="page-top">

        ${createTitle(number,title,quote)}

        ${intro}

    </div>

    <section class="reflection">

        ${reflection}

    </section>

    ${createPsychology(psychology)}

    ${createTakeaway(takeaway)}

    ${createFooter(page)}

</div>

`;

}
/* ==========================================================
   COVER
========================================================== */

function renderCover(){

    document.getElementById("cover").innerHTML = `

<div class="cover-wrapper">

    <div class="cover-logo">

        trotzdem.wahr

    </div>

    <div class="cover-workbook">

        Workbook

    </div>

    <div class="cover-subtitle">

        Ein Ort für Selbstreflexion, Verständnis
        und neue Perspektiven.
        Dieses Workbook begleitet dich Schritt für Schritt
        auf deinem ganz persönlichen Weg.

    </div>

    <div class="cover-quote">

        „Du musst heute nichts leisten.
        Es reicht, dass du hier bist.“

    </div>

    <div class="cover-url">

        www.trotzdem-wahr.de

    </div>

</div>

`;

}


/* ==========================================================
   ABSCHLUSS
========================================================== */

function renderFinal(){

    document.getElementById("final").innerHTML = `

<div class="final-wrapper">

    <div class="final-title">

        Danke.

    </div>

    <div class="final-text">

        Vielleicht hast du heute Antworten gefunden.
        Vielleicht sind neue Fragen entstanden.

        Beides ist in Ordnung.

        Selbstreflexion ist kein Ziel,
        sondern ein Weg.
        Jeder kleine Schritt,
        jede neue Erkenntnis
        und jeder Moment,
        in dem du dir selbst begegnest,
        ist wertvoll.

    </div>

    <div class="final-quote">

        „Du musst deinen Weg nicht perfekt gehen.
        Du musst ihn nur weitergehen.“

    </div>

    <div class="final-thanks">

        Pass gut auf dich auf.

    </div>

    <div class="final-url">

        trotzdem.wahr

    </div>

</div>

`;

}
/* ==========================================================
   KAPITEL 1
   ANKOMMEN
========================================================== */

function renderChapter1(){

    const reflection = `

<div class="layout-arrive">

    <div class="reflection-row">

        <div class="reflection-column">

            ${createCard(
                "Reflexion",
                "Welche Gefühle begleiten dich im Moment?",
                chips(getArray("feelings")),
                "card-small"
            )}

        </div>

        <div class="reflection-column">

            ${createCard(
                "Gedanken",
                "Welche Gedanken kennst du von dir?",
                chips(getArray("thoughts")),
                "card-small"
            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(
            "Freiraum",
            "Was kostet dich im Moment am meisten Kraft?",
            textAnswer(getValue("energy")),
            "card-full"
        )}

    </div>

</div>

`;

    const intro = createIntro(

        "Schön, dass du da bist.",

`Wenn wir beginnen, uns selbst besser kennenzulernen,
entsteht oft der Wunsch, möglichst schnell Antworten
auf unsere Fragen zu finden.

Doch Selbstreflexion ist kein Test und keine Prüfung.
Sie beginnt mit Aufmerksamkeit – nicht mit Perfektion.

Deshalb musst du heute nichts erreichen.
Nimm dir Zeit, lies die Inhalte in deinem Tempo
und beantworte nur das,
was sich für dich richtig anfühlt.`

    );

    document.getElementById("page1").innerHTML = createPage(

        1,

        "01",

        "Ankommen",

        "„Du musst heute nichts leisten.“",

        intro,

        reflection,

`Unser Gehirn verarbeitet Informationen besonders gut,
wenn wir uns sicher fühlen.
Unter Druck arbeitet es stärker im Überlebensmodus,
während ruhige Momente bewusste Reflexion ermöglichen.

Deshalb entstehen viele wichtige Erkenntnisse
nicht dann,
wenn wir uns zwingen,
sondern wenn wir uns erlauben,
ehrlich hinzuschauen.`,

`Es gibt heute kein richtig oder falsch.
Du musst niemandem etwas beweisen.
Dieses Workbook gehört nur dir.`,

        2

    );

}
/* ==========================================================
   KAPITEL 2
   WER BIN ICH GEWORDEN?
========================================================== */

function renderChapter2(){

    const reflection = `

<div class="layout-self">

    <div class="reflection-row">

        <div class="reflection-column">

            ${createCard(
                "Früher",
                "Was mochtest du früher besonders an dir?",
                textAnswer(getValue("pastSelf")),
                "card-small"
            )}

        </div>

        <div class="reflection-column">

            ${createCard(
                "Heute",
                "Was magst du heute an dir?",
                textAnswer(getValue("presentSelf")),
                "card-small"
            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(
            "Veränderung",
            "Was ist der größte Unterschied zwischen damals und heute?",
            textAnswer(getValue("changeReflection")),
            "card-full"
        )}

    </div>

</div>

`;

    const intro = createIntro(

        "Ein Blick auf dich",

`Unser Selbstbild verändert sich im Laufe des Lebens.
Erfahrungen, Beziehungen und Herausforderungen
hinterlassen Spuren.
Manche davon stärken uns,
andere lassen uns an uns selbst zweifeln.

Diese Fragen laden dich dazu ein,
dich mit deinem früheren und heutigen Ich
auseinanderzusetzen –
ohne Bewertung,
sondern mit Neugier.`

    );

    document.getElementById("page2").innerHTML = createPage(

        2,

        "02",

        "Wer bin ich geworden?",

        "„Manchmal hilft ein Blick zurück, um sich heute besser zu verstehen.“",

        intro,

        reflection,

`Unser Selbstbild entsteht nicht über Nacht.
Es entwickelt sich aus Erfahrungen,
Beziehungen und den Geschichten,
die wir über uns selbst erzählen.

Manchmal übernehmen wir Bewertungen anderer,
obwohl sie längst nicht mehr zu uns passen.
Sich diese bewusst zu machen,
kann helfen,
den Blick auf sich selbst wieder liebevoller werden zu lassen.`,

`Du bist nicht nur die Summe deiner Erfahrungen.
Du darfst dich verändern,
weiterentwickeln
und dich immer wieder neu kennenlernen.`,

        3

    );

}

/* ==========================================================
   KAPITEL 3
   VERSTEHEN
========================================================== */

function renderChapter3(){

    const reflection = `

<div class="layout-understand">

    <div class="reflection-row">

        <div class="reflection-column">

            ${createCard(
                "Stressreaktion",
                "Wie reagierst du meistens, wenn dich etwas belastet?",
                radioChip(getValue("stress")),
                "card-small"
            )}

        </div>

        <div class="reflection-column">

            ${createCard(
                "Wiederkehrende Muster",
                "Welche Aussagen treffen auf dich zu?",
                chips(getArray("patterns")),
                "card-small"
            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(
            "Rückblick",
            "Gab es eine Situation, in der du dich selbst überrascht hast?",
            textAnswer(getValue("reflection")),
            "card-full"
        )}

    </div>

</div>

`;

    const intro = createIntro(

        "Warum reagieren wir manchmal automatisch?",

`Unser Gehirn versucht ständig,
Situationen möglichst schnell einzuordnen.
Deshalb greifen wir häufig auf bekannte Muster zurück,
ohne bewusst darüber nachzudenken.

Diese Reaktionen sind nicht falsch.
Sie haben meist einmal einen wichtigen Zweck erfüllt.
Erst wenn wir sie erkennen,
können wir entscheiden,
ob sie uns heute noch helfen.`

    );

    document.getElementById("page3").innerHTML = createPage(

        3,

        "03",

        "Verstehen",

        "„Verstehen verändert den Blick – nicht die Vergangenheit.“",

        intro,

        reflection,

`Viele unserer Reaktionen entstehen,
bevor wir bewusst darüber nachdenken können.
Das Gehirn vergleicht neue Situationen
mit früheren Erfahrungen
und entscheidet innerhalb von Sekundenbruchteilen,
welche Reaktion sinnvoll erscheint.`,

`Verstehen bedeutet nicht,
alles sofort verändern zu müssen.
Oft beginnt Entwicklung bereits dort,
wo wir unsere eigenen Muster
neugierig statt wertend betrachten.`,

        4

    );

}
/* ==========================================================
   KAPITEL 4
   ERKENNEN
========================================================== */

function renderChapter4(){

    const reflection = `

<div class="layout-recognize">

    <div class="reflection-row">

        <div class="reflection-column">

            ${createCard(
                "Erfahrungen",
                "Welche Aussagen kommen dir bekannt vor?",
                chips(getArray("relationshipExperiences")),
                "card-small"
            )}

        </div>

        <div class="reflection-column">

            ${createCard(
                "Warnsignale",
                "Welche Verhaltensweisen empfindest du grundsätzlich als Warnsignal?",
                chips(getArray("warningSigns")),
                "card-small"
            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(
            "Gedanken",
            "Welche Gedanken möchtest du zu diesem Thema festhalten?",
            textAnswer(getValue("realisation")),
            "card-full"
        )}

    </div>

</div>

`;

    const intro = createIntro(

        "Warnsignale erkennen",

`Manche Verhaltensweisen wirken auf den ersten Blick
harmlos oder werden sogar als Fürsorge verstanden.
Erst mit etwas Abstand erkennen wir,
wie sehr sie unser Selbstwertgefühl
oder unsere Freiheit beeinflusst haben.

Dieses Kapitel soll dir dabei helfen,
typische Warnsignale besser einzuordnen –
ohne Menschen vorschnell zu bewerten,
sondern mit einem bewussteren Blick
auf Beziehungen.`

    );

    document.getElementById("page4").innerHTML = createPage(

        4,

        "04",

        "Erkennen",

        "„Nicht alles, was sich vertraut anfühlt, tut uns gut.“",

        intro,

        reflection,

`Manipulation beginnt nur selten plötzlich.
Häufig entwickelt sie sich schrittweise
durch Kontrolle,
Schuldgefühle,
Abwertung oder das ständige Infragestellen
der eigenen Wahrnehmung.

Je früher wir solche Muster erkennen,
desto leichter fällt es,
unsere Grenzen ernst zu nehmen.`,

`Deiner Wahrnehmung zu vertrauen
ist kein Zeichen von Misstrauen,
sondern von Selbstfürsorge.`,

        5

    );

}
/* ==========================================================
   KAPITEL 5
   STÄRKEN
========================================================== */

function renderChapter5(){

    const reflection = `

<div class="layout-strength">

    <div class="reflection-row">

        <div class="reflection-column">

            ${createCard(
                "Kraftquellen",
                "Was gibt dir im Alltag Kraft?",
                chips(getArray("resources")),
                "card-small"
            )}

        </div>

        <div class="reflection-column">

            ${createCard(
                "Deine Stärken",
                "Welche Eigenschaften erkennst du bei dir?",
                chips(getArray("strengths")),
                "card-small"
            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(
            "Heute bin ich stolz auf...",
            "Worauf bist du heute stolz – auch wenn es nur eine Kleinigkeit ist?",
            textAnswer(getValue("gratitude")),
            "card-full"
        )}

    </div>

</div>

`;

    const intro = createIntro(

        "Deine Ressourcen",

`Oft fällt uns zuerst auf,
was uns fehlt oder belastet.
Dabei übersehen wir leicht,
wie viele Fähigkeiten,
Erfahrungen und Menschen uns bereits tragen.

Stärke bedeutet nicht,
immer stark sein zu müssen.
Manchmal zeigt sie sich darin,
Hilfe anzunehmen,
Grenzen zu setzen
oder freundlich mit sich selbst zu sein.`

    );

    document.getElementById("page5").innerHTML = createPage(

        5,

        "05",

        "Stärken",

        "„Du bist mehr als deine schwierigsten Tage.“",

        intro,

        reflection,

`Resilienz beschreibt die Fähigkeit,
schwierige Erfahrungen zu bewältigen
und sich nach Belastungen
wieder zu stabilisieren.

Sie ist keine angeborene Eigenschaft,
sondern entwickelt sich
durch Erfahrungen,
Beziehungen
und viele kleine Schritte
im Alltag.`,

`Du musst nicht perfekt sein,
um wertvoll zu sein.
Jeder kleine Schritt,
den du heute gehst,
zählt.`,

        6

    );

}
/* ==========================================================
   KAPITEL 6
   WEITERGEHEN
========================================================== */

function renderChapter6(){

    const reflection = `

<div class="layout-forward">

    <div class="reflection-row">

        <div class="reflection-column">

            ${createCard(
                "Was möchtest du mitnehmen?",
                "Was möchtest du aus diesem Workbook mitnehmen?",
                chips(getArray("takeaway")),
                "card-small"
            )}

        </div>

        <div class="reflection-column">

            ${createCard(
                "Unterstützung",
                "Wer oder was kann dich auf deinem Weg unterstützen?",
                chips(getArray("support")),
                "card-small"
            )}

        </div>

    </div>

    ${createCard(
        "Meine wichtigste Erkenntnis",
        "Welche Erkenntnis möchtest du aus diesem Workbook mitnehmen?",
        textAnswer(getValue("insight")),
        "",
        "card-insight"
    )}

    ${createCard(
        "Mein nächster Schritt",
        "Welchen kleinen Schritt möchtest du als Nächstes gehen?",
        textAnswer(getValue("nextStep")),
        "",
        "card-next"
    )}

    ${createCard(
        "An mein zukünftiges Ich",
        "Schreibe deinem zukünftigen Ich eine Nachricht.",
        textAnswer(getValue("futureMessage")),
        "",
        "card-future"
    )}

</div>

`;

    const intro = createIntro(

        "Dein nächster Schritt",

`Dieses Workbook endet hier,
dein Weg jedoch nicht.
Veränderungen entstehen selten über Nacht,
sondern durch viele kleine Entscheidungen,
die wir immer wieder treffen.

Nimm dir einen Moment Zeit
und halte fest,
was du aus diesem Workbook
für dich mitnehmen möchtest.`

    );

    document.getElementById("page6").innerHTML = createPage(

        6,

        "06",

        "Weitergehen",

        "„Jeder kleine Schritt zählt.“",

        intro,

        reflection,

`Nachhaltige Veränderungen entstehen
selten durch einen einzigen großen Moment.
Viel häufiger entwickeln sie sich
durch viele kleine Entscheidungen,
die wir immer wieder treffen.`,

`Du musst nicht alle Antworten kennen.
Es reicht,
wenn du bereit bist,
den nächsten kleinen Schritt zu gehen.`,

        7

    );

}
/* ==========================================================
   WORKBOOK RENDERN
========================================================== */

function renderWorkbook(){

    renderCover();

    renderChapter1();

    renderChapter2();

    renderChapter3();

    renderChapter4();

    renderChapter5();

    renderChapter6();

    renderFinal();

}


/* ==========================================================
   KURZ WARTEN
========================================================== */

function wait(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}


/* ==========================================================
   PDF EXPORT
========================================================== */

async function generatePDF(){

    document.body.classList.add("rendering");

    await document.fonts.ready;

    await wait(300);

   fitAllPages();



    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({

        orientation:"portrait",

        unit:"mm",

        format:"a4",

        compress:true

    });

    const pages = document.querySelectorAll(".pdf-page");

    for(let i=0;i<pages.length;i++){

        const canvas = await html2canvas(

            pages[i],

            {

                scale:2,

                useCORS:true,

                backgroundColor:"#F7F4EF",

                logging:false,

                scrollX:0,

                scrollY:0,

                windowWidth:pages[i].scrollWidth,

                windowHeight:pages[i].scrollHeight

            }

        );

        const image = canvas.toDataURL(

            "image/jpeg",

            1

        );

        if(i>0){

            pdf.addPage();

        }

        pdf.addImage(

            image,

            "JPEG",

            0,

            0,

            PDF_WIDTH,

            PDF_HEIGHT,

            "",

            "FAST"

        );

    }

    document.body.classList.remove("rendering");

    pdf.save(

        "trotzdem-wahr-workbook.pdf"

    );

}


/* ==========================================================
   INITIALISIERUNG
========================================================== */

async function init(){

    loadWorkbook();

    renderWorkbook();

    await document.fonts.ready;

    fitAllPages();

    const shouldDownload =
        new URLSearchParams(window.location.search)
            .get("download") === "1";

    if(shouldDownload){

        await generatePDF();

    }

}


/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    init

);
