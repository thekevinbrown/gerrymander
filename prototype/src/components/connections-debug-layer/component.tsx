import React from 'react';
import { useRecoilValue } from 'recoil';
import { blinksConnections, blinksState } from '../../utils/state';
import { DebugLine } from '../debug-line';

export const ConnectionsDebugLayer = () => {
	const connections = useRecoilValue(blinksConnections);
	const blinks = useRecoilValue(blinksState);
	const lines = [];

	for (let blinkId = 0; blinkId < connections.length; blinkId++) {
		const blink = blinks[blinkId];
		for (const otherBlink of Object.values(connections[blinkId])) {
			// We only need to draw connections to blinks with a higher
			// ID than ours, this is our mechanism to avoid drawing them twice.
			// Whoever owns the lower ID draws the line.
			if (otherBlink.id > blinkId) {
				lines.push(<DebugLine point1={blink.center} point2={otherBlink.center} />);
			}
		}
	}

	return <>{lines}</>;
};
