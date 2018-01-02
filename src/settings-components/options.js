import React, { Component } from 'react';
import { observer } from "mobx-react";

import SettingComponent from '../helpers/setting-component.js';

import { Lang } from '../texts.js';

@observer 
export default class Options extends SettingComponent {
/*
	props.map: {
		attr: 'attr',
		type: 'options',
		name: 'attr-name',
		options: [
			'bold-line', // ids for lang strings
			'thin-line',
		],
	},
*/
	constructor(){
		super();
		this.update = this.update.bind(this);
	}
	
	update( value ){
		this.value = value;
	}
	
	render(){
		return (
			<div className='options'>
				{ this.map.options.map(( option, i ) => 
					<div 
						className={ classes( 'option', { 'selected': option === this.value } ) } 
						onClick={() => this.update( option )}
						key={i}
					>
						<div className='status'>
							<i className='fa fa-chevron-right' aria-hidden="true"></i>
						</div>
						<div className='text'>
							{ Lang.get( option ) }
						</div>
					</div>
				)}
			</div>
		)
	}
}