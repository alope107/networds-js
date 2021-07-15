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
	
	this.stepAll = function() {
		this.room.instances.forEach(instance => instance.step());
		this.room.instances.forEach(instance => instance.endStep());
	}
	this.drawAll = function() {
		clearCanvas(this.ctx);
		this.room.instances.forEach(instance => instance.draw());
	}
}