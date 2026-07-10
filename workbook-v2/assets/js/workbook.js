/*
======================================================

trotzdem.wahr
Workbook V2

======================================================
*/

document.addEventListener("DOMContentLoaded", initWorkbook);

function initWorkbook() {

    renderWorkbook();
}
    
    function renderHero(container) {

    const hero = createElement("header", "hero");

    const content = createElement("div", "hero__content");

    content.appendChild(
        createText(
            "span",
            "hero__eyebrow",
            "Kostenloses Workbook"
        )
    );

    content.appendChild(
        createText(
            "h1",
            "hero__title",
            workbookData.title
        )
    );

    content.appendChild(
        createText(
            "p",
            "hero__subtitle",
            workbookData.subtitle
        )
    );

    hero.appendChild(content);

    container.appendChild(hero);

}
function renderSteps(container) {

    workbookData.steps.forEach(step => {

        const section = createElement("section", "step");

        section.dataset.step = step.id;

        section.appendChild(
            createText(
                "span",
                "step__number",
                `Schritt ${step.id}`
            )
        );

        section.appendChild(
            createText(
                "h2",
                "step__title",
                step.title
            )
        );

        section.appendChild(
            createText(
                "h3",
                "step__heading",
                step.intro.heading
            )
        );

        section.appendChild(
            createText(
                "p",
                "step__text",
                step.intro.text
            )
        );

        container.appendChild(section);

    });

}

function renderWorkbook() {

    const app = document.getElementById("workbook");

    app.innerHTML = "";

    renderHero(app);

    renderSteps(app);

}
function createElement(tag, className) {

    const element = document.createElement(tag);

    if (className) {

        element.className = className;

    }

    return element;

}
function createText(tag, className, text) {

    const element = createElement(tag, className);

    element.textContent = text;

    return element;

}
