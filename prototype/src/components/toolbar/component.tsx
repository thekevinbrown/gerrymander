import React from 'react';
import { DebugButton } from './components/debug-button';
import { NewBlinkTool } from './components/new-blink-tool';
import './styles.css';

export const Toolbar = () => (
	<div className="toolbar">
		<NewBlinkTool />
		<DebugButton />
	</div>
);
