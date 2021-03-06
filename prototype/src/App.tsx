import React from 'react';
import { RecoilRoot } from 'recoil';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Board } from './components/board';
import { Toolbar } from './components/toolbar';
import './App.css';

export const App = () => (
	<RecoilRoot>
		<DndProvider backend={HTML5Backend}>
			<Board />
			<Toolbar />
		</DndProvider>
	</RecoilRoot>
);
