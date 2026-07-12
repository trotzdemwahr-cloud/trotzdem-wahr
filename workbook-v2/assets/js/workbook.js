/*
=========================================================
trotzdem.wahr
Workbook V3
=========================================================
*/


/* =========================================================
   ELEMENTE
========================================================= */

const hero = document.getElementById("hero");

const startButton = document.getElementById("startWorkbook");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const progressFill = document.getElementById("progressFill");

const currentStep = document.getElementById("currentStep");

const steps = [...document.querySelectorAll(".step")];



/* =========================================================
   EINSTELLUNGEN
========================================================= */

const STORAGE_KEY = "trotzdemWahrWorkbookV3";

let activeStep = 0;

let workbookData = loadWorkbook();



/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initialiseWorkbook
);



function initialiseWorkbook() {

    bindInputs();

    restoreInputs();

    showStep(0);

}



/* =========================================================
   HERO
========================================================= */

startButton.addEventListener("click", () => {

    hero.style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});



/* =========================================================
   NAVIGATION
========================================================= */

nextButton.addEventListener("click", () => {

    if (activeStep >= steps.length - 1) return;

    showStep(activeStep + 1);

});


previousButton.addEventListener("click", () => {

    if (activeStep <= 0) return;

    showStep(activeStep - 1);

});



/* =========================================================
   SCHRITT WECHSELN
========================================================= */

function showStep(index) {

    activeStep = index;

    steps.forEach(step => {

        step.classList.remove("active");

    });

    steps[index].classList.add("active");

    updateProgress();

    updateButtons();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* =========================================================
   FORTSCHRITT
========================================================= */

function updateProgress() {

    currentStep.textContent = activeStep + 1;

    progressFill.style.width =

        `${((activeStep + 1) / steps.length) * 100}%`;

}
/* =========================================================
   BUTTONS
========================================================= */

function updateButtons() {

    previousButton.disabled = activeStep === 0;

    if (activeStep === steps.length - 1) {

        nextButton.textContent = "PDF erstellen";

    } else {

        nextButton.textContent = "Weiter";

    }

}



/* =========================================================
   SPEICHERN
========================================================= */

function bindInputs() {

    const fields = document.querySelectorAll(

        "input, textarea"

    );

    fields.forEach(field => {

        field.addEventListener(

            "change",

            saveWorkbook

        );

        if (field.tagName === "TEXTAREA") {

            field.addEventListener(

                "input",

                saveWorkbook

            );

        }

    });

}



function saveWorkbook() {

    workbookData = {};

    const fields = document.querySelectorAll(

        "input, textarea"

    );

    fields.forEach(field => {

        if (field.type === "checkbox") {

            if (!workbookData[field.name]) {

                workbookData[field.name] = [];

            }

            if (field.checked) {

                workbookData[field.name].push(

                    field.value

                );

            }

            return;

        }

        if (field.type === "radio") {

            if (field.checked) {

                workbookData[field.name] =

                    field.value;

            }

            return;

        }

        workbookData[field.id] =

            field.value;

    });

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(workbookData)

    );

}



/* =========================================================
   LADEN
========================================================= */

function loadWorkbook() {

    try {

        return JSON.parse(

            localStorage.getItem(STORAGE_KEY)

        ) || {};

    }

    catch {

        return {};

    }

}
/* =========================================================
   WIEDERHERSTELLEN
========================================================= */

function restoreInputs() {

    const fields = document.querySelectorAll(

        "input, textarea"

    );

    fields.forEach(field => {

        if (field.type === "checkbox") {

            const values = workbookData[field.name];

            if (

                Array.isArray(values) &&

                values.includes(field.value)

            ) {

                field.checked = true;

            }

            return;

        }

        if (field.type === "radio") {

            if (

                workbookData[field.name] === field.value

            ) {

                field.checked = true;

            }

            return;

        }

        if (

            workbookData[field.id] !== undefined

        ) {

            field.value = workbookData[field.id];

        }

    });

}



/* =========================================================
   PDF
========================================================= */

nextButton.addEventListener("click", () => {

    if (activeStep < steps.length - 1) return;

    saveWorkbook();

    window.open(

        "pdf.html",

        "_blank"

    );

});



/* =========================================================
   RESET (OPTIONAL)
========================================================= */

function resetWorkbook() {

    if (

        !confirm(

            "Möchtest du wirklich alle Antworten löschen?"

        )

    ) {

        return;

    }

    localStorage.removeItem(

        STORAGE_KEY

    );

    location.reload();

}



/* =========================================================
   DEBUG (ENTFERNEN VOR RELEASE)
========================================================= */

// window.resetWorkbook = resetWorkbook;
