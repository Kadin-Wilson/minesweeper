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

    // return the containing cell of a set of (x,y) coordinates
    getCell(x, y) {
        let sz = this.size;
        let cellx = x - (x % sz);
        let celly = y - (y % sz);
        let cellIndex = ((cellx / sz) * this.width) + (celly / sz);

        return this.field[cellIndex];
    }

    // finds the cell, marks it as checked,
    // marks number of sorounding mines,
    // returns the now modified cell
    check(x, y) {
        let cell = this.getCell(x, y);

        return cell;
    }

    // return an ascii representation of the minefield
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

export {Minefield};
