import React, { Component } from 'react';
import TextInput from './text-input.js';

export default class TextArea extends TextInput {
	
	render(){
		
		const value = this.state.value;
		
		return (
			<div className={ classes( 'text-area', { 'not-empty': !!value || this.state.focused }, { focused: this.state.focused } ) }>
				<label>
					<div className='label'>
						{this.props.label || ''}
					</div>
					<textarea 
						value={this.state.value}
						onChange={this.change}
						onFocus={this.focus}
						onBlur={this.blur}
					></textarea>
				</label>
			</div>
		)
	}
}