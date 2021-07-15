/*
 Functions for drawing shapes on a canvas given a context.
*/

// Draws circle of radius r centered at position (x,y)
export function drawCircle(ctx, x, y, r) {
	ctx.moveTo(0, 0);
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.fill();
}

// Draws a line from (x1, y1) to (x2, y2)
export function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

// Clears the whole canvas.
export function clearCanvas(ctx) {
	const width = ctx.canvas.clientWidth;
	const height = ctx.canvas.clientHeight;
	
	ctx.clearRect(0, 0, width, height);
}