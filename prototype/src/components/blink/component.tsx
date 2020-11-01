import React, { useEffect } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useRecoilValue } from 'recoil';
import { BLINK_SIZE, cssCoordinatesFromCenter, Point } from '../../utils/geometry';

import { blinksState } from '../../utils/state';
import { Hexagon } from '../hexagon';

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
	const blink = useRecoilValue(blinksState)[id];
	const [{ isDragging }, drag, preview] = useDrag({
		item: { type: 'blink', id },
		collect: (monitor: DragSourceMonitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
	}, [preview]);

	return (
		<div ref={drag} style={getStyles(blink.center, isDragging)}>
			<Hexagon />
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<span style={{ color: 'white' }}>{id}</span>
			</div>
		</div>
	);
};
