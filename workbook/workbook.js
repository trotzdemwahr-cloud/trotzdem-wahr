/* ==========================================================
   ZURÜCK ZU DIR
   workbook.js
========================================================== */

const Workbook = {

    currentChapter: 1,

    totalChapters: 6,

    init() {

        this.cache();

        this.bindNavigation();

        this.updateProgress();

        this.updateConditionalCards();

    },

    cache() {

        this.chapters = [
            ...document.querySelectorAll(".chapter")
        ];

        this.progress = document.getElementById("progress");

    },

    showChapter(index) {

        this.currentChapter = index;

        this.chapters.forEach((chapter, i) => {

            chapter.classList.toggle(
                "active",
                i === index - 1
            );

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

        this.updateProgress();

        this.updateConditionalCards();

    },

    nextChapter() {

        if (this.currentChapter < this.totalChapters) {

            this.showChapter(
                this.currentChapter + 1
            );

        }

    },

    previousChapter() {

        if (this.currentChapter > 1) {

            this.showChapter(
                this.currentChapter - 1
            );

        }

    },
        bindNavigation() {

        document
            .querySelectorAll("[data-next]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    this.nextChapter();

                });

            });

        document
            .querySelectorAll("[data-back]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    this.previousChapter();

                });

            });

        document.addEventListener("keydown", (event) => {

            if (event.key === "ArrowRight") {

                this.nextChapter();

            }

            if (event.key === "ArrowLeft") {

                this.previousChapter();

            }

        });

    },

    updateProgress() {

        this.progress.textContent =

            `Kapitel ${this.currentChapter} von ${this.totalChapters}`;

    },

    updateConditionalCards() {

        document
            .querySelectorAll("[data-question]")
            .forEach(card => {

                const question = card.dataset.question;

                const value = card.dataset.value;

                const input = document.querySelector(

                    `input[name="${question}"][value="${value}"]`

                );

                if (!input) return;

                card.classList.toggle(

                    "visible",

                    input.checked

                );

            });

    },
        collectAnswers() {

        const answers = {};

        document
            .querySelectorAll("input, textarea")
            .forEach(field => {

                if (!field.name) return;

                if (field.type === "checkbox") {

                    if (!answers[field.name]) {

                        answers[field.name] = [];

                    }

                    if (field.checked) {

                        const label =
                            field.closest("label")?.textContent.trim() ||
                            field.value;

                        answers[field.name].push(label);

                    }

                    return;

                }

                if (field.type === "radio") {

                    if (field.checked) {

                        answers[field.name] =
                            field.closest("label")?.textContent.trim() ||
                            field.value;

                    }

                    return;

                }

                answers[field.name] = field.value.trim();

            });

        return answers;

    },

    fillPDF() {

        const answers = this.collectAnswers();

        document
            .querySelectorAll("[data-pdf-answer]")
            .forEach(element => {

                const key = element.dataset.pdfAnswer;

                const value = answers[key];

                if (Array.isArray(value)) {

                    element.textContent = value.join(", ");

                    return;

                }

                element.textContent = value || "—";

            });

        const date = new Date();

        const pdfDate = document.getElementById("pdf-date");

        if (pdfDate) {

            pdfDate.textContent =
                date.toLocaleDateString("de-DE");

        }

    },
        exportPDF() {

        this.fillPDF();

        const pdf = document.getElementById("pdf-export");

        pdf.hidden = false;

        const options = {

            margin: 0,

            filename: "zurueck-zu-dir-workbook.pdf",

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

                mode: ["css", "legacy"]

            }

        };

        html2pdf()

            .set(options)

            .from(pdf)

            .save()

            .then(() => {

                pdf.hidden = true;

            })

            .catch(() => {

                pdf.hidden = true;

            });

    }

};


document.addEventListener("DOMContentLoaded", () => {

    Workbook.init();

});
