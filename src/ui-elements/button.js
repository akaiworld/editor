import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';

export default class Button extends ExtendedComponent {
	
	render(){
		return (
			<div className='btn' onClick={this.props.onClick}>
				<div className='btn-content'>
					{ this.props.fa_icon ? 
						<i className={ classes( 'fa', this.props.fa_icon ) } aria-hidden="true"></i>
						: null
					}
					<span>
						{ this.props.text }
					</span>
				</div>
			</div>
		)
	}
}