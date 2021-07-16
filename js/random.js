/*
	Functions for dealing with random values.
*/

// Random float within range
export function randRange(min, max) {
	return Math.random() * (max - min) + min;
}