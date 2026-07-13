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

const startButton = document.getElementById("startWorkbook");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const restartButton = document.getElementById("restartWorkbook");

const progressFill = document.getElementById("progressFill");

const currentStep = document.getElementById("currentStep");

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

    updateNavigation();

    updateProgress();

}



/* =========================================================
   HERO
========================================================= */

startButton.addEventListener(

    "click",

    ()=>{

        hero.style.display="none";

        showStep(0);

    }

);



/* =========================================================
   SCHRITT ANZEIGEN
========================================================= */

function showStep(index){

    steps.forEach(step=>{

        step.classList.remove("active");

    });

    currentIndex=index;

    steps[currentIndex].classList.add("active");

    updateNavigation();

    updateProgress();

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

    ()=>{

        if(currentIndex===steps.length-1){

            saveWorkbook();

            window.open(

                "pdf.html",

                "_blank"

            );

            return;

        }

        showStep(currentIndex+1);

    }

);



previousButton.addEventListener(

    "click",

    ()=>{

        if(currentIndex===0){

            return;

        }

        showStep(currentIndex-1);

    }

);
/* =========================================================
   NAVIGATION AKTUALISIEREN
========================================================= */

function updateNavigation(){

    previousButton.disabled = currentIndex === 0;

    if(currentIndex === steps.length - 1){

        nextButton.textContent = "PDF erstellen";

    }

    else{

        nextButton.textContent = "Weiter";

    }

}



/* =========================================================
   FORTSCHRITT
========================================================= */

function updateProgress(){

    currentStep.textContent = currentIndex + 1;

    const progress =

        ((currentIndex + 1) / steps.length) * 100;

    progressFill.style.width = `${progress}%`;

}



/* =========================================================
   AUTOSAVE
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

        if(input.type === "checkbox"){

            if(!workbookData[input.name]){

                workbookData[input.name] = [];

            }

            if(input.checked){

                workbookData[input.name].push(

                    input.value

                );

            }

            return;

        }

        if(input.type === "radio"){

            if(input.checked){

                workbookData[input.name] =

                    input.value;

            }

            return;

        }

        workbookData[input.id] = input.value;

    });

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(workbookData)

    );

}
/* =========================================================
   WIEDERHERSTELLEN
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



function restoreWorkbook(){

    inputs.forEach(input=>{

        if(input.type==="checkbox"){

            const values = workbookData[input.name];

            if(

                Array.isArray(values) &&

                values.includes(input.value)

            ){

                input.checked = true;

            }

            return;

        }

        if(input.type==="radio"){

            if(

                workbookData[input.name]===input.value

            ){

                input.checked = true;

            }

            return;

        }

        if(

            workbookData[input.id]!==undefined

        ){

            input.value = workbookData[input.id];

        }

    });

}



/* =========================================================
   WORKBOOK ZURÜCKSETZEN
========================================================= */

restartButton.addEventListener(

    "click",

    resetWorkbook

);



function resetWorkbook(){

    const confirmed = confirm(

        "Möchtest du wirklich alle Antworten löschen und das Workbook neu beginnen?"

    );

    if(!confirmed){

        return;

    }

    localStorage.removeItem(

        STORAGE_KEY

    );

    location.reload();

}



/* =========================================================
   INITIALER SCHRITT
========================================================= */

showStep(0);
