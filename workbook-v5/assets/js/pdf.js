/* ==========================================================
   trotzdem.wahr
   Workbook PDF V5
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

const pdfContainer = document.getElementById("pdfPages");



/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initPdf

);



function initPdf(){

    loadWorkbook();

    renderPdf();

}



/* ==========================================================
   LOCALSTORAGE
========================================================== */

function loadWorkbook(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){

        workbookData = JSON.parse(saved);

    }

    else{

        workbookData = {};

    }

}
/* ==========================================================
   PDF ERZEUGEN
========================================================== */

function renderPdf(){

    pdfContainer.innerHTML = "";

    pdfContainer.appendChild(

        createCoverPage()

    );

    pdfContainer.appendChild(

        createIntroPage()

    );

    pdfContainer.appendChild(

        createChapter1()

    );

    pdfContainer.appendChild(

        createChapter2()

    );

    pdfContainer.appendChild(

        createChapter3()

    );

    pdfContainer.appendChild(

        createChapter4()

    );

    pdfContainer.appendChild(

        createChapter5()

    );

    pdfContainer.appendChild(

        createChapter6()

    );

}



/* ==========================================================
   SEITE ERSTELLEN
========================================================== */

function createPage(){

    const page = document.createElement("section");

    page.className = "page";

    const content = document.createElement("div");

    content.className = "page__content";

    page.appendChild(content);

    return {

        page,

        content

    };

}
/* ==========================================================
   COVER
========================================================== */

function createCoverPage(){

    const {

        page,

        content

    } = createPage();



    content.innerHTML = `

        <div class="cover">

            <h1 class="cover__title">

                Zurück zu dir

            </h1>

            <p class="cover__text">

                Ein Workbook für Selbstreflexion,
                Verständnis und neue Perspektiven.

                <br><br>

                Nimm dir Zeit für dich.
                Dieses Workbook begleitet dich
                Schritt für Schritt
                auf deinem persönlichen Weg.

            </p>

            <div class="cover__logo">

                trotzdem.wahr

            </div>

        </div>

    `;



    return page;

}



/* ==========================================================
   VORWORT
========================================================== */

function createIntroPage(){

    const {

        page,

        content

    } = createPage();



    content.innerHTML = `

        <div class="page__number">

            Vorwort

        </div>

        <h1 class="page__title">

            Willkommen

        </h1>

        <p class="page__subtitle">

            Danke, dass du dir Zeit für dich nimmst.

        </p>



        <div class="pdf-card">

            <div class="pdf-card__text">

                Dieses Workbook soll dich dabei unterstützen,
                dich selbst besser kennenzulernen,
                Gedanken zu sortieren
                und neue Perspektiven zu entwickeln.

                <br><br>

                Es gibt dabei kein richtig oder falsch.

                Jede Antwort ist genau so wertvoll,
                wie sie sich für dich anfühlt.

                <br><br>

                Danke,
                dass ich dich auf einem kleinen Teil
                deines Weges begleiten darf.

            </div>

        </div>



        <div class="footer">

            <span>

                trotzdem.wahr

            </span>

            <span>

                2

            </span>

        </div>

    `;



    return page;

}
/* ==========================================================
   KAPITEL 1
========================================================== */

function createChapter1(){

    const {

        page,

        content

    } = createPage();



    content.innerHTML = `

        <div class="page__number">

            Kapitel 1

        </div>

        <h1 class="page__title">

            Ankommen

        </h1>

        <p class="page__subtitle">

            Du musst heute nichts leisten.

        </p>



        <div class="pdf-card">

            <div class="pdf-card__title">

                Schön, dass du da bist.

            </div>

            <div class="pdf-card__text">

                Wenn wir beginnen, uns selbst besser kennenzulernen,
                entsteht oft der Wunsch,
                möglichst schnell Antworten
                auf unsere Fragen zu finden.

                <br><br>

                Doch Selbstreflexion ist kein Test
                und keine Prüfung.
                Sie beginnt mit Aufmerksamkeit –
                nicht mit Perfektion.

            </div>

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Deine Gefühle

            </div>

            ${createChipGroup(
    getArray("feelings")
)}



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Was kostet dich im Moment am meisten Kraft?

            </div>

            ${createOptionalAnswer(
    "Was kostet dich im Moment am meisten Kraft?",
    getText("energy")
)}

        </div>



        <div class="pdf-card pdf-card--psychology">

            <div class="pdf-badge">

                Ein Blick in die Psychologie

            </div>

            <div class="pdf-card__text">

                Unser Gehirn verarbeitet Informationen
                besonders gut,
                wenn wir uns sicher fühlen.

                Unter Druck arbeitet es
                stärker im Überlebensmodus,
                während ruhige Momente
                bewusste Reflexion ermöglichen.

            </div>

        </div>



        <div class="pdf-card pdf-card--takeaway">

            <div class="pdf-badge">

                Für heute

            </div>

            <div class="pdf-card__text">

                Es gibt heute kein richtig oder falsch.

                Dieses Workbook gehört nur dir.

            </div>

        </div>



        <div class="footer">

            <span>

                trotzdem.wahr

            </span>

            <span>

                3

            </span>

        </div>

    `;



    return page;

}
/* ==========================================================
   HILFSFUNKTIONEN
========================================================== */

function getText(key){

    return workbookData[key] || "";

}



function getArray(key){

    if(Array.isArray(workbookData[key])){

        return workbookData[key];

    }

    return [];

}



/* ==========================================================
   ANTWORTBOX
========================================================== */

function createOptionalAnswer(title,value){

    if(!value){

        return `

            <div class="pdf-card__text">

                —

            </div>

        `;

    }

    return `

        <div class="answer-box">

            ${escapeHtml(value)}

        </div>

    `;

}



/* ==========================================================
   CHIPS
========================================================== */

function createChipGroup(values){

    if(values.length===0){

    return `

        <div class="pdf-card__text">

            —

        </div>

    `;

}

    return `

        <div class="chip-group">

            ${values.map(item=>`

                <span class="chip">

                    ${escapeHtml(item)}

                </span>

            `).join("")}

        </div>

    `;

}



/* ==========================================================
   HTML SICHER MACHEN
========================================================== */

function escapeHtml(text){

    return String(text)

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}
/* ==========================================================
   KAPITEL 2
========================================================== */

function createChapter2(){

    const {

        page,

        content

    } = createPage();



    content.innerHTML = `

        <div class="page__number">

            Kapitel 2

        </div>

        <h1 class="page__title">

            Wer bin ich geworden?

        </h1>

        <p class="page__subtitle">

            Manchmal hilft ein Blick zurück,
            um sich heute besser zu verstehen.

        </p>



        <div class="pdf-card">

            <div class="pdf-card__title">

                Ein Blick auf dich

            </div>

            <div class="pdf-card__text">

                Unser Selbstbild verändert sich im Laufe des Lebens.
                Erfahrungen, Beziehungen und Herausforderungen
                hinterlassen Spuren.
                Manche davon stärken uns,
                andere lassen uns an uns selbst zweifeln.

            </div>

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Was mochtest du früher besonders an dir?

            </div>

            ${createOptionalAnswer(
    "Was mochtest du früher besonders an dir?",
    getText("pastSelf")
)}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Was magst du heute an dir?

            </div>

            ${createOptionalAnswer(

                getText("presentSelf")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Was ist der größte Unterschied
                zwischen damals und heute?

            </div>

            ${createOptionalAnswer(

                getText("changeReflection")

            )}

        </div>



        <div class="pdf-card pdf-card--psychology">

            <div class="pdf-badge">

                Ein Blick in die Psychologie

            </div>

            <div class="pdf-card__text">

                Unser Selbstbild entsteht nicht über Nacht.
                Es entwickelt sich durch Erfahrungen,
                Beziehungen und die Geschichten,
                die wir über uns selbst erzählen.

            </div>

        </div>



        <div class="pdf-card pdf-card--takeaway">

            <div class="pdf-badge">

                Für heute

            </div>

            <div class="pdf-card__text">

                Du darfst dich verändern,
                weiterentwickeln
                und dich immer wieder neu kennenlernen.

            </div>

        </div>



        <div class="footer">

            <span>

                trotzdem.wahr

            </span>

            <span>

                4

            </span>

        </div>

    `;



    return page;

}
/* ==========================================================
   KAPITEL 3
========================================================== */

function createChapter3(){

    const {

        page,

        content

    } = createPage();



    content.innerHTML = `

        <div class="page__number">

            Kapitel 3

        </div>

        <h1 class="page__title">

            Verstehen

        </h1>

        <p class="page__subtitle">

            Verstehen verändert den Blick –
            nicht die Vergangenheit.

        </p>



        <div class="pdf-card">

            <div class="pdf-card__title">

                Warum reagieren wir manchmal automatisch?

            </div>

            <div class="pdf-card__text">

                Unser Gehirn versucht ständig,
                Situationen möglichst schnell einzuordnen.
                Deshalb greifen wir häufig auf bekannte Muster zurück,
                ohne bewusst darüber nachzudenken.

                <br><br>

                Diese Reaktionen sind nicht falsch.
                Erst wenn wir sie erkennen,
                können wir entscheiden,
                ob sie uns heute noch helfen.

            </div>

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Meine Stressreaktion

            </div>

            ${createOptionalAnswer(

                getText("stress")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Wiederkehrende Muster

            </div>

            ${createChipGroup(

                getArray("patterns")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Rückblick

            </div>

            ${createOptionalAnswer(

                getText("reflection")

            )}

        </div>



        <div class="pdf-card pdf-card--psychology">

            <div class="pdf-badge">

                Ein Blick in die Psychologie

            </div>

            <div class="pdf-card__text">

                Viele unserer Reaktionen entstehen,
                bevor wir bewusst darüber nachdenken können.
                Das Gehirn vergleicht neue Situationen
                mit früheren Erfahrungen
                und entscheidet innerhalb von Sekunden,
                welche Reaktion sinnvoll erscheint.

            </div>

        </div>



        <div class="pdf-card pdf-card--takeaway">

            <div class="pdf-badge">

                Für heute

            </div>

            <div class="pdf-card__text">

                Entwicklung beginnt oft dort,
                wo wir unsere eigenen Muster
                neugierig statt wertend betrachten.

            </div>

        </div>



        <div class="footer">

            <span>

                trotzdem.wahr

            </span>

            <span>

                5

            </span>

        </div>

    `;



    return page;

}
/* ==========================================================
   KAPITEL 4
========================================================== */

function createChapter4(){

    const {

        page,

        content

    } = createPage();



    content.innerHTML = `

        <div class="page__number">

            Kapitel 4

        </div>

        <h1 class="page__title">

            Erkennen

        </h1>

        <p class="page__subtitle">

            Nicht alles,
            was sich vertraut anfühlt,
            tut uns gut.

        </p>



        <div class="pdf-card">

            <div class="pdf-card__title">

                Warnsignale erkennen

            </div>

            <div class="pdf-card__text">

                Manche Verhaltensweisen wirken zunächst harmlos
                oder sogar fürsorglich.
                Erst mit etwas Abstand erkennen wir,
                wie sehr sie unser Selbstwertgefühl
                oder unsere Freiheit beeinflusst haben.

                <br><br>

                Dieses Kapitel soll dir helfen,
                Warnsignale bewusster wahrzunehmen
                und deine eigenen Grenzen ernst zu nehmen.

            </div>

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Welche Erfahrungen kommen dir bekannt vor?

            </div>

            ${createChipGroup(

                getArray("relationshipExperiences")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Welche Warnsignale hast du erkannt?

            </div>

            ${createChipGroup(

                getArray("warningSigns")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Deine Gedanken

            </div>

            ${createOptionalAnswer(

                getText("realisation")

            )}

        </div>



        <div class="pdf-card pdf-card--psychology">

            <div class="pdf-badge">

                Ein Blick in die Psychologie

            </div>

            <div class="pdf-card__text">

                Manipulation beginnt selten plötzlich.
                Häufig entwickelt sie sich schrittweise
                durch Kontrolle,
                Schuldgefühle,
                Abwertung
                oder das Infragestellen
                der eigenen Wahrnehmung.

            </div>

        </div>



        <div class="pdf-card pdf-card--takeaway">

            <div class="pdf-badge">

                Für heute

            </div>

            <div class="pdf-card__text">

                Deiner Wahrnehmung zu vertrauen
                ist ein wichtiger Schritt
                in Richtung Selbstfürsorge.

            </div>

        </div>



        <div class="footer">

            <span>

                trotzdem.wahr

            </span>

            <span>

                6

            </span>

        </div>

    `;



    return page;

}
/* ==========================================================
   KAPITEL 5
========================================================== */

function createChapter5(){

    const {

        page,

        content

    } = createPage();



    content.innerHTML = `

        <div class="page__number">

            Kapitel 5

        </div>

        <h1 class="page__title">

            Stärken

        </h1>

        <p class="page__subtitle">

            Du bist mehr
            als deine schwierigsten Tage.

        </p>



        <div class="pdf-card">

            <div class="pdf-card__title">

                Deine Ressourcen

            </div>

            <div class="pdf-card__text">

                Oft sehen wir zuerst,
                was uns belastet.
                Dabei übersehen wir leicht,
                wie viele Fähigkeiten,
                Erfahrungen und Menschen
                uns bereits tragen.

                <br><br>

                Stärke bedeutet nicht,
                immer stark sein zu müssen.
                Manchmal zeigt sie sich darin,
                freundlich mit sich selbst zu sein.

            </div>

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Meine Kraftquellen

            </div>

            ${createChipGroup(

                getArray("resources")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Meine Stärken

            </div>

            ${createChipGroup(

                getArray("strengths")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Heute bin ich stolz auf...

            </div>

            ${createOptionalAnswer(

                getText("gratitude")

            )}

        </div>



        <div class="pdf-card pdf-card--psychology">

            <div class="pdf-badge">

                Ein Blick in die Psychologie

            </div>

            <div class="pdf-card__text">

                Resilienz beschreibt die Fähigkeit,
                schwierige Erfahrungen zu bewältigen
                und sich nach Belastungen
                wieder zu stabilisieren.

                Sie entwickelt sich
                durch viele kleine Erfahrungen
                im Alltag.

            </div>

        </div>



        <div class="pdf-card pdf-card--takeaway">

            <div class="pdf-badge">

                Für heute

            </div>

            <div class="pdf-card__text">

                Du musst nicht perfekt sein,
                um wertvoll zu sein.

                Jeder kleine Schritt zählt.

            </div>

        </div>



        <div class="footer">

            <span>

                trotzdem.wahr

            </span>

            <span>

                7

            </span>

        </div>

    `;



    return page;

}
/* ==========================================================
   KAPITEL 6
========================================================== */

function createChapter6(){

    const {

        page,

        content

    } = createPage();



    content.innerHTML = `

        <div class="page__number">

            Kapitel 6

        </div>

        <h1 class="page__title">

            Weitergehen

        </h1>

        <p class="page__subtitle">

            Jeder kleine Schritt zählt.

        </p>



        <div class="pdf-card">

            <div class="pdf-card__title">

                Dein nächster Schritt

            </div>

            <div class="pdf-card__text">

                Dieses Workbook endet hier,
                dein Weg jedoch nicht.

                Veränderungen entstehen
                durch viele kleine Entscheidungen,
                die wir immer wieder treffen.

                <br><br>

                Nimm dir einen Moment Zeit
                und halte fest,
                was du aus diesem Workbook
                für dich mitnehmen möchtest.

            </div>

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Das möchte ich mitnehmen

            </div>

            ${createChipGroup(

                getArray("takeaway")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Das unterstützt mich

            </div>

            ${createChipGroup(

                getArray("support")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Meine wichtigste Erkenntnis

            </div>

            ${createOptionalAnswer(

                getText("insight")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                Mein nächster Schritt

            </div>

            ${createOptionalAnswer(

                getText("nextStep")

            )}

        </div>



        <div class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                An mein zukünftiges Ich

            </div>

            ${createOptionalAnswer(

                getText("futureMessage")

            )}

        </div>



        <div class="pdf-card pdf-card--psychology">

            <div class="pdf-badge">

                Ein Blick in die Psychologie

            </div>

            <div class="pdf-card__text">

                Nachhaltige Veränderungen
                entstehen meist nicht
                durch einen einzigen großen Moment,
                sondern durch viele kleine Schritte,
                die wir immer wieder gehen.

            </div>

        </div>



        <div class="pdf-card pdf-card--takeaway">

            <div class="pdf-badge">

                Für heute

            </div>

            <div class="pdf-card__text">

                Du musst nicht alle Antworten kennen.

                Es reicht,
                wenn du bereit bist,
                den nächsten kleinen Schritt
                zu gehen.

            </div>

        </div>



        <div class="footer">

            <span>

                trotzdem.wahr

            </span>

            <span>

                8

            </span>

        </div>

    `;



    return page;

}
/* ==========================================================
   SCHRIFTGRÖSSE AUTOMATISCH ANPASSEN
========================================================== */

function fitAnswerBoxes(){

    document.querySelectorAll(".answer-box").forEach(box=>{

        let size = 13;

        box.style.fontSize = size + "px";

        while(

            box.scrollHeight > box.clientHeight &&

            size > 10

        ){

            size--;

            box.style.fontSize = size + "px";

        }

        if(box.scrollHeight > box.clientHeight){

            let text = box.textContent;

            while(

                box.scrollHeight > box.clientHeight &&

                text.length > 0

            ){

                text = text.slice(0,-1);

                box.textContent = text + "...";

            }

        }

    });

}



/* ==========================================================
   PDF EXPORTIEREN
========================================================== */

function exportPdf(){

    const element = document.getElementById("pdf");

    html2pdf()

        .set({

            margin:0,

            filename:"Zurück-zu-dir-Workbook.pdf",

            image:{

                type:"jpeg",

                quality:1

            },

            html2canvas:{

                scale:2,

                useCORS:true

            },

            jsPDF:{

                unit:"mm",

                format:"a4",

                orientation:"portrait"

            }

        })

        .from(element)

        .save();

}



/* ==========================================================
   PDF STARTEN
========================================================== */

window.addEventListener(

    "load",

    ()=>{

        fitAnswerBoxes();

        setTimeout(

            exportPdf,

            400

        );

    }

);
