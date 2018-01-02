import React, { Component } from 'react';
import { observer } from 'mobx-react';

import SettingComponent from '../helpers/setting-component.js';

import TextInput from '../ui-elements/text-input.js';
import { Lang } from '../texts.js';

@observer 
export default class ImageUploader extends SettingComponent {
/*
	props.map: {
		type: 'image-uploader',
		attr: 'image',
	},
*/
	constructor( props ){
		
		super( props );
		
		this.updateURL = this.updateURL.bind(this);
		
		this.default_indicator = Lang.get('image-uploader-drop');
		this.start_indicator = Lang.get('image-uploader-start');
		
		this.state = {
			indicator: this.default_indicator,
		}
	}
	
	componentDidMount(){
		const dropzone = this.dropzone = new Dropzone( this.dropzone_el, {
			url: 'https://borstch.com/api/file-upload',
			paramName: 'files',
			acceptedFiles: 'image/*',
			uploadMultiple: false,
			createImageThumbnails: false,
		});
		
		dropzone.on('addedfile', ( e, progress, bytesSent ) => {
			this.setState({
				indicator: this.start_indicator,
			});
		});
		
		dropzone.on('uploadprogress', ( e, progress, bytesSent ) => {
			this.setState({
				indicator: progress+'%',
			});
		});
		
		dropzone.on('success', ( e, url, bytesSent ) => {
			this.updateURL( url );
		});
		
		dropzone.on('complete', ( file ) => {
			dropzone.removeFile( file );
			this.setState({
				indicator: this.default_indicator,
			});
		});
	}
	
	componentWillUnmount(){
		this.dropzone.disable();
	}
	
	normalizeURL( url ){
		return url = ( url || '' ).trim();
	}
	
	updateURL( url ){
		url = this.normalizeURL( url );
		this.value = url;
	}
	
	render(){
		return (
			<div className='image-uploader'>
				<div className='indicator'>{ this.state.indicator }</div>
				<div 
					className='dropzone' 
					ref={ el => this.dropzone_el = el }
				></div>
				<TextInput 
					label={ Lang.get('image-url') }
					value={this.value}  
					change={this.updateURL} 
				/>
			</div>
		)
	}
}