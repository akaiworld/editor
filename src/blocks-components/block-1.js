import React, { Component } from 'react';
import { observer } from "mobx-react";

import EditableElement from '../helpers/editable-element.js';
import SortableList from '../helpers/sortable-list.js';

import Text from '../blocks-elements/text.js';
import ImageWithText from '../blocks-elements/image-with-text.js';





/*
{
	id: 'block-1',
	settings: [
		{
			type: 'title',
			title: 'text-options',
		},
		{
			type: 'delimiter',
		},
		{
			attr: 'text1',
			type: 'element-checkbox', // simple checkbox
		},
		{
			attr: 'text1',
			type: 'checkbox', // simple checkbox
			on: 'Text to display',
			off: 'Text to display',
		},
		{
			name: 'setting',
			type: 'options',
			options: [
				'bold-line', // ids for lang strings
				'thin-line',
			],
		},
		{
			attr: 'some-setting',
			type: 'color',
		},
		{
			attr: 'text',
			type: 'short-text',
			name: 'attr-name',
		},
		{
			attr: 'some-attr',
			type: 'long-text', // url or any other text
			name: 'name',
		},
		{
			attr: 'some-attr',
			type: 'text-wysiwyg', // url or any other text
		},
		{
			type: 'image-uploader',
			attr: 'image',
		},
		{
			type: 'list-element-checkbox',
			attr: 'items',
			default: {
				
			}
		},
	],
}
*/



const Name = 'block';
const SettingsMap = [
	{
		attr: 'on',
		type: 'checkbox', // element checkbox
		on: 'use-element-on',
		off: 'use-element-off',
	},
	{
		type: 'element-checkbox',
		attr: 'text',
	},
	{
		type: 'title', // type of setting
		title: 'image-with-text-list-items', // id of the element in the settings object
	},
	{
		type: 'list-element-checkbox', // element checkbox
		attr: 'items',
	},
	{
		type: 'long-text',
		attr: 'block-id',
		name: 'block-id',
	},
	{
		type: 'color', // type of setting
		attr: 'bgColor', // id of the element in the settings object
	},
];


@observer
export default class Block1 extends EditableElement {
	
	constructor( props ){
		super( props, { Name, SettingsMap } );
	}
	
	defaultSettings(){
		return {
			// block settings
			on: true,
			bgColor: 'rgba(255, 0, 0, 0.24)',
			fullScreen: true,
			direction: 'bold-line',
			'block-id': '',
			items: [
				{
					on: true,
					key: 0,
					image: {
						on: true,
						image: 'https://pp.userapi.com/c639521/v639521159/4d363/kH6nx0PRxVI.jpg',
					},
					text: {
						on: true,
						text: '<h2>Лотос</h2>',
					}
				},
				{
					on: true,
					key: 1,
				},
				{
					on: true,
					key: 2,
					image: {
						on: true,
						image: 'http://zoozel.ru/gallery/images/1454582_kanada-toronto-doma.jpg',
					},
					text: {
						on: true,
						text: '<h3>Дом</h3>',
					}
				},
			],
		}
	}
	
	render(){
		
		const s = this.settings;
		
		if( !s.on ){
			return null;
		}
		
		return (
			<div 
				data-block={s.name} 
				className={ classes( {'full-screen': s.fullScreen}, 'editable-element' ) }
				style={{ backgroundColor: s.bgColor }}
				{ ...this.editable_wrap }
			>
				{ this.editable_hover }
				<Text parent={this} attr='text' />
				<List parent={this} attr='items' />
			</div>
		)
	}
}

@observer
class List extends SortableList {
	render(){
		return (
			<div 
				ref={ el => this.list_el = el }
				style={{ display: 'flex', flexDirection: 'row' }}
			>
				{ this.items.map(( item, i ) => 
					<ImageWithText 
						parent={this.props.parent} 
						attr={this.props.attr} 
						item_n={i} 
						key={this.itemKey( item, this.items )} 
					/>
				)}
			</div>
		)
	}
}























