import React, { Component } from 'react';
import { observer } from "mobx-react";

import EditableElement from '../helpers/editable-element.js';
import SortableList from '../helpers/sortable-list.js';

import { Blocks } from '../blocks-components.js';


const Name = 'page';
const SettingsMap = [
	
];


@observer
export default class PageContent extends EditableElement {
	
	constructor( props ){
		super( props, { Name, SettingsMap } );
	}
	
	componentDidMount(){
		this.openSettings();
	}
	
	get settings(){
		return Store.page;
	}
	
	render(){
		return (
			<List parent={this} attr='blocks' />
		)
	}
}

@observer
class List extends SortableList {
	
	constructor( props ){
		super( props );
		this.animation_ts = 500;
		// this.delay = 100;
	}
	
	render(){
		return (
			<div 
				ref={ el => this.list_el = el }
				className='page-content'
			>
				{Store.page.blocks.map(( item, i ) => {
					let Block = Blocks[ item.name ];
					if( Block ){
						return (
							<Block 
								parent={this.props.parent}
								attr={this.props.attr}
								item_n={i}
								key={this.itemKey( item, this.items )} 
							/>
						)
					}
				})}
			</div>
		)
	}
}













