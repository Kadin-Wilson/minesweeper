import {Minefield} from './minefield.js';

function check(e) {
    let cell = field.check(e.offsetX, e.offsetY);
    draw(cell);
}

function draw(cell) {
    console.log(field.ascii());
}

let canvas = document.querySelector('#minefield');
let size = canvas.clientWidth / 8;
let field = new Minefield(8, 8, 10, size);
setup(size);
canvas.addEventListener('click', check);
