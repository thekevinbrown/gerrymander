import { atom, selector } from 'recoil';
import { connectionsForBlink, cssCoordinatesFromCenter, facesFromCenter, Point } from './geometry';

export class BlinkState {
	constructor(public readonly id: number) {}
	public center = {
		x: 0,
		y: 0,
	};

	public static from({ id, center }: { id: number; center?: Point }) {
		const copy = new BlinkState(id);
		if (center) copy.center = center;

		return copy;
	}
}

export const debug = atom({
	key: 'debug',
	default: false,
});

export const blinksState = atom({
	key: 'blinksState',
	default: [] as BlinkState[],
});

export const blinksGeometry = selector({
	key: 'blinksGeometry',
	get: ({ get }) =>
		get(blinksState).map((blink) => ({
			center: blink.center,
			faces: facesFromCenter(blink.center),
		})),
});

export const blinksCss = selector({
	key: 'blinksCss',
	get: ({ get }) => get(blinksState).map(({ center }) => cssCoordinatesFromCenter(center)),
});

export const blinksConnections = selector({
	key: 'blinksConnections',
	get: ({ get }) => {
		// Go through all the blinks and find their connections.
		const allBlinks = get(blinksState);
		return allBlinks.map((blink) => connectionsForBlink(blink, allBlinks));
	},
});
