import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';
import { observer } from "mobx-react";

import { Lang } from '../texts.js';

@observer
export default class SettingsNavigator extends ExtendedComponent {
	
	constructor(){
		super();
	}
	
	render(){
		
		const current = Store.current.get();
		
		if( !current ){
			return null;
		}
		
		return (
			<div className="navigator">
				{ current.parent ? 
					<div className="back" onClick={current.parent.openSettings}>
						<i className="fa fa-angle-left" aria-hidden="true"></i>
					</div>
					: null
				}
				{ current.parent ? 
					<div className="prev-title">
						{ Lang.get( current.parent.name ) }
					</div>
					: null
				}
				<div className="title">
					{ Lang.get( current.name ) }
				</div>
			</div>
		)
	}
}

