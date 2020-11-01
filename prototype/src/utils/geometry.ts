import { BlinkState } from './state';

export const BLINK_SIZE = 128;
const FACE_PADDING = -7;
const HEX_ANGLE_SEGMENT = Math.PI / 3;
export const FACE_ANGLES = [
	0,
	HEX_ANGLE_SEGMENT,
	HEX_ANGLE_SEGMENT * 2,
	HEX_ANGLE_SEGMENT * 3,
	HEX_ANGLE_SEGMENT * 4,
	HEX_ANGLE_SEGMENT * 5,
];
const SNAP_TOLERANCE = 30;

export interface Point {
	x: number;
	y: number;
}

export const facesFromCenter = (center: Point) => {
	const results = [];
	for (let i = 0; i < FACE_ANGLES.length; i++) {
		results.push(faceFromCenter(center, i));
	}
	return results;
};

export const faceFromCenter = (center: Point, faceId: number) => {
	const angle = FACE_ANGLES[faceId];
	if (typeof angle === 'undefined') throw new Error(`Unknown faceId ${faceId}`);

	return {
		x: center.x + (BLINK_SIZE / 2 + FACE_PADDING) * Math.cos(angle),
		y: center.y + (BLINK_SIZE / 2 + FACE_PADDING) * Math.sin(angle),
	};
};

export const centerFromFace = (face: Point, faceId: number) => {
	const angle = FACE_ANGLES[faceId];
	if (typeof angle === 'undefined') throw new Error(`Unknown faceId ${faceId}`);

	return {
		x: face.x - (BLINK_SIZE / 2 + FACE_PADDING) * Math.cos(angle),
		y: face.y - (BLINK_SIZE / 2 + FACE_PADDING) * Math.sin(angle),
	};
};

export const cssCoordinatesFromCenter = (center: Point) => ({
	left: center.x - BLINK_SIZE / 2,
	top: center.y - BLINK_SIZE / 2,
});

export const doSnapToOtherBlinks = ({
	id,
	center,
	blinks,
}: {
	id: number;
	center: Point;
	blinks: BlinkState[];
}) => {
	// If there are no other blinks to snap to, simply return what we got.
	if (blinks.length === 0 || (blinks.length === 1 && blinks[0].id === id)) return center;

	// Find the closest blink.
	let closest: { id: number; distance: number } | undefined = undefined;
	for (const otherBlink of blinks) {
		// Skip ourselves
		if (otherBlink.id === id) continue;

		// Otherwise compute the distance
		const distance = distanceBetween(center, otherBlink.center);

		// And if we're closer than the current closest, save.
		if (!closest || closest.distance > distance) {
			closest = {
				id: otherBlink.id,
				distance,
			};
		}
	}

	if (!closest) throw new Error('Could not find closest blink');

	const otherBlink = blinks[closest.id];

	// Ok, are we close enough to snap?
	// Which faces would snap (if any)?
	const currentSnapFaceId = closestFaceForConnection(center, otherBlink.center);
	// Which means their snap face would be the inverse.
	const otherSnapFaceId = (currentSnapFaceId + 3) % 6;

	const currentSnapFaceCoordinate = faceFromCenter(center, currentSnapFaceId);
	const otherSnapFaceCoordinate = faceFromCenter(otherBlink.center, otherSnapFaceId);

	if (distanceBetween(currentSnapFaceCoordinate, otherSnapFaceCoordinate) <= SNAP_TOLERANCE) {
		// Snap!
		// Position current center from the other face we found.
		return centerFromFace(otherSnapFaceCoordinate, currentSnapFaceId);
	} else {
		// If we're here, we didn't snap. Return the coordinates unbothered.
		return center;
	}
};

export const distanceBetween = (point1: Point, point2: Point) => {
	const a = point1.x - point2.x;
	const b = point1.y - point2.y;

	return Math.sqrt(a * a + b * b);
};

export const closestFaceForConnection = (center: Point, otherBlinkCenter: Point) => {
	let angle = Math.atan2(otherBlinkCenter.y - center.y, otherBlinkCenter.x - center.x);
	if (angle < 0) angle += 2 * Math.PI;

	// Divide into our chunks and ensure we cap at 0 - 5.
	return Math.round(angle / HEX_ANGLE_SEGMENT) % 6;
};

export const connectionsForBlink = (blink: BlinkState, allBlinks: BlinkState[]) => {
	const connections: { [faceId: number]: BlinkState } = {};

	for (const otherBlink of allBlinks) {
		// We're never connected to ourselves.
		if (otherBlink.id === blink.id) continue;

		// Ok, are we close enough to snap?
		// Which faces would snap (if any)?
		const currentSnapFaceId = closestFaceForConnection(blink.center, otherBlink.center);
		// Which means their snap face would be the inverse.
		const otherSnapFaceId = (currentSnapFaceId + 3) % 6;

		const currentSnapFaceCoordinate = faceFromCenter(blink.center, currentSnapFaceId);
		const otherSnapFaceCoordinate = faceFromCenter(otherBlink.center, otherSnapFaceId);

		if (distanceBetween(currentSnapFaceCoordinate, otherSnapFaceCoordinate) <= SNAP_TOLERANCE) {
			// They're connected
			connections[currentSnapFaceId] = otherBlink;
		}
	}

	return connections;
};
