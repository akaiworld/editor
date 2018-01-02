import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';

import * as Undo from '../undo.js';


export default class SettingComponent extends ExtendedComponent {
/*
	props: {
		map,
		current,
		item_n,
	}
*/
	
	constructor( props ){
		super( props );
		
		if( !this.addUndo ){
			this.addUndo = () => {
				if( Date.now() - this.addUndo.last_update_ts < 1000 ){
					this.addUndo.last_update_ts = Date.now();
					return;
				}
				this.addUndo.last_update_ts = Date.now();
				Undo.action({
					obj: this.settings,
					attr: this.attr,
					item_n: this.item_n,
					value: this.current.settings[ this.attr ],
				});
			}
			this.addUndo.last_update_ts = 0;
		}
	}
	
	// editing map { attr, ... }
	get map(){
		return this.props.map;
	}
	
	// attr we are editing
	get attr(){
		return this.props.map.attr;
	}
	
	// current editable react instance on the page
	get current(){
		return this.props.current;
	}
	
	// if this is an array - current.settings[ attr ] is an array
	get is_list(){
		return this.props.item_n !== undefined;
	}
	
	// position of the item we are editing in the array
	get item_n(){
		return this.props.item_n;
	}
	
	// total number of items in the array
	get items_num(){
		return !this.is_list ? undefined : this.items.length;
	}
	
	// children react instances of the current react instance on the page
	get children(){
		return this.current.children;
	}
	
	// for element-checkbox
	get child(){
		
		if( !this.children ){
			return undefined;
		}
		
		const child = this.children[ this.attr ];
		
		return !this.is_list ? child : 
			child ? child[ this.item_n ] : 
			undefined;
	}
	
	get items(){ // alias for this.setting, meant for items if this.is_list === true
		return this.current.settings[ this.attr ];
	}
	
	get settings(){
		return this.current.settings;
	}
	
	get value(){
		let value = this.current.settings[ this.attr ];
		if( this.is_list ){
			value = value[ this.item_n ];
		}
		return value;
	}
	
	set value( value ){
		this.addUndo();
		this.current.settings[ this.attr ] = value;
	}
}