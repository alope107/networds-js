/*
	Sets up the room and stepper for the networds game.
*/

import { characterPath } from "./characterPaths.js"
import { BucketGameObject } from "./bucketer.js";
import { Room, Stepper } from "./gamework.js";
import { randomDot } from "./dot.js";

export function createNetwordsStepper(ctx, dotCount=700, dotSize=3, speedBounds=.3) {
	const room = new Room(ctx);
	const stepper = new Stepper(room);
	const bucketer = new BucketGameObject(room, 30, 30);
	const path = characterPath("Q", 200, 200, 20);
	
	room.instances.push(bucketer);
	
	for(let i = 0; i < dotCount; i++) {
		const dot = randomDot(room,
							  bucketer,
							  path,
							  0, room.width,
							  0, room.height,
							  dotSize, dotSize,
							  -speedBounds, speedBounds,
							  -speedBounds, speedBounds);
		room.instances.push(dot);
	}
	return stepper;
}