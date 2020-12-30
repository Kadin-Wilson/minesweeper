import {Minefield} from './minefield.js';

//process images
let numberImgs = Array.from(document.querySelectorAll('.number'));
numberImgs.sort( (a, b) => a.id > b.id);
let flagImg = document.querySelector('.flag');
let mineImg = document.querySelector('.mine');
let hitMineImg = document.querySelector('.hit_mine');
let uncheckedImg = document.querySelector('.unchecked');

// initial setup
let canvas = document.querySelector('#minefield');
startGame(8, 8, 10);

// buttons
let buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', newGame));

function newGame() {
    // clear any event listeners by creating a fresh canvas
    let newCanvas = canvas.cloneNode(true);
    canvas.replaceWith(newCanvas);
    canvas = newCanvas;
    
    // set width and height
    canvas.width = Number(this.dataset.cwidth);
    canvas.height = Number(this.dataset.cheight);

    // start game
    startGame(Number(this.dataset.width), Number(this.dataset.height),
              Number(this.dataset.bombs));
}


function startGame(height, width, bombs) {
    let size = canvas.clientWidth / width;
    let field = new Minefield(width, height, bombs, size);
    let context = canvas.getContext('2d');


    // initial field draw
    for (let cell of field)
        context.drawImage(uncheckedImg, cell.x, cell.y, size, size);

    // start
    let firstClick = true;
    canvas.addEventListener('click', click);
    function click(e) {
        let clickedCell = field.check(e.offsetX, e.offsetY);

        if (firstClick) { // ensure first cell is clear
            while (clickedCell.adjacent != 0) {
                field = new Minefield(width, height, bombs, size);
                clickedCell = field.check(e.offsetX, e.offsetY);
            }
            firstClick = false;
        }

        update(clickedCell);
    }


    // draw based on gamestate
    function update(clickedCell) {
        if (clickedCell.bomb) { // gameover
            for (let cell of field)
                if (cell.bomb)
                    context.drawImage(mineImg, cell.x, cell.y, size, size);
            context.drawImage(hitMineImg, clickedCell.x, clickedCell.y, size, size);

            canvas.removeEventListener('click', click);
        }

        let uncheckedCount = 0;
        for (let cell of field) {
            if (cell.checked)
                context.drawImage(numberImgs[cell.adjacent], cell.x, cell.y, size, size);
            else
                ++uncheckedCount;
        }
        
        if (uncheckedCount == bombs) { // win
            for (let cell of field)
                if (!cell.checked)
                    context.drawImage(flagImg, cell.x, cell.y, size, size);

            canvas.removeEventListener('click', click);
        }
    }
}

