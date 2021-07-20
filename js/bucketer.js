/*
	Buckets objects with x/y values.
*/

class Bucketer {
	constructor(width, height, xRes, yRes) {
		this.width = width;
		this.height = height;
		this.xRes = xRes;
		this.yRes = yRes;
		this.initBuckets();
	}
	
	initBuckets() {
		this.xBuckets = this.bucketCount(this.width, this.xRes);
		this.yBuckets = this.bucketCount(this.width, this.xRes);
		
		this.buckets = Array(this.xBuckets).fill(0).map(i => Array(this.yBuckets).fill(0).map(j => []));
	}
	
	clearBuckets() {
		// TODO: better way to do this?
		this.initBuckets();
	}
	
	bucketCount(total, res) {
		// May have weird off-by-one errors due to floating weirdness?
		return Math.ceil(total/res);
	}
	
	bucketLocation(position, res) {
		return Math.floor(position/res);
	}
	
	bucketObjectLocation(object) {
		return [this.bucketLocation(object.x, this.xRes), 
				this.bucketLocation(object.y, this.yRes)];
	}
	
	addToBucket(object) {
		if (object.x < 0 || object.y < 0 || object.x > this.width || object.y > this.width) {
			throw `Object with coordinates (${object.x}, ${object.y}) does not fit in bounds (${this.width}, ${this.height}`;
		}
		const loc = this.bucketObjectLocation(object);
		this.buckets[loc[0]][loc[1]].push(object);
	}
	
	*getNeighbors(object) {
		const [x, y] = this.bucketObjectLocation(object);
		for(let dx = -1; dx <= 1; dx++) {
			for(let dy = -1; dy <= 1; dy++) {
				const [newX, newY] = [x+dx, y+dy];
				if (newX < 0 || newX >= this.xBuckets || newY < 0 || newY >= this.yBuckets) continue;
				for (let neighbor of this.buckets[newX][newY]) {
					yield neighbor;
				}
			}
		}
	}
}

export class BucketGameObject extends Bucketer {
	constructor(room, xRes, yRes) {
		super(room.width, room.height, xRes, yRes);
		this.room = room;
	}
	
	beginStep() {
		this.clearBuckets();
	}
	
	step() {
	}
	
	endStep() {
	}
	
	draw() {
	}
}