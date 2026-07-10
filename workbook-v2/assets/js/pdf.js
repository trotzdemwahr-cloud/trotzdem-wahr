/*
========================================================

trotzdem.wahr
PDF V2

========================================================
*/

const pdf = document.getElementById("pdf");

const answers = JSON.parse(

    localStorage.getItem("workbook-answers")

) || {};



document.addEventListener(

    "DOMContentLoaded",

    buildPDF

);
async function buildPDF(){

    createHero();

    createSteps();

    await new Promise(resolve => {

        requestAnimationFrame(() => {

            requestAnimationFrame(resolve);

        });

    });

    await generatePDF();

}
function createHero(){

    pdf.insertAdjacentHTML(

        "beforeend",

        `

        <section class="hero">

            <h1>

                Zurück zu dir

            </h1>

            <p>

                Dein persönliches Workbook

            </p>

        </section>

        `

    );

}
function createSteps(){

    const titles=[

        "Ankommen",

        "Wahrnehmen",

        "Verstehen",

        "Erkennen",

        "Stärken",

        "Weitergehen"

    ];



    titles.forEach((title,index)=>{

    const section = document.createElement("section");

    section.className = "step";

    section.innerHTML = `

        <h2 class="step-title">

            Schritt ${index+1}

            ·

            ${title}

        </h2>

    `;

    switch(index){

        case 1:

            addAnswer(section,"Gefühle",answers.feelings);

            addAnswer(section,"Gedanken",answers.thoughts);

            addAnswer(section,"Was kostet Kraft?",answers.energy);

            break;

        case 2:

            addAnswer(section,"Stressreaktion",answers.stress);

            addAnswer(section,"Verhaltensmuster",answers.patterns);

            addAnswer(section,"Reflexion",answers.reflection);

            break;

        case 3:

            addAnswer(section,"Beziehungen",answers.relationship_experiences);

            addAnswer(section,"Warnsignale",answers.warning_signs);

            addAnswer(section,"Gedanken",answers.realisation);

            break;

        case 4:

            addAnswer(section,"Ressourcen",answers.resources);

            addAnswer(section,"Stärken",answers.strengths);

            addAnswer(section,"Darauf bin ich stolz",answers.gratitude);

            break;

        case 5:

            addAnswer(section,"Erkenntnis",answers.insight);

            addAnswer(section,"Nächster Schritt",answers["next-step"]);

            addAnswer(section,"Nachricht",answers["future-message"]);

            break;

    }

    pdf.appendChild(section);

});

}
/* =====================================================
   ANTWORTEN RENDERN
===================================================== */

function addAnswer(section, title, value) {

    if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
    ) {
        return;
    }

    const card = document.createElement("article");

    card.className = "card";

    const label = document.createElement("div");

    label.className = "card-label";

    label.textContent = title;

    card.appendChild(label);

    const answer = document.createElement("div");

    answer.className = "answer";

    if (Array.isArray(value)) {

        answer.innerHTML = value
            .map(item => "• " + item)
            .join("<br>");

    } else {

        answer.textContent = value;

    }

    card.appendChild(answer);

    adaptFontSize(answer);

    section.appendChild(card);

}
/* =====================================================
   DYNAMISCHE SCHRIFTGRÖSSE
===================================================== */

function adaptFontSize(element){

    const length = element.textContent.length;

    if(length > 1200){

        element.classList.add("tiny");

    }

    else if(length > 700){

        element.classList.add("small");

    }

}
/* =====================================================
   PDF ERSTELLEN
===================================================== */

async function generatePDF() {

    const element = document.getElementById("pdf");

    const options = {

        margin: 0,

        filename: "Zurück-zu-dir_Workbook.pdf",

        image: {

            type: "jpeg",

            quality: 1

        },

        html2canvas: {

            scale: 2,

            useCORS: true,

            scrollY: 0

        },

        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation: "portrait"

        },

        pagebreak: {

            mode: [

                "avoid-all",

                "css"

            ]

        }

    };

    await html2pdf()

        .set(options)

        .from(element)

        .save();

}
