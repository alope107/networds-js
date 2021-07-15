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

function Room(ctx) {
	this.ctx = ctx;
	this.width = ctx.canvas.clientWidth;
	this.height = ctx.canvas.clientHeight;
}

function distance(a, b) {
	return Math.hypot(a.x-b.x, a.y-b.y);
}

function Dot(room, stepper, x, y, r=3, dx=0, dy=0, maxDist=45) {
	this.ctx = room.ctx;
	this.room = room;
	this.stepper = stepper;
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
		this.partners = stepper.instances.filter(partner => distance(this, partner) <= maxDist);
	}
	
	this.draw = function() {
		drawCircle(this.ctx, this.x, this.y, this.r);
		this.partners.forEach(partner => drawLine(this.ctx, this.x, this.y, partner.x, partner.y));
	}
}

function Stepper(room) {
	this.room = room;
	this.ctx = room.ctx;
	this.instances=[];
	this.stepAll = function() {
		this.instances.forEach(instance => instance.step());
		this.instances.forEach(instance => instance.endStep());
	}
	this.drawAll = function() {
		clearCanvas(this.ctx);
		this.instances.forEach(instance => instance.draw());
	}
}

function randRange(min, max) {
	return Math.random() * (max - min) + min;
}

function randomDot(room, stepper, minX, maxX, minY, maxY, minR, maxR, minDx, maxDx, minDy, maxDy) {
	return new Dot(room, stepper,
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
		const dot = randomDot(room, stepper,
							  0, room.width,
							  0, room.height,
							  3, 3,
							  -1, 1,
							  -1, 1);
		stepper.instances.push(dot);
	}
	return stepper;
}

function drawCircle(ctx, x, y, r) {
	ctx.moveTo(0, 0);
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.fill();
}

function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
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

function clearCanvas(ctx) {
	const width = ctx.canvas.clientWidth;
	const height = ctx.canvas.clientHeight;
	
	ctx.clearRect(0, 0, width, height);
}

window.addEventListener('DOMContentLoaded', (event) => {
	init();
});