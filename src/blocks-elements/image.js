import React, { Component } from 'react';
import { observer } from 'mobx-react';

import EditableElement from '../helpers/editable-element.js';


const Name = 'image-element';	
const SettingsMap = [
	{
		attr: 'on',
		type: 'checkbox', // element checkbox
		on: 'use-element-on',
		off: 'use-element-off',
	},
	{
		attr: 'image',
		type: 'image-uploader',
	},
];


import TinyMCE from 'tinymce';

@observer
export default class Image extends EditableElement {
	
	constructor( props ){
		super( props, { Name, SettingsMap } );
	}
	
	defaultSettings(){
		return {
			on: true,
			image: 'https://pp.userapi.com/c639521/v639521159/4d363/kH6nx0PRxVI.jpg',
		}
	}
	
	render(){
		
		const s = this.settings;
		
		if( !s.on ){
			return null;
		}
		
		return (
			<div className='image editable-element'
				{ ...this.editable_wrap }
			>
				{ this.editable_hover }
				<img src={s.image} style={{width: '300px'}} />
			</div> 
		)
	}
}












