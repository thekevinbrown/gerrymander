import React from 'react';
import { useDrop } from 'react-dnd';
import { useRecoilState } from 'recoil';
import { blinksState } from '../../state';

import { Blink } from '../blink';
import { BlinkDragLayer } from '../blink-drag-layer';
import './styles.css';

export const Board = () => {
	const [blinks, setBlinks] = useRecoilState(blinksState);

	const [, drop] = useDrop({
		accept: 'blink',
		drop(item: { type: 'blink'; id: number }, monitor) {
			const delta = monitor.getDifferenceFromInitialOffset() as {
				x: number;
				y: number;
			};
			const blinkState = blinks[item.id];

			let left = Math.round(blinkState.left + delta.x);
			let top = Math.round(blinkState.top + delta.y);
			// if (snapToGrid) {
			// 	[left, top] = doSnapToGrid(left, top);
			// }

			const copy = [...blinks];
			copy[blinkState.id] = { ...blinkState, left, top };
			setBlinks(copy);

			return undefined;
		},
	});

	return (
		<div ref={drop} className="fill">
			{blinks.map((blinkState) => (
				<Blink {...blinkState} />
			))}
			<BlinkDragLayer />
		</div>
	);
};
