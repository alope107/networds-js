/*
	Contains utility functions for gamework location
	operations.
*/

// Wraps a value back into bounds.
// TODO: speed up by using modulo instead
export function wrap(current, min, max) {
	while(current < min) {
		current += max-min;
	}
	while(current > max) {
		current -= max-min;
	}
	return current;
}

// Returns 2d euclidean distance between two object with x & y vals.
export function distance(a, b) {
	return Math.hypot(a.x-b.x, a.y-b.y);
}

// Returns 2d euclidean distance squared between two object with x & y vals.
export function squaredDistance(a, b) {
	return (a.x-b.x)**2 + (a.y-b.y)**2;
}