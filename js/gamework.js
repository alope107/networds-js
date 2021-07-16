/*
	Simple game engine.
	Divided into rooms, controlled by a stepper that
	handles tracking instances and delegating event calls.
*/

import { clearCanvas } from "./drawing.js";

// Room holds context and all instances
export function Room(ctx) {
	this.ctx = ctx;
	this.width = ctx.canvas.clientWidth;
	this.height = ctx.canvas.clientHeight;
	this.instances=[];
}

/*
	Stepper has a room and handles triggering all events
	on all the instances in the room.
	
	Event order:
	- Step
	- EndStep
	- Draw
 */
export function Stepper(room) {
	this.room = room;
	this.ctx = room.ctx;
	this.running = false;
	
	// Runs through each step phase for each instance
	this.stepAll = function() {
		this.room.instances.forEach(instance => instance.step());
		this.room.instances.forEach(instance => instance.endStep());
	}
	
	// Runs through each draw phase for each instance
	this.drawAll = function() {
		clearCanvas(this.ctx);
		this.room.instances.forEach(instance => instance.draw());
	}
	
	// Stops a running stepper. Prevens the stepper from being
	// registered with the animation frame.
	this.stop = function() {
		running = false;
	}
	
	// Registers stepper to loop with animation frame.
	this.run = function() {
		// Only start running once.
		if (this.running) return;
		this.running = true;
		
		let stepper = this;
		const recurse = function() {
			if (!stepper.running) return;
			stepper.stepAll();
			stepper.drawAll();
			window.requestAnimationFrame(recurse);
		}
		window.requestAnimationFrame(recurse);
	}
}