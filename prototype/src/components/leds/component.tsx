import React, { CSSProperties } from 'react';
import { HSB } from '../../utils/colors';
import { BLINK_SIZE, FACE_ANGLES } from '../../utils/geometry';

const distance = BLINK_SIZE / 4;
const center = BLINK_SIZE / 2;
const LED_SIZE = 10;

interface Props {
	leds: HSB[];
}

const styleForLed: (led: HSB, index: number) => CSSProperties = (led, index) => {
	const angle = FACE_ANGLES[index];
	const left = distance * Math.cos(angle) + center - LED_SIZE / 2;
	const top = distance * Math.sin(angle) + center - LED_SIZE / 2;

	return {
		position: 'absolute',
		left,
		top,
		width: LED_SIZE,
		height: LED_SIZE,
		backgroundColor: led.color,
		borderRadius: LED_SIZE,
		border: '1px solid white',
	};
};

export const Leds = ({ leds }: Props) => (
	<>
		{leds.map((led, index) => (
			<div key={index} style={styleForLed(led, index)} />
		))}
	</>
);
