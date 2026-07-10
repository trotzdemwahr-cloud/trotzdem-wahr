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
