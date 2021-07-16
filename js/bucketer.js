/*
	Buckets objects with x/y values.
*/

export class Bucketer {
	constructor(width, height, xRes, yRes) {
		this.width = width;
		this.height = height;
		this.xRes = xRes;
		this.yRes = yRes;
		this.initBucket();
	}
	
	#initBuckets() {
		this.xBuckets = bucketCount(this.width, this.xRes);
		this.yBuckets = bucketCount(this.width, this.xRes);
		
		this.buckets = Array(xBuckets).fill(0).map(i => Array(yBuckets).fill(0).map(j => []));
	}
	
	#clearBuckets() {
		this.buckets.forEach(a => a.map(b => []));
	}
	
	#bucketCount(total, res) {
		// May have weird off-by-one errors due to floating weirdness?
		return Math.ceil(total/res);
	}
	
	#bucketLocation(position, res) {
		return Math.floor(position/res);
	}
	
	#bucketObjectLocation(object) {
		return [this.bucketLocation(object.x, xRes), 
				this.bucketLocation(object.y, yRes)];
	}
	
	addToBuckets(object) {
		if (object.x < 0 || object.y < 0 || object.x > width || object.y > width) {
			throw `Object with coordinates (${object.x}, ${object.y}) does not fit in bounds (${this.width}, ${this.height}`;
		}
		const loc = this.bucketObjectLocation(object);
		this.buckets[loc[0]][loc[1]].push(object);
	}
	
	*getNeighbors(object) {
		const [x, y] = this.bucketObjectLocation(object);
		for(let dx = -1; dx <= 1; dx++) {
			for(let dy = -1; dy <= 1; dy++) {
				const newX, newY = [x+dx, y+dy];
				if (newX < 0 || newX > xBuckets || newY < 0 || newY > yBuckets) continue;
				for (let neighbor of this.buckets[newX][newY]) {
					yield neighbor;
				}
			}
		}
	}
}