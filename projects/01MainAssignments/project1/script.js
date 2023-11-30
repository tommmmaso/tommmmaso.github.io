let gridSize = 3; // Dimensione della griglia
let grid = []; // Array per la griglia
let cellSize; // Dimensione della cella
let Helv;
let P22;
let Maz;
let Voy;
let letter = "g";

function preload() {

  Helv = loadFont('assets/HelveticaNeueLTStd-Md copia.otf'); // Sostituisci con il tuo percorso e nome del file per il carattere Helvetica
  P22 = loadFont('assets/DomaineDisplay-Semibold copia.otf'); // Sostituisci con il tuo percorso e nome del file per il carattere Garamond
  Maz = loadFont('assets/MaziusDisplay-Bold copia.otf');
  Voy = loadFont('assets/voyage-bold copia.otf');
}

function setup() {
  createCanvas(756, 657);
  generateGrid(); // Genera la griglia al setup
  cellSize = width / gridSize; // Imposta la dimensione della cella in base alla griglia
  textAlign(CENTER, CENTER);
  noLoop();
}

function draw() {
  background("#111010"); // Sfondo bianco

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
      fill("#111010");
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
      fill("#fafafa");

      if (selectedFont === Maz) {
// Se il font è "Maz", alza il punto di 170px
      text(letter, width / 2, height / 2 - 230);
			} else if (selectedFont === Voy) {
// Se il font è "Voy", alza il punto di 220px
 			text(letter, width / 2, height / 2 - 280);
			} else if (selectedFont === P22) {
// Se il font è "P22", alza il punto di 220px
 	    text(letter, width / 2, height / 2 - 281.7);
			} else {
// La posizione standard
      text(letter, width / 2, height / 2 - 160);
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