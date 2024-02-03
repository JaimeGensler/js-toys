class NumberRange {
	#start: number;
	#end: number;

	constructor(start: number, end: number) {
		this.#start = start;
		this.#end = end;
	}
	get start() {
		return this.#start;
	}
	get end() {
		return this.#end;
	}
	get length() {
		return this.#end - this.#start + 1;
	}

	set start(value: number) {
		if (value > this.#end) {
			this.#end = value;
		}
		this.#start = value;
	}
	set end(value: number) {
		if (value < this.#start) {
			this.#start = value;
		}
		this.#end = value;
	}

	// Iterators
	forEach(callback: (value: number, index: number) => void): void {
		for (let val = this.#start, i = 0; val < this.#end; val++) {
			callback(val, i);
		}
	}
	map<T>(callback: (value: number, index: number) => T): T[] {
		return Array.from({ length: this.length }, (_, i) =>
			callback(this.#start + i, i),
		);
	}
	reduce<T>(
		callback: (accumulator: T, value: number, index: number) => T,
		initial: T,
	): T {
		for (let val = this.#start, i = 0; val < this.#end; val++) {
			initial = callback(initial, val, i);
		}
		return initial;
	}
	*[Symbol.iterator](): IterableIterator<number> {
		for (let val = this.#start; val < this.#end; val++) {
			yield val;
		}
	}

	includes(value: number): boolean {
		return this.#start <= value && value <= this.#end;
	}

	toString() {
		return `Range(${this.#start}..${this.#end})`;
	}
}
