import React, { Component } from 'react';
import { observer } from 'mobx-react';

import SettingComponent from '../helpers/setting-component.js';

import TextInput from '../ui-elements/text-input.js';
import { Lang } from '../texts.js';

@observer 
export default class ShortText extends SettingComponent {
/*
	props.map: {
		attr: 'text',
		type: 'short-text',
		name: 'attr-name',
	},
*/
	constructor( props ){
		super( props );
		this.change = this.change.bind(this);
	}
	
	change( value ){
		this.value = value;
	}
	
	render(){
		return (
			<TextInput 
				label={ Lang.get( this.map.name ) }
				value={this.value} 
				change={this.change} 
			/>
		)
	}
}