import React, { useEffect, useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useRecoilValue } from 'recoil';
import { HSB } from '../../utils/colors';
import { BLINK_SIZE, cssCoordinatesFromCenter, Point } from '../../utils/geometry';

import { blinksConnections, blinksState, BlinkState } from '../../utils/state';
import { Hexagon } from '../hexagon';
import { Leds } from '../leds';

function getStyles(center: Point, isDragging: boolean): React.CSSProperties {
	const { left, top } = cssCoordinatesFromCenter(center);

	return {
		position: 'absolute',
		left,
		top,
		width: BLINK_SIZE,
		height: BLINK_SIZE,

		// Hide ourselves while dragging, as that's drag layer's job.
		opacity: isDragging ? 0 : 1,
	};
}

export const Blink = ({ id }: { id: number }) => {
	const blinks = useRecoilValue(blinksState);
	const connections = useRecoilValue(blinksConnections);
	const blink = blinks[id];
	const [leds, setLeds] = useState([
		new HSB(),
		new HSB(),
		new HSB(),
		new HSB(),
		new HSB(),
		new HSB(),
	]);

	const [{ isDragging }, drag, preview] = useDrag({
		item: { type: 'blink', id },
		collect: (monitor: DragSourceMonitor) => ({
			isDragging: monitor.isDragging(),
		}),
		isDragging: (monitor: DragSourceMonitor) => {
			// We're dragging if us or any of our connected blinks are
			// dragging.
			const visited = new Set<number>();
			const visit = (blink: BlinkState) => {
				visited.add(blink.id);
				for (const connection of Object.values(connections[blink.id])) {
					if (!visited.has(connection.id)) visit(connection);
				}
			};
			visit(blink);

			// And we're dragging if we're connected to the thing that's dragging.
			return visited.has(monitor.getItem().id);
		},
	});

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
	}, [preview]);

	const rotateColor = () => {
		console.log('Rotating!');
		const [current] = leds;

		const h = (current.h + 45) % 361;
		const s = 100;
		const b = 50;

		console.log(new HSB(h, s, b).color);
		setLeds([
			new HSB(h, s, b),
			new HSB(h, s, b),
			new HSB(h, s, b),
			new HSB(h, s, b),
			new HSB(h, s, b),
			new HSB(h, s, b),
		]);
	};

	return (
		<div ref={drag} style={getStyles(blink.center, isDragging)} onClick={rotateColor}>
			<Hexagon />
			<Leds leds={leds} />
		</div>
	);
};
