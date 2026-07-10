/*
========================================================

trotzdem.wahr
Workbook

========================================================
*/


/* ==========================================
   ELEMENTE
========================================== */

const steps = [...document.querySelectorAll(".step")];

const progressFill = document.querySelector(".progress__fill");

const currentStepElement = document.getElementById("current-step");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const STORAGE_KEY = "trotzdemWahrWorkbook";

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
   INITIALISIEREN
========================================== */

function initialiseWorkbook(){

    loadAnswers();

    bindEvents();

    initialiseInputs();

    initialiseTextareas();

    updateView();

}
/* ==========================================
   SPEICHERN
========================================== */

function loadAnswers(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){

        answers = JSON.parse(saved);

    }

}



function saveAnswers(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(answers)

    );

}
/* ==========================================
   FORTSCHRITT SPEICHERN
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
