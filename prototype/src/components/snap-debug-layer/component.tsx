import React from 'react';
import { useRecoilValue } from 'recoil';
import { blinksGeometry } from '../../utils/state';
import { DebugPoint } from '../debug-point';

export const SnapDebugLayer = () => {
	const geometry = useRecoilValue(blinksGeometry);

	return (
		<>
			{geometry.map(({ faces, center }) => (
				<>
					{/* Center */}
					<DebugPoint x={center.x} y={center.y} />

					{/* Faces */}
					{faces.map((face, index) => (
						<DebugPoint x={face.x} y={face.y} title={index.toString()} color="green" />
					))}
				</>
			))}
		</>
	);
};
