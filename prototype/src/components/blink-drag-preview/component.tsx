import React from 'react';
import { cssCoordinatesFromCenter, Point } from '../../utils/geometry';
import { Hexagon } from '../hexagon';

export const BlinkDragPreview = ({
	id,
	center,
	delta,
}: {
	id?: number;
	center: Point;
	delta: Point;
}) => {
	const { left, top } = cssCoordinatesFromCenter(center);

	return (
		<div
			style={{
				position: 'absolute',
				left,
				top,
				width: 128,
				height: 128,
				transform: `translate(${delta.x}px, ${delta.y}px)`,
			}}
		>
			<Hexagon />
			{typeof id !== 'undefined' && (
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
			)}
		</div>
	);
};
