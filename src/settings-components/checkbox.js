import React, { Component } from 'react';
import { observer } from "mobx-react";

import SettingComponent from '../helpers/setting-component.js';
import { Lang } from '../texts.js';

@observer 
export default class Checkbox extends SettingComponent {
/*
	props.map: {
		attr: 'on',
		type: 'checkbox', // element checkbox
		on: 'use-element-on',
		off: 'use-element-off',
	},
*/
	constructor( props ){
		super( props );
		this.update = this.update.bind(this);
	}
	
	update(){
		this.value = !this.value;
	}
	
	render(){
		return (
			<div className={ classes('checkbox', {'on': this.value}, {'off': !this.value}) } onClick={this.update}>
				<div className="status">
					<i className='fa fa-check visible' aria-hidden="true"></i>
					<i className='fa fa-times hidden' aria-hidden="true"></i>
				</div>
				<div className="name">
					{ Lang.get( this.map[ this.value ? 'on' : 'off' ] ) }
				</div>
			</div>
		)
	}
}