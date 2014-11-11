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
	this.inverse = inverse;
	this.sprite.anchor.x = anchorX;
	this.sprite.anchor.y = anchorY;
	parts[parts.length] = this;
	sprite._interactive = true;
}

function getPart(name) {
	for(part in parts) {
		if(parts[part].name === name) {
			return parts[part];
		}
	}
	return null;
}
