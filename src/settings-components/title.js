import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';

import { Lang } from '../texts.js';

export default class Title extends ExtendedComponent {
/*
	props.map: {
		type: 'title',
		title: 'title-text',
	},
*/
	render(){
		const { title } = this.props.map;
		
		return (
			<div className='title'>
				{ Lang.get( title ) }
			</div>
		)
	}
}