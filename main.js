class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bomb = false;
        this.clicked = false;
    }
}
class Minefield {
    constructor(size, width, height, bombs) {
        function generateField() {
        }
        function populateBombs() {
        }
        this.field = generateField();
        populateBombs(this.field);
    }
}

