
var tiles = [];
var averageFrames = 0;
var lastSelectedTile = -1;

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  for (var y = 0; y < 14; y++) {
    for (var x = 0; x < 24; x++) {
      tiles.push(new Tile(225 + x * 40, 300 + y * 40, (y * 24) + x)); 
    }
  }
}

function draw() {
  background(255);
  
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].checkMouse();
    tiles[i].display();
  }
  
  fill(0);
  averageFrames += frameRate();
  text(parseInt(averageFrames / frameCount, 10), 1000, 40);
}

function Tile(xLoc, yLoc, index) {
  var loc = createVector(xLoc, yLoc);
  var mouseHovering = false;
  var red = 0;
  var green = 0;
  var blue = 0;
  var intact = true;
  
  this.display = function() {
    if (!mouseHovering) fill(red, blue, green);
    else fill(120, 120, 120);
    noStroke();
    if (intact) rect(xLoc, yLoc, 40, 40); 
  }
  
  this.checkMouse = function() {
    if (mouseX >= loc.x && mouseX < loc.x + 40 && mouseY >= loc.y && mouseY < loc.y + 40) {
      lastSelectedTile = index;
      mouseHovering = true;
    }
    else mouseHovering = false;
  }
  
  this.getHovering = function() {
    return mouseHovering; 
  }
  
  this.destroy = function() {
    intact = false; 
  }
}

function mousePressed() {
  if (lastSelectedTile >= 0) {
    if (tiles[lastSelectedTile].getHovering()) {
      tiles[lastSelectedTile].destroy();
    }
  }
}
