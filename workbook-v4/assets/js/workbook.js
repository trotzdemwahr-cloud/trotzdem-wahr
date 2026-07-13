/*
=========================================================
trotzdem.wahr
Workbook V4
=========================================================
*/


/* =========================================================
   ELEMENTE
========================================================= */

const hero = document.getElementById("hero");

const progress = document.getElementById("progress");

const startButton = document.getElementById("startWorkbook");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const restartButton = document.getElementById("restartWorkbook");

const progressFill = document.getElementById("progressFill");

const currentStep = document.getElementById("currentStep");

const navigation = document.querySelector(".navigation");

const steps = [...document.querySelectorAll(".step")];

const inputs = [...document.querySelectorAll("input, textarea")];



/* =========================================================
   EINSTELLUNGEN
========================================================= */

const STORAGE_KEY = "trotzdemWahrWorkbookV4";

let currentIndex = 0;

let workbookData = loadWorkbook();



/* =========================================================
   START
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    initialiseWorkbook

);



function initialiseWorkbook(){

    restoreWorkbook();

    bindInputs();

    hideWorkbook();

}



/* =========================================================
   HERO
========================================================= */

startButton.addEventListener(

    "click",

    startWorkbook

);



function startWorkbook(){

    hero.style.display = "none";

    progress.style.display = "block";

    navigation.style.display = "flex";

    showStep(0);

}



/* =========================================================
   WORKBOOK AUSBLENDEN
========================================================= */

function hideWorkbook(){

    progress.style.display = "none";

    navigation.style.display = "none";

    steps.forEach(step=>{

        step.classList.remove("active");

    });

}
/* =========================================================
   SCHRITT ANZEIGEN
========================================================= */

function showStep(index){

    steps.forEach(step=>{

        step.classList.remove("active");

    });

    currentIndex = index;

    steps[currentIndex].classList.add("active");

    updateProgress();

    updateNavigation();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



/* =========================================================
   NAVIGATION
========================================================= */

nextButton.addEventListener(

    "click",

    handleNext

);



previousButton.addEventListener(

    "click",

    handlePrevious

);



function handleNext(){

    /* Letzter Schritt */

    if(currentIndex===steps.length-1){

        saveWorkbook();

        window.location.href="pdf.html";

        return;

    }

    showStep(currentIndex+1);

}



function handlePrevious(){

    if(currentIndex===0){

        return;

    }

    showStep(currentIndex-1);

}



/* =========================================================
   NAVIGATION AKTUALISIEREN
========================================================= */

function updateNavigation(){

    previousButton.disabled = currentIndex===0;

    if(currentIndex===steps.length-1){

        nextButton.textContent="PDF erstellen";

    }

    else{

        nextButton.textContent="Weiter";

    }

}



/* =========================================================
   FORTSCHRITT
========================================================= */

function updateProgress(){

    currentStep.textContent=currentIndex+1;

    const percent=

        ((currentIndex+1)/steps.length)*100;

    progressFill.style.width=`${percent}%`;

}
/* =========================================================
   INPUTS VERBINDEN
========================================================= */

function bindInputs(){

    inputs.forEach(input=>{

        input.addEventListener(

            "input",

            saveWorkbook

        );

        input.addEventListener(

            "change",

            saveWorkbook

        );

    });

}



/* =========================================================
   SPEICHERN
========================================================= */

function saveWorkbook(){

    workbookData = {};

    inputs.forEach(input=>{

        /* Checkboxen */

        if(input.type==="checkbox"){

            if(!workbookData[input.name]){

                workbookData[input.name]=[];

            }

            if(input.checked){

                workbookData[input.name].push(

                    input.value

                );

            }

            return;

        }

        /* Radio */

        if(input.type==="radio"){

            if(input.checked){

                workbookData[input.name]=

                    input.value;

            }

            return;

        }

        /* Textfelder */

        workbookData[input.id]=

            input.value;

    });

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(workbookData)

    );

}



/* =========================================================
   LADEN
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
   WIEDERHERSTELLEN
========================================================= */

function restoreWorkbook(){

    inputs.forEach(input=>{

        /* Checkbox */

        if(input.type==="checkbox"){

            const values=

                workbookData[input.name];

            if(

                Array.isArray(values) &&

                values.includes(input.value)

            ){

                input.checked=true;

            }

            return;

        }

        /* Radio */

        if(input.type==="radio"){

            if(

                workbookData[input.name]===

                input.value

            ){

                input.checked=true;

            }

            return;

        }

        /* Text */

        if(

            workbookData[input.id]!==undefined

        ){

            input.value=

                workbookData[input.id];

        }

    });

}
/* =========================================================
   WORKBOOK ZURÜCKSETZEN
========================================================= */

restartButton.addEventListener(

    "click",

    restartWorkbook

);



function restartWorkbook(){

    const confirmed = confirm(

        "Möchtest du wirklich alle Antworten löschen und das Workbook neu starten?"

    );

    if(!confirmed){

        return;

    }

    localStorage.removeItem(

        STORAGE_KEY

    );

    workbookData = {};

    inputs.forEach(input=>{

        if(

            input.type==="checkbox" ||

            input.type==="radio"

        ){

            input.checked=false;

        }

        else{

            input.value="";

        }

    });

    hero.style.display="block";

    hideWorkbook();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



/* =========================================================
   SEITE VERLASSEN
========================================================= */

window.addEventListener(

    "beforeunload",

    saveWorkbook

);



/* =========================================================
   INITIALER ZUSTAND
========================================================= */

/*
    Beim Laden wird ausschließlich
    der Hero angezeigt.

    Erst nach Klick auf
    "Workbook starten"
    erscheinen:

    - Progress
    - Schritt 1
    - Navigation

    Dadurch startet das Workbook
    immer sauber.
*/
