interface LEDState {
	hue: number;
	saturation: number;
	brightness: number;
}

export class BlinkState {
	constructor(public readonly id: number) {}
	public left = 50;
	public top = 50;
}
