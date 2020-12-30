import {Minefield} from './minefield.js';

function check(e) {
    let cell = field.check(e.clientX, e.clientY);
    draw(cell);
}

function draw(cell) {
    console.log(cell);
}

let canvas = document.querySelector('#minefield');
let size = canvas.clientWidth / 8;
let field = new Minefield(size, 8, 8, 10);
canvas.addEventListener('click', check);
