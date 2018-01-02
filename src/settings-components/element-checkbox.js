import React, { Component } from 'react';
import { observer } from 'mobx-react';

import SettingComponent from '../helpers/setting-component.js';
import * as Undo from '../undo.js';

import { Lang } from '../texts.js';

@observer 
export default class ElementCheckbox extends SettingComponent {
/*
	props.map: {
		attr: 'text1',
		type: 'element-checkbox', // element checkbox
	},
*/
	constructor( props ){
		super( props );
		this.bindMethods('update', 'open', 'remove');
	}
	
	addUndo(){
		Undo.action({
			obj: this.child.settings,
			attr: 'on',
			value: this.child.settings.on,
		});
	}
	
	undoRemove(){ // -> do add
		Undo.action({
			type: 'add',
			items: this.items,
			children: this.children[ this.attr ],
			item_n: this.item_n,
			value: this.settings[ this.attr ][ this.item_n ],
		});
	}
	
	update(){
		this.addUndo();
		this.child.settings.on = !this.child.settings.on;
	}
	
	open(){
		this.child.openSettings();
	}
	
	remove(){
		this.undoRemove();
		this.children[ this.attr ].splice( this.item_n, 1 );
		this.settings[ this.attr ].splice( this.item_n, 1 );
	}
	
	render(){
		const value = this.child.settings.on;
		
		return (
			<div className={ classes('element-checkbox', {'on': value}, {'off': !value}) }>
				<div className="status" onClick={this.update}>
					<i className='fa fa-check visible' aria-hidden="true"></i>
					<i className='fa fa-times hidden' aria-hidden="true"></i>
				</div>
				{ this.items_num > 1 ?
					<div className='remove' onClick={this.remove}>
						<i className="fa fa-trash-o" aria-hidden="true"></i>
					</div> : null
				}
				<div className="name" onClick={this.open}>
					{ Lang.get( this.child.name ) }
					{ this.is_list ? ' '+(this.item_n+1) : '' }
				</div>
				<div className="open" onClick={this.open}>
					<i className="fa fa-angle-right" aria-hidden="true"></i>
				</div>
			</div>
		)
	}
}