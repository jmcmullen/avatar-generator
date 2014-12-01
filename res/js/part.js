var parts = [];

function Part(name, sprite, minWidth, maxWidth, minHeight, maxHeight, initalWidth, initalHeight, anchorX, anchorY, inverse) {
	this.name = name;
	this.sprite = sprite;
	this.maxWidth = maxWidth;
	this.maxHeight = maxHeight;
	this.minWidth = minWidth;
	this.minHeight = minHeight;
	this.initialHeight = initalHeight;
	this.initialWidth = initalWidth;
	this.anchorX = anchorX;
	this.anchorY = anchorY;
	this.sprite.anchor.x = anchorX;
	this.sprite.anchor.y = anchorY;
	parts[parts.length] = this;
	sprite._interactive = true;
	this.text = new PIXI.Text(
		"", 
		{font:"16px Arial", fill:"black"}
	);
	this.text.anchor.x = 0.5;
	this.text.position.x = sprite.position.x;
	this.text.position.y = sprite.position.y;
	this.debug = new PIXI.Graphics();
	this.debug.beginFill(0x000000);
	this.debug.drawCircle(sprite.position.x, sprite.position.y, 5);
}

function getPart(name) {
	for(part in parts) {
		if(parts[part].name === name) {
			return parts[part];
		}
	}
	return null;
}
