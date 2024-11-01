// Import styles
import './style/style.css';
import './style/util.css';
import './index.js';

// Set up Sudoku Solver functionality
document.querySelector('#app').innerHTML = `
  <main>
    <div class="wrapper">
      <!-- Heading -->
      <div>
        <h1 class="logo">
          <span class="text-primary">Sudoku</span>
          <span class="font-normal">Solver</span>
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

            <!-- Array input area -->
            <div class="input-wrapper">
              <label for="array-input">Array input for initial state</label>
              <textarea id="arrayInput" rows="5" placeholder='[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
              '></textarea>
            </div>
          </div>

          <!-- Button section -->
          <div class="button-section">
            <!-- Add from array -->
            <div class="input-wrapper">
              <button class="btn" id="addArrayButton">Add From Array</button>
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

// Add event listeners for button functionality
document.getElementById('solve').addEventListener('click', () => {
    console.log('Solve button clicked');
    // Add your Sudoku solving logic here
});

document.getElementById('addArrayButton').addEventListener('click', () => {
    console.log('Add Array button clicked');
    // Add your code to initialize Sudoku board from array input here
});
