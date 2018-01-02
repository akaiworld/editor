import React, { Component } from 'react';

export default class ExtendedComponent extends Component {
	constructor( props ){
		super( props );
		this.bindMethods('itemKey');
	}
	
	bindMethods( ...methods ){
		methods.forEach(( method ) => {
			this[ method ] = this[ method ].bind(this);
		});
	}
	
	itemKey( item, items ){
		
		if( item.key !== undefined ){
			return item.key;
		}
		
		let index = 0;
		items.forEach(( item ) => {
			if( item.key > index ){
				index = item.key;
			}
		});
		item.key = ++index;
		
		return item.key;
	}
}