/* ==========================================================
   trotzdem.wahr
   PDF Workbook
   pdf.js
   Teil 1
========================================================== */

/* ==========================================================
   PDF
========================================================== */

const PDF = {

    data: {},

    pages: {},

    settings: {

        filename: "Zurück-zu-dir_Workbook.pdf",

        background: "#F7F4EF",

        pageFormat: "a4",

        orientation: "portrait"

    }

};



/* ==========================================================
   DATEN LADEN
========================================================== */

PDF.loadData = function () {

    try {

        this.data = JSON.parse(

            localStorage.getItem("trotzdem-wahr-workbook-v5")

        ) || {};

    }

    catch {

        this.data = {};

    }

};



/* ==========================================================
   SEITEN SAMMELN
========================================================== */

PDF.collectPages = function () {

    this.pages = {

        cover: document.getElementById("coverPage"),

        welcome: document.getElementById("welcomePage"),

        chapter1: document.getElementById("chapter1"),

        chapter2: document.getElementById("chapter2"),

        chapter3: document.getElementById("chapter3"),

        chapter4: document.getElementById("chapter4"),

        chapter5: document.getElementById("chapter5"),

        chapter6: document.getElementById("chapter6"),

        final: document.getElementById("finalPage")

    };

};



/* ==========================================================
   SCHRIFTGRÖSSE
========================================================== */

PDF.fontSize = function (text = "") {

    const length = text.trim().length;

    if (length < 220) return "size-1";

    if (length < 450) return "size-2";

    if (length < 700) return "size-3";

    if (length < 1000) return "size-4";

    return "size-5";

};



/* ==========================================================
   ANTWORTFELD
========================================================== */

PDF.answer = function (text = "", minHeight = 18) {

    return `

        <div
            class="answer ${this.fontSize(text)}"
            style="min-height:${minHeight}mm;">

            ${text && text.trim() ? text : "…"}

        </div>

    `;

};



/* ==========================================================
   CHIPS
========================================================== */

PDF.createChips = function (items) {

    if (!Array.isArray(items) || items.length === 0) {

        return `<div class="answer"></div>`;

    }

    return `

        <div class="chips">

            ${items.map(item => `

                <span class="chip selected">

                    ${item}

                </span>

            `).join("")}

        </div>

    `;

};



/* ==========================================================
   HEADER
========================================================== */

PDF.createHeader = function (page) {

    return `

        <header class="page-header">

            <div class="logo">

                trotzdem.wahr

            </div>

            <div class="page-number">

                Seite ${page}

            </div>

        </header>

    `;

};



/* ==========================================================
   FOOTER
========================================================== */

PDF.createFooter = function () {

    return "";

};



/* ==========================================================
   STANDARDKARTE
========================================================== */

PDF.createCard = function (title, content) {

    return `

        <section class="card full">

            <h3 class="card-title">

                ${title}

            </h3>

            ${content}

        </section>

    `;

};



/* ==========================================================
   PSYCHOLOGIE
========================================================== */

PDF.createPsychology = function (text) {

    return `

        <section class="psychology full">

            <div class="psychology-icon">

                🧠

            </div>

            <div class="psychology-content">

                <h3 class="mb-2">

                    Ein Blick in die Psychologie

                </h3>

                <p>

                    ${text}

                </p>

            </div>

        </section>

    `;

};



/* ==========================================================
   FÜR HEUTE
========================================================== */

PDF.createTakeaway = function (text) {

    return `

        <section class="takeaway full">

            <h3>

                Für heute

            </h3>

            <p>

                ${text}

            </p>

        </section>

    `;

};
/* ==========================================================
   COVER
========================================================== */

PDF.renderCover = function () {

    this.pages.cover.innerHTML = `

        <div class="cover-content">

            <div class="cover-logo">

                trotzdem.wahr

            </div>

            <div class="cover-title">

                Zurück<br>
                zu dir.

            </div>

            <p class="cover-subtitle">

                Ein Workbook für Selbstreflexion<br>
                und neue Perspektiven

            </p>

            <div class="cover-footer">

                trotzdem.wahr

            </div>

        </div>

    `;

};



/* ==========================================================
   WILLKOMMEN
========================================================== */

PDF.renderWelcome = function () {

    this.pages.welcome.innerHTML = `

        ${this.createHeader(2)}

        <section class="chapter-header full">

            <div class="chapter-number">

                ♥

            </div>

            <h1 class="chapter-title">

                Willkommen

            </h1>

            <p class="quote">

                Schön, dass du heute hier bist.

            </p>

        </section>

        ${this.createCard(

            "Bevor du beginnst",

            `

            <p>

                Dieses Workbook soll dich dabei unterstützen,
                dir selbst mit mehr Verständnis,
                Neugier und Mitgefühl zu begegnen.

            </p>

            <p class="mt-2">

                Es geht nicht darum,
                möglichst perfekte Antworten zu finden.

                Viel wichtiger ist,

                dass deine Antworten ehrlich sind.

            </p>

            <p class="mt-2">

                Manche Fragen lassen sich sofort beantworten.

                Andere brauchen Zeit.

                Beides ist vollkommen in Ordnung.

            </p>

            <p class="mt-2">

                Du entscheidest jederzeit selbst,

                welche Fragen du beantworten möchtest.

                Dieses Workbook gehört nur dir.

            </p>

            `

        )}

        ${this.createPsychology(

            `Unser Gehirn verarbeitet neue Erfahrungen besonders gut,
            wenn wir uns sicher fühlen.
            Deshalb gibt es in diesem Workbook
            kein Richtig und kein Falsch –
            sondern Raum für deine eigenen Gedanken.`

        )}

        ${this.createTakeaway(

            `Du musst heute nichts leisten.
            Es reicht vollkommen,
            einfach neugierig auf dich selbst zu sein.`

        )}

        ${this.createFooter(2)}

    `;

};
/* ==========================================================
   KAPITEL 1
   ANKOMMEN
========================================================== */

PDF.renderChapter1 = function () {

    this.pages.chapter1.innerHTML = `

        ${this.createHeader(3)}

        <section class="chapter-header full">

            <div class="chapter-number">

                01

            </div>

            <h1 class="chapter-title">

                Ankommen

            </h1>

            <p class="quote">

                „Du musst heute nichts leisten.“

            </p>

        </section>

        ${this.createCard(

            "Schön, dass du da bist.",

            `

            <p>

                Wenn wir beginnen, uns selbst besser kennenzulernen,
                entsteht oft der Wunsch,
                möglichst schnell Antworten
                auf unsere Fragen zu finden.

            </p>

            <p class="mt-2">

                Doch Selbstreflexion ist kein Test
                und keine Prüfung.

                Sie beginnt mit Aufmerksamkeit –
                nicht mit Perfektion.

            </p>

            <p class="mt-2">

                Deshalb musst du heute nichts erreichen.

                Nimm dir Zeit,
                lies die Inhalte
                in deinem Tempo
                und beantworte nur das,
                was sich für dich richtig anfühlt.

            </p>

            `

        )}

        <section class="columns full">

            <article class="card">

                <h3>

                    Welche Gefühle begleiten dich im Moment?

                </h3>

                ${this.createChips(

                    this.data.feelings

                )}

            </article>

            <article class="card">

                <h3>

                    Welche Gedanken kennst du von dir?

                </h3>

                ${this.createChips(

                    this.data.thoughts

                )}

            </article>

        </section>

        ${this.createCard(

            "Freiraum",

            `

            <p>

                Was kostet dich im Moment am meisten Kraft?

            </p>

            ${this.answer(

                this.data.energy,

               22

            )}

            `

        )}

        ${this.createPsychology(

            `Unser Gehirn verarbeitet Informationen besonders gut,
            wenn wir uns sicher fühlen.
            Unter Druck arbeitet es stärker im Überlebensmodus,
            während ruhige Momente bewusste Reflexion ermöglichen.

            Deshalb entstehen viele wichtige Erkenntnisse
            nicht dann,
            wenn wir uns zwingen,
            sondern wenn wir uns erlauben,
            ehrlich hinzuschauen.`

        )}

        ${this.createTakeaway(

            `Es gibt heute kein richtig oder falsch.
            Du musst niemandem etwas beweisen.
            Dieses Workbook gehört nur dir.`

        )}

        ${this.createFooter(3)}

    `;

};
/* ==========================================================
   KAPITEL 2
   WER BIN ICH GEWORDEN?
========================================================== */

PDF.renderChapter2 = function () {

    this.pages.chapter2.innerHTML = `

        ${this.createHeader(4)}

        <section class="chapter-header full">

            <div class="chapter-number">

                02

            </div>

            <h1 class="chapter-title">

                Wer bin ich geworden?

            </h1>

            <p class="quote">

                „Manchmal hilft ein Blick zurück,
                um sich heute besser zu verstehen.“

            </p>

        </section>

        ${this.createCard(

            "Ein Blick auf dich",

            `

            <p>

                Unser Selbstbild verändert sich
                im Laufe des Lebens.

                Erfahrungen,
                Beziehungen
                und Herausforderungen
                hinterlassen Spuren.

                Manche davon stärken uns,
                andere lassen uns
                an uns selbst zweifeln.

            </p>

            <p class="mt-2">

                Diese Fragen laden dich dazu ein,

                dich mit deinem früheren
                und heutigen Ich auseinanderzusetzen –

                ohne Bewertung,

                sondern mit Neugier.

            </p>

            `

        )}

        ${this.createCard(

            "Früher",

            `

            <p>

                Was mochtest du früher
                besonders an dir?

            </p>

            ${this.answer(

                this.data.pastSelf,

                18

            )}

            `

        )}

        ${this.createCard(

            "Heute",

            `

            <p>

                Was magst du heute an dir?

            </p>

            ${this.answer(

                this.data.presentSelf,

                18

            )}

            `

        )}

        ${this.createCard(

            "Veränderung",

            `

            <p>

                Was ist der größte Unterschied
                zwischen damals und heute?

            </p>

            ${this.answer(

                this.data.changeReflection,

                18

            )}

            `

        )}

        ${this.createPsychology(

            `Unser Selbstbild entsteht nicht über Nacht.
            Es entwickelt sich aus Erfahrungen,
            Beziehungen und den Geschichten,
            die wir über uns selbst erzählen.

            Manchmal übernehmen wir Bewertungen anderer,
            obwohl sie längst nicht mehr zu uns passen.

            Sich diese bewusst zu machen,
            kann helfen,
            den Blick auf sich selbst
            wieder liebevoller werden zu lassen.`

        )}

        ${this.createTakeaway(

            `Du bist nicht nur die Summe deiner Erfahrungen.

            Du darfst dich verändern,
            weiterentwickeln
            und dich immer wieder neu kennenlernen.`

        )}

        ${this.createFooter(4)}

    `;

};
/* ==========================================================
   KAPITEL 3
   VERSTEHEN
========================================================== */

PDF.renderChapter3 = function () {

    this.pages.chapter3.innerHTML = `

        ${this.createHeader(5)}

        <section class="chapter-header full">

            <div class="chapter-number">

                03

            </div>

            <h1 class="chapter-title">

                Verstehen

            </h1>

            <p class="quote">

                „Verstehen verändert den Blick –
                nicht die Vergangenheit.“

            </p>

        </section>

        ${this.createCard(

            "Warum reagieren wir manchmal automatisch?",

            `

            <p>

                Unser Gehirn versucht ständig,
                Situationen möglichst schnell einzuordnen.

                Deshalb greifen wir häufig
                auf bekannte Muster zurück,
                ohne bewusst darüber nachzudenken.

            </p>

            <p class="mt-2">

                Diese Reaktionen sind nicht falsch.

                Sie haben meist einmal
                einen wichtigen Zweck erfüllt.

                Erst wenn wir sie erkennen,

                können wir entscheiden,

                ob sie uns heute noch helfen.

            </p>

            `

        )}

        <section class="columns full">

            <article class="card">

                <h3>

                    Stressreaktion

                </h3>

                <p class="mb-2">

                    Wie reagierst du meistens,
                    wenn dich etwas belastet?

                </p>

                ${this.createChips(

                    [this.data.stress]

                )}

            </article>

            <article class="card">

                <h3>

                    Wiederkehrende Muster

                </h3>

                <p class="mb-2">

                    Welche Aussagen
                    treffen auf dich zu?

                </p>

                ${this.createChips(

                    this.data.patterns

                )}

            </article>

        </section>

        ${this.createCard(

            "Rückblick",

            `

            <p>

                Gab es eine Situation,
                in der du dich selbst
                überrascht hast?

            </p>

            ${this.answer(

                this.data.reflection,

                18

            )}

            `

        )}

        ${this.createPsychology(

            `Viele unserer Reaktionen entstehen,
            bevor wir bewusst darüber nachdenken können.

            Das Gehirn vergleicht neue Situationen
            mit früheren Erfahrungen
            und entscheidet innerhalb von Sekundenbruchteilen,
            welche Reaktion sinnvoll erscheint.`

        )}

        ${this.createTakeaway(

            `Verstehen bedeutet nicht,
            alles sofort verändern zu müssen.

            Oft beginnt Entwicklung bereits dort,
            wo wir unsere eigenen Muster
            neugierig statt wertend betrachten.`

        )}

        ${this.createFooter(5)}

    `;

};
/* ==========================================================
   KAPITEL 4
   ERKENNEN
========================================================== */

PDF.renderChapter4 = function () {

    this.pages.chapter4.innerHTML = `

        ${this.createHeader(6)}

        <section class="chapter-header full">

            <div class="chapter-number">

                04

            </div>

            <h1 class="chapter-title">

                Erkennen

            </h1>

            <p class="quote">

                „Nicht alles, was sich vertraut anfühlt,
                tut uns gut.“

            </p>

        </section>

        ${this.createCard(

            "Warnsignale erkennen",

            `

            <p>

                Manche Verhaltensweisen wirken
                auf den ersten Blick harmlos
                oder werden sogar als Fürsorge verstanden.

            </p>

            <p class="mt-2">

                Erst mit etwas Abstand erkennen wir,

                wie sehr sie unser Selbstwertgefühl
                oder unsere Freiheit
                beeinflusst haben.

            </p>

            <p class="mt-2">

                Dieses Kapitel soll dir helfen,

                typische Warnsignale
                besser einzuordnen –

                ohne Menschen vorschnell zu bewerten,

                sondern mit einem bewussteren Blick
                auf Beziehungen.

            </p>

            `

        )}

        <section class="columns full">

            <article class="card">

                <h3>

                    Erfahrungen

                </h3>

                <p class="mb-2">

                    Welche Aussagen
                    kommen dir bekannt vor?

                </p>

                ${this.createChips(

                    this.data.relationshipExperiences

                )}

            </article>

            <article class="card">

                <h3>

                    Warnsignale

                </h3>

                <p class="mb-2">

                    Welche Verhaltensweisen
                    empfindest du grundsätzlich
                    als Warnsignal?

                </p>

                ${this.createChips(

                    this.data.warningSigns

                )}

            </article>

        </section>

        ${this.createCard(

            "Gedanken",

            `

            <p>

                Welche Gedanken möchtest du
                zu diesem Thema festhalten?

            </p>

            ${this.answer(

                this.data.realisation,

                18
            )}

            `

        )}

        ${this.createPsychology(

            `Manipulation beginnt nur selten plötzlich.

            Häufig entwickelt sie sich schrittweise
            durch Kontrolle,
            Schuldgefühle,
            Abwertung
            oder das ständige Infragestellen
            der eigenen Wahrnehmung.

            Je früher wir solche Muster erkennen,
            desto leichter fällt es,
            unsere Grenzen ernst zu nehmen.`

        )}

        ${this.createTakeaway(

            `Deiner Wahrnehmung zu vertrauen
            ist kein Zeichen von Misstrauen,
            sondern von Selbstfürsorge.`

        )}

        ${this.createFooter(6)}

    `;

};
/* ==========================================================
   KAPITEL 5
   STÄRKEN
========================================================== */

PDF.renderChapter5 = function () {

    this.pages.chapter5.innerHTML = `

        ${this.createHeader(7)}

        <section class="chapter-header full">

            <div class="chapter-number">

                05

            </div>

            <h1 class="chapter-title">

                Stärken

            </h1>

            <p class="quote">

                „Du bist mehr als deine schwierigsten Tage.“

            </p>

        </section>

        ${this.createCard(

            "Deine Ressourcen",

            `

            <p>

                Oft fällt uns zuerst auf,
                was uns fehlt oder belastet.

                Dabei übersehen wir leicht,
                wie viele Fähigkeiten,
                Erfahrungen und Menschen
                uns bereits tragen.

            </p>

            <p class="mt-2">

                Stärke bedeutet nicht,
                immer stark sein zu müssen.

                Manchmal zeigt sie sich darin,
                Hilfe anzunehmen,
                Grenzen zu setzen
                oder freundlich
                mit sich selbst zu sein.

            </p>

            `

        )}

        <section class="columns full">

            <article class="card">

                <h3>

                    Kraftquellen

                </h3>

                <p class="mb-2">

                    Was gibt dir
                    im Alltag Kraft?

                </p>

                ${this.createChips(

                    this.data.resources

                )}

            </article>

            <article class="card">

                <h3>

                    Deine Stärken

                </h3>

                <p class="mb-2">

                    Welche Eigenschaften
                    erkennst du bei dir?

                </p>

                ${this.createChips(

                    this.data.strengths

                )}

            </article>

        </section>

        ${this.createCard(

            "Heute bin ich stolz auf...",

            `

            <p>

                Worauf bist du heute stolz –

                auch wenn es
                nur eine Kleinigkeit ist?

            </p>

            ${this.answer(

                this.data.gratitude,

                18

            )}

            `

        )}

        ${this.createPsychology(

            `Resilienz beschreibt die Fähigkeit,
            schwierige Erfahrungen zu bewältigen
            und sich nach Belastungen
            wieder zu stabilisieren.

            Sie ist keine angeborene Eigenschaft,
            sondern entwickelt sich
            durch Erfahrungen,
            Beziehungen
            und viele kleine Schritte
            im Alltag.`

        )}

        ${this.createTakeaway(

            `Du musst nicht perfekt sein,
            um wertvoll zu sein.

            Jeder kleine Schritt,
            den du heute gehst,
            zählt.`

        )}

        ${this.createFooter(7)}

    `;

};
/* ==========================================================
   KAPITEL 6
   WEITERGEHEN
========================================================== */

PDF.renderChapter6 = function () {

    this.pages.chapter6.innerHTML = `

        ${this.createHeader(8)}

        <section class="chapter-header full">

            <div class="chapter-number">

                06

            </div>

            <h1 class="chapter-title">

                Weitergehen

            </h1>

            <p class="quote">

                „Jeder kleine Schritt zählt.“

            </p>

        </section>

        ${this.createCard(

            "Dein nächster Schritt",

            `

            <p>

                Dieses Workbook endet hier,

                dein Weg jedoch nicht.

                Veränderungen entstehen selten

                über Nacht,

                sondern durch viele kleine Entscheidungen,

                die wir immer wieder treffen.

            </p>

            <p class="mt-2">

                Nimm dir einen Moment Zeit

                und halte fest,

                was du aus diesem Workbook

                für dich mitnehmen möchtest.

            </p>

            `

        )}

        <section class="columns full">

            <article class="card">

                <h3>

                    Was möchtest du

                    aus diesem Workbook

                    mitnehmen?

                </h3>

                ${this.createChips(

                    this.data.takeaway

                )}

            </article>

            <article class="card">

                <h3>

                    Unterstützung

                </h3>

                <p class="mb-2">

                    Wer oder was

                    kann dich

                    auf deinem Weg

                    unterstützen?

                </p>

                ${this.createChips(

                    this.data.support

                )}

            </article>

        </section>

        ${this.createCard(

            "Meine wichtigste Erkenntnis",

            `

            ${this.answer(

                this.data.insight,

               20

            )}

            `

        )}

        ${this.createCard(

            "Mein nächster Schritt",

            `

            ${this.answer(

                this.data.nextStep,

               20

            )}

            `

        )}

        ${this.createCard(

            "An mein zukünftiges Ich",

            `

            ${this.answer(

                this.data.futureMessage,

                20

            )}

            `

        )}

        ${this.createPsychology(

            `Nachhaltige Veränderungen entstehen
            selten durch einen einzigen großen Moment.

            Viel häufiger entwickeln sie sich
            durch viele kleine Entscheidungen,
            die wir immer wieder treffen.`

        )}

        ${this.createTakeaway(

            `Du musst nicht alle Antworten kennen.

            Es reicht,

            wenn du bereit bist,

            den nächsten kleinen Schritt
            zu gehen.`

        )}

        ${this.createFooter(8)}

    `;

};
/* ==========================================================
   ABSCHLUSSSEITE
========================================================== */

PDF.renderFinalPage = function () {

    this.pages.final.innerHTML = `

        ${this.createHeader(9)}

        <section class="full center">

            <h1>

                Danke,

                dass du dir

                Zeit genommen hast.

            </h1>

        </section>

    

        ${this.createTakeaway(

            `Heilung bedeutet nicht,
            nie wieder zu fallen.

            Heilung bedeutet,

            dich immer wieder
            für dich selbst
            zu entscheiden.`

        )}

        <section class="full center mt-4">

            <p class="final-quote">

                „Du bist mehr

                als das,

                was dir passiert ist.“

            </p>

        </section>

        ${this.createFooter(9)}

    `;

};



/* ==========================================================
   ALLE SEITEN RENDERN
========================================================== */

PDF.render = function () {

    this.renderCover();

    this.renderWelcome();

    this.renderChapter1();

    this.renderChapter2();

    this.renderChapter3();

    this.renderChapter4();

    this.renderChapter5();

    this.renderChapter6();

    this.renderFinalPage();

};
/* ==========================================================
   PDF EXPORT
========================================================== */

PDF.export = function () {

    const documentElement = document.getElementById(

        "pdfDocument"

    );

    const options = {

        margin: 0,

        filename: this.settings.filename,

        image: {

            type: "jpeg",

            quality: 1

        },

        html2canvas: {

            scale: 3,

            useCORS: true,

            backgroundColor: this.settings.background,

            scrollX: 0,

            scrollY: 0,

            windowWidth: document.documentElement.scrollWidth,

            windowHeight: document.documentElement.scrollHeight

        },

        jsPDF: {

            unit: "mm",

            format: this.settings.pageFormat,

            orientation: this.settings.orientation,

            compress: true

        },

        pagebreak: {

            mode: [

                "css",

                "legacy"

            ]

        }

    };

    html2pdf()

        .set(options)

        .from(documentElement)

        .save();

};



/* ==========================================================
   EVENTS
========================================================== */

PDF.bindEvents = function () {

    const button = document.getElementById(

        "downloadPdf"

    );

    if (!button) return;

    button.addEventListener(

        "click",

        () => {

            this.export();

        }

    );

};



/* ==========================================================
   INITIALISIERUNG
========================================================== */

PDF.init = function () {

    this.loadData();

    this.collectPages();

    this.render();

    this.bindEvents();

};



/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        PDF.init();

    }

);
