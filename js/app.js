/*
	Controller that creates a networds stepper and begins its animation loop.
*/

import { characterPath, CharacterSVG } from "./characterPaths.js";
import { createNetwordsStepper } from "./scene.js";
import { drawCircle, drawLine } from "./drawing.js";

import { ShapeInfo, Intersection } from "./node_modules/kld-intersections/dist/index-esm.js";

const CANVAS_ID = "world";

function init() {
	const canvas = document.getElementById(CANVAS_ID);
	const ctx = canvas.getContext("2d");
	const stepper = createNetwordsStepper(ctx);
	// Make stepper available for debugging purposes.
	window.stepper = stepper;
	stepper.run();
	
	// const path = ShapeInfo.path("M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100");
	// const line = ShapeInfo.line([0, 0], [0, 1]);
	// const intersections = Intersection.intersect(path, line);
	// window.ShapeInfo = ShapeInfo;
	// window.Intersection = Intersection;
	// console.log(intersections.points.length);
	// window.a = new CharacterSVG(ctx, "A", 50, 50, 5);
	// let pt1 = {x: 0,y: 20};
	// let pt2 = {x:63, y:20};
	// //drawLine(ctx, pt1.x, pt1.y, pt2.x, pt2.y);
	// console.log(a.lineIntersections(pt1.x, pt1.y, pt2.x, pt2.y));
	// window.a.draw();
	// window.ctx = ctx;
	// window.characterPath = characterPath;
	// window.drawCircle = drawCircle;
	// window.CharacterSVG = CharacterSVG;
	// window.drawLine = drawLine;
	// ctx.beginPath();
	// ctx.moveTo(0, 0);
	// ctx.lineTo(5, 5);
	// ctx.stroke();
}

window.addEventListener('DOMContentLoaded', (event) => {
	init();
});