/*
	Controller that creates a networds stepper and begins its animation loop.
*/

import { createNetwordsStepper } from "./scene.js";

const CANVAS_ID = "world";

function init() {
	const canvas = document.getElementById(CANVAS_ID);
	const ctx = canvas.getContext("2d");
	const stepper = createNetwordsStepper(ctx);
	// Make stepper available for debugging purposes.
	window.stepper = stepper;
	stepper.run();
	//ctx.fill(characterPath("A", 50, 50, 5));
	// ctx.beginPath();
	// ctx.moveTo(0, 0);
	// ctx.lineTo(5, 5);
	// ctx.stroke();
}

window.addEventListener('DOMContentLoaded', (event) => {
	init();
});