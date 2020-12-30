class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bomb = false;
        this.checked = false;
        this.adjacent = null;
    }
}
class Minefield {
    constructor(size, width, height, bombs) {
        this.size = size;
        this.width = width;
        this.height = height;
        this.bombs = bombs;
        this.field = generateField();
        populateBombs(this.field);

        function generateField() {
            let field = [];
            for (let x = 0; x < width; x++)
                for (let y = 0; y < height; y++)
                    field.push(new Cell(x * size, y * size));

            return field;
        }
        function populateBombs(field) {
            for (let i = 0; i < bombs; i++) {
                let index;
                do {
                    index = Math.floor(Math.random() * field.length);
                } while (field[index].bomb); // prevent 2 bombs 1 cell
                field[index].bomb = true;
            }
        }
    }

    check(x, y) {
        return this.getCell(x, y);
    }

    getCell(x, y) {
        let sz = this.size;
        let cellx = x - (x % sz);
        let celly = y - (y % sz);
        let cellIndex = ((cellx / sz) * this.width) + (celly / sz);

        return this.field[cellIndex];
    }

    ascii() {
        let str = '';
        for (let i = 0; i < this.field.length; i++) {
            str += this.field[i].bomb ? '*' : '.';
            if ((i + 1) % this.width == 0) // end of row
                str += "\n";
        }

        return str;
    }
}

function check(e) {
    let cell = field.check(e.clientX, e.clientY);
    console.log(cell);
}

let canvas = document.querySelector('#minefield');
let size = canvas.clientWidth / 8;
let field = new Minefield(size, 8, 8, 10);
canvas.addEventListener('click', check);
