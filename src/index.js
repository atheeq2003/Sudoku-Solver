import "./style/util.css";
import "./style/style.css";
import Board from "./components/board";

document.addEventListener("DOMContentLoaded", () => {
  const board = new Board();
  const mainElement = document.querySelector('#main');
  if (mainElement) {
    mainElement.appendChild(board.render());
  } else {
    console.error("#main element not found.");
  }
  const addArrayButton = document.querySelector("#addArrayButton");
    if (addArrayButton) {
        addArrayButton.addEventListener("click", () => {
            const arrayInputValue = document.querySelector("#arrayInput").value;
            board.handleInputFromArray(arrayInputValue);
        });
    } else {
        console.error("#addArrayButton element not found.");
    }
});
