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
	constructor(room, bucketer, x, y, r=3, dx=0, dy=0, maxDist=45) {
		this.ctx = room.ctx;
		this.room = room;
		this.bucketer = bucketer;
		this.x = x;
		this.y = y;
		this.r = r;
		this.dx = dx;
		this.dy = dy;
		this.tick = 0;
		this.maxDist = maxDist;
	}
	
	beginStep() {
		// Do nothing
	}
	
	// Move and wrap
	step() {
		this.x += this.dx;
		this.y += this.dy;
		
		this.x = wrap(this.x, 0, this.room.width);
		this.y = wrap(this.y, 0, this.room.height);
		this.bucketer.addToBucket(this);
		
		this.tick++;
	}
	
	// Find neighboring dots
	endStep() {
	}
	
	inRange() {
		return true;
		//const [centeredX, centeredY] = [this.x - (this.room.width/2), this.y - (this.room.width/2)];
		//return centeredX**2 + centeredY**2 < 1500;
	}
	
	// Draw self and lines to neighbors
	draw() {
		if (this.inRange()) {
			
		//drawCircle(this.ctx, this.x, this.y, this.r);
			for(let neighbor of this.bucketer.getNeighbors(this)) {
				drawLine(this.ctx, this.x, this.y, neighbor.x, neighbor.y)
			}
		}
	}
}

// Creates a new dot with values randomly chosen between the specified values
export function randomDot(room, bucketer, minX, maxX, minY, maxY, minR, maxR, minDx, maxDx, minDy, maxDy, maxDist=undefined) {
	return new Dot(room,
				   bucketer,
				   randRange(minX, maxX),
				   randRange(minY, maxY),
				   randRange(minR, maxR),
				   randRange(minDx, maxDx),
				   randRange(minDy, maxDy),
				   maxDist);
			   
}