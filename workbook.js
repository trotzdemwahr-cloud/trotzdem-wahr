// ===============================
// trotzdem.wahr – Workbook 01
// Antworten automatisch speichern
// ===============================

const workbookInputs = document.querySelectorAll(
  "input, textarea, select"
);

workbookInputs.forEach((input, index) => {

  const key = "workbook01_" + index;

  // Gespeicherte Antwort laden
  const saved = localStorage.getItem(key);

  if (saved !== null) {

    if (input.type === "checkbox") {
      input.checked = saved === "true";
    } else {
      input.value = saved;
    }

  }

  // Änderungen speichern
  input.addEventListener("input", () => {

    if (input.type === "checkbox") {
      localStorage.setItem(key, input.checked);
    } else {
      localStorage.setItem(key, input.value);
    }

  });

});
