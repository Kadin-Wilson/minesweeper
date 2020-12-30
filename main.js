import {Minefield} from './minefield.js';

// field setup
let canvas = document.querySelector('#minefield');
let context = canvas.getContext('2d');
let size = canvas.clientWidth / 8;
let bombs = 10;
let width = 8, height = 8;
let field = new Minefield(width, height, bombs, size);

// images
let numberImgs = Array.from(document.querySelectorAll('.number'));
numberImgs.sort( (a, b) => a.id > b.id);
let flagImg = document.querySelector('.flag');
let mineImg = document.querySelector('.mine');
let hitMineImg = document.querySelector('.hit_mine');
let uncheckedImg = document.querySelector('.unchecked');

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
