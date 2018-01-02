import { toJS, runInAction } from 'mobx';

const undos = [];
let redos = [];
const max = 10;

window.undos = undos;
window.redos = redos;


export function Undo(){
	update( undos, redos );
}
window.Undo = Undo;


export function Redo(){
	update( redos, undos );
}
window.Redo = Redo;


function update( from_stack, to_stack ){
	const action = from_stack.pop();
	
	if( !action ){
		return;
	}
	
	switch( action.type ){
		case 'add':
			add({ to_stack, action });
		break;
		case 'remove':
			remove({ to_stack, action });
		break;
		case 'reorder':
			reorder({ to_stack, action });
		break;
		default:
			setValue({ to_stack, action });
		break;
	}
}

function reorder({ to_stack, action }){
	
	const { obj, old_index, new_index } = action;
	
	runInAction(() => {
		const settings = obj.splice( old_index, 1 )[0];
		obj.splice( new_index, 0, settings );
	});
	
	action.old_index = new_index;
	action.new_index = old_index;
	
	to_stack.push( action );
}

function add({ to_stack, action }){
	
	const { items, item_n, value } = action;
	
	delete value.key;
	
	items.splice( item_n, 0, value );
	
	action.type = 'remove';
	delete action.value;
	
	to_stack.push( action );
}

function remove({ to_stack, action }){
	
	const { items, children, item_n } = action;
	
	children.splice( item_n, 1 );
	const value = items.splice( item_n, 1 )[0];
	
	action.type = 'add';
	action.value = value;
	
	to_stack.push( action );
}

function setValue({ to_stack, action }){
	let current_value;
	
	if( action.item_n ){
		current_value = action.obj[ action.attr ][ action.item_n ];
		action.obj[ action.attr ][ action.item_n ] = action.value;
	}else{
		current_value = action.obj[ action.attr ];
		action.obj[ action.attr ] = action.value;
	}
	
	action.value = current_value;
	
	to_stack.push( action );
}

export function action( data ){

	undos.push( data );
	
	if( undos.length > max ){
		undos.shift();
	}
	
	window.redos = redos = [];
}


export function hotKey( key, e, handle ){
	e.target.blur();
	
	setTimeout(() => {
		if( key === 'command+z' || key === 'ctrl+z' ){
			Undo();
		}
		
		if( key === 'shift+command+z' || key === 'ctrl+y' ){
			Redo();
		}
	}, 0);
}




















