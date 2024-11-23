import "./board.css";
import Memo2D from '../lib/memo2D';
import { getSector } from '../utils/utils';

export default class Board {
  prev = null

  board = new Array(9);

  speed = 10

  row = null

  column = null

  sector = null

  solved = false

  setCellValue = (row, column, value) => {
    const cell = this.board[row][column];

    cell.value = value;
    if (+cell.$el.innerText !== value) {
      cell.$el.innerText = value;
    }
  };

  createNewMemo = () => {
    this.row = new Memo2D();
    this.column = new Memo2D();
    this.sector = new Memo2D();

    try {
      this.setUpMemo();
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    }
  }

  setUpBeforeAndSolve = async (event) => {
    this.solved = false;

    if(this.createNewMemo()) {
      event.target.setAttribute('disabled', true);
      await this.solveBoard();
      event.target.removeAttribute('disabled');

      if(!this.solved) {
        alert('Board not solvable');
      }
    }
  }

  handleInput = (event) => {
    const { target: element } = event;
    const { innerText: value, id } = element;
    const [x, y] = id.split("-");

    if (value.length !== 0 && !/^[1-9]$/.test(value)) {
      this.setCellValue(x, y, "");
      return;
    }
  };

  handleInputFromPreset = (value) => {
    const trimmedValue = value.trim();
    console.log("Received JSON for Parsing:", trimmedValue);

    try {
        const array = JSON.parse(trimmedValue);
        console.log("Parsed Array:", array); // Log parsed array to confirm success

        // Ensure it sets the board values
        array.forEach((row, i) => row.forEach(
            (cell, j) => this.setCellValue(i, j, cell === '.' ? '' : +cell),
        ));
    } catch (err) {
        console.error("Parsing Error:", err); // Full error for debugging
        alert(`Incorrect array format: ${err.message}`);
    }
}

  render = () => {
    for (let i = 0; i < 9; i += 1) {
      this.board[i] = new Array(9);
    }

    const table = document.createElement("table");

    for (let i = 0; i < 9; i += 1) {
      const tr = document.createElement("tr");

      for (let j = 0; j < 9; j += 1) {
        const td = document.createElement("td");

        td.addEventListener("input", (event) => this.handleInput(event));
        td.setAttribute("id", `${i}-${j}`);
        td.contentEditable = true;

        tr.appendChild(td);

        this.board[i][j] = {
          $el: td,
          value: "",
        };
      }
      table.appendChild(tr);
    }
    return table;
  };
}
