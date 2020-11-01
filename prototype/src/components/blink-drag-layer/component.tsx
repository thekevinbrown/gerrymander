import React from 'react';
import { useDragLayer } from 'react-dnd';
import { useRecoilValue } from 'recoil';
import { blinksConnections, blinksState, BlinkState } from '../../utils/state';
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

export const BlinkDragLayer = () => {
	const connections = useRecoilValue(blinksConnections);
	const blinks = useRecoilValue(blinksState);
	const { item, isDragging, initial, delta } = useDragLayer((monitor) => ({
		item: monitor.getItem(),
		initial: monitor.getInitialClientOffset(),
		delta: monitor.getDifferenceFromInitialOffset(),
		isDragging: monitor.isDragging(),
	}));

	if (!isDragging || !initial || !delta) return null;

	// Trace all the connections from that blink and see how many previews we need.
	// At a minimum we always need the one we're dragging
	const previews = [] as JSX.Element[];
	const visited = new Set<number>();

	// Only need to do the graph traversal for existing blinks.
	if (item.type === 'blink') {
		const visit = (blink: BlinkState) => {
			visited.add(blink.id);
			previews.push(<BlinkDragPreview center={blink.center} delta={delta} id={blink.id} />);
			for (const connection of Object.values(connections[blink.id])) {
				if (!visited.has(connection.id)) visit(connection);
			}
		};

		visit(blinks[item.id]);
	} else if (item.type === 'new-blink') {
		// New blinks are always just a single preview.
		previews.push(<BlinkDragPreview center={initial} delta={delta} />);
	}

	// At this point our previews are ready.
	return <div style={layerStyles}>{previews}</div>;
};
