import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';
import Sortable from 'sortablejs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import * as Undo from '../undo.js';

// Do not have to make sortable observed
export default class SortableList extends ExtendedComponent {
/*
	props: {
		attr: 'some-attr',
		type: 'sortable-list',
	}
*/
	constructor( props ){
		super( props );
		
		this.change = this.change.bind(this);
		this.initSortable = this.initSortable.bind(this);
		
		this.animation_ts = 150;
		this.delay = 0;
	}
	
	componentDidMount(){
		this.initSortable();
	}
	
	componentWillUnmount(){
		this.sortable.destroy();
	}
	
	get items(){
		return this.props.parent.settings[ this.props.attr ];
	}
	
	initSortable(){
		this.sortable = Sortable.create( this.list_el, {
			animation: this.animation_ts,
			delay: this.delay,
			ghostClass: 'sortable-ghost',
			dragClass: 'sortable-drag',
			filter: '.mce-content-body, .text-editor-panel',
			preventOnFilter: false,
			onStart: () => {
				this.drag_item = this.list_el.getElementsByClassName('sortable-ghost')[0];
				this.drag_item.classList.add('dragging');
			},
			onEnd: () => {
				this.drag_item.classList.remove('dragging');
			},
			onSort: ( e ) => {
				this.change( e.oldIndex, e.newIndex );
			},
		});
	}
	
	addUndo({ old_index, new_index }){
		
		const { parent, attr } = this.props;
		
		Undo.action({
			type: 'reorder',
			obj: parent.settings[ attr ],
			old_index,
			new_index,
		});
	}
	
	change( old_index, new_index ){
				
		const { parent, attr } = this.props;
		
		runInAction(() => {
			this.addUndo({ old_index, new_index });
			const settings = parent.settings[ attr ].splice( old_index, 1 )[0];
			parent.settings[ attr ].splice( new_index, 0, settings );
		});
	}
}