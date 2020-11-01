import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useRecoilValue } from 'recoil';
import { blinksState } from '../../../utils/state';
import { Hexagon } from '../../hexagon';

export const NewBlinkTool = () => {
	const id = useRecoilValue(blinksState).length;

	const [, drag, preview] = useDrag({
		item: { type: 'new-blink', id },
	});

	useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
	}, [preview]);

	return (
		<div ref={drag}>
			{/* The toolbar button never moves or changes style, but once they start
                dragging, the blink-drag-preview layer will show a blink for them. */}
			<Hexagon />
		</div>
	);
};
