// initalise vars
var mouseDown = false;
var mouseTarget = null;
var mouseX = null;
var mouseY = null;
var bodyParts = [];
var mouseEnlarge = false;

// create an new instance of a pixi stage
var interactive = true;
var stage = new PIXI.Stage(0xFFFFFF, interactive);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame(animate);

// Create the body.
new Part(
    "Body",
    PIXI.Sprite.fromImage("res/svg/torso-1.svg"),
    120, 300,
    120, 350,
    140, 200,
    0.5, 0.5,
    false
);

// Create the head.
new Part(
    "Head",
    PIXI.Sprite.fromImage("res/svg/head-1.svg"),
    90, 150,
    90, 150,
    130, 130,
    0.5, 0.5,
    true
);

// Create the left arm.
new Part(
    "Left Arm",
    PIXI.Sprite.fromImage("res/svg/limb-1.svg"),
    15, 85,
    50, 210,
    35, 150,
    0.5, 0.0,
    false
);

// Create the right arm.
new Part(
    "Right Arm",
    PIXI.Sprite.fromImage("res/svg/limb-1.svg"),
    15, 85,
    50, 210,
    35, 150,
    0.5, 0.0,
    false
);

// Create the left leg.
new Part(
    "Left Leg",
    PIXI.Sprite.fromImage("res/svg/limb-1.svg"),
    25, 55,
    50, 200,
    45, 180,
    0.5, 0.2,
    false
);

// Create the right leg.
new Part(
    "Right Leg",
    PIXI.Sprite.fromImage("res/svg/limb-1.svg"),
    25, 55,
    50, 200,
    45, 180,
    0.5, 0.2,
    false
);

// Debug mouse.
var mouseDebug = new PIXI.Graphics();
mouseDebug.beginFill(0x000000);
mouseDebug.drawCircle(10, 10, 5);

// Initial sizes.
function setInitalSize() {
    for (part in parts) {
        parts[part].sprite.width = parts[part].initialWidth;
        parts[part].sprite.height = parts[part].initialHeight;
    }
	parts.forEach(function(entry) {
		stage.addChildAt(entry.sprite, 0);
		stage.addChildAt(entry.text, stage.children.length);
		stage.addChildAt(entry.debug, stage.children.length);

        entry.sprite.width = entry.initialWidth;
        entry.sprite.height = entry.initialHeight;
	});
	stage.addChild(mouseDebug);
}

// Set each body part to the right place.
function scale() {
    getPart("Body").sprite.position.x = window.innerWidth / 2;
    getPart("Body").sprite.position.y = window.innerHeight / 2;
    getPart("Head").sprite.position.x = window.innerWidth / 2;
    getPart("Head").sprite.position.y = window.innerHeight / 2 - getPart("Body").sprite.height / 2 - getPart("Head").sprite.height / 2 - 10;
    getPart("Left Arm").sprite.position.x = window.innerWidth / 2 - getPart("Body").sprite.width / 2 - getPart("Left Arm").sprite.width / 2 - 5;
    getPart("Left Arm").sprite.position.y = window.innerHeight / 2 - getPart("Body").sprite.height / 2;
    getPart("Right Arm").sprite.position.x = window.innerWidth / 2 + getPart("Body").sprite.width / 2 + getPart("Right Arm").sprite.width / 2 + 5;
    getPart("Right Arm").sprite.position.y = window.innerHeight / 2 - getPart("Body").sprite.height / 2;
    getPart("Left Leg").sprite.position.x = window.innerWidth / 2 - getPart("Body").sprite.width / 4;
    getPart("Left Leg").sprite.position.y = window.innerHeight / 2 + getPart("Body").sprite.height / 2;
    getPart("Right Leg").sprite.position.x = window.innerWidth / 2 + getPart("Body").sprite.width / 4;
    getPart("Right Leg").sprite.position.y = window.innerHeight / 2 + getPart("Body").sprite.height / 2;
	parts.forEach(function(entry) {
		entry.text.position.x = entry.sprite.position.x;
		entry.text.position.y = entry.sprite.position.y + 10;
		entry.debug.position.x = entry.sprite.position.x;
		entry.debug.position.y = entry.sprite.position.y;
	});
}

setInitalSize();

function animate() {
    scale();
    requestAnimFrame(animate);

	for(part in parts) {
		parts[part].text.setText(Math.round(parts[part].sprite.width) + "x" + Math.round(parts[part].sprite.height));
	}
	
    // render the stage   
    renderer.render(stage);
}


window.addEventListener('resize', function(event) {
    renderer.resize(window.innerWidth, window.innerHeight);
    scale();
});
window.addEventListener('mouseup', function(event) {
    mouseDown = false;
	mouseTarget.sprite.tint = 0xFFFFFF;
	mouseTarget = null;
});
window.addEventListener('touchend', function(event) {
    mouseDown = false;
	mouseTarget.sprite.tint = 0xFFFFFF;
	mouseTarget = null;
});

getPart("Body").sprite.mousemove = function(mouseData) {
    // this line will get the mouse coords relative to the sprites..
    var localCoordsPosition = mouseData.getLocalPosition(getPart("Body").sprite);

    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(getPart("Body").sprite.parent);

    this.position.x = parentCoordsPosition.x;
    this.position.y = parentCoordsPosition.y;
}

// Store information about when a body part is clicked.
function mouseDownOnSprite(bodyPart, mouseData) {
    mouseDown = true;
    mouseTarget = bodyPart;
    // Check if there is a touch screen.
	if(event.touches == null) {
		// There is no touch screen so use the mouse positions.
       	var mouseX = Math.round(event.clientX);
       	var mouseY = Math.round(event.clientY);
	} else {
		// There is a touch screen so use it.
       	var mouseX = Math.round(event.touches[0].pageX);
       	var mouseY = Math.round(event.touches[0].pageY);
	}	
	
	mouseTarget.sprite.tint = 0xFF0000;
	mouseDebug.position.x = mouseX;
	mouseDebug.position.y = mouseY;
	mouseEnlarge = false;
}

// Detect mouse down on body parts.
getPart("Body").sprite.mousedown = getPart("Body").sprite.touchstart = function(mouseData) {
    mouseDownOnSprite(getPart("Body"), mouseData);
}
getPart("Head").sprite.mousedown = getPart("Head").sprite.touchstart = function(mouseData) {
    mouseDownOnSprite(getPart("Head"), mouseData);
}
getPart("Right Arm").sprite.mousedown = getPart("Right Arm").sprite.touchstart = function(mouseData) {
    mouseDownOnSprite(getPart("Right Arm"), mouseData);
}
getPart("Left Arm").sprite.mousedown = getPart("Left Arm").sprite.touchstart = function(mouseData) {
    mouseDownOnSprite(getPart("Left Arm"), mouseData);
}
getPart("Right Leg").sprite.mousedown = getPart("Right Leg").sprite.touchstart = function(mouseData) {
    mouseDownOnSprite(getPart("Right Leg"), mouseData);
}
getPart("Left Leg").sprite.mousedown = getPart("Left Leg").sprite.touchstart = function(mouseData) {
    mouseDownOnSprite(getPart("Left Leg"), mouseData);
}

function lineDistance(x1, x2) {
  var xs = 0;
  var ys = 0;
 
  xs = x2 - x1;
  xs = xs * xs;
 
  return Math.sqrt(xs + ys);
}

function resizeSprite(event) {
	if (mouseDown) {
		
		// Check if there is a touch screen.
		if(event.touches == null) {
			// There is no touch screen so use the mouse positions.
        	var cX = Math.round(event.clientX);
        	var cY = Math.round(event.clientY);
		} else {
			// There is a touch screen so use it.
        	var cX = Math.round(event.touches[0].pageX);
        	var cY = Math.round(event.touches[0].pageY);
		}
		
		// Current sprite location
		var iX = lineDistance(mouseTarget.sprite.position.x, cX);
		var iY = lineDistance(mouseTarget.sprite.position.y, cY);
		
		// Current distance from inital click on sprite.
		var dX = lineDistance(cX, mouseX);
		var dY = lineDistance(cY, mouseY);
		
		console.log("i: " + iX + ":" + iY);
		console.log("d: " + dX + ":" + dY);
		
		// Increase or decrese size by working out if the current mouse location is
		// further away than the initial click location to the anchor position.
		iC = Math.sqrt((cX -= mouseTarget.sprite.position.x) * cX + (cY -= mouseTarget.sprite.position.y) * cY);
		iD = Math.sqrt((dX -= mouseTarget.sprite.position.x) * dX + (dY -= mouseTarget.sprite.position.y) * dY);
		
		if(/*iC > iD && mouseEnlarge == false*/true) {
			// Size is getting smaller.
			mouseEnlarge = false;
        	var newWidth = mouseTarget.sprite.width - (dX / 10);
        	var newHeight = mouseTarget.sprite.height - (dY / 10);
		} else {
			// Size is getting bigger.
			mouseEnlarge = true;
        	var newWidth = mouseTarget.sprite.width + (dX / 10);
        	var newHeight = mouseTarget.sprite.height + (dY / 10);
		}

        if (newWidth <= mouseTarget.maxWidth && newWidth >= mouseTarget.minWidth) {
            if (mouseTarget.name.indexOf("Leg") > -1) {
                getPart("Left Leg").sprite.width = newWidth;
                getPart("Right Leg").sprite.width = newWidth;
            } else if (mouseTarget.name.indexOf("Arm") > -1) {
                getPart("Left Arm").sprite.width = newWidth;
                getPart("Right Arm").sprite.width = newWidth;
            } else {
                mouseTarget.sprite.width = newWidth;
            }
        }
        if (newHeight <= mouseTarget.maxHeight && newHeight >= mouseTarget.minHeight) {
            if (mouseTarget.name.indexOf("Leg") > -1) {
                getPart("Left Leg").sprite.height = newHeight;
                getPart("Right Leg").sprite.height = newHeight;
            } else if (mouseTarget.name.indexOf("Arm") > -1) {
                getPart("Left Arm").sprite.height = newHeight;
                getPart("Right Arm").sprite.height = newHeight;
            } else {
                mouseTarget.sprite.height = newHeight;
            }
        }
    }
}

window.addEventListener("mousemove", function(event) {
    resizeSprite(event);
});
window.addEventListener("touchmove", function(event) {
    resizeSprite(event);
});
