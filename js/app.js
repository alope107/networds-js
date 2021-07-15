import { drawCircle, drawLine } from "./drawing.js";
import { Room, Stepper } from "./gamework.js";

const CANVAS_ID = "world";

let x_pos = 0;
let y_pos = 0;
let radius = 10;

function wrap(current, min, max) {
	while(current < min) {
		current += max-min;
	}
	while(current > max) {
		current -= max-min;
	}
	return current;
}

function distance(a, b) {
	return Math.hypot(a.x-b.x, a.y-b.y);
}

function Dot(room, x, y, r=3, dx=0, dy=0, maxDist=45) {
	this.ctx = room.ctx;
	this.room = room;
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;
	this.partners = [];
	
	this.step = function() {
		this.x += this.dx;
		this.y += this.dy;
		
		this.x = wrap(this.x, 0, room.width);
		this.y = wrap(this.y, 0, room.height);
	}
	
	this.endStep = function() {
		this.partners = room.instances.filter(partner => distance(this, partner) <= maxDist);
	}
	
	this.draw = function() {
		drawCircle(this.ctx, this.x, this.y, this.r);
		this.partners.forEach(partner => drawLine(this.ctx, this.x, this.y, partner.x, partner.y));
	}
}

function randRange(min, max) {
	return Math.random() * (max - min) + min;
}

function randomDot(room, minX, maxX, minY, maxY, minR, maxR, minDx, maxDx, minDy, maxDy) {
	return new Dot(room,
			   randRange(minX, maxX),
			   randRange(minY, maxY),
			   randRange(minR, maxR),
			   randRange(minDx, maxDx),
			   randRange(minDy, maxDy));
			   
}

function createStepper(ctx) {
	const room = new Room(ctx);
	const stepper = new Stepper(room);
	
	for(let i = 0; i < 300; i++) {
		const dot = randomDot(room,
							  0, room.width,
							  0, room.height,
							  3, 3,
							  -1, 1,
							  -1, 1);
		room.instances.push(dot);
	}
	return stepper;
}

function init() {
	const canvas = document.getElementById(CANVAS_ID);
	const ctx = canvas.getContext("2d");
	const stepper = createStepper(ctx);
	const recurse = function() {
		stepper.stepAll();
		stepper.drawAll();
		window.requestAnimationFrame(recurse);
	}
	window.requestAnimationFrame(recurse);
}

window.addEventListener('DOMContentLoaded', (event) => {
	init();
});