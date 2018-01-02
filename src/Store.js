import * as mobx from 'mobx';
import { observable } from 'mobx';

// for debug comfort
window.mobx = mobx;

window.Store = {
	page: observable({
		blocks: [
			{
				key: 0, // for array dysplay
				// block settings
				name: 'block-1',
				other: 'AKAI',
				bgColor: 'rgba(0, 0, 0, 0.24)',
				fullScreen: false,
/*
				on: true,
				id: 0,
				bgColor: 'rgba(255, 0, 0, 0.24)',
				fullScreen: true,
*/
				
				// block elements
				text: {
					on: true,
					text: '<h1>Title 1</h1>',
				},
			},
			{
				key: 1, // for array dysplay
				// block settings
				name: 'block-1',
				other: 'AKAI',
				bgColor: 'rgba(200, 100, 0, 0.24)',
/*
				on: true,
				id: 0,
				bgColor: 'rgba(255, 0, 0, 0.24)',
				fullScreen: true,
*/
				
				// block elements
				text: {
					on: true,
					text: '<h1>Title 2</h1>',
				},
			},
		]
	}),
	undo: [],
	current: observable.shallowBox( false ), // current element instance, get all data from it 
};



class StatesStack {
	
	constructor(){
		this.stack = [];
	}
	
	addState( target_obj, attr, value ){
		this.stack.push({ target_obj, attr, value });
	}
	
	undo(){
		let state = this.stack.pop();
		log( state )
		if( !state ){
			return;
		}
		state.target_obj[ state.attr ] = state.value;
	}
}

window.StatesStack = new StatesStack();






