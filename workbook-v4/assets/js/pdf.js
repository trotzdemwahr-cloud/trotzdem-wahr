/*
=========================================================
trotzdem.wahr
PDF V5
=========================================================
*/


/* =========================================================
   ELEMENTE
========================================================= */

const pdf = document.getElementById("pdf");



/* =========================================================
   DATEN
========================================================= */

const STORAGE_KEY = "trotzdemWahrWorkbookV4";

const workbookData = loadWorkbook();



/* =========================================================
   START
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    buildPDF

);



/* =========================================================
   PDF ERSTELLEN
========================================================= */

async function buildPDF(){

    pdf.innerHTML = "";

    renderCover();

    renderIntroduction();

    renderStep1();

    renderStep2();

    renderStep3();

    renderStep4();

    renderStep5();

    renderStep6();

    renderEnding();

    addPageNumbers();

    await waitForRender();

    exportPDF();

}



/* =========================================================
   DATEN LADEN
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
   SEITE
========================================================= */

function createPage(){

    const page = document.createElement("section");

    page.className = "page";

    return page;

}
/* =========================================================
   COVER
========================================================= */

function renderCover(){

    const page = createPage();

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

                    trotzdem<br>wahr

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

    page.innerHTML = `

        <section class="chapter">

            <div class="chapter__step">

                Willkommen

            </div>

            <h1 class="chapter__title">

                Schön, dass du da bist.

            </h1>

        </section>

        <section class="card">

            <p>

                Vielleicht bist du neugierig auf Psychologie.
                Vielleicht möchtest du dich selbst besser verstehen.
                Vielleicht bist du über trotzdem.wahr hier gelandet.

            </p>

            <p>

                Ganz gleich, warum du dieses Workbook geöffnet hast –
                hier geht es nicht um richtige oder falsche Antworten,
                sondern darum, dir selbst ehrlich zu begegnen.

            </p>

            <p>

                Nimm dir Zeit,
                beantworte nur das,
                was sich für dich stimmig anfühlt
                und nimm dieses Dokument
                als Erinnerung
                an deine Gedanken mit.

            </p>

        </section>

    `;

    pdf.append(page);

}
/* =========================================================
   SCHRITT 1
========================================================= */

function renderStep1(){

    const page = createPage();

    page.innerHTML = `

        <section class="chapter">

            <div class="chapter__step">

                Schritt 1

            </div>

            <h1 class="chapter__title">

                Ankommen

            </h1>

            <p class="chapter__quote">

                „Du musst heute nichts leisten.“

            </p>

        </section>



        <section class="card">

            <h3>

                Schön, dass du da bist.

            </h3>

            <p>

                Wenn wir beginnen,
                uns selbst besser kennenzulernen,
                entsteht oft der Wunsch,
                möglichst schnell Antworten
                auf unsere Fragen zu finden.

            </p>

            <p>

                Doch Selbstreflexion ist kein Test
                und keine Prüfung.

                Sie beginnt mit Aufmerksamkeit –
                nicht mit Perfektion.

            </p>

            <p>

                Deshalb musst du heute nichts erreichen.
                Nimm dir Zeit,
                lies die Inhalte in deinem Tempo
                und beantworte nur das,
                was sich für dich richtig anfühlt.

            </p>

        </section>



        <section class="card card--psychology">

            <div class="card__badge">

                Ein Blick in die Psychologie

            </div>

            <p>

                Unser Gehirn verarbeitet Informationen
                besonders gut,
                wenn wir uns sicher fühlen.
                Unter Druck arbeitet es stärker
                im „Überlebensmodus“,
                während ruhige Momente
                bewusste Reflexion ermöglichen.

            </p>

            <p>

                Deshalb entstehen viele wichtige Erkenntnisse
                nicht dann,
                wenn wir uns zwingen,
                sondern wenn wir uns erlauben,
                ehrlich hinzuschauen.

            </p>

        </section>



        <section class="card card--takeaway">

            <div class="card__badge">

                Für dich mitgenommen

            </div>

            <p>

                Es gibt heute kein richtig oder falsch.

                Du musst niemandem etwas beweisen.

                Dieses Workbook gehört nur dir.

            </p>

        </section>

    `;

    pdf.append(page);

}
/* =========================================================
   SCHRITT 2
========================================================= */

function renderStep2(){

    const page = createPage();

    page.innerHTML = `

        <section class="chapter">

            <div class="chapter__step">

                Schritt 2

            </div>

            <h1 class="chapter__title">

                Wahrnehmen

            </h1>

            <p class="chapter__quote">

                „Alles beginnt damit, ehrlich hinzuschauen.“

            </p>

        </section>



        <section class="card">

            <h3>

                Wie geht es dir gerade?

            </h3>

            <p>

                Im Alltag funktionieren wir oft einfach weiter.
                Zwischen Verpflichtungen,
                Gedanken und Routinen
                bleibt nur wenig Raum,
                bewusst wahrzunehmen,
                wie es uns eigentlich geht.

            </p>

            <p>

                Gefühle,
                Gedanken und körperliche Reaktionen
                sind wichtige Hinweise darauf,
                was wir gerade brauchen.
                Sie verdienen Aufmerksamkeit,
                nicht Bewertung.

            </p>

        </section>



        <section class="card card--psychology">

            <div class="card__badge">

                Ein Blick in die Psychologie

            </div>

            <p>

                Gefühle entstehen nicht zufällig.
                Sie helfen unserem Gehirn,
                Situationen einzuordnen
                und auf Bedürfnisse aufmerksam zu machen.

            </p>

            <p>

                Auch unangenehme Gefühle
                erfüllen häufig eine wichtige Aufgabe.
                Sie möchten uns nicht schaden,
                sondern uns Orientierung geben.

            </p>

        </section>

    `;



    /* =====================================================
       REFLEXION
    ====================================================== */

    page.append(

        createFeelingsCard(),

        createCheckboxCard(

            "Welche Gedanken kennst du von dir?",

            workbookData.thoughts

        ),

        createTextareaCard(

            "Was kostet dich im Moment am meisten Kraft?",

            workbookData.energy

        )

    );



    /* =====================================================
       TAKEAWAY
    ====================================================== */

    const takeaway = document.createElement("section");

    takeaway.className = "card card--takeaway";

    takeaway.innerHTML = `

        <div class="card__badge">

            Für dich mitgenommen

        </div>

        <p>

            Gefühle sind weder richtig noch falsch.
            Sie möchten dir etwas zeigen.
            Oft beginnt Veränderung
            nicht mit einer Lösung,
            sondern mit dem Mut,
            ehrlich wahrzunehmen,
            was bereits da ist.

        </p>

    `;

    page.append(takeaway);



    pdf.append(page);

}
/* =========================================================
   GEFÜHLE
========================================================= */

function createFeelingsCard(){

    const card = document.createElement("section");

    card.className = "card card--reflection";

    const feelings = workbookData.feelings || [];

    card.innerHTML = `

        <h3>

            Reflexion

        </h3>

        <div class="answer-card">

            <h4>

                Welche Gefühle begleiten dich im Moment besonders häufig?

            </h4>

            <div class="mindmap">

                <div class="mindmap__row">

                    ${feelings.slice(0,3).map(feeling=>`

                        <div class="mindmap__item">

                            ${feeling}

                        </div>

                    `).join("")}

                </div>

                <div class="mindmap__center">

                    ICH

                </div>

                <div class="mindmap__row">

                    ${feelings.slice(3).map(feeling=>`

                        <div class="mindmap__item">

                            ${feeling}

                        </div>

                    `).join("")}

                </div>

            </div>

        </div>

    `;

    return card;

}



/* =========================================================
   CHECKBOXEN
========================================================= */

function createCheckboxCard(title,values){

    const card = document.createElement("section");

    card.className = "answer-card";

    const items = values || [];

    card.innerHTML = `

        <h4>

            ${title}

        </h4>

        <div class="chips">

            ${items.map(item=>`

                <span class="chip">

                    ${item}

                </span>

            `).join("")}

        </div>

    `;

    return card;

}

/* =========================================================
   RADIO BUTTON
========================================================= */

function createRadioCard(title,value){

    const card = document.createElement("section");

    card.className = "answer-card";

    card.innerHTML = `

        <h4>

            ${title}

        </h4>

        <p>

            ${value || "Keine Antwort eingetragen."}

        </p>

    `;

    return card;

}

/* =========================================================
   TEXTAREA
========================================================= */

function createTextareaCard(title,text){

    const card = document.createElement("section");

    card.className = "answer-card";

    card.innerHTML = `

        <h4>

            ${title}

        </h4>

        <div class="journal">

            ${text || ""}

        </div>

    `;

    return card;

}
/* =========================================================
   SCHRITT 3
========================================================= */

function renderStep3(){

    const page = createPage();

    page.innerHTML = `

        <section class="chapter">

            <div class="chapter__step">

                Schritt 3

            </div>

            <h1 class="chapter__title">

                Verstehen

            </h1>

            <p class="chapter__quote">

                „Verstehen verändert den Blick.“

            </p>

        </section>



        <section class="card">

            <h3>

                Warum reagiere ich manchmal so?

            </h3>

            <p>

                Jeder Mensch entwickelt im Laufe seines Lebens
                Erfahrungen, Gewohnheiten und Strategien.
                Viele davon laufen automatisch ab,
                ohne dass wir sie bewusst wahrnehmen.

            </p>

            <p>

                Deshalb reagieren wir manchmal schneller,
                als wir bewusst darüber nachdenken können.
                Das ist keine Schwäche,
                sondern eine normale Schutzfunktion unseres Gehirns.

            </p>

        </section>



        <section class="card card--psychology">

            <div class="card__badge">

                Ein Blick in die Psychologie

            </div>

            <p>

                Unser Gehirn vergleicht neue Situationen
                ständig mit bereits gemachten Erfahrungen.
                Dadurch kann es blitzschnell reagieren
                und uns schützen.

            </p>

            <p>

                Manche Strategien sind auch heute noch hilfreich.
                Andere begleiten uns,
                obwohl wir sie längst nicht mehr brauchen.
                Sie bewusst wahrzunehmen,
                ist oft der erste Schritt
                zu mehr Selbstbestimmung.

            </p>

        </section>

    `;



    page.append(

        createRadioCard(

            "Wie reagierst du meistens, wenn dich etwas belastet?",

            workbookData.stress

        ),

        createCheckboxCard(

            "Welche Aussagen treffen auf dich zu?",

            workbookData.patterns

        ),

        createTextareaCard(

            "Gab es eine Situation, in der du dich selbst überrascht hast?",

            workbookData.reflection

        )

    );



    const takeaway = document.createElement("section");

    takeaway.className = "card card--takeaway";

    takeaway.innerHTML = `

        <div class="card__badge">

            Für dich mitgenommen

        </div>

        <p>

            Verstehen bedeutet nicht,
            alles sofort verändern zu müssen.
            Oft beginnt Entwicklung bereits in dem Moment,
            in dem wir erkennen,
            dass unser Verhalten einen Ursprung hat
            und nicht einfach „falsch“ ist.

        </p>

    `;

    page.append(takeaway);

    pdf.append(page);

}
/* =========================================================
   SCHRITT 4
========================================================= */

function renderStep4(){

    const page = createPage();

    page.innerHTML = `

        <section class="chapter">

            <div class="chapter__step">

                Schritt 4

            </div>

            <h1 class="chapter__title">

                Erkennen

            </h1>

            <p class="chapter__quote">

                „Verstehen schafft Orientierung.“

            </p>

        </section>



        <section class="card">

            <h3>

                Manche Muster bleiben lange unbemerkt.

            </h3>

            <p>

                Beziehungen können Halt,
                Vertrauen und Sicherheit geben.
                Gleichzeitig gibt es Beziehungen,
                in denen Menschen sich zunehmend
                verunsichert,
                kontrolliert oder klein fühlen.

            </p>

            <p>

                Solche Dynamiken entwickeln sich
                meist schleichend.
                Gerade deshalb werden sie häufig
                erst sehr spät erkannt.

            </p>

        </section>



        <section class="card card--psychology">

            <div class="card__badge">

                Ein Blick in die Psychologie

            </div>

            <p>

                Psychische Gewalt beginnt
                nur selten mit einem einzelnen Ereignis.
                Häufig entsteht sie
                durch viele kleine Grenzüberschreitungen,
                Manipulation,
                Kontrolle oder Abwertung.

            </p>

            <p>

                Wissen über solche Dynamiken
                hilft dabei,
                Erfahrungen besser einzuordnen,
                ohne vorschnell urteilen zu müssen.

            </p>

        </section>

    `;



    page.append(

        createCheckboxCard(

            "Welche Aussagen kommen dir bekannt vor?",

            workbookData.relationshipExperiences

        ),

        createCheckboxCard(

            "Welche Verhaltensweisen empfindest du grundsätzlich als Warnsignale?",

            workbookData.warningSigns

        ),

        createTextareaCard(

            "Welche Gedanken möchtest du zu diesem Thema festhalten?",

            workbookData.realisation

        )

    );



    const takeaway = document.createElement("section");

    takeaway.className = "card card--takeaway";

    takeaway.innerHTML = `

        <div class="card__badge">

            Für dich mitgenommen

        </div>

        <p>

            Nicht jede schwierige Situation
            ist psychische Gewalt.
            Gleichzeitig verdienen Manipulation,
            wiederholte Grenzüberschreitungen
            und Abwertung Aufmerksamkeit.

        </p>

        <p>

            Wissen hilft,
            den eigenen Gefühlen
            wieder mehr zu vertrauen.

        </p>

    `;

    page.append(takeaway);



    pdf.append(page);

}
/* =========================================================
   SCHRITT 5
========================================================= */

function renderStep5(){

    const page = createPage();

    page.innerHTML = `

        <section class="chapter">

            <div class="chapter__step">

                Schritt 5

            </div>

            <h1 class="chapter__title">

                Stärken

            </h1>

            <p class="chapter__quote">

                „Du bist mehr als deine schwierigsten Tage.“

            </p>

        </section>



        <section class="card">

            <h3>

                Jeder Mensch trägt Stärken in sich.

            </h3>

            <p>

                Wenn wir belastende Erfahrungen machen,
                richtet sich unser Blick häufig auf das,
                was gerade nicht funktioniert.
                Dadurch geraten unsere Fähigkeiten,
                Werte und Ressourcen leicht in den Hintergrund.

            </p>

            <p>

                Stärke bedeutet nicht,
                immer stark sein zu müssen.
                Stärke bedeutet auch,
                Hilfe anzunehmen,
                Grenzen zu setzen
                und freundlich mit sich selbst umzugehen.

            </p>

        </section>



        <section class="card card--psychology">

            <div class="card__badge">

                Ein Blick in die Psychologie

            </div>

            <p>

                Die Psychologie beschreibt Resilienz
                als die Fähigkeit,
                mit Belastungen umzugehen
                und sich nach schwierigen Erfahrungen
                wieder zu stabilisieren.

            </p>

            <p>

                Resilienz ist keine angeborene Eigenschaft.
                Sie entwickelt sich durch Erfahrungen,
                Beziehungen und viele kleine Schritte
                im Alltag.

            </p>

        </section>

    `;



    page.append(

        createCheckboxCard(

            "Was gibt dir im Alltag Kraft?",

            workbookData.resources

        ),

        createCheckboxCard(

            "Welche Eigenschaften erkennst du bei dir?",

            workbookData.strengths

        ),

        createTextareaCard(

            "Worauf bist du heute stolz – auch wenn es nur eine Kleinigkeit ist?",

            workbookData.gratitude

        )

    );



    const takeaway = document.createElement("section");

    takeaway.className = "card card--takeaway";

    takeaway.innerHTML = `

        <div class="card__badge">

            Für dich mitgenommen

        </div>

        <p>

            Selbstwert entsteht selten
            durch einen einzigen großen Erfolg.
            Oft wächst er in den kleinen Momenten,
            in denen wir freundlich mit uns selbst umgehen,
            unsere Grenzen ernst nehmen
            und erkennen,
            dass wir bereits vieles in uns tragen.

        </p>

    `;

    page.append(takeaway);



    pdf.append(page);

}
/* =========================================================
   SCHRITT 6
========================================================= */

function renderStep6(){

    const page = createPage();

    page.innerHTML = `

        <section class="chapter">

            <div class="chapter__step">

                Schritt 6

            </div>

            <h1 class="chapter__title">

                Weitergehen

            </h1>

            <p class="chapter__quote">

                „Jeder Weg entsteht Schritt für Schritt.“

            </p>

        </section>



        <section class="card">

            <h3>

                Jede Erkenntnis ist ein Anfang.

            </h3>

            <p>

                Vielleicht hast du in diesem Workbook
                neue Gedanken entdeckt,
                manches bestätigt gefunden
                oder Fragen mitgenommen,
                auf die es heute noch keine Antwort gibt.

            </p>

            <p>

                Das ist völlig in Ordnung.

                Persönliche Entwicklung endet nicht
                mit der letzten Seite,
                sondern begleitet uns
                durch viele kleine Entscheidungen
                im Alltag.

            </p>

        </section>



        <section class="card card--psychology">

            <div class="card__badge">

                Ein Blick in die Psychologie

            </div>

            <p>

                Nachhaltige Veränderungen entstehen
                selten durch einen einzigen großen Moment.

                Viel häufiger entwickeln sie sich
                durch viele kleine Entscheidungen,
                die wir immer wieder treffen.

            </p>

            <p>

                Schon ein kleiner Schritt
                kann langfristig einen großen Unterschied machen.

            </p>

        </section>

    `;



    page.append(

        createCheckboxCard(

            "Was möchtest du aus diesem Workbook mitnehmen?",

            workbookData.takeaway

        ),

        createCheckboxCard(

            "Wer oder was kann dich auf deinem Weg unterstützen?",

            workbookData.support

        ),

        createTextareaCard(

            "Welche Erkenntnis möchtest du aus diesem Workbook mitnehmen?",

            workbookData.insight

        ),

        createTextareaCard(

            "Welchen kleinen Schritt möchtest du als Nächstes gehen?",

            workbookData.nextStep

        ),

        createTextareaCard(

            "Schreibe deinem zukünftigen Ich eine Nachricht.",

            workbookData.futureMessage

        )

    );



    const takeaway = document.createElement("section");

    takeaway.className = "card card--takeaway";

    takeaway.innerHTML = `

        <div class="card__badge">

            Für dich mitgenommen

        </div>

        <p>

            Du musst heute nicht alle Antworten kennen.

            Es reicht,

            wenn du bereit bist,

            neugierig auf dich selbst zu bleiben.

            Jeder kleine Schritt zählt.

        </p>

    `;

    page.append(takeaway);



    pdf.append(page);

}
/* =========================================================
   ABSCHLUSS
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
                dass du dir Zeit für dich genommen hast.

            </p>

            <p>

                Vielleicht nimmst du heute
                nicht auf jede Frage
                eine Antwort mit.

                Vielleicht aber
                einen neuen Blick auf dich selbst.

            </p>

            <p>

                Bewahre dieses Workbook
                als Erinnerung daran,
                wo du heute stehst.

                Und vergiss nicht:

                Entwicklung beginnt
                mit kleinen Schritten.

            </p>

            <div class="ending__footer">

                trotzdem.wahr

            </div>

        </section>

    `;

    pdf.append(page);

}



/* =========================================================
   SEITENZAHLEN
========================================================= */

function addPageNumbers(){

    const pages = document.querySelectorAll(".page");

    pages.forEach((page,index)=>{

        const footer = document.createElement("footer");

        footer.className = "page-footer";

        footer.innerHTML = `

            <span>

                trotzdem.wahr

            </span>

            <span>

                ${index+1} / ${pages.length}

            </span>

        `;

        page.append(footer);

    });

}



/* =========================================================
   WARTEN
========================================================= */

function waitForRender(){

    return new Promise(resolve=>{

        requestAnimationFrame(()=>{

            setTimeout(

                resolve,

                300

            );

        });

    });

}



/* =========================================================
   EXPORT
========================================================= */

function exportPDF(){

    const options={

        margin:0,

        filename:"Zurück-zu-dir-Workbook.pdf",

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

            mode:["css"]

        }

    };

    html2pdf()

        .set(options)

        .from(pdf)

        .save();

}
