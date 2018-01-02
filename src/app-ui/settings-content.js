import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';

import { observer } from 'mobx-react';

import { SettingsComponents } from '../settings-components.js';


@observer
export default class SettingsContent extends ExtendedComponent {
	
	render(){
		
		const current = Store.current.get();
		
		if( !current ){
			return null;
		}
		
		return (
			<div className="settings-content">
				{ current.map.map(( item, i ) => {
					
					if( item.type != 'checkbox' && item.attr != 'on' && !current.settings.on ){
						return;
					}
					
					const Component = SettingsComponents[ item.type ];
					if( Component ){
						return <Component current={current} map={item} key={i} />
					}
				}) }
			</div>
		);
	}
}














