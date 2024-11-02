import './board.css';

export default class Board {
    board = new Array(9)

    render = () => {
        for (let i = 0; i < 9; i += 1) {
            this.board[i] = new Array(9);
        }

        const table = document.createElement('table');

        for(let i = 0; i < 9; i += 1) {
            const tr = document.createElement('tr');

            for(let j = 0; j < 9; j += 1) {
                const td = document.createElement('td');

                td.setAttribute('id', `${i} - ${j}`);
                td.contentEditable = true;

                tr.appendChild(td);

                this.board[i][j] = {
                    $el: td,
                    value: '',
                };
            }
            table.appendChild(tr);
        }
        return table;
    }
}