import React, { useEffect } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { BlinkState } from '../../blink-state';

function getStyles(left: number, top: number, isDragging: boolean): React.CSSProperties {
	const transform = `translate3d(${left}px, ${top}px, 0)`;
	return {
		position: 'absolute',
		transform,
		WebkitTransform: transform,
		// IE fallback: hide the real node using CSS when dragging
		// because IE will ignore our custom "empty image" drag preview.
		opacity: isDragging ? 0 : 1,
		height: isDragging ? 0 : '',
	};
}

export const Blink = ({ id, left, top }: BlinkState) => {
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
		<div ref={drag} style={getStyles(left, top, isDragging)}>
			<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
				<path
					stroke="none"
					fill="black"
					d="M59 2.8867513459481a10 10 0 0 1 10 0l45.425625842204 26.226497308104a10 10 0 0 1 5 8.6602540378444l0 52.452994616207a10 10 0 0 1 -5 8.6602540378444l-45.425625842204 26.226497308104a10 10 0 0 1 -10 0l-45.425625842204 -26.226497308104a10 10 0 0 1 -5 -8.6602540378444l0 -52.452994616207a10 10 0 0 1 5 -8.6602540378444"
				></path>
			</svg>
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
