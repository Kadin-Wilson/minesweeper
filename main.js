import {Minefield} from './minefield.js';

// field setup
let canvas = document.querySelector('#minefield');
let context = canvas.getContext('2d');
let size = canvas.clientWidth / 8;
let field = new Minefield(8, 8, 10, size);

// images
let numberImgs = Array.from(document.querySelectorAll('.number'));
numberImgs.sort( (a, b) => a.id > b.id);
let flagImg = document.querySelector('.flag');
let hitMineImg = document.querySelector('.hit_mine');
let uncheckedImg = document.querySelector('.unchecked');

// initial field draw
draw(false);

// start
canvas.addEventListener('click', check);


function check(e) {
    let cell = field.check(e.offsetX, e.offsetY);
    draw(cell.bomb);
}

function draw(loseSignal) {
    for (cell of field) {

    }

    console.log(field.ascii());
}
