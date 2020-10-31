import React from 'react';

export const BlinkDragPreview = ({ id }: { id: number }) => {
	return (
		<div style={{ position: 'relative', width: 128, height: 128 }}>
			<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
				<path
					stroke="none"
					fill="black"
					opacity={0.5}
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
