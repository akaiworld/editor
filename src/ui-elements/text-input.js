import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';


export default class TextInput extends ExtendedComponent {
	
	constructor( props ){
		super( props );
		
		this.bindMethods('change', 'focus', 'blur');
		
		this.state = {
			value: this.props.value || '',
			focused: false,
		}
	}
	
	componentWillReceiveProps( props ){
		this.setState({
			value: props.value,
		});
	}
	
	focus(){
		this.setState({
			focused: true,
		});
	}
	
	blur(){
		
		this.setState({
			focused: false,
		});
		
		if( this.props.blur ){
			this.props.blur( this.state.value );
		}
	}
	
	change( e ){
		
		this.setState({
			value: e.target.value,
		});
		
		if( this.props.change ){
			this.props.change( e.target.value );
		}
	}
	
	render(){
		
		const value = this.state.value;
		const focused = this.state.focused;
		
		return (
			<div className={ classes( 'text-input', { 'not-empty': !!value || focused }, { focused: focused } ) }>
				<label>
					<div className='label'>
						{this.props.label || ''}
					</div>
					<input type='text' 
						value={value}
						onChange={this.change}
						onFocus={this.focus}
						onBlur={this.blur}
					/>
				</label>
			</div>
		)
	}
}