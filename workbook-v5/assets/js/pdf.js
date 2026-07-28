/* ==========================================================
   trotzdem.wahr
   PDF Workbook

   Teil 1
   Grundsystem
========================================================== */


/* ==========================================================
   PDF
========================================================== */

const PDF = {

    data:{},

    pages:{},

    chapters:[],

    initialized:false

};



/* ==========================================================
   START
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    PDF.init();

});



/* ==========================================================
   INITIALISIERUNG
========================================================== */

PDF.init=function(){

    this.loadData();

    this.collectPages();

    this.render();

};



/* ==========================================================
   SEITEN FINDEN
========================================================== */

PDF.collectPages=function(){

    this.pages={

        cover:document.querySelector("#coverPage"),

        welcome:document.querySelector("#welcomePage"),

        chapter1:document.querySelector("#chapter1"),

        chapter2:document.querySelector("#chapter2"),

        chapter3:document.querySelector("#chapter3"),

        chapter4:document.querySelector("#chapter4"),

        chapter5:document.querySelector("#chapter5"),

        chapter6:document.querySelector("#chapter6"),

        final:document.querySelector("#finalPage")

    };

};



/* ==========================================================
   DATEN LADEN
========================================================== */

PDF.loadData=function(){

    const defaults={

        feelings:[],

        thoughts:[],

        energy:"",

        pastSelf:"",

        presentSelf:"",

        changeReflection:"",

        stress:"",

        patterns:[],

        reflection:"",

        relationshipExperiences:[],

        warningSigns:[],

        realisation:"",

        resources:[],

        strengths:[],

        gratitude:"",

        takeaway:[],

        support:[],

        insight:"",

        nextStep:"",

        futureMessage:""

    };



    const saved=JSON.parse(

        localStorage.getItem("workbook")

    )||{};



    this.data={

        ...defaults,

        ...saved

    };

};




/* ==========================================================
   RENDER
========================================================== */

PDF.render=function(){

    this.renderCover();

    this.renderWelcome();

};



/* ==========================================================
   COVER
========================================================== */

PDF.renderCover=function(){

    this.pages.cover.innerHTML=`

        <div class="cover-content">

            <div class="cover-logo">

                trotzdem.wahr

            </div>

            <h1 class="cover-title">

                Zurück<br>

                zu dir.

            </h1>

            <p class="cover-subtitle">

                Ein Workbook für Selbstreflexion<br>

                und neue Perspektiven.

            </p>

            <div class="cover-footer">

                www.trotzdem-wahr.de

            </div>

        </div>

    `;

};




/* ==========================================================
   WILLKOMMEN
========================================================== */

PDF.renderWelcome=function(){

    this.pages.welcome.innerHTML=`

        <header class="page-header">

            <div class="logo">

                trotzdem.wahr

            </div>

        </header>

        <section class="full card">

            <h1 class="mb-3">

                Schön,

                dass du hier bist.

            </h1>

            <p>

                Dieses Workbook gehört dir.

                Es ist kein Test,

                keine Prüfung

                und muss nicht perfekt ausgefüllt sein.

            </p>

            <p class="mt-2">

                Vielleicht hast du viele Seiten

                ausführlich beantwortet.

                Vielleicht hast du manche Fragen

                übersprungen.

            </p>

            <p class="mt-2">

                Beides ist vollkommen in Ordnung.

            </p>

            <p class="mt-2">

                Die folgenden Seiten fassen deine

                Antworten zusammen und verbinden sie

                mit kurzen psychologischen Impulsen.

            </p>

            <p class="mt-2">

                Du kannst jederzeit später

                zurückkommen,

                Neues ergänzen

                oder manche Antworten

                mit etwas Abstand

                noch einmal lesen.

            </p>

        </section>

        <section class="full takeaway">

            <h3>

                Für dieses Workbook

            </h3>

            <p>

                Es gibt kein richtig oder falsch.

                Alles,

                was hier steht,

                darf sich verändern.

            </p>

        </section>

        <footer class="page-footer">

            <span>

                trotzdem.wahr

            </span>

            <span class="page-number">

                2

            </span>

        </footer>

    `;

};



/* ==========================================================
   SCHRIFTGRÖSSE
========================================================== */

PDF.fontSize=function(text=""){

    const length=text.trim().length;



    if(length<120)return"size-1";

    if(length<250)return"size-2";

    if(length<500)return"size-3";

    if(length<900)return"size-4";

    return"size-5";

};



/* ==========================================================
   CHIP LISTE
========================================================== */

PDF.createChips=function(items=[]){

    if(!items.length){

        return`

            <p class="small">

                Keine Auswahl getroffen.

            </p>

        `;

    }



    return`

        <div class="chips">

            ${items.map(item=>`

                <span class="chip selected">

                    ${item}

                </span>

            `).join("")}

        </div>

    `;

};



/* ==========================================================
   TEXTBOX
========================================================== */

PDF.answer=function(text=""){

    if(!text.trim()){

        return`

            <div class="answer">

                <p class="small">

                    Keine Antwort eingetragen.

                </p>

            </div>

        `;

    }



    return`

        <div class="answer ${this.fontSize(text)}">

            ${text}

        </div>

    `;

};
/* ==========================================================
   KAPITEL 1
   ANKOMMEN
========================================================== */

PDF.render=function(){

    this.renderCover();

    this.renderWelcome();

    this.renderChapter1();

};



/* ==========================================================
   KAPITEL 1
========================================================== */

PDF.renderChapter1=function(){

    this.pages.chapter1.innerHTML=`

        <header class="page-header">

            <div class="logo">

                trotzdem.wahr

            </div>

            <div class="page-number">

                3

            </div>

        </header>



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



        <section class="card full">

            <h2 class="card-title">

                Schön, dass du da bist.

            </h2>

            <p>

                Wenn wir beginnen,

                uns selbst besser kennenzulernen,

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

                Deshalb musst du heute

                nichts erreichen.

                Nimm dir Zeit,

                lies die Inhalte

                in deinem Tempo

                und beantworte nur das,

                was sich für dich

                richtig anfühlt.

            </p>

        </section>



        <section class="columns full">



            <article class="card">

                <h3>

                    Welche Gefühle begleiten dich im Moment?

                </h3>

                ${PDF.createChips(

                    PDF.data.feelings

                )}

            </article>



            <article class="card">

                <h3>

                    Welche Gedanken kennst du von dir?

                </h3>

                ${PDF.createChips(

                    PDF.data.thoughts

                )}

            </article>



        </section>



        <section class="card full">

            <h3>

                Was kostet dich im Moment am meisten Kraft?

            </h3>

            ${PDF.answer(

                PDF.data.energy

            )}

        </section>



        <section class="psychology full">

            <div class="psychology-icon">

                🧠

            </div>

            <div class="psychology-content">

                <h3 class="mb-2">

                    Ein Blick in die Psychologie

                </h3>

                <p>

                    Unser Gehirn verarbeitet

                    Informationen besonders gut,

                    wenn wir uns sicher fühlen.

                    Unter Druck arbeitet es

                    stärker im Überlebensmodus,

                    während ruhige Momente

                    bewusste Reflexion ermöglichen.

                </p>

                <p class="mt-2">

                    Deshalb entstehen viele

                    wichtige Erkenntnisse

                    nicht dann,

                    wenn wir uns zwingen,

                    sondern wenn wir uns erlauben,

                    ehrlich hinzuschauen.

                </p>

            </div>

        </section>



        <section class="takeaway full">

            <h3>

                Für heute

            </h3>

            <p>

                Es gibt heute

                kein richtig oder falsch.

                Du musst niemandem

                etwas beweisen.

                Dieses Workbook

                gehört nur dir.

            </p>

        </section>



        <footer class="page-footer">

            <span>

                trotzdem.wahr

            </span>

            <span class="page-number">

                3

            </span>

        </footer>

    `;

};
/* ==========================================================
   KAPITEL 2
   WER BIN ICH GEWORDEN?
========================================================== */

PDF.render=function(){

    this.renderCover();

    this.renderWelcome();

    this.renderChapter1();

    this.renderChapter2();

};



/* ==========================================================
   KAPITEL 2
========================================================== */

PDF.renderChapter2=function(){

    this.pages.chapter2.innerHTML=`

        <header class="page-header">

            <div class="logo">

                trotzdem.wahr

            </div>

            <div class="page-number">

                4

            </div>

        </header>



        <section class="chapter-header full">

            <div class="chapter-number">

                02

            </div>

            <h1 class="chapter-title">

                Wer bin ich geworden?

            </h1>

            <p class="quote">

                „Manchmal hilft ein Blick zurück, um sich heute besser zu verstehen.“

            </p>

        </section>



        <section class="card full">

            <h2 class="card-title">

                Ein Blick auf dich

            </h2>

            <p>

                Unser Selbstbild verändert sich

                im Laufe des Lebens.

                Erfahrungen,

                Beziehungen

                und Herausforderungen

                hinterlassen Spuren.

            </p>

            <p class="mt-2">

                Manche davon stärken uns,

                andere lassen uns

                an uns selbst zweifeln.

            </p>

            <p class="mt-2">

                Diese Fragen laden dich dazu ein,

                dich mit deinem früheren

                und heutigen Ich

                auseinanderzusetzen –

                ohne Bewertung,

                sondern mit Neugier.

            </p>

        </section>



        <section class="columns full">



            <article class="card">

                <h3>

                    Was mochtest du früher besonders an dir?

                </h3>

                ${PDF.answer(

                    PDF.data.pastSelf

                )}

            </article>



            <article class="card">

                <h3>

                    Was magst du heute an dir?

                </h3>

                ${PDF.answer(

                    PDF.data.presentSelf

                )}

            </article>



        </section>



        <section class="card full">

            <h3>

                Was ist der größte Unterschied

                zwischen damals und heute?

            </h3>

            ${PDF.answer(

                PDF.data.changeReflection

            )}

        </section>



        <section class="psychology full">

            <div class="psychology-icon">

                🧠

            </div>

            <div class="psychology-content">

                <h3 class="mb-2">

                    Ein Blick in die Psychologie

                </h3>

                <p>

                    Unser Selbstbild entsteht

                    nicht über Nacht.

                    Es entwickelt sich

                    aus Erfahrungen,

                    Beziehungen

                    und den Geschichten,

                    die wir über uns selbst erzählen.

                </p>

                <p class="mt-2">

                    Manchmal übernehmen wir

                    Bewertungen anderer,

                    obwohl sie längst

                    nicht mehr zu uns passen.

                    Sich diese bewusst zu machen,

                    kann helfen,

                    den Blick auf sich selbst

                    wieder liebevoller

                    werden zu lassen.

                </p>

            </div>

        </section>



        <section class="takeaway full">

            <h3>

                Für heute

            </h3>

            <p>

                Du bist nicht nur

                die Summe deiner Erfahrungen.

                Du darfst dich verändern,

                weiterentwickeln

                und dich immer wieder

                neu kennenlernen.

            </p>

        </section>



        <footer class="page-footer">

            <span>

                trotzdem.wahr

            </span>

            <span class="page-number">

                4

            </span>

        </footer>

    `;

};
/* ==========================================================
   KAPITEL 3
   VERSTEHEN
========================================================== */

PDF.render=function(){

    this.renderCover();

    this.renderWelcome();

    this.renderChapter1();

    this.renderChapter2();

    this.renderChapter3();

};



/* ==========================================================
   KAPITEL 3
========================================================== */

PDF.renderChapter3=function(){

    this.pages.chapter3.innerHTML=`

        <header class="page-header">

            <div class="logo">

                trotzdem.wahr

            </div>

            <div class="page-number">

                5

            </div>

        </header>



        <section class="chapter-header full">

            <div class="chapter-number">

                03

            </div>

            <h1 class="chapter-title">

                Verstehen

            </h1>

            <p class="quote">

                „Verstehen verändert den Blick – nicht die Vergangenheit.“

            </p>

        </section>



        <section class="card full">

            <h2 class="card-title">

                Warum reagieren wir manchmal automatisch?

            </h2>

            <p>

                Unser Gehirn versucht ständig,

                Situationen möglichst schnell

                einzuordnen.

                Deshalb greifen wir häufig

                auf bekannte Muster zurück,

                ohne bewusst darüber

                nachzudenken.

            </p>

            <p class="mt-2">

                Diese Reaktionen

                sind nicht falsch.

                Sie haben meist einmal

                einen wichtigen Zweck erfüllt.

                Erst wenn wir sie erkennen,

                können wir entscheiden,

                ob sie uns heute

                noch helfen.

            </p>

        </section>



        <section class="columns full">



            <article class="card">

                <h3>

                    Wie reagierst du meistens,

                    wenn dich etwas belastet?

                </h3>

                ${PDF.data.stress ?

                    `

                    <div class="chips">

                        <span class="chip selected">

                            ${PDF.data.stress}

                        </span>

                    </div>

                    `

                    :

                    `

                    <p class="small">

                        Keine Auswahl getroffen.

                    </p>

                    `

                }

            </article>



            <article class="card">

                <h3>

                    Welche Aussagen

                    treffen auf dich zu?

                </h3>

                ${PDF.createChips(

                    PDF.data.patterns

                )}

            </article>



        </section>



        <section class="card full">

            <h3>

                Gab es eine Situation,

                in der du dich selbst

                überrascht hast?

            </h3>

            ${PDF.answer(

                PDF.data.reflection

            )}

        </section>



        <section class="psychology full">

            <div class="psychology-icon">

                🧠

            </div>

            <div class="psychology-content">

                <h3 class="mb-2">

                    Ein Blick in die Psychologie

                </h3>

                <p>

                    Viele unserer Reaktionen

                    entstehen,

                    bevor wir bewusst

                    darüber nachdenken können.

                    Das Gehirn vergleicht

                    neue Situationen

                    mit früheren Erfahrungen

                    und entscheidet

                    innerhalb von Sekundenbruchteilen,

                    welche Reaktion

                    sinnvoll erscheint.

                </p>

            </div>

        </section>



        <section class="takeaway full">

            <h3>

                Für heute

            </h3>

            <p>

                Verstehen bedeutet nicht,

                alles sofort verändern

                zu müssen.

                Oft beginnt Entwicklung

                bereits dort,

                wo wir unsere eigenen Muster

                neugierig

                statt wertend betrachten.

            </p>

        </section>



        <footer class="page-footer">

            <span>

                trotzdem.wahr

            </span>

            <span class="page-number">

                5

            </span>

        </footer>

    `;

};
/* ==========================================================
   KAPITEL 4
   ERKENNEN
========================================================== */

PDF.render=function(){

    this.renderCover();

    this.renderWelcome();

    this.renderChapter1();

    this.renderChapter2();

    this.renderChapter3();

    this.renderChapter4();

};



/* ==========================================================
   KAPITEL 4
========================================================== */

PDF.renderChapter4=function(){

    this.pages.chapter4.innerHTML=`

        <header class="page-header">

            <div class="logo">

                trotzdem.wahr

            </div>

            <div class="page-number">

                6

            </div>

        </header>



        <section class="chapter-header full">

            <div class="chapter-number">

                04

            </div>

            <h1 class="chapter-title">

                Erkennen

            </h1>

            <p class="quote">

                „Nicht alles, was sich vertraut anfühlt, tut uns gut.“

            </p>

        </section>



        <section class="card full">

            <h2 class="card-title">

                Warnsignale erkennen

            </h2>

            <p>

                Manche Verhaltensweisen wirken

                auf den ersten Blick harmlos

                oder werden sogar

                als Fürsorge verstanden.

                Erst mit etwas Abstand erkennen wir,

                wie sehr sie unser Selbstwertgefühl

                oder unsere Freiheit

                beeinflusst haben.

            </p>

            <p class="mt-2">

                Dieses Kapitel soll dir helfen,

                typische Warnsignale

                besser einzuordnen –

                ohne Menschen vorschnell

                zu bewerten,

                sondern mit einem

                bewussteren Blick

                auf Beziehungen.

            </p>

        </section>



        <section class="columns full">



            <article class="card">

                <h3>

                    Welche Aussagen

                    kommen dir bekannt vor?

                </h3>

                ${PDF.createChips(

                    PDF.data.relationshipExperiences

                )}

            </article>



            <article class="card">

                <h3>

                    Welche Verhaltensweisen

                    empfindest du

                    grundsätzlich

                    als Warnsignal?

                </h3>

                ${PDF.createChips(

                    PDF.data.warningSigns

                )}

            </article>



        </section>



        <section class="card full">

            <h3>

                Welche Gedanken

                möchtest du

                zu diesem Thema

                festhalten?

            </h3>

            ${PDF.answer(

                PDF.data.realisation

            )}

        </section>



        <section class="psychology full">

            <div class="psychology-icon">

                🧠

            </div>

            <div class="psychology-content">

                <h3 class="mb-2">

                    Ein Blick in die Psychologie

                </h3>

                <p>

                    Manipulation beginnt

                    nur selten plötzlich.

                    Häufig entwickelt sie sich

                    schrittweise

                    durch Kontrolle,

                    Schuldgefühle,

                    Abwertung

                    oder das ständige

                    Infragestellen

                    der eigenen Wahrnehmung.

                </p>

                <p class="mt-2">

                    Je früher wir

                    solche Muster erkennen,

                    desto leichter fällt es,

                    unsere Grenzen

                    ernst zu nehmen.

                </p>

            </div>

        </section>



        <section class="takeaway full">

            <h3>

                Für heute

            </h3>

            <p>

                Deiner Wahrnehmung

                zu vertrauen

                ist kein Zeichen

                von Misstrauen,

                sondern

                von Selbstfürsorge.

            </p>

        </section>



        <footer class="page-footer">

            <span>

                trotzdem.wahr

            </span>

            <span class="page-number">

                6

            </span>

        </footer>

    `;

};
/* ==========================================================
   KAPITEL 5
   STÄRKEN
========================================================== */

PDF.render=function(){

    this.renderCover();

    this.renderWelcome();

    this.renderChapter1();

    this.renderChapter2();

    this.renderChapter3();

    this.renderChapter4();

    this.renderChapter5();

};



/* ==========================================================
   KAPITEL 5
========================================================== */

PDF.renderChapter5=function(){

    this.pages.chapter5.innerHTML=`

        <header class="page-header">

            <div class="logo">

                trotzdem.wahr

            </div>

            <div class="page-number">

                7

            </div>

        </header>



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



        <section class="card full">

            <h2 class="card-title">

                Deine Ressourcen

            </h2>

            <p>

                Oft fällt uns zuerst auf,

                was uns fehlt

                oder belastet.

                Dabei übersehen wir leicht,

                wie viele Fähigkeiten,

                Erfahrungen

                und Menschen

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

        </section>



        <section class="columns full">



            <article class="card">

                <h3>

                    Was gibt dir

                    im Alltag Kraft?

                </h3>

                ${PDF.createChips(

                    PDF.data.resources

                )}

            </article>



            <article class="card">

                <h3>

                    Welche Eigenschaften

                    erkennst du

                    bei dir?

                </h3>

                ${PDF.createChips(

                    PDF.data.strengths

                )}

            </article>



        </section>



        <section class="card full">

            <h3>

                Worauf bist du heute stolz –

                auch wenn es

                nur eine Kleinigkeit ist?

            </h3>

            ${PDF.answer(

                PDF.data.gratitude

            )}

        </section>



        <section class="psychology full">

            <div class="psychology-icon">

                🧠

            </div>

            <div class="psychology-content">

                <h3 class="mb-2">

                    Ein Blick in die Psychologie

                </h3>

                <p>

                    Resilienz beschreibt

                    die Fähigkeit,

                    schwierige Erfahrungen

                    zu bewältigen

                    und sich nach Belastungen

                    wieder zu stabilisieren.

                </p>

                <p class="mt-2">

                    Sie ist keine

                    angeborene Eigenschaft,

                    sondern entwickelt sich

                    durch Erfahrungen,

                    Beziehungen

                    und viele kleine Schritte

                    im Alltag.

                </p>

            </div>

        </section>



        <section class="takeaway full">

            <h3>

                Für heute

            </h3>

            <p>

                Du musst nicht perfekt sein,

                um wertvoll zu sein.

                Jeder kleine Schritt,

                den du heute gehst,

                zählt.

            </p>

        </section>



        <footer class="page-footer">

            <span>

                trotzdem.wahr

            </span>

            <span class="page-number">

                7

            </span>

        </footer>

    `;

};
/* ==========================================================
   KAPITEL 6
   WEITERGEHEN
========================================================== */

PDF.render=function(){

    this.renderCover();

    this.renderWelcome();

    this.renderChapter1();

    this.renderChapter2();

    this.renderChapter3();

    this.renderChapter4();

    this.renderChapter5();

    this.renderChapter6();

};



/* ==========================================================
   KAPITEL 6
========================================================== */

PDF.renderChapter6=function(){

    this.pages.chapter6.innerHTML=`

        <header class="page-header">

            <div class="logo">

                trotzdem.wahr

            </div>

            <div class="page-number">

                8

            </div>

        </header>



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



        <section class="card full">

            <h2 class="card-title">

                Dein nächster Schritt

            </h2>

            <p>

                Dieses Workbook endet hier,

                dein Weg jedoch nicht.

                Veränderungen entstehen

                selten über Nacht,

                sondern durch viele

                kleine Entscheidungen,

                die wir immer wieder treffen.

            </p>

            <p class="mt-2">

                Nimm dir einen Moment Zeit

                und halte fest,

                was du aus diesem Workbook

                für dich mitnehmen möchtest.

            </p>

        </section>



        <section class="columns full">



            <article class="card">

                <h3>

                    Was möchtest du

                    aus diesem Workbook

                    mitnehmen?

                </h3>

                ${PDF.createChips(

                    PDF.data.takeaway

                )}

            </article>



            <article class="card">

                <h3>

                    Wer oder was

                    kann dich

                    auf deinem Weg

                    unterstützen?

                </h3>

                ${PDF.createChips(

                    PDF.data.support

                )}

            </article>



        </section>



        <section class="card full">

            <h3>

                Meine wichtigste Erkenntnis

            </h3>

            ${PDF.answer(

                PDF.data.insight

            )}

        </section>



        <section class="card full">

            <h3>

                Mein nächster Schritt

            </h3>

            ${PDF.answer(

                PDF.data.nextStep

            )}

        </section>



        <section class="card full">

            <h3>

                An mein zukünftiges Ich

            </h3>

            ${PDF.answer(

                PDF.data.futureMessage

            )}

        </section>



        <section class="psychology full">

            <div class="psychology-icon">

                🧠

            </div>

            <div class="psychology-content">

                <h3 class="mb-2">

                    Ein Blick in die Psychologie

                </h3>

                <p>

                    Nachhaltige Veränderungen

                    entstehen selten

                    durch einen einzigen

                    großen Moment.

                </p>

                <p class="mt-2">

                    Viel häufiger entwickeln sie sich

                    durch viele kleine Entscheidungen,

                    die wir immer wieder treffen.

                </p>

            </div>

        </section>



        <section class="takeaway full">

            <h3>

                Für heute

            </h3>

            <p>

                Du musst nicht

                alle Antworten kennen.

                Es reicht,

                wenn du bereit bist,

                den nächsten kleinen Schritt

                zu gehen.

            </p>

        </section>



        <footer class="page-footer">

            <span>

                trotzdem.wahr

            </span>

            <span class="page-number">

                8

            </span>

        </footer>

    `;

};
/* ==========================================================
   ABSCHLUSSSEITE
========================================================== */

PDF.render=function(){

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
   ABSCHLUSS
========================================================== */

PDF.renderFinalPage=function(){

    this.pages.final.innerHTML=`

        <header class="page-header">

            <div class="logo">

                trotzdem.wahr

            </div>

            <div class="page-number">

                9

            </div>

        </header>



        <section class="full center">

            <h1>

                Danke,

                dass du dir

                Zeit genommen hast.

            </h1>

        </section>



        <section class="card full">

            <h2 class="card-title">

                Deine wichtigste Erkenntnis

            </h2>

            ${PDF.answer(

                PDF.data.insight

            )}

        </section>



        <section class="card full">

            <h2 class="card-title">

                Dein nächster Schritt

            </h2>

            ${PDF.answer(

                PDF.data.nextStep

            )}

        </section>



        <section class="card full">

            <h2 class="card-title">

                Für dein zukünftiges Ich

            </h2>

            ${PDF.answer(

                PDF.data.futureMessage

            )}

        </section>



        <section class="takeaway full">

            <h3>

                Vielleicht möchtest du dir merken:

            </h3>

            <p>

                Heilung bedeutet nicht,

                nie wieder zu fallen.

            </p>

            <p class="mt-2">

                Heilung bedeutet,

                dich immer wieder

                für dich selbst

                zu entscheiden.

            </p>

        </section>



        <section class="full center">

            <p class="final-quote">

                „Du bist mehr

                als das,

                was dir passiert ist.“

            </p>

        </section>



        <footer class="page-footer">

            <span>

                trotzdem.wahr

            </span>

            <span class="page-number">

                9

            </span>

        </footer>

    `;

};



/* ==========================================================
   ALLE SEITEN RENDERN
========================================================== */

PDF.renderAll=function(){

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
   PDF ERSTELLEN
========================================================== */

PDF.export=function(){

    const element=document.getElementById(

        "pdfDocument"

    );



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

            backgroundColor:"#F7F4EF"

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

};



/* ==========================================================
   DOWNLOAD BUTTON
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        PDF.renderAll();



        const button=

            document.querySelector(

                "#downloadPdf"

            );



        if(button){

            button.addEventListener(

                "click",

                ()=>{

                    PDF.export();

                }

            );

        }

    }

);
