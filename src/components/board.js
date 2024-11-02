import "./board.css";

export default class Board {
  board = new Array(9);

  setCellValue = (row, column, value) => {
    const cell = this.board[row][column];

    cell.value = value;
    if (+cell.$el.innerText !== value) {
      cell.$el.innerText = value;
    }
  };

  handleInput = (event) => {
    const { target: element } = event;
    const { innerText: value, id } = element;
    const [x, y] = id.split("-");

    if (value.length !== 0 && !/^[0-9]$/.test(value)) {
      this.setCellValue(x, y, "");
      return;
    }
  };

  handleInputFromArray = (value) => {
    try {
      const array = JSON.parse(value);
      array.forEach((row, i) =>
        row.forEach((cell, j) =>
          this.setCellValue(i, j, cell === "." ? "" : +cell)
        )
      );
    } catch (_err) {
      alert("Incorrect array");
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
