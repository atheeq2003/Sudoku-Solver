var u=Object.defineProperty;var f=(i,t,r)=>t in i?u(i,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[t]=r;var n=(i,t,r)=>f(i,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();class d{constructor(){n(this,"store",new Map);n(this,"checkIfIn",(t,r)=>this.store.get(t)&&this.store.get(t).get(r));n(this,"setVal",(t,r,e)=>this.store.get(t)?e&&this.store.get(t).get(r)?!1:(this.store.get(t).set(r,e),!0):(this.store.set(t,new Map([[r,e]])),!0))}}const c=(i,t)=>{for(let r=0;r<9;r+=3)if(i<=r+2){for(let e=0;e<9;e+=3)if(t<=e+2)return r+1+parseInt(e/3,10)}return!1};class h{constructor(){n(this,"prev",null);n(this,"board",new Array(9));n(this,"speed",10);n(this,"row",null);n(this,"column",null);n(this,"sector",null);n(this,"solved",!1);n(this,"clearAllCellClasses",()=>{this.board.forEach(t=>t.forEach(({$el:r})=>{r.className=""}))});n(this,"initializeEmptyBoard",()=>{this.board.forEach((t,r)=>{t.forEach((e,s)=>{this.setCellValue(r,s,"",!1)})}),this.cleanUp()});n(this,"setUpMemo",()=>{this.board.forEach((t,r)=>t.forEach((e,s)=>{if(e.value!==""&&(!this.row.setVal(r,e.value,!0)||!this.column.setVal(s,e.value,!0)||!this.sector.setVal(c(r,s),e.value,!0)))throw new Error("Incorrect board")}))});n(this,"createNewMemo",()=>{this.row=new d,this.column=new d,this.sector=new d;try{return this.setUpMemo(),!0}catch(t){return alert(t.message),!1}});n(this,"getFirstUnsolved",(t,r)=>{for(let e=t;e<9;e+=1)for(let s=e===t?r:0;s<9;s+=1){const{value:o}=this.board[e][s];if(o==="")return[e,s]}return[!1,!1]});n(this,"updateClassList",(t,r,e)=>{r&&(r.className=e,e==="fault"&&setTimeout(()=>{r.classList.remove(e)},this.speed/2)),t.className="current"});n(this,"setCellValue",(t,r,e,s=null)=>{const o=this.board[t][r];o.value=e,+o.$el.innerText!==e&&(o.$el.innerText=e),s&&(this.updateClassList(o.$el,this.prev,s),this.prev=o.$el)});n(this,"tryOne",(t,r,e,s)=>new Promise(o=>{this.row.setVal(t,s,!0),this.column.setVal(r,s,!0),this.sector.setVal(e,s,!0),this.setCellValue(t,r,s,"solved"),setTimeout(()=>{this.solveBoard(t,r).then(l=>{l||(this.row.setVal(t,s,!1),this.column.setVal(r,s,!1),this.sector.setVal(e,s,!1),this.setCellValue(t,r,"","fault")),o(l)})},this.speed)}));n(this,"solveBoardInstantly",(t=0,r=0)=>{const[e,s]=this.getFirstUnsolved(t,r);if(e===!1)return this.solved=!0,!0;const o=c(e,s);for(let l=1;l<=9;l++)if(!this.row.checkIfIn(e,l)&&!this.column.checkIfIn(s,l)&&!this.sector.checkIfIn(o,l)){if(this.row.setVal(e,l,!0),this.column.setVal(s,l,!0),this.sector.setVal(o,l,!0),this.setCellValue(e,s,l),this.solveBoardInstantly(e,s))return!0;this.row.setVal(e,l,!1),this.column.setVal(s,l,!1),this.sector.setVal(o,l,!1),this.setCellValue(e,s,"")}return!1});n(this,"solveBoard",async(t=0,r=0)=>{refreshButton.setAttribute("disabled",!0);const[e,s]=this.getFirstUnsolved(t,r);if(e===!1)return this.solved=!0,!0;const o=c(e,s);let l=!1;for(let a=1;a<=9;a+=1)if(!this.row.checkIfIn(e,a)&&!this.column.checkIfIn(s,a)&&!this.sector.checkIfIn(o,a)&&(l=await this.tryOne(e,s,o,a)),l){refreshButton.removeAttribute("disabled",!0);break}return l});n(this,"setUpBeforeAndSolve",async({target:t})=>{this.cleanUp(),this.createNewMemo()&&(t.setAttribute("disabled",!0),console.log("Starting to solve..."),await this.solveBoard(),console.log("Finished solving..."),t.removeAttribute("disabled"),this.solved?alert("Solved"):alert("Board not solvable"))});n(this,"handleInput",t=>{const{target:r}=t,{innerText:e,id:s}=r,[o,l]=s.split("-");if(e.length!==0&&!/^[1-9]$/.test(e)){this.setCellValue(o,l,"",!1);return}this.setCellValue(o,l,e.length===0?"":+e,!1)});n(this,"handleSpeedInput",({target:{value:t}})=>{this.speed=+t});n(this,"handleInputFromPreset",t=>{const r=t.trim();console.log("Received JSON for Parsing:",r);try{const e=JSON.parse(r);console.log("Parsed Array:",e),e.forEach((s,o)=>s.forEach((l,a)=>this.setCellValue(o,a,l==="."?"":+l,!1)))}catch(e){console.error("Parsing Error:",e),alert(`Incorrect array format: ${e.message}`)}});n(this,"render",()=>{for(let r=0;r<9;r+=1)this.board[r]=new Array(9);const t=document.createElement("table");for(let r=0;r<9;r+=1){const e=document.createElement("tr");for(let s=0;s<9;s+=1){const o=document.createElement("td");o.addEventListener("input",l=>this.handleInput(l)),o.setAttribute("id",`${r}-${s}`),o.contentEditable=!0,e.appendChild(o),this.board[r][s]={$el:o,value:""}}t.appendChild(e)}return t});n(this,"cleanUp",()=>{this.solved=!1,this.prev=null,this.clearAllCellClasses()});this.initializeEmptyBoard()}}document.addEventListener("DOMContentLoaded",()=>{const i=new h;document.querySelector("#app").innerHTML=`
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
                                <div class="dropdown-wrapper">
                                    <select id="presetBoards">
                                        <option value="">--Select--</option>
                                        <option value='[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]'>Easy</option>
                                        <option value='[[".","2",".","6",".","8",".",".","."],["5","8",".",".",".","9","7",".","."],[".",".",".",".","4",".",".",".","."],["3","7",".",".",".",".","5",".","."],["6",".",".",".",".",".",".",".","4"],[".",".","8",".",".",".",".","1","3"],[".",".",".",".","2",".",".",".","."],[".",".","9","8",".",".",".","3","6"],[".",".",".","3",".","6",".","9","."]]'>Intermediate</option>
                                        <option value='[["2",".",".","3",".",".",".",".","."],["8",".","4",".","6","2",".",".","3"],[".","1","3","8",".",".","2",".","."],[".",".",".",".","2",".","3","9","."],["5",".","7",".",".",".","6","2","1"],[".","3","2",".",".",".",".",".","."],[".","2",".",".",".","9","1","4","."],["6",".","1","2","5",".","8",".","9"],[".",".",".",".",".","1",".",".","2"]]'>Difficult</option>
                                    </select>
                                    <button class="btn mini-button" id="refreshButton">&#x21bb;</button>
                                </div>
                            </div>
                        </div>

                        <!-- Button section -->
                        <div class="button-section">
                            <div class="input-wrapper">
                                <button class="btn" id="loadBoardButton">Load Selected Board</button>
                            </div>
                            <div class="input-wrapper">
                                <button class="btn" id="solve">Solve</button>
                            </div>
                            <div class="input-wrapper">
                                <button class="btn" id="instantSolve">Instant Solve</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;const t=document.querySelector("#main");t&&t.appendChild(i.render());const r=document.querySelector("#loadBoardButton"),e=document.querySelector("#presetBoards"),s=document.querySelector("#solve");document.querySelector("#speed").addEventListener("input",i.handleSpeedInput),r&&e?r.addEventListener("click",()=>{const a=e.value;console.log("Loading Preset Board:",a),a?i.handleInputFromPreset(a):alert("Please select a valid preset board.")}):console.error("Load Board button or Dropdown element not found."),s?s.addEventListener("click",a=>{console.log("Solve button clicked."),i.setUpBeforeAndSolve(a)}):console.error("Solve button not found.");const o=document.querySelector("#instantSolve");o&&o.addEventListener("click",()=>{console.log("Instant Solve button clicked."),i.cleanUp(),i.createNewMemo()&&(i.solveBoardInstantly()?setTimeout(()=>{alert("Solved Instantly")},100):alert("Board not solvable"))});const l=document.getElementById("refreshButton");l&&l.addEventListener("click",()=>{console.log("Refresh button clicked."),i.initializeEmptyBoard?i.initializeEmptyBoard():console.error("initializeEmptyBoard function is not defined in the board object.")})});
