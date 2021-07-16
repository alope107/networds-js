/*
	Controller that creates a networds stepper and begins its animation loop.
*/

import { createNetwordsStepper } from "./scene.js";

const CANVAS_ID = "world";

function init() {
	const canvas = document.getElementById(CANVAS_ID);
	const ctx = canvas.getContext("2d");
	const stepper = createNetwordsStepper(ctx);
	stepper.run();
}

window.addEventListener('DOMContentLoaded', (event) => {
	init();
});