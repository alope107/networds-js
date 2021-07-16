/*
	Functions and classes related to the networds dot object.
*/
import { drawCircle, drawLine } from "./drawing.js";
import { Room } from "./gamework.js";
import { distance, wrap } from "./location.js"
import { randRange } from "./random.js"

/*
	A dot that linearly moves around the room, wrapping over the edges.
	It draws itself as a filled circle and draws lines to dots within
	maxDist pixels.
*/
export class Dot {
	constructor(room, x, y, r=3, dx=0, dy=0, maxDist=45) {
		this.ctx = room.ctx;
		this.room = room;
		this.x = x;
		this.y = y;
		this.r = r;
		this.dx = dx;
		this.dy = dy;
		this.maxDist = maxDist;
		this.partners = [];
	}
	
	// Move and wrap
	step() {
		this.x += this.dx;
		this.y += this.dy;
		
		this.x = wrap(this.x, 0, this.room.width);
		this.y = wrap(this.y, 0, this.room.height);
	}
	
	// Find neighboring dots
	endStep() {
		this.partners = this.room.instances.filter(partner => distance(this, partner) <= this.maxDist);
	}
	
	// Draw self and lines to neighbors
	draw() {
		drawCircle(this.ctx, this.x, this.y, this.r);
		this.partners.forEach(partner => drawLine(this.ctx, this.x, this.y, partner.x, partner.y));
	}
}

// Creates a new dot with values randomly chosen between the specified values
export function randomDot(room, minX, maxX, minY, maxY, minR, maxR, minDx, maxDx, minDy, maxDy, maxDist=undefined) {
	return new Dot(room,
			   randRange(minX, maxX),
			   randRange(minY, maxY),
			   randRange(minR, maxR),
			   randRange(minDx, maxDx),
			   randRange(minDy, maxDy),
			   maxDist);
			   
}