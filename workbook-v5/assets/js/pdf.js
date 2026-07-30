/* ==========================================================
   trotzdem.wahr
   PDF Workbook
========================================================== */


/* ==========================================================
   KONSTANTEN
========================================================== */

const STORAGE_KEY = "trotzdem-wahr-workbook-v5";

const PDF_WIDTH = 210;

const PDF_HEIGHT = 297;

const TOTAL_STEPS = 6;


/* ==========================================================
   STATUS
========================================================== */

let workbookData = {};

const pdfDocument = document.getElementById("pdfDocument");


/* ==========================================================
   DATEN LADEN
========================================================== */

function loadWorkbook(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){

        workbookData = JSON.parse(saved);

    }else{

        workbookData = {};

    }

}


/* ==========================================================
   HILFSFUNKTIONEN
========================================================== */

function getValue(key){

    return workbookData[key] || "";

}


function getArray(key){

    const value = workbookData[key];

    if(Array.isArray(value)){

        return value;

    }

    return [];

}


function escapeHTML(text){

    if(!text) return "";

    return String(text)

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}


function textOrPlaceholder(text){

    if(!text){

        return '<div class="answer empty">Keine Antwort vorhanden.</div>';

    }

    return `

        <div class="answer">

            ${escapeHTML(text)}

        </div>

    `;

}


function chipList(values){

    if(values.length===0){

        return '<div class="answer empty">Keine Auswahl getroffen.</div>';

    }

    return `

        <div class="chips">

            ${values.map(item=>`

                <span class="chip">

                    ${escapeHTML(item)}

                </span>

            `).join("")}

        </div>

    `;

}


/* ==========================================================
   KOMPONENTEN
========================================================== */

function createHeader(step){

    const percent =

        (step/TOTAL_STEPS)*100;

    return `

<header class="pdf-header">

    <div class="pdf-logo">

        trotzdem.wahr

    </div>

    <div class="pdf-progress">

        <div class="pdf-progress-text">

            Schritt ${step} von ${TOTAL_STEPS}

        </div>

        <div class="pdf-progress-track">

            <div
                class="pdf-progress-fill"
                style="width:${percent}%">

            </div>

        </div>

    </div>

</header>

`;

}


function createTitle(number,title,quote){

    return `

<section class="pdf-title">

    <div class="chapter-number">

        Schritt ${number}

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


function createIntro(title,text){

    return `

<section class="intro-card">

    <h2>

        ${title}

    </h2>

    <p>

        ${text}

    </p>

</section>

`;

}


function createCard(title,label,content){

    return `

<div class="pdf-card">

    <h3>

        ${title}

    </h3>

    <label>

        ${label}

    </label>

    <div class="answer-box">

        ${content}

    </div>

</div>

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

        ${text}

    </p>

</section>

`;

}


/* ==========================================================
   FÜR HEUTE
========================================================== */

function createTakeaway(text){

    return `

<section class="takeaway-card">

    <div class="takeaway-title">

        Für heute

    </div>

    <div class="takeaway-text">

        ${text}

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

        Seite ${page} / 8

    </div>

    <div class="footer-right">

        Workbook

    </div>

</footer>

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

        WORKBOOK

    </div>

    <div class="cover-subtitle">

        Selbstreflexion.<br>
        Verstehen.<br>
        Weitergehen.

    </div>

    <div class="cover-quote">

        „Du musst nicht alles auf einmal verstehen.
        Manchmal reicht der nächste kleine Schritt.“

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

        Dieses Workbook endet hier.

        Vielleicht hast du Antworten gefunden.
        Vielleicht sind neue Fragen entstanden.

        Beides ist in Ordnung.

        Selbstreflexion ist kein Ziel,
        sondern ein Weg.

    </div>

    <div class="final-quote">

        „Du musst nicht perfekt heilen.

        Du darfst Schritt für Schritt
        deinen eigenen Weg gehen.“

    </div>

    <div class="final-thanks">

        Danke,
        dass du dir Zeit
        für dich genommen hast.

    </div>

    <div class="final-url">

        www.trotzdem-wahr.de

    </div>

</div>

`;

}


/* ==========================================================
   SEITE AUFBAUEN
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
    pageNumber

){

    return `

<div class="pdf-inner">

    ${createHeader(step)}

    ${createTitle(number,title,quote)}

    ${intro}

    <section class="reflection">

        ${reflection}

    </section>

    ${createPsychology(psychology)}

    ${createTakeaway(takeaway)}

    ${createFooter(pageNumber)}

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

                "Gefühle",

                "Welche Gefühle begleiten dich im Moment?",

                chipList(

                    getArray("feelings")

                )

            )}

        </div>

        <div class="reflection-column">

            ${createCard(

                "Gedanken",

                "Welche Gedanken kennst du von dir?",

                chipList(

                    getArray("thoughts")

                )

            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(

            "Freiraum",

            "Was kostet dich im Moment am meisten Kraft?",

            textOrPlaceholder(

                getValue("energy")

            )

        )}

    </div>

</div>

`;

    document.getElementById("page1").innerHTML =

        createPage(

            1,

            "01",

            "Ankommen",

            "„Du musst heute nichts leisten.“",

            createIntro(

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

            ),

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
========================================================== */

function renderChapter2(){

    const reflection = `

<div class="layout-self">

    <div class="reflection-row">

        <div class="reflection-column">

            ${createCard(

                "Früher",

                "Was mochtest du früher besonders an dir?",

                textOrPlaceholder(

                    getValue("pastSelf")

                )

            )}

        </div>

        <div class="reflection-column">

            ${createCard(

                "Heute",

                "Was magst du heute an dir?",

                textOrPlaceholder(

                    getValue("presentSelf")

                )

            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(

            "Veränderung",

            "Was ist der größte Unterschied zwischen damals und heute?",

            textOrPlaceholder(

                getValue("changeReflection")

            )

        )}

    </div>

</div>

`;

    document.getElementById("page2").innerHTML =

        createPage(

            2,

            "02",

            "Wer bin ich geworden?",

            "„Manchmal hilft ein Blick zurück, um sich heute besser zu verstehen.“",

            createIntro(

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

            ),

            reflection,

            `Unser Selbstbild entsteht nicht über Nacht.
            Es entwickelt sich aus Erfahrungen,
            Beziehungen und den Geschichten,
            die wir über uns selbst erzählen.

            Manchmal übernehmen wir Bewertungen anderer,
            obwohl sie längst nicht mehr zu uns passen.
            Sich diese bewusst zu machen,
            kann helfen,
            den Blick auf sich selbst
            wieder liebevoller werden zu lassen.`,

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

                chipList(

                    getArray("stress").length
                        ? getArray("stress")
                        : (getValue("stress") ? [getValue("stress")] : [])

                )

            )}

        </div>

        <div class="reflection-column">

            ${createCard(

                "Wiederkehrende Muster",

                "Welche Aussagen treffen auf dich zu?",

                chipList(

                    getArray("patterns")

                )

            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(

            "Rückblick",

            "Gab es eine Situation, in der du dich selbst überrascht hast?",

            textOrPlaceholder(

                getValue("reflection")

            )

        )}

    </div>

</div>

`;

    document.getElementById("page3").innerHTML =

        createPage(

            3,

            "03",

            "Verstehen",

            "„Verstehen verändert den Blick – nicht die Vergangenheit.“",

            createIntro(

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

            ),

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

                chipList(

                    getArray("relationshipExperiences")

                )

            )}

        </div>

        <div class="reflection-column">

            ${createCard(

                "Warnsignale",

                "Welche Verhaltensweisen empfindest du grundsätzlich als Warnsignal?",

                chipList(

                    getArray("warningSigns")

                )

            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(

            "Gedanken",

            "Welche Gedanken möchtest du zu diesem Thema festhalten?",

            textOrPlaceholder(

                getValue("realisation")

            )

        )}

    </div>

</div>

`;

    document.getElementById("page4").innerHTML =

        createPage(

            4,

            "04",

            "Erkennen",

            "„Nicht alles, was sich vertraut anfühlt, tut uns gut.“",

            createIntro(

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

            ),

            reflection,

            `Manipulation beginnt nur selten plötzlich.

            Häufig entwickelt sie sich schrittweise
            durch Kontrolle,
            Schuldgefühle,
            Abwertung
            oder das ständige Infragestellen
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

                chipList(

                    getArray("resources")

                )

            )}

        </div>

        <div class="reflection-column">

            ${createCard(

                "Deine Stärken",

                "Welche Eigenschaften erkennst du bei dir?",

                chipList(

                    getArray("strengths")

                )

            )}

        </div>

    </div>

    <div class="reflection-full">

        ${createCard(

            "Heute bin ich stolz auf...",

            "Worauf bist du heute stolz – auch wenn es nur eine Kleinigkeit ist?",

            textOrPlaceholder(

                getValue("gratitude")

            )

        )}

    </div>

</div>

`;

    document.getElementById("page5").innerHTML =

        createPage(

            5,

            "05",

            "Stärken",

            "„Du bist mehr als deine schwierigsten Tage.“",

            createIntro(

                "Deine Ressourcen",

                `Oft fällt uns zuerst auf,
                was uns fehlt oder belastet.

                Dabei übersehen wir leicht,
                wie viele Fähigkeiten,
                Erfahrungen und Menschen
                uns bereits tragen.

                Stärke bedeutet nicht,
                immer stark sein zu müssen.
                Manchmal zeigt sie sich darin,
                Hilfe anzunehmen,
                Grenzen zu setzen
                oder freundlich mit sich selbst zu sein.`

            ),

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

                "Mitnehmen",

                "Was möchtest du aus diesem Workbook mitnehmen?",

                chipList(

                    getArray("takeaway")

                )

            )}

        </div>

        <div class="reflection-column">

            ${createCard(

                "Unterstützung",

                "Wer oder was kann dich auf deinem Weg unterstützen?",

                chipList(

                    getArray("support")

                )

            )}

        </div>

    </div>

    <div class="card-insight">

        ${createCard(

            "Meine wichtigste Erkenntnis",

            "Welche Erkenntnis möchtest du aus diesem Workbook mitnehmen?",

            textOrPlaceholder(

                getValue("insight")

            )

        )}

    </div>

    <div class="card-next">

        ${createCard(

            "Mein nächster Schritt",

            "Welchen kleinen Schritt möchtest du als Nächstes gehen?",

            textOrPlaceholder(

                getValue("nextStep")

            )

        )}

    </div>

    <div class="card-future">

        ${createCard(

            "An mein zukünftiges Ich",

            "Schreibe deinem zukünftigen Ich eine Nachricht.",

            textOrPlaceholder(

                getValue("futureMessage")

            )

        )}

    </div>

</div>

`;

    document.getElementById("page6").innerHTML =

        createPage(

            6,

            "06",

            "Weitergehen",

            "„Jeder kleine Schritt zählt.“",

            createIntro(

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

            ),

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
   PDF EXPORT
========================================================== */

async function generatePDF(){

    const pages = document.querySelectorAll(".pdf-page");

    const pdf = new jsPDF({

        orientation: "portrait",

        unit: "mm",

        format: "a4",

        compress: true

    });

    for(let i = 0; i < pages.length; i++){

        const canvas = await html2canvas(

            pages[i],

            {

                scale: 2,

                useCORS: true,

                backgroundColor: "#f7f3ee",

                logging: false

            }

        );

        const img = canvas.toDataURL("image/jpeg",1);

        if(i > 0){

            pdf.addPage();

        }

        pdf.addImage(

            img,

            "JPEG",

            0,

            0,

            PDF_WIDTH,

            PDF_HEIGHT

        );

    }

    pdf.save("trotzdem-wahr-workbook.pdf");

}


/* ==========================================================
   INITIALISIERUNG
========================================================== */

function init(){

    loadWorkbook();

    renderWorkbook();

    const button = document.getElementById("downloadPdf");

    if(button){

        button.addEventListener(

            "click",

            generatePDF

        );

    }

}


/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    init

);
