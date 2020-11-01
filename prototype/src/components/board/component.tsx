import React from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { doSnapToOtherBlinks } from '../../utils/geometry';
import {
	blinksConnections,
	blinksState,
	BlinkState,
	debug,
	draggingBlinks,
} from '../../utils/state';

import { Blink } from '../blink';
import { BlinkDragLayer } from '../blink-drag-layer';
import { ConnectionsDebugLayer } from '../connections-debug-layer';
import { SnapDebugLayer } from '../snap-debug-layer';

import './styles.css';

export const Board = () => {
	const [blinks, setBlinks] = useRecoilState(blinksState);
	const connections = useRecoilValue(blinksConnections);
	const debugEnabled = useRecoilValue(debug);

	const [, drop] = useDrop({
		accept: ['blink', 'new-blink'],
		drop(item: { type: 'blink' | 'new-blink'; id: number }, monitor) {
			if (item.type === 'new-blink') {
				// Create a new blink where they dropped.
				const dropPoint = monitor.getClientOffset() as XYCoord;
				const center = doSnapToOtherBlinks({ id: item.id, center: dropPoint, blinks });

				const copy = [...blinks, BlinkState.from({ id: item.id, center })];

				setBlinks(copy);
			} else if (item.type === 'blink') {
				// Move an existing blink
				const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
				const blinkState = blinks[item.id];

				let x = blinkState.center.x + delta.x;
				let y = blinkState.center.y + delta.y;

				({ x, y } = doSnapToOtherBlinks({ id: item.id, center: { x, y }, blinks }));

				const snappedDelta = {
					x: x - blinkState.center.x,
					y: y - blinkState.center.y,
				};

				// Explore the swarm, find all the IDs that are in the group and move them too.
				const visited = new Set<number>();
				const visit = (blink: BlinkState) => {
					visited.add(blink.id);
					for (const connection of Object.values(connections[blink.id])) {
						if (!visited.has(connection.id)) visit(connection);
					}
				};
				visit(blinks[item.id]);

				const copy = [...blinks];
				visited.forEach((blinkId) => {
					const oldCenter = blinks[blinkId].center;
					copy[blinkId] = BlinkState.from({
						id: blinkId,
						center: {
							x: oldCenter.x + snappedDelta.x,
							y: oldCenter.y + snappedDelta.y,
						},
					});
				});

				setBlinks(copy);
			}
			return undefined;
		},
	});

	return (
		<div ref={drop} className="fill">
			{/* Once the blinks settle, this is how they're shown. */}
			{blinks.map((blinkState) => (
				<Blink {...blinkState} />
			))}

			{/* Shows the blinks while they drag, custom drag layer */}
			<BlinkDragLayer />

			{/* Debugging tools */}
			{debugEnabled && (
				<>
					<SnapDebugLayer />
					<ConnectionsDebugLayer />
				</>
			)}
		</div>
	);
};
