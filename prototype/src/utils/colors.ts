export class HSB {
	private _h: number;
	private _s: number;
	private _b: number;

	constructor(h?: number, s?: number, b?: number) {
		this._h = h ?? 0;
		this._s = s ?? 0;
		this._b = b ?? 0;
	}

	public get h() {
		return this._h;
	}

	public get s() {
		return this._s;
	}

	public get b() {
		return this._b;
	}

	public get color() {
		return `hsl(${this.h}, ${this.s}%, ${this.b}%)`;
	}
}
