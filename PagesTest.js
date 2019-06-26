
var tiles = [];
var averageFrames = 0;
var lastSelectedTile = -1;

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  for (var y = 0; y < 14; y++) {
    for (var x = 0; x < 24; x++) {
      tiles.push(new Tile(225 + x * 40, 300 + y * 40, (y * 24) + x, 2000)); 
    }
  }
}

function draw() {
  background(255);
  
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].checkMouse();
    tiles[i].update();
    tiles[i].display();
  }
  
  fill(0);
  averageFrames += frameRate();
  text(parseInt(averageFrames / frameCount, 10), 1000, 40);
}

function Tile(xLoc, yLoc, index, breakTime) {
  var loc = createVector(xLoc, yLoc);
  var mouseHovering = false;
  var tColor = 0;
  var breaking = false;
  var intact = true;
  var breakState = breakTime;
  var breakStart = 0;
  
  this.display = function() {
    if (intact) { 
      noStroke();
      if (!mouseHovering) fill(tColor);
      else fill(255, 0, 0);
      rect(xLoc, yLoc, 40, 40);
      fill(tColor);
      rect(xLoc+1, yLoc+1, 38, 38);
    }
  }
  
  this.update = function() {
    if (intact && breaking) {
      breakState = millis() - breakStart;
      tColor = map(breakState, breakTime, 0, 255, 0);
      if (breakState > breakTime) {
        intact = false;
      }
    }
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
    if (!breaking && intact) {
      breaking = true;
      breakStart = millis();
    }
  }
}

function mousePressed() {
  if (lastSelectedTile >= 0) {
    if (tiles[lastSelectedTile].getHovering()) {
      tiles[lastSelectedTile].destroy();
    }
  }
}
