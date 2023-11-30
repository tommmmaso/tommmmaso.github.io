let pos = [];
let img;
const segNum = 10;
const segLength = 40;
let vol = 0;
let volRadius = 20;
let font;
let mySound;

function preload() {
	img = loadImage('assets/VolumeIcon.png');
  font = loadFont('assets/HelveticaNeueLTStd-HvCn.otf');
	soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/CupHeadSound.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	stroke("#FFD6A1");
	strokeWeight(20);

	img.loadPixels(); // Carica i pixel dell'immagine una sola volta

	for (let i = 0; i < segNum; i++) {
		pos.push({
			x: 0,
			y: 0
		});
	}
}

function draw() {
	//background("#1271FF");
	background("#FFAF12");

  // Mappatura del volume	
	let volumeMapped = map(vol, 0, 100, 0, 1);
  mySound.setVolume(volumeMapped);

	let parent = {
		x: mouseX,
		y: mouseY
	};
	let index = 10;
	let hitCheck = false;
let angle = 0;
	for (let child of pos) {
		angle = atan2(child.y - parent.y, child.x - parent.x);
		child.x = parent.x + cos(angle) * segLength;
		child.y = parent.y + sin(angle) * segLength;
		line(parent.x, parent.y, child.x, child.y);

		// Calcolatore della percentuale del volume
		let distance = dist(child.x, child.y, width / 2, height / 2)
		if (distance < volRadius) {
			vol = (index - 1) * 10;
			hitCheck = true;
		}
		parent = child;
		index--;
	}
	let distance = dist(mouseX, mouseY, width / 2, height / 2)
	if (distance < volRadius) {
		vol = 100;
		hitCheck = true;
	}

	if (!hitCheck) {
		vol = 0;		
	}
	console.log(vol);

	// Linee
	//push();
		//stroke(255, 50);
		//strokeWeight(1);
		//line(0, (height / 2) + 15, windowWidth, (height / 2) + 15);
		//line(0, (height / 2) - 15, windowWidth, (height / 2) - 15);
	//pop();

	// Cerchio
	push();
	//fill("#FF3838");
	fill("#FF4122");
	noStroke();
	circle(width / 2, height / 2, volRadius * 2);
	pop();

	// Icona e collegamento alla fine della catena
	push();
		tint(255, 220);
		imageMode(CENTER)
		translate(pos[pos.length - 1].x, pos[pos.length - 1].y )
		rotate(angle+PI)
		translate(-60,0)
		image(img, 0,0, img.width * 0.6, img.height * 0.6);
	pop()
	
	// Testo diviso
	push()
		noStroke();
		fill(255);
		textFont(font);
		textSize(20);
		text("VOLUME:", windowWidth/2-240, windowHeight/2+160)
		text(vol, windowWidth/2-160, windowHeight/2+160);
	pop();
	
}

function mousePressed() {
  mySound.play();
}