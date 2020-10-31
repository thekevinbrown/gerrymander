import { atom } from 'recoil';
import { BlinkState } from './blink-state';

export const blinksState = atom({
	key: 'blinksState',
	default: [new BlinkState(0), new BlinkState(1)],
});
