import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';


export default class Delimiter extends ExtendedComponent {
/*
	props.map: {
		type: 'delimiter',
	},
*/
	render(){
		return (
			<div className='delimiter'>
				<div className='line'></div>
			</div>
		)
	}
}