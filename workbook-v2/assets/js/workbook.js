/*
========================================================

trotzdem.wahr
Workbook V2

========================================================
*/

const steps = [...document.querySelectorAll(".step")];

const progressFill = document.querySelector(".progress__fill");

const currentStepText = document.getElementById("current-step");

const previousButton = document.querySelector(".button--secondary");

const nextButton = document.querySelector(".button--primary");

let currentStep = 0;



/* =====================================================
   START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initialiseWorkbook();

});



/* =====================================================
   INITIALISIEREN
===================================================== */

function initialiseWorkbook(){

    loadProgress();

updateView();

bindEvents();

initialiseInputs();

initialiseTextareas();
}
/* =====================================================
   EVENTS
===================================================== */

function bindEvents(){

    nextButton.addEventListener("click", nextStep);

    previousButton.addEventListener("click", previousStep);

}
/* =====================================================
   NAVIGATION
===================================================== */

function nextStep(){

    if(currentStep === steps.length - 1){

        window.location.href = "pdf.html";

        return;

    }

    currentStep++;

    saveProgress();

    updateView();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


function previousStep(){

    if(currentStep <= 0){

        return;

    }

    currentStep--;

    saveProgress();

    updateView();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

    currentStep--;

    saveProgress();

    updateView();

}
/* =====================================================
   ANSICHT AKTUALISIEREN
===================================================== */

function updateView(){

    steps.forEach((step,index)=>{

        step.style.display =
            index === currentStep
            ? "block"
            : "none";

    });


    currentStepText.textContent = currentStep + 1;


    progressFill.style.width =
        `${((currentStep+1)/steps.length)*100}%`;


    previousButton.disabled =
        currentStep === 0;


    if(currentStep === steps.length-1){

        nextButton.textContent =
            "PDF erstellen";

    }

    else{

        nextButton.textContent =
            "Weiter";

    }

}
/* =====================================================
   SPEICHERN
===================================================== */

function saveProgress(){

    localStorage.setItem(

        "workbook-progress",

        currentStep

    );

}



function loadProgress(){

    const saved = localStorage.getItem(

        "workbook-progress"

    );

    if(saved !== null){

        currentStep = Number(saved);

    }

}
/* =====================================================
   ANTWORTEN SPEICHERN
===================================================== */

const STORAGE_KEY = "workbook-answers";

let answers = loadAnswers();

function loadAnswers(){

    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : {};

}

function saveAnswers(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(answers)

    );

}
/* =====================================================
   FORMULARE INITIALISIEREN
===================================================== */

function initialiseInputs(){

    const inputs = document.querySelectorAll(

        "input, textarea"

    );

    inputs.forEach(input=>{

        const key = getInputKey(input);

        if(!key) return;

        restoreInput(input,key);

        input.addEventListener(

            "input",

            ()=>updateInput(input,key)

        );

        input.addEventListener(

            "change",

            ()=>updateInput(input,key)

        );

    });

}
/* =====================================================
   TEXTAREAS
===================================================== */

function initialiseTextareas() {

    const textareas = document.querySelectorAll("textarea");

    textareas.forEach(textarea => {

        autoResize(textarea);

        textarea.addEventListener("input", () => {

            autoResize(textarea);

        });

    });

}



function autoResize(textarea) {

    textarea.style.height = "auto";

    textarea.style.height = textarea.scrollHeight + "px";

}
/* =====================================================
   INPUT AKTUALISIEREN
===================================================== */

function updateInput(input,key){

    if(input.type==="checkbox"){

        const group = input.name || key;

        answers[group] = [...document.querySelectorAll(

            `input[name="${group}"]:checked`

        )].map(item=>item.value);

    }

    else if(input.type==="radio"){

        answers[key] = input.value;

    }

    else{

        answers[key] = input.value;

    }

    saveAnswers();

}
/* =====================================================
   INPUT WIEDERHERSTELLEN
===================================================== */

function restoreInput(input,key){

    if(input.type==="checkbox"){

        const values = answers[input.name];

        if(Array.isArray(values)){

            input.checked = values.includes(input.value);

        }

    }

    else if(input.type==="radio"){

        input.checked =

            answers[key]===input.value;

    }

    else{

        input.value = answers[key] || "";

    }

}
/* =====================================================
   HILFSFUNKTION
===================================================== */

function getInputKey(input){

    if(input.name){

        return input.name;

    }

    if(input.id){

        return input.id;

    }

    return null;

}
