/* ==========================================================
   trotzdem.wahr
   Workbook V5
========================================================== */


/* ==========================================================
   KONSTANTEN
========================================================== */

const STORAGE_KEY = "trotzdem-wahr-workbook-v5";

const TOTAL_STEPS = 6;



/* ==========================================================
   STATUS
========================================================== */

let currentStep = 1;

let workbookData = {};



/* ==========================================================
   DOM
========================================================== */

const steps = document.querySelectorAll(".step");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

const nextButtons = document.querySelectorAll(".next-step");

const previousButtons = document.querySelectorAll(".previous-step");

const resetButton = document.getElementById("resetWorkbook");

const pdfButton = document.getElementById("downloadPdf");



/* ==========================================================
   OPTIONEN
========================================================== */

const workbookOptions = {

    feelings: [

        "Ängstlich",
        "Erschöpft",
        "Überfordert",
        "Traurig",
        "Leer",
        "Wütend",
        "Enttäuscht",
        "Verunsichert",
        "Hoffnungsvoll",
        "Dankbar",
        "Neugierig",
        "Mutig"

    ],

    thoughts: [

        "Ich bin nicht gut genug.",
        "Ich muss funktionieren.",
        "Ich darf keine Fehler machen.",
        "Niemand versteht mich.",
        "Ich bin zu empfindlich.",
        "Ich wünsche mir Ruhe."

    ],

    stress: [

        "Ich ziehe mich zurück.",
        "Ich suche das Gespräch.",
        "Ich funktioniere einfach weiter.",
        "Ich werde schnell emotional."

    ],

    patterns: [

        "Ich stelle meine Bedürfnisse hinten an.",
        "Ich entschuldige mich oft.",
        "Ich zweifle an mir.",
        "Ich möchte es allen recht machen.",
        "Ich übernehme Verantwortung für andere."

    ],

    relationshipExperiences: [

        "Ich wurde häufig kritisiert.",
        "Meine Gefühle wurden heruntergespielt.",
        "Ich musste mich oft rechtfertigen.",
        "Ich fühlte mich kontrolliert.",
        "Ich hatte Angst, etwas falsch zu machen."

    ],

    warningSigns: [

        "Kontrolle",
        "Abwertung",
        "Schuldgefühle",
        "Manipulation",
        "Grenzüberschreitungen",
        "Unberechenbarkeit"

    ],

    resources: [

        "Natur",
        "Freunde",
        "Familie",
        "Musik",
        "Bewegung",
        "Ruhe",
        "Kreativität"

    ],

    strengths: [

        "Empathie",
        "Mut",
        "Geduld",
        "Humor",
        "Kreativität",
        "Durchhaltevermögen",
        "Ehrlichkeit"

    ],

    takeaway: [

        "Mehr auf mein Gefühl hören.",
        "Grenzen setzen.",
        "Mir Zeit für mich nehmen.",
        "Freundlicher mit mir sprechen.",
        "Unterstützung annehmen."

    ],

    support: [

        "Familie",
        "Freunde",
        "Therapie",
        "Beratung",
        "Selbsthilfe",
        "Zeit für mich"

    ]

};
/* ==========================================================
   INITIALISIERUNG
========================================================== */

document.addEventListener("DOMContentLoaded", init);

function init(){

    loadWorkbook();

    renderOptions();

    restoreInputs();

    updateProgress();

}



/* ==========================================================
   SPEICHERN
========================================================== */

function saveWorkbook(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(workbookData)

    );

}



/* ==========================================================
   LADEN
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
   DATEN AKTUALISIEREN
========================================================== */

function updateValue(key,value){

    workbookData[key]=value;

    saveWorkbook();

}
/* ==========================================================
   OPTIONEN RENDERN
========================================================== */

function renderOptions(){

    renderCheckboxGroup("thoughts");

    renderCheckboxGroup("patterns");

    renderCheckboxGroup("relationshipExperiences");

    renderCheckboxGroup("warningSigns");

    renderCheckboxGroup("resources");

    renderCheckboxGroup("strengths");

    renderCheckboxGroup("takeaway");

    renderCheckboxGroup("support");

    renderRadioGroup("stress");

    renderFeelingGrid();

}



/* ==========================================================
   CHECKBOXEN
========================================================== */

function renderCheckboxGroup(key){

    const container=document.querySelector(

        `.checkbox-group[data-key="${key}"]`

    );

    if(!container) return;

    container.innerHTML="";

    workbookOptions[key].forEach(option=>{

        const label=document.createElement("label");

        label.className="option";

        label.innerHTML=`

            <input
                type="checkbox"
                value="${option}">

            <span>${option}</span>

        `;

        container.appendChild(label);

    });

}



/* ==========================================================
   RADIOBUTTONS
========================================================== */

function renderRadioGroup(key){

    const container=document.querySelector(

        `.radio-group[data-key="${key}"]`

    );

    if(!container) return;

    container.innerHTML="";

    workbookOptions[key].forEach(option=>{

        const label=document.createElement("label");

        label.className="option";

        label.innerHTML=`

            <input
                type="radio"
                name="${key}"
                value="${option}">

            <span>${option}</span>

        `;

        container.appendChild(label);

    });

}



/* ==========================================================
   GEFÜHLE
========================================================== */

function renderFeelingGrid(){

    const container=document.getElementById("feelings");

    if(!container) return;

    container.innerHTML="";

    workbookOptions.feelings.forEach(feeling=>{

        const label=document.createElement("label");

        label.className="option";

        label.innerHTML=`

            <input
                type="checkbox"
                value="${feeling}">

            <span>${feeling}</span>

        `;

        container.appendChild(label);

    });

}
/* ==========================================================
   EINGABEN INITIALISIEREN
========================================================== */

function restoreInputs(){

    restoreTextareas();

    restoreCheckboxes();

    restoreRadios();

}



/* ==========================================================
   TEXTFELDER
========================================================== */

function restoreTextareas(){

    document.querySelectorAll("textarea").forEach(textarea=>{

        const key=textarea.dataset.key;

        textarea.value=workbookData[key] || "";

        textarea.addEventListener("input",()=>{

            updateValue(

                key,

                textarea.value

            );

        });

    });

}



/* ==========================================================
   CHECKBOXEN
========================================================== */

function restoreCheckboxes(){

    document.querySelectorAll(

        '.checkbox-group input[type="checkbox"], #feelings input[type="checkbox"]'

    ).forEach(input=>{

        const container=input.closest(

            ".checkbox-group, .feeling-grid"

        );

        const key=

            container.id==="feelings"

            ? "feelings"

            : container.dataset.key;

        const values=workbookData[key] || [];

        input.checked=values.includes(input.value);

        input.addEventListener("change",()=>{

            const checked=[

                ...container.querySelectorAll(

                    'input[type="checkbox"]:checked'

                )

            ].map(item=>item.value);

            updateValue(

                key,

                checked

            );

        });

    });

}



/* ==========================================================
   RADIOBUTTONS
========================================================== */

function restoreRadios(){

    document.querySelectorAll(

        '.radio-group input[type="radio"]'

    ).forEach(input=>{

        const container=input.closest(".radio-group");

        const key=container.dataset.key;

        input.checked=

            workbookData[key]===input.value;

        input.addEventListener("change",()=>{

            updateValue(

                key,

                input.value

            );

        });

    });

}
/* ==========================================================
   NAVIGATION
========================================================== */

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        if(currentStep<TOTAL_STEPS){

            showStep(currentStep+1);

        }

    });

});



previousButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        if(currentStep>1){

            showStep(currentStep-1);

        }

    });

});



/* ==========================================================
   SCHRITT ANZEIGEN
========================================================== */

function showStep(step){

    currentStep=step;

    steps.forEach(section=>{

        section.classList.remove("active");

    });

    document

        .getElementById(`step${step}`)

        .classList.add("active");

    updateProgress();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



/* ==========================================================
   FORTSCHRITT
========================================================== */

function updateProgress(){

    const percent=(

        currentStep/

        TOTAL_STEPS

    )*100;

    progressBar.style.width=`${percent}%`;

    progressText.textContent=

        `Schritt ${currentStep} von ${TOTAL_STEPS}`;

}
/* ==========================================================
   WORKBOOK ZURÜCKSETZEN
========================================================== */

if(resetButton){

    resetButton.addEventListener("click",()=>{

        const confirmed=confirm(

            "Möchtest du wirklich alle Antworten löschen?"

        );

        if(!confirmed) return;

        localStorage.removeItem(STORAGE_KEY);

        workbookData={};

        location.reload();

    });

}



/* ==========================================================
   PDF ÖFFNEN
========================================================== */

if(pdfButton){

    pdfButton.addEventListener("click",()=>{

        saveWorkbook();

        window.open(

            "pdf.html",

            "_blank"

        );

    });

}



/* ==========================================================
   ENDE
========================================================== */
