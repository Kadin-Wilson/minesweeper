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
            for (let y = 0; y < height; y++)
                for (let x = 0; x < width; x++)
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
        let cellX = x - (x % sz);
        let cellY = y - (y % sz);
        let cellIndex = ((cellY / sz) * this.width) + (cellX / sz);

        return this.field[cellIndex];
    }

    // return a count of the number of adjacent bombs
    adjacentCount(cell) {
        let count = 0;
        let x = cell.x;
        let y = cell.y;
        let sz = this.size;

        if (x > 0) { // check left 
            if (this.getCell(x - sz, y).bomb)
                ++count;
            if (y > 0 && this.getCell(x - sz, y - sz).bomb)
                ++count;
            if (y < (this.height - 1) * sz && this.getCell(x - sz, y + sz).bomb)
                ++count;
        }
        if (x < (this.width - 1) * sz) { // check right
            if (this.getCell(x + sz, y).bomb)
                ++count;
            if (y > 0 && this.getCell(x + sz, y - sz).bomb)
                ++count;
            if (y < (this.height - 1) * sz && this.getCell(x + sz, y + sz).bomb)
                ++count;
        }
        if (y > 0 && this.getCell(x, y - sz).bomb) // check last top
            ++count;
        if (y < (this.height - 1) * sz && this.getCell(x, y + sz).bomb) // check last bottom
            ++count;

        return count;
    }

    // finds the cell, marks it as checked,
    // marks number of sorounding mines,
    // returns the now modified cell
    check(x, y) {
        let cell = this.getCell(x, y);
        if (!cell.bomb) {
            let count = this.adjacentCount(cell);
            cell.adjacent = count;
            cell.checked = true;
        }

        return cell;
    }

    // return an ascii representation of the minefield
    ascii() {
        let str = '';
        for (let i = 0; i < this.field.length; i++) {
            if (this.field[i].checked) 
                str += this.field[i].adjacent;
            else
                str += this.field[i].bomb ? '*' : '.';
            if ((i + 1) % this.width == 0) // end of row
                str += "\n";
        }

        return str;
    }
}

export {Minefield};
