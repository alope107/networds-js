/*
	Functions and classes related to the networds dot object.
*/
import { drawCircle, drawLine } from "./drawing.js";
import { Room } from "./gamework.js";
import { distance, wrap } from "./location.js"
import { randRange } from "./random.js"

import {ShapeInfo, Intersection} from "./node_modules/kld-intersections/dist/index-esm.js";

/*
	A dot that linearly moves around the room, wrapping over the edges.
	It draws itself as a filled circle and draws lines to dots within
	maxDist pixels.
*/
export class Dot {
	constructor(room, bucketer, x, y, r=3, dx=0, dy=0, maxDist=45, svg=undefined, maxConnections=Infinity) {
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
		this.svg = svg;
		this.maxConnections = maxConnections;
		this.active = false;
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
		
		if (this.inRange()) {
			this.bucketer.addToBucket(this);
			this.active = true;
		}
		else {
			this.active = false;
		}
		
		this.tick++;
	}
	
	// Find neighboring dots
	endStep() {
	}
	
	getNeighbors() {
		// Get all active neighbors
		return this.room.instances.filter(o => {
			if (!o.active) {
				return false;
			}
			return this.svg.lineIntersections(this.x, this.y, o.x, o.y).length === 0;
		});
	}
	
	inPath(other) {
		
	}
	
	inRange() {
		if (this.svg == undefined) {
			return true;
		}
		return this.svg.containsPoint(this.x, this.y);
		//return this.ctx.isPointInPath(this.path, this.x, this.y);
		//const [centeredX, centeredY] = [this.x - (this.room.width/2), this.y - (this.room.width/2)];
		//return centeredX**2 + centeredY**2 < 1500;
	}
	
	// Draw self and lines to neighbors
	draw() {
		if (this.inRange()) {
			
		//drawCircle(this.ctx, this.x, this.y, this.r);
		let connections = 0;
			for(let neighbor of this.getNeighbors()) {
				connections++;
				if (connections > this.maxConnections) break;
				
				drawLine(this.ctx, this.x, this.y, neighbor.x, neighbor.y);
				
			}
		}
	}
}

// Creates a new dot with values randomly chosen between the specified values
export function randomDot(room, bucketer, svg, minX, maxX, minY, maxY, minR, maxR, minDx, maxDx, minDy, maxDy, maxDist=undefined) {
	return new Dot(room,
				   bucketer,
				   randRange(minX, maxX),
				   randRange(minY, maxY),
				   randRange(minR, maxR),
				   randRange(minDx, maxDx),
				   randRange(minDy, maxDy),
				   maxDist,
				   svg);
			   
}