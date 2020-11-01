import React from 'react';
import { useRecoilState } from 'recoil';
import { debug } from '../../../utils/state';

export const DebugButton = () => {
	const [debugEnabled, setDebugEnabled] = useRecoilState(debug);

	return (
		<button
			style={{
				backgroundColor: debugEnabled ? 'red' : undefined,
				fontSize: 32,
			}}
			onClick={() => setDebugEnabled(!debugEnabled)}
		>
			🐛
		</button>
	);
};
