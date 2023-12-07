let gridSize = 3; // Dimensione della griglia
let grid = []; // Array per la griglia
let cellSize; // Dimensione della cella
let Helv;
let P22;
let Maz;
let Voy;
 
function preload() {
  Helv = loadFont('HelveticaNeueLTStd-Md.otf'); // Sostituisci con il tuo percorso e nome del file per il carattere Helvetica
  P22 = loadFont('DomaineDisplay-Semibold.otf'); // Sostituisci con il tuo percorso e nome del file per il carattere Garamond
  Maz = loadFont('MaziusDisplay-Bold.otf');
  Voy = loadFont('voyage-bold.otf');
}

function setup() {
  createCanvas(756, 657);
  generateGrid(); // Genera la griglia al setup
  cellSize = width / gridSize; // Imposta la dimensione della cella in base alla griglia
  textAlign(CENTER, CENTER);
  noLoop();
}

function draw() {
  //background("#FFBF4C"); // Sfondo bianco
	background("#B7A196")

  // Itera sulla griglia
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let x = width / 2 + (i - gridSize / 2) * cellSize; // Calcola la coordinata x del rettangolo rispetto al centro della tavola
      let y = height / 2 + (j - gridSize / 2) * cellSize; // Calcola la coordinata y del rettangolo rispetto al centro della tavola

      // Applica la maschera
      drawingContext.save();
      rect(x, y, cellSize, cellSize);
      drawingContext.clip();

      // Disegna il rettangolo della cella
      noStroke();
      fill("#B7A196");
      rect(x, y, cellSize, cellSize);

// Controlla cosa deve apparire dentro ogni sezione
      let selectedFont;
      	if (random() > 0.5) {
        	selectedFont = random() > 0.5 ? Helv : P22;
      	} else {
        	selectedFont = random() > 0.5 ? Maz : Voy;
      }

      textFont(selectedFont);
      textAlign(CENTER, CENTER);
      textSize(750); // Cambia 70 con la grandezza desiderata
      fill("#857E61");

      if (selectedFont === Maz) {
// Se il font è "Maz", alza il punto di 170px
      text('&', width / 2, height / 2 - 100);
			} else if (selectedFont === Voy) {
// Se il font è "Voy", alza il punto di 220px
 			text('&', width / 2, height / 2 - 150);
			} else if (selectedFont === P22) {
// Se il font è "P22", alza il punto di 220px
 	    text('&', width / 2, height / 2 - 150);
			} else {
// La posizione standard
      text('&', width / 2, height / 2 - 30);
      }
			

      // Ripristina il contesto di disegno
      drawingContext.restore();
    }
  }
}

function generateGrid() {
  // Genera la griglia 3x3 con valori casuali tra 1 e 2
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      // Assegna un valore casuale tra 1 e 2 a ogni cella
      grid[i][j] = int(random(1, 3));
    }
  }
}

function keyPressed() {
  // Inverti i valori di tutte le celle
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = grid[i][j] === 1 ? 2 : 1;
    }
  }

  redraw(); // Richiama la funzione draw per visualizzare le modifiche
}
