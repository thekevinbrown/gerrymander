import React from 'react';
import { Point } from '../../utils/geometry';
import { DebugPoint } from '../debug-point';

interface Props {
	point1: Point;
	point2: Point;
}

export const DebugLine = ({ point1, point2 }: Props) => {
	return (
		<>
			{/* TODO: Draw a line. Ugh. */}
			<DebugPoint x={point1.x} y={point1.y} color="blue" />
			<DebugPoint x={point2.x} y={point2.y} color="blue" />
		</>
	);
};
