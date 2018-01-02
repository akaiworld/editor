import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import * as Undo from '../undo.js';
import SettingComponent from '../helpers/setting-component.js';

import ElementCheckbox from './element-checkbox.js';
import Button from '../ui-elements/button.js';
import { Lang } from '../texts.js';

@observer 
export default class ListElementCheckbox extends SettingComponent {
/*
	props.map: {
		attr: 'items',
		type: 'list-element-checkbox', // element checkbox
	},
*/
	constructor( props ){
		super( props );
		this.add = this.add.bind(this);
	}
	
	undoAdd(){ // -> do remove
		Undo.action({
			type: 'remove',
			items: this.items,
			children: this.children[ this.attr ],
			item_n: this.items.length,
		});
	}
	
	add(){
		this.undoAdd();
		const item = toJS( this.items[ this.items.length-1 ] );
		delete item.key;
		this.items.push( item );
	}
	
	render(){
		return (
			<div>
				{ this.items.map(( item, i ) => 
					<ElementCheckbox 
						current={this.current} 
						map={this.map} 
						item_n={i} 
						key={this.itemKey( item, this.items )}
					/>
				)}
				<div style={{ padding: '10px', textAlign: 'center' }}>
					<Button text={ Lang.get('add-list-element') } fa_icon='fa-plus' onClick={this.add} />
				</div>
			</div>
		)
	}
}