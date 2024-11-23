// Import styles
import "./style/style.css";
import "./style/util.css";
import Board from "./components/board";

document.addEventListener("DOMContentLoaded", () => {
    const board = new Board();

    // Set up initial HTML structure in JavaScript
    document.querySelector("#app").innerHTML = `
        <main>
            <div class="wrapper">
                <!-- Heading -->
                <div>
                    <h1 class="logo">
                        <span class="text-primary">Sudoku</span>
                        <span class="font-primary">Solver - </span>
                        <span class="text-primary">Visualizer</span>
                    </h1>
                </div>

                <!-- Card -->
                <div class="card">
                    <!-- Sudoku table -->
                    <div id="main"></div>

                    <!-- Controls -->
                    <div class="controls">
                        <!-- Input section -->
                        <div class="input-section">
                            <!-- Speed input -->
                            <div class="input-wrapper">
                                <label for="speed">Speed (ms)</label>
                                <input type="number" id="speed" value="10" />
                            </div>

                            <!-- Dropdown for preset Sudoku boards -->
                            <div class="input-wrapper">
                                <label for="presetBoards">Select a Preset Board:</label>
                                <select id="presetBoards">
                                    <option value="">--Select--</option>
                                    <option value='[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]'>Preset 1</option>
                                    <option value='[[".","2",".","6",".","8",".",".","."],["5","8",".",".",".","9","7",".","."],[".",".",".",".","4",".",".",".","."],["3","7",".",".",".",".","5",".","."],["6",".",".",".",".",".",".",".","4"],[".",".","8",".",".",".",".","1","3"],[".",".",".",".","2",".",".",".","."],[".",".","9","8",".",".",".","3","6"],[".",".",".","3",".","6",".","9","."]]'>Preset 2</option>
                                    <option value='[["2",".",".","3",".",".",".",".","."],["8",".","4",".","6","2",".",".","3"],[".","1","3","8",".",".","2",".","."],[".",".",".",".","2",".","3","9","."],["5",".","7",".",".",".","6","2","1"],[".","3","2",".",".","6",".",".","."],[".","2",".",".",".","9","1","4","."],["6",".","1","2","5",".","8",".","9"],[".",".",".",".",".","1",".",".","2"]]'>Preset 3</option>
                                </select>
                            </div>
                        </div>

                        <!-- Button section -->
                        <div class="button-section">
                            <!-- Load selected board -->
                            <div class="input-wrapper">
                                <button class="btn" id="loadBoardButton">Load Selected Board</button>
                            </div>

                            <!-- Solve button -->
                            <div class="input-wrapper">
                                <button class="btn" id="solve">Solve</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;

    // Render the board into the main element
    const mainElement = document.querySelector("#main");
    if (mainElement) {
        mainElement.appendChild(board.render());
    }

    // Button event listeners
    const loadBoardButton = document.querySelector('#loadBoardButton');
    const presetBoards = document.querySelector('#presetBoards');
    const solveButton = document.querySelector('#solve');
    document.querySelector('#speed').addEventListener('input', board.handleSpeedInput);

    // Load preset board event listener
    if (loadBoardButton && presetBoards) {
        loadBoardButton.addEventListener('click', () => {
            const selectedValue = presetBoards.value;
            console.log("Loading Preset Board:", selectedValue);

            if (selectedValue) {
                board.handleInputFromPreset(selectedValue);
            } else {
                alert("Please select a valid preset board.");
            }
        });
    } else {
        console.error("Load Board button or Dropdown element not found.");
    }

    // Solve button event listener
    if (solveButton) {
        solveButton.addEventListener('click', (event) => {
            console.log("Solve button clicked.");
            board.setUpBeforeAndSolve(event);
        });
    } else {
        console.error("Solve button not found.");
    }
});