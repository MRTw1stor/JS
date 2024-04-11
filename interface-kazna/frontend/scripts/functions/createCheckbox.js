import { createItem } from "../api.js";
import { UpdateData } from "../proto.js";
import ViewDates from "./dates/viewDates.js";

async function createCheckbox() {
  const table = document.getElementById("Computer");
  const headerCell = table.querySelector("th:nth-child(4)");

  if (!headerCell.originalContent) {
    headerCell.originalContent = headerCell.innerHTML;
  }

  if (headerCell.querySelector('button')) {
    headerCell.innerHTML = headerCell.originalContent;
  } else {
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Подтвердить";
    confirmButton.addEventListener("click", async () => {
      const checkboxes = table.querySelectorAll('input[type="checkbox"]:checked');
      const shouldProceed = confirm("Вы уверены что хотите списать эти компьютеры ?");
      if (shouldProceed) {
        checkboxes.forEach((checkbox) => {
          const checkboxId = parseInt(checkbox.getAttribute("id").split('_')[1]);
          createItem("writeoffworkstations", checkboxId);
          UpdateData()
          setTimeout(() => {
            ViewDates()
          }, 2000);
        });
      }
    });
    headerCell.innerHTML = headerCell.originalContent;
    headerCell.appendChild(confirmButton);
  }

  const rowCount = table.rows.length;

  for (let i = 1; i < rowCount; i++) {
    const cell = table.rows[i].cells[3];
    if (!cell.originalContent) {
      cell.originalContent = cell.innerHTML;
    }

    const rowId = cell.closest('tr').id;
    const rowNumber = rowId.match(/\d+/)[0];

    if (!cell.querySelector('input[type="checkbox"]')) {
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("id", `check_${rowNumber}`);
      cell.innerHTML = '';
      cell.appendChild(input);
    }  
    else {
      cell.innerHTML = cell.originalContent;
    }
  }
}

export default createCheckbox;
