import React, { Component } from 'react';
import { observer } from 'mobx-react';

import SettingComponent from '../helpers/setting-component.js';
import * as Undo from '../undo.js';

import TextInput from '../ui-elements/text-input.js';
import { Lang } from '../texts.js';

@observer 
export default class Color extends SettingComponent {
/*
	props.map: {
		attr: 'attr',
		type: 'color',
	},
*/
	
	constructor( props ){
		super( props );
		
		this.alpha = 1;
		
		this.bindMethods('onChangeAlpha', 'updateFromInput', 'update');
	}
	
	componentDidMount(){
		
		this.picker = new CP( this.color_input_el, false );
		
		let color = this.value || '#e74c3c';
		
		color = this.removeRGBA( color ); // set alpha and return color
		
		let first_time = true;
		this.addAlphaRange();
		this.picker.set( color );
		this.picker.enter( this.color_picker_wrap_el );
		
		// hex
		this.picker.on('change', ( color ) => {
			if( !first_time ){
				this.update();
			}
			first_time = false;
		});
	}
	
	removeRGBA( color ){
		if( color.indexOf('rgba') == 0 ){
			color = color.split('rgba').join('rgb');
			let v = color.split(',');
			this.alpha = parseFloat( v.pop().split(')').shift().trim() ) || 1;
			if( this.alpha_range ){
				this.alpha_range.value = this.alpha;
			}
			color = v.join(',')+')';
		}else{
			this.alpha = 1;
		}
		if( this.alpha_range ){
			this.alpha_range.value = this.alpha;
		}
		return color;
	}
	
	addAlphaRange(){
		
		this.alpha_range = document.createElement('input');
		
		this.alpha_range.type = 'range';
		this.alpha_range.min = 0;
		this.alpha_range.max = 1;
		this.alpha_range.step = .01;
		this.alpha_range.value = this.alpha;
		this.alpha_range.onchange = this.onChangeAlpha;
		this.alpha_range.oninput = this.onChangeAlpha;
		
		this.picker.picker.appendChild( this.alpha_range );
	}
	
	onChangeAlpha(){
		this.alpha = parseFloat( this.alpha_range.value );
		this.update();
	}
	
	componentWillUnmount(){
		this.picker.destroy();
	}
	
	// can be rgba or any string
	updateFromInput( color = '' ){
		color = this.removeRGBA( color ); // update alpha and return color
		this.picker.set( color );
		this.update();
	}
	
	// @action("SettingsComponents['color'].update")
	update(){
		
		let color = this.picker.get();
		
		if( this.alpha != 1 ){
			color = CP._HSV2RGB( color );
			color = 'rgba(' + color.join(', ') + ', ' + this.alpha + ')';
		}else{
			color = '#'+CP._HSV2HEX( color );
		}
		
		this.value = color;
	}
	
	render(){
		return (
			<div className='color'>
				<div 
					className='input' 
					ref={ el => this.color_input_el = el }
				></div>
				<div 
					className='color-picker-wrap' 
					ref={ el => this.color_picker_wrap_el = el }
				></div>
				<TextInput 
					label={ Lang.get('color-value') }
					value={this.value}  
					blur={this.updateFromInput} 
				/>
			</div>
		)
	}
}