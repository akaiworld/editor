import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ShortText from './short-text.js';
import TextArea from '../ui-elements/text-area.js';
import { Lang } from '../texts.js';

@observer 
export default class LongText extends ShortText {
/*
	props.map: {
		attr: 'text',
		type: 'long-text',
		name: 'attr-name',
	},
*/
	
	render(){
		return (
			<TextArea
				label={ Lang.get( this.map.name ) }
				value={this.value} 
				change={this.change} 
			/>
		)
	}
}