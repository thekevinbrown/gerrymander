import React from 'react';

const POINT_SIZE = 10;

export const DebugPoint = ({
	x,
	y,
	color,
	title,
}: {
	x: number;
	y: number;
	color?: string;
	title?: string;
}) => (
	<div
		style={{
			position: 'absolute',
			top: y - POINT_SIZE / 2,
			left: x - POINT_SIZE / 2,
			width: POINT_SIZE,
			height: POINT_SIZE,
			backgroundColor: color || 'red',
			borderRadius: 100,
			zIndex: 10000,
		}}
	>
		{title && (
			<span style={{ color: 'white', textShadow: '0px 0px 8px 5px rgba(0,0,0,0.75)' }}>
				{title}
			</span>
		)}
	</div>
);
