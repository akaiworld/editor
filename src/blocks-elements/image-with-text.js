import React, { Component } from 'react';
import { observer } from 'mobx-react';

import EditableElement from '../helpers/editable-element.js';

import Text from "./text.js";
import Image from "./image.js";

const Name = 'image-with-text-element';
const SettingsMap = [
	{
		attr: 'on',
		type: 'checkbox', // element checkbox
		on: 'use-element-on',
		off: 'use-element-off',
	},
	{
		type: 'title', // type of setting
		title: 'image-with-text-list-items', // id of the element in the settings object
	},
	{
		type: 'element-checkbox',
		attr: 'image',
	},
	{
		type: 'element-checkbox',
		attr: 'text',
	},
];


@observer
export default class ImageWithText extends EditableElement {
	
	constructor( props ){
		super( props, { Name, SettingsMap } );
	}
	
	defaultSettings(){
		return {
			on: true,
			id: 1,
			image: {
				on: true,
				image: 'https://static.giantbomb.com/uploads/scale_medium/0/1697/237146-2008_kung_fu_panda_002.jpg',
			},
			text: {
				on: true,
				text: '<h3>Кунг-фу</h3>',
			}
		}
	}
	
	render(){
		
		const s = this.settings;
		
		if( !s.on ){
			return null;
		}
		
		return (
			<div style={{ padding: '10px' }}
				className='editable-element'
				{ ...this.editable_wrap }
			>
				{ this.editable_hover }
				<Image parent={this} attr='image' settings={s.image || {}} />
				<Text parent={this} attr='text' settings={s.text || {}} />
			</div>
		)
	}
}












