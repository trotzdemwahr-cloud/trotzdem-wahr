/* ==========================================================
   trotzdem.wahr
   Workbook PDF V6
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



    const pages = [

        createCover(),

        createForeword(),

        createChapter1(),

        createChapter2(),

        createChapter3(),

        createChapter4(),

        createChapter5(),

        createChapter6()

    ];



    pdfPages.insertAdjacentHTML(

        "beforeend",

        pages.join("")

    );



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

    if(Array.isArray(value)){

        return value;

    }

    return [];

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

    if(length <= 100){

        return "";

    }

    if(length <= 180){

        return "text-small";

    }

    if(length <= 260){

        return "text-smaller";

    }

    return "text-smallest";

}



/* ==========================================================
   TEXTE
========================================================== */

const PDF_TEXT = {

    cover:{

        title:"Zurück zu dir",

        subtitle:"Dieses Workbook fasst deine persönlichen Antworten zusammen. Nimm dir Zeit, lies sie in Ruhe und erinnere dich daran: Entwicklung beginnt nicht mit Perfektion, sondern mit Ehrlichkeit.",

        logo:"trotzdem.wahr"

    },



    foreword:{

        title:"Willkommen",

        subtitle:"Dein persönliches Workbook",

        text:`

            Dieses PDF enthält alle Antworten,

            die du während des Workbooks

            festgehalten hast.

            <br><br>

            Es soll dir helfen,

            Zusammenhänge zu erkennen,

            Entwicklungen sichtbar zu machen

            und jederzeit auf deine Gedanken

            zurückblicken zu können.

            <br><br>

            Alles, was du hier liest,

            hast du selbst geschrieben.

        `

    }

};
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

    return `

        ${card}

    `;

}



function twoColumns(left,right){

    return `

        <div
            style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:5mm;
                margin-bottom:5mm;
            ">

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

    const value = getText(key);



    return `

        <section class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                ${escapeHtml(title)}

            </div>

            ${

                hasValue(value)

                ?

                `

                <div class="answer-box ${getFontClass(value)}">

                    ${escapeHtml(value)}

                </div>

                `

                :

                `

                <div class="pdf-card__empty">

                    Keine Antwort eingetragen.

                </div>

                `

            }

        </section>

    `;

}



function chipCard(title,key){

    const values = getArray(key);



    return `

        <section class="pdf-card pdf-card--reflection">

            <div class="pdf-card__title">

                ${escapeHtml(title)}

            </div>

            ${

                values.length

                ?

                `

                <div class="chip-group">

                    ${

                        values.map(item=>`

                            <span class="chip">

                                ${escapeHtml(item)}

                            </span>

                        `).join("")

                    }

                </div>

                `

                :

                `

                <div class="pdf-card__empty">

                    Keine Auswahl.

                </div>

                `

            }

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

                Dieses Workbook fasst deine persönlichen Antworten
                zusammen.

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

            "Schön, dass du dir Zeit für dich genommen hast."

        )}

        ${infoCard(

            "Dein Workbook",

            `

            Dieses PDF enthält alle Antworten,
            die du während des Workbooks
            festgehalten hast.

            <br><br>

            Es soll dir helfen,
            deine Gedanken später noch einmal
            in Ruhe nachzulesen,
            Zusammenhänge zu erkennen
            und deine Entwicklung sichtbar zu machen.

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

            Wenn wir beginnen,
            uns selbst besser kennenzulernen,
            entsteht oft der Wunsch,
            möglichst schnell Antworten
            auf unsere Fragen zu finden.

            <br><br>

            Doch Selbstreflexion
            ist kein Test
            und keine Prüfung.

            Sie beginnt mit Aufmerksamkeit –
            nicht mit Perfektion.

            <br><br>

            Deshalb musst du heute
            nichts erreichen.

            Nimm dir Zeit,
            beantworte nur das,
            was sich für dich richtig anfühlt.

            `

        )}

        ${twoColumns(

            chipCard(

                "Welche Gefühle begleiten dich im Moment?",

                "feelings"

            ),

            chipCard(

                "Welche Gedanken kennst du von dir?",

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

            Unser Gehirn verarbeitet Informationen
            besonders gut,
            wenn wir uns sicher fühlen.

            Unter Druck arbeitet es
            stärker im Überlebensmodus,
            während ruhige Momente
            bewusste Reflexion ermöglichen.

            <br><br>

            Deshalb entstehen viele wichtige Erkenntnisse
            nicht dann,
            wenn wir uns zwingen,
            sondern wenn wir uns erlauben,
            ehrlich hinzuschauen.

            `

        )}

        ${takeawayCard(

            `

            Es gibt heute
            kein richtig oder falsch.

            Du musst niemandem
            etwas beweisen.

            Dieses Workbook
            gehört nur dir.

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

            "Manchmal hilft ein Blick zurück, um sich heute besser zu verstehen."

        )}

        ${infoCard(

            "Ein Blick auf dich",

            `

            Unser Selbstbild verändert sich
            im Laufe des Lebens.

            Erfahrungen,
            Beziehungen
            und Herausforderungen
            hinterlassen Spuren.

            Manche davon stärken uns,
            andere lassen uns
            an uns selbst zweifeln.

            <br><br>

            Diese Fragen laden dich ein,
            dein früheres
            und heutiges Ich
            mit Neugier zu betrachten.

            `

        )}

        ${twoColumns(

            answerCard(

                "Was mochtest du früher besonders an dir?",

                "pastSelf"

            ),

            answerCard(

                "Was magst du heute an dir?",

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

            Unser Selbstbild entsteht
            aus Erfahrungen,
            Beziehungen
            und den Geschichten,
            die wir über uns selbst erzählen.

            <br><br>

            Manchmal übernehmen wir
            Bewertungen anderer,
            obwohl sie längst
            nicht mehr zu uns passen.

            `

        )}

        ${takeawayCard(

            `

            Du bist nicht nur
            die Summe deiner Erfahrungen.

            Du darfst dich verändern,
            weiterentwickeln
            und dich immer wieder
            neu kennenlernen.

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

            "Verstehen verändert den Blick – nicht die Vergangenheit."

        )}

        ${infoCard(

            "Warum reagieren wir manchmal automatisch?",

            `

            Unser Gehirn versucht ständig,
            Situationen möglichst schnell
            einzuordnen.

            Deshalb greifen wir häufig
            auf bekannte Muster zurück,
            ohne bewusst darüber
            nachzudenken.

            <br><br>

            Erst wenn wir diese erkennen,
            können wir entscheiden,
            ob sie uns heute
            noch helfen.

            `

        )}

        ${twoColumns(

            answerCard(

                "Wie reagierst du meistens, wenn dich etwas belastet?",

                "stress"

            ),

            chipCard(

                "Welche Aussagen treffen auf dich zu?",

                "patterns"

            )

        )}

        ${oneColumn(

            answerCard(

                "Gab es eine Situation, in der du dich selbst überrascht hast?",

                "reflection"

            )

        )}

        ${psychologyCard(

            `

            Viele unserer Reaktionen entstehen,
            bevor wir bewusst darüber
            nachdenken können.

            Das Gehirn vergleicht
            neue Situationen
            mit früheren Erfahrungen.

            `

        )}

        ${takeawayCard(

            `

            Verstehen bedeutet nicht,
            alles sofort verändern zu müssen.

            Entwicklung beginnt oft dort,
            wo wir unsere Muster
            neugierig betrachten.

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

            "Nicht alles, was sich vertraut anfühlt, tut uns gut."

        )}

        ${infoCard(

            "Warnsignale erkennen",

            `

            Manche Verhaltensweisen wirken
            auf den ersten Blick harmlos
            oder werden sogar als Fürsorge verstanden.

            <br><br>

            Erst mit etwas Abstand erkennen wir,
            wie sehr sie unser Selbstwertgefühl
            oder unsere Freiheit beeinflusst haben.

            <br><br>

            Dieses Kapitel soll dir helfen,
            typische Warnsignale
            bewusster wahrzunehmen.

            `

        )}

        ${twoColumns(

            chipCard(

                "Welche Aussagen kommen dir bekannt vor?",

                "relationshipExperiences"

            ),

            chipCard(

                "Welche Warnsignale erkennst du?",

                "warningSigns"

            )

        )}

        ${oneColumn(

            answerCard(

                "Welche Gedanken möchtest du festhalten?",

                "realisation"

            )

        )}

        ${psychologyCard(

            `

            Manipulation beginnt
            nur selten plötzlich.

            Häufig entwickelt sie sich
            schrittweise
            durch Kontrolle,
            Schuldgefühle
            oder das ständige Infragestellen
            der eigenen Wahrnehmung.

            <br><br>

            Je früher wir solche Muster erkennen,
            desto leichter fällt es,
            unsere Grenzen ernst zu nehmen.

            `

        )}

        ${takeawayCard(

            `

            Deiner Wahrnehmung
            zu vertrauen
            ist kein Zeichen
            von Misstrauen,

            sondern von Selbstfürsorge.

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

            Oft fällt uns zuerst auf,
            was uns fehlt.

            Dabei übersehen wir leicht,
            wie viele Fähigkeiten,
            Erfahrungen
            und Menschen
            uns bereits tragen.

            <br><br>

            Stärke bedeutet nicht,
            immer stark sein zu müssen.

            `

        )}

        ${twoColumns(

            chipCard(

                "Was gibt dir im Alltag Kraft?",

                "resources"

            ),

            chipCard(

                "Welche Eigenschaften erkennst du bei dir?",

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

            Resilienz beschreibt
            die Fähigkeit,

            schwierige Erfahrungen
            zu bewältigen
            und sich nach Belastungen
            wieder zu stabilisieren.

            <br><br>

            Sie entwickelt sich
            durch viele kleine Schritte.

            `

        )}

        ${takeawayCard(

            `

            Du musst nicht perfekt sein,
            um wertvoll zu sein.

            Jeder kleine Schritt zählt.

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

            "Dein nächster Schritt",

            `

            Dieses Workbook endet hier,

            dein Weg jedoch nicht.

            <br><br>

            Veränderungen entstehen
            durch viele kleine Entscheidungen,
            die wir immer wieder treffen.

            `

        )}

        ${twoColumns(

            chipCard(

                "Was möchtest du mitnehmen?",

                "takeaway"

            ),

            chipCard(

                "Wer oder was unterstützt dich?",

                "support"

            )

        )}

        ${oneColumn(

            answerCard(

                "Meine wichtigste Erkenntnis",

                "insight"

            )

        )}

        ${oneColumn(

            answerCard(

                "Mein nächster Schritt",

                "nextStep"

            )

        )}

        ${oneColumn(

            answerCard(

                "An mein zukünftiges Ich",

                "futureMessage"

            )

        )}

        ${takeawayCard(

            `

            Du musst nicht
            alle Antworten kennen.

            Es reicht,
            wenn du bereit bist,
            den nächsten kleinen Schritt
            zu gehen.

            `

        )}

        ${createFooter(8)}

    `);

}
