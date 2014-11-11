var items = [];

function Item(name, group, category, sprite, initalWidth, initalHeight, anchorX, anchorY) {
	this.name = name;
	this.group = group;
	this.sprite = sprite;
	this.initialHeight = initalHeight;
	this.initialWidth = initalWidth;
	this.anchorX = anchorX;
	this.anchorY = anchorY;
	this.inverse = inverse;
	this.sprite.anchor.x = anchorX;
	this.sprite.anchor.y = anchorY;
	items[items.length] = this;
}

function getPart(name) {
	for(part in parts) {
		if(parts[part].name === name) {
			return parts[part];
		}
	}
	return null;
}


new Item(
	"Left Eye", 
	"Round Eyes", 
	"Eyes",
    PIXI.Sprite.fromImage("avatar/eye-1.svg"), 
	23, 23, 
	0.5, 0.5
);

new Item(
	"Right Eye", 
	"Round Eyes", 
	"Eyes",
    PIXI.Sprite.fromImage("avatar/eye-1.svg"), 
	23, 23, 
	0.5, 0.5
);