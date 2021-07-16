/*
	Sets up the room and stepper for the networds game.
*/

import { Room, Stepper } from "./gamework.js";
import { randomDot } from "./dot.js";

export function createNetwordsStepper(ctx, dotCount=300, dotSize=3, speedBounds=1) {
	const room = new Room(ctx);
	const stepper = new Stepper(room);
	
	for(let i = 0; i < dotCount; i++) {
		const dot = randomDot(room,
							  0, room.width,
							  0, room.height,
							  dotSize, dotSize,
							  -speedBounds, speedBounds,
							  -speedBounds, speedBounds);
		room.instances.push(dot);
	}
	return stepper;
}