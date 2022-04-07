let cells = [];
let grid = document.getElementById('grid');

for (let i = 0; i < 16; ++i) {
    for (let j = 0; j < 16; ++j) {
        let cell = document.createElement('div');
        cell.style.border = "1px solid black";
        cell.style.backgroundColor = "rgb(207, 204, 204)";
        grid.appendChild(cell);
        cells.push(cell);
        cell.addEventListener("click", press, true);
    }
}

function press() {
    this.innerHTML = '1';
    
}


