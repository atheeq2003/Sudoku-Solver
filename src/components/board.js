import "./board.css";
import Memo2D from "../lib/memo2D";
import { getSector } from "../utils/utils";

export default class Board {
  prev = null;

  board = new Array(9);

  speed = 10;

  row = null;

  column = null;

  sector = null;

  solved = false;

  setCellValue = (row, column, value, visualizeMode = true) => {
    const cell = this.board[row][column];

    cell.value = value;
    if (+cell.$el.innerText !== value) {
      cell.$el.innerText = value;
    }

    if (visualizeMode) {
      if (this.prev) {
        this.prev.classList.remove("current");
      }
      cell.$el.classList.add("current");
      this.prev = cell.$el;
    }
  };

  setUpMemo = () => {
    this.board.forEach((boardRow, i) =>
      boardRow.forEach((cell, j) => {
        if (cell.value !== "") {
          if (
            !this.row.setVal(i, cell.value, true) ||
            !this.column.setVal(j, cell.value, true) ||
            !this.sector.setVal(getSector(i, j), cell.value, true)
          ) {
            throw new Error("Incorrect board");
          }
        }
      })
    );
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
  };

  getFirstUnsolved = (row, column) => {
    for(let i = row; i < 9; i += 1) {
      for(let j = i === row ? column : 0; j < 9; j += 1) {
        if(this.board[i][j]. value === '') {
          return [i, j];  
        }
      }
    }
    return [false, false];
  }

  solveBoard = async (row = 0, column = 0) => {
    const [x, y] = this.getFirstUnsolved(row, column);
    if (x === false && y === false) {
      return true;
    }

    const s = getSector(x, y);
    let solved = false;
    for (let i = 1; i <= 9; i += 1) {
      if (
        !this.row.checkIfIn(x, i) &&
        !this.column.checkIfIn(y, i) &&
        !this.sector.checkIfIn(s, i)
      ) {
        solved = await this.tryOne(x, y, s, i);
      }

      if(solved) {
        this.solved = true;
        break;
      }
    }
    return solved;
  };

  setUpBeforeAndSolve = async (event) => {
    this.solved = false;

    if (this.createNewMemo()) {
      event.target.setAttribute("disabled", true);
      await this.solveBoard();
      event.target.removeAttribute("disabled");

      if (!this.solved) {
        alert("Board not solvable");
      }
    }
  };

  handleInput = (event) => {
    const { target: element } = event;
    const { innerText: value, id } = element;
    const [x, y] = id.split("-");

    if (value.length !== 0 && !/^[1-9]$/.test(value)) {
      this.setCellValue(x, y, "", false);
      return;
    }
    this.setCellValue(x, y, value.length === 0 ? "" : +value, false);
  };

  handleInputFromPreset = (value) => {
    const trimmedValue = value.trim();
    console.log("Received JSON for Parsing:", trimmedValue);

    try {
      const array = JSON.parse(trimmedValue);
      console.log("Parsed Array:", array); // Log parsed array to confirm success

      // Ensure it sets the board values
      array.forEach((row, i) =>
        row.forEach((cell, j) =>
          this.setCellValue(i, j, cell === "." ? "" : +cell, false)
        )
      );
    } catch (err) {
      console.error("Parsing Error:", err); // Full error for debugging
      alert(`Incorrect array format: ${err.message}`);
    }
  };

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
