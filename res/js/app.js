// initalise vars
var mouseDown = false;
var mouseTarget = null;
var mouseX = null;
var mouseY = null;
var bodyParts = [];

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

// Initial sizes.
function setInitalSize() {
    for (part in parts) {
        parts[part].sprite.width = parts[part].initialWidth;
        parts[part].sprite.height = parts[part].initialHeight;
    }
	parts.forEach(function(entry) {
		stage.addChild(entry.sprite);
        entry.sprite.width = entry.initialWidth;
        entry.sprite.height = entry.initialHeight;
	});
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
}

setInitalSize();

parts.forEach(function(entry) {
	stage.addChild(entry.sprite);
});

function animate() {
    scale();
    requestAnimFrame(animate);

	for(part in parts) {
		//parts[part].sprite.rotation += 0.1;
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
});
window.addEventListener('touchstop', function(event) {
    mouseDown = false;
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
    mouseX = mouseData.originalEvent.clientX;
    mouseY = mouseData.originalEvent.clientY;
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

function resizeSprite(event) {
	if (mouseDown) {
        var currentX = event.clientX;
        var currentY = event.clientY;
        var newWidth = mouseTarget.sprite.width + ((currentX - mouseX) / 10);
        var newHeight = mouseTarget.sprite.height + ((currentY - mouseY) / 10);
		if(false) {
			newWidth = newWidth - (newWidth * 2);
			newHeight = newHeight - (newHeight * 2);
		}

        if (newWidth < mouseTarget.maxWidth && newWidth > mouseTarget.minWidth) {
            if (mouseTarget.name.indexOf("Leg") > -1) {
                getPart("Left Leg").sprite.width = newWidth;
                getPart("Right Leg").sprite.width = newWidth;
            } else if (mouseTarget.name.indexOf("Arm") > -1) {
                getPart("Left Arm").sprite.width = newWidth;
                getPart("Right Arm").sprite.width = newWidth;
            } else if (mouseTarget.name.indexOf("Head") > -1) {
                mouseTarget.sprite.width = newWidth;
                mouseTarget.sprite.height = newWidth;
            } else {
                mouseTarget.sprite.width = newWidth;
            }
        }

        if (newHeight < mouseTarget.maxHeight && newHeight > mouseTarget.minHeight) {
            if (mouseTarget.name.indexOf("Leg") > -1) {
                getPart("Left Leg").sprite.height = newHeight;
                getPart("Right Leg").sprite.height = newHeight;
            } else if (mouseTarget.name.indexOf("Arm") > -1) {
                getPart("Left Arm").sprite.height = newHeight;
                getPart("Right Arm").sprite.height = newHeight;
            } else if (mouseTarget.name.indexOf("Head") > -1) {
                mouseTarget.sprite.height = newHeight;
                mouseTarget.sprite.width = newHeight;
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
