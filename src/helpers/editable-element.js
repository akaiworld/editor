import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';

import { toJS, extendObservable } from 'mobx';

export default class EditableElement extends ExtendedComponent {
	
	constructor( props, { Name, SettingsMap } ){
		super( props );
		
		this.children = {};
		
		this.Name = Name;
		this.SettingsMap = SettingsMap;
		
		this._item_n = this.props.item_n;
		
		this.prepareSettings();
		
		this.addToParent();
		
		this.bindMethods('openSettings', 'wrapMouseEnter', 'wrapMouseLeave');
		
		this.prepareEditableElements();
	}
	
	prepareSettings(){
		
		const parent = this.props.parent;
		
		// for example PageContent
		if( !parent ){
			return;
		}
		
		const attr = this.props.attr;
		const item_n = this.props.item_n;
		
		// get the attr
		let settings = parent.settings[ attr ];
		
		// if this implamentation of the block does not include this element in settings
		if( !settings ){
			settings = parent.settings[ attr ] = {};
		}
		
		// if this attr is an array of items
		if( item_n !== undefined ){
			
			// for some reason array item is undefined or null
			// actually this should not appear
			if( !settings[ item_n ] ){
				settings[ item_n ] = {};
			}
			
			settings = settings[ item_n ];
		}
		
		const defaults = this.defaultSettings();
		
		// remove attrs that are present in settings
		// defaults should not override them
		for( let attr in defaults ){
			if( settings[ attr ] !== undefined ){
				delete defaults[ attr ];
			}
		}
		
		extendObservable( settings, defaults );
		
		// store in this instance
		this.settings_data = settings;
	}
	
	// this should be replaced in the actual implementation of the editable element
	defaultSettings(){
		// an empty object is default for all elements
		return {}
	}
	
	prepareEditableElements(){
		this.editable_wrap = {
			onClick: this.openSettings,
			onMouseOver: this.wrapMouseEnter,
			onMouseOut: this.wrapMouseLeave,
		}
		this.editable_hover = <div 
			className='editable-hover' 
			ref={ element => { this.editable_hover_el = element; }}
		></div>;
	}
	
	wrapMouseEnter( e ){
		e.stopPropagation();
		if( this.editable_hover_el ){
			this.editable_hover_el.classList.add('visible');
		}
	}
	
	wrapMouseLeave( e ){
		e.stopPropagation();
		if( this.editable_hover_el ){
			this.editable_hover_el.classList.remove('visible');
		}
	}
	
	openSettings( e ){
		if( e ) e.stopPropagation();
		Store.current.set( this );
	}
	
	get name(){
		return this.Name;
	}
	
	get attr(){
		return this.props.attr;
	}
	
	get settings(){
		// if( this.name === 'image-with-text-element' ){
		//	log('get settings: \ninitial item_n '+this._item_n+' \ncurrent item_n '+this.props.item_n, mobx.toJS( this.settings_data ))
		// }
		return this.settings_data;
	}
	
	get parent(){
		return this.props.parent;
	}
	
	get map(){
		return this.SettingsMap;
	}
	
	addToParent(){
		if( this.parent && this.attr ){
			this.parent.child( this.attr, this );
		}
	}
	
	child( attr, instance ){
		if( instance.props.item_n !== undefined ){
			this.children[ attr ] = this.children[ attr ] || [];
			this.children[ attr ].splice( instance.props.item_n, 0, instance );
		}else{
			this.children[ attr ] = instance;	
		}
	}
}