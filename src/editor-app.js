import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import Hotkeys from 'react-hot-keys';

import './helpers/window-fns.js';
import * as Undo from './undo.js';
import Store from './store.js';
import EditorControls from './app-ui/editor-controls.js';
import PageContent from './app-ui/page-content.js';
import SettingsNavigator from './app-ui/settings-navigator.js';
import SettingsContent from './app-ui/settings-content.js';


export default function EditorApp(){
	return (
		<Hotkeys
			keyName='command+z,ctrl+z,shift+command+z,ctrl+y' 
			onKeyUp={Undo.hotKey}
		>
			<div className="editor-app">
				<div className="editor-content">
					<EditorControls />
					<PageContent />
				</div>
				<div className="settings-panel">
					<SettingsNavigator />
					<SettingsContent />
				</div>
				{ // <DevTools /> 
				}
			</div>
		</Hotkeys>
	)
}

