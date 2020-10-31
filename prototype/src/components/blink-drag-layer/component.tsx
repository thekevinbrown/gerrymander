import React, { CSSProperties } from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import { BlinkDragPreview } from '../blink-drag-preview';

const layerStyles: React.CSSProperties = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
	top: 0,
	width: '100%',
	height: '100%',
};

function getItemStyles(
	initialOffset: XYCoord | null,
	currentOffset: XYCoord | null
): CSSProperties {
	if (!initialOffset || !currentOffset) {
		return {
			display: 'none',
		};
	}

	let { x, y } = currentOffset;

	const transform = `translate(${x}px, ${y}px)`;
	return {
		transform,
		WebkitTransform: transform,
	};
}

export const BlinkDragLayer = () => {
	const { item, isDragging, initialOffset, currentOffset } = useDragLayer((monitor) => ({
		item: monitor.getItem(),
		initialOffset: monitor.getInitialSourceClientOffset(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging(),
	}));

	if (!isDragging) return null;

	return (
		<div style={layerStyles}>
			<div style={getItemStyles(initialOffset, currentOffset)}>
				<BlinkDragPreview {...item} />
			</div>
		</div>
	);
};
