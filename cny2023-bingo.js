// Issues: refresh the H U A T thing

const table = document.querySelector("#tblBingo")
const letter = document.querySelectorAll(".letters-bingo")

const winningPositions = [
    // horizontal
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    // vertical
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24]
]

let arr = Array.apply(null, { length: 26 }).map(Number.call, Number);

arr.shift()
shuffle(arr);

function shuffle(arr) {
    let currentIndex = arr.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

let iterator = 0;

var arr_new = [];
while(arr_new.length < 25){
    var r = Math.floor(Math.random() * 100) + 1;
    if((arr_new.indexOf(r) === -1) && (r != 0)) arr_new.push(r);
}

for (i = 0; i < 5; i++) {
    let tr = document.createElement("tr")
    table.appendChild(tr)

    for (j = 0; j < 5; j++) {
        let td = document.createElement("td")
        td.id = arr_new[iterator].toString()
        td.style.height = "20%"
        td.style.width = "20%"
        td.classList.add("main-table-cell")

        let div = document.createElement("div")
        div.classList.add("cell-format")
        div.textContent = arr_new[iterator].toString()
        td.appendChild(div)
        tr.appendChild(td)
        iterator++;
    }
}

const cell = document.querySelectorAll(".cell-format");
cell.forEach(e => {
    e.addEventListener("click", () => {
        if (e.classList.contains("strickout")) {
            e.classList.remove("strickout");
        } else {
            e.classList.add("strickout");
        }

        refreshLetters();
    })
})

function matchWin() {
    const cell = document.querySelectorAll(".cell-format");

    return winningPositions.some(combination => {
        let ite = 0;
        combination.forEach(index => {
            if(cell[index].classList.contains("strickout")) ite++;
        })

        if(ite === 5) {
            let indexWin = winningPositions.indexOf(combination);
            winningPositions.splice(indexWin, 1)
        }

        return combination.every(index => {
            return cell[index].classList.contains("strickout")
        })
    })
}

function refreshLetters() {
    let winningIterator = 0
    const cell = document.querySelectorAll(".cell-format");

    for (let m = 0; m < 10; m++) {
        // Iterate over each winningPosition (10 of them)
        let ite = 0;

        for (let n = 0; n < 5; n++) {
            const cell_number_arr = winningPositions[m];
            if (cell[cell_number_arr[n]].classList.contains("strickout")) ite++;
        }

        if (ite === 5) {
            letter[winningIterator].classList.add("show-bingo");
            winningIterator++;
        }
    }
    console.log(winningIterator);

    for (let p = winningIterator; p < 5; p++) letter[p].classList.remove("show-bingo");

    if(winningIterator === 5) {
        alert('HUAT ah 🧧! Raise your hand and show the game master your bingo sheet!');
    }
}


// console.log(arr)