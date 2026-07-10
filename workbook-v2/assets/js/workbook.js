/*
========================================================

trotzdem.wahr
Workbook

========================================================
*/


/* ==========================================
   KONSTANTEN
========================================== */

const STORAGE_KEY = "trotzdemWahrWorkbook";

const steps = [...document.querySelectorAll(".step")];

const progressFill = document.querySelector(".progress__fill");

const currentStepText = document.getElementById("current-step");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");



let currentStep = 0;

let answers = {};



/* ==========================================
   START
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    initialiseWorkbook

);



/* ==========================================
   INITIALISIERUNG
========================================== */
function initialiseWorkbook(){

    loadAnswers();

    restoreCurrentStep();

    bindEvents();

    initialiseInputs();

    initialiseTextareas();

    updateView();

}

/* ==========================================
   EVENTS
========================================== */

function bindEvents(){

    previousButton.addEventListener(

        "click",

        previousStep

    );



    nextButton.addEventListener(

        "click",

        nextStep

    );

}
/* ==========================================
   NAVIGATION
========================================== */

function nextStep(){

    if(currentStep >= steps.length-1){

        preparePDF();

        return;

    }

    currentStep++;

    saveCurrentStep();

    updateView();

}



function previousStep(){

    if(currentStep===0){

        return;

    }

    currentStep--;

    saveCurrentStep();

    updateView();

}
/* ==========================================
   ANSICHT
========================================== */

function updateView(){

    steps.forEach((step,index)=>{

        step.classList.toggle(

            "active",

            index===currentStep

        );

    });



    progressFill.style.width=

        `${((currentStep+1)/steps.length)*100}%`;



    currentStepText.textContent=

        currentStep+1;



    previousButton.disabled=

        currentStep===0;



    nextButton.textContent=

        currentStep===steps.length-1

        ? "PDF herunterladen"

        : "Weiter";



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
/* ==========================================
   SPEICHERN
========================================== */

function loadAnswers(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){

        try{

            answers = JSON.parse(saved);

        }

        catch(error){

            answers = {};

        }

    }

}



function saveAnswers(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(answers)

    );

}
/* ==========================================
   AKTUELLER SCHRITT
========================================== */

function saveCurrentStep(){

    answers.currentStep = currentStep;

    saveAnswers();

}



function restoreCurrentStep(){

    if(

        typeof answers.currentStep === "number"

    ){

        currentStep = answers.currentStep;

    }

}
/* ==========================================
   PDF
========================================== */

function preparePDF(){

    saveCurrentStep();

    saveAnswers();

    window.location.href = "pdf.html";

}
/* ==========================================
   INPUTS
========================================== */

function initialiseInputs(){

    const inputs = document.querySelectorAll(

        "input, textarea"

    );

    inputs.forEach(input=>{

        restoreInput(input);

        input.addEventListener(

            "input",

            ()=>handleInput(input)

        );

        input.addEventListener(

            "change",

            ()=>handleInput(input)

        );

    });

}
/* ==========================================
   EINGABEN VERARBEITEN
========================================== */

function handleInput(input){

    if(input.type==="checkbox"){

        const values=[

            ...document.querySelectorAll(

                `input[name="${input.name}"]:checked`

            )

        ].map(item=>item.value);

        answers[input.name]=values;

    }

    else if(input.type==="radio"){

        if(input.checked){

            answers[input.name]=input.value;

        }

    }

    else{

        answers[input.id]=input.value;

    }

    saveAnswers();

}
/* ==========================================
   WIEDERHERSTELLEN
========================================== */

function restoreInput(input){

    if(input.type==="checkbox"){

        const values = answers[input.name];

        if(Array.isArray(values)){

            input.checked = values.includes(

                input.value

            );

        }

        return;

    }



    if(input.type==="radio"){

        input.checked =

            answers[input.name]===input.value;

        return;

    }



    if(input.id){

    input.value =

        answers[input.id] || "";

    resizeTextarea(input);

}

}
/* ==========================================
   TEXTAREAS
========================================== */

function initialiseTextareas(){

    const textareas = document.querySelectorAll("textarea");

    textareas.forEach(textarea=>{

        resizeTextarea(textarea);

        textarea.addEventListener(

            "input",

            ()=>resizeTextarea(textarea)

        );

    });

}



function resizeTextarea(textarea){

    textarea.style.height = "auto";

    textarea.style.height =

        textarea.scrollHeight + "px";

}
