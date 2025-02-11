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

  constructor() {
    this.initializeEmptyBoard(); // Initialize board during class instantiation
  }

  clearAllCellClasses = () => {
    this.board.forEach((row) =>
      row.forEach(({ $el }) => {
        $el.className = "";
      })
    );
  };

  initializeEmptyBoard = () => {
    this.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        this.setCellValue(i, j, "", false); // Clear cell values
      });
    });
    this.cleanUp(); // Reset board state
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
    for (let i = row; i < 9; i += 1) {
      for (let j = i === row ? column : 0; j < 9; j += 1) {
        const { value } = this.board[i][j];
        if (value === "") {
          return [i, j];
        }
      }
    }
    return [false, false];
  };

  updateClassList = (currentCell, prevCell, solvedOrFault) => {
    if (prevCell) {
      prevCell.className = solvedOrFault;
      if (solvedOrFault === "fault") {
        setTimeout(() => {
          prevCell.classList.remove(solvedOrFault);
        }, this.speed / 2);
      }
    }
    currentCell.className = "current";
  };

  setCellValue = (row, column, value, solvedOrFault = null) => {
    // Step 1: Get the cell
    const cell = this.board[row][column];

    // Step 2: Set the value
    cell.value = value;
    if (+cell.$el.innerText !== value) {
      cell.$el.innerText = value;
    }

    // Step 3: Visualization steps if required
    if (solvedOrFault) {
      this.updateClassList(cell.$el, this.prev, solvedOrFault);
      this.prev = cell.$el;
    }
  };

  tryOne = (row, column, sector, num) =>
    new Promise((resolve) => {
      // Set Data
      this.row.setVal(row, num, true);
      this.column.setVal(column, num, true);
      this.sector.setVal(sector, num, true);
      this.setCellValue(row, column, num, "solved");

      // For visualizing it
      setTimeout(() => {
        this.solveBoard(row, column).then((res) => {
          if (!res) {
            // Unset Data
            this.row.setVal(row, num, false);
            this.column.setVal(column, num, false);
            this.sector.setVal(sector, num, false);
            this.setCellValue(row, column, "", "fault");
          }
          resolve(res);
        });
      }, this.speed);
    });

  solveBoardInstantly = (row = 0, column = 0) => {
    const [x, y] = this.getFirstUnsolved(row, column);

    // Base case: If no cells are left to solve
    if (x === false) {
      this.solved = true;
      return true;
    }

    // Get the sector
    const sector = getSector(x, y);

    // Try all numbers from 1 to 9
    for (let i = 1; i <= 9; i++) {
      if (
        !this.row.checkIfIn(x, i) &&
        !this.column.checkIfIn(y, i) &&
        !this.sector.checkIfIn(sector, i)
      ) {
        // Set the value
        this.row.setVal(x, i, true);
        this.column.setVal(y, i, true);
        this.sector.setVal(sector, i, true);
        this.setCellValue(x, y, i); // Update board UI

        // Recursive call to solve the rest of the board
        if (this.solveBoardInstantly(x, y)) {
          return true;
        }

        // Backtrack: Reset the value if it doesn't lead to a solution
        this.row.setVal(x, i, false);
        this.column.setVal(y, i, false);
        this.sector.setVal(sector, i, false);
        this.setCellValue(x, y, ""); // Reset UI cell
      }
    }

    // Return false if no solution is found
    return false;
  };

  solveBoard = async (row = 0, column = 0) => {
    refreshButton.setAttribute("disabled", true);
    const [x, y] = this.getFirstUnsolved(row, column);
    if (x === false) {
      this.solved = true;
      return true;
    }

    // Step 2: Solve
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

      if (solved) {
        refreshButton.removeAttribute("disabled", true);
        break;
      }
    }

    // Step 3: Return result
    return solved;
  };

  setUpBeforeAndSolve = async ({ target }) => {
    // Clean up board in case we are solving again
    this.cleanUp();

    // Set memo and solve board
    if (this.createNewMemo()) {
      // Disable the Solve button to prevent multiple clicks during solving
      target.setAttribute("disabled", true);

      console.log("Starting to solve...");

      // Solve the board asynchronously
      await this.solveBoard();

      console.log("Finished solving...");

      // Re-enable the Solve button once solving is finished
      target.removeAttribute("disabled");

      // Check if the board was successfully solved
      if (!this.solved) {
        alert("Board not solvable");
      } else {
        alert("Solved");
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

  handleSpeedInput = ({ target: { value } }) => {
    // Step 1: Set the value
    this.speed = +value;
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
  cleanUp = () => {
    this.solved = false;
    this.prev = null;
    this.clearAllCellClasses();
  };
}
