import React, { Component } from 'react';
import ExtendedComponent from '../helpers/extended-component.js';
import { observer } from 'mobx-react';

import EditableElement from '../helpers/editable-element.js';
import * as Undo from '../undo.js';


const Name = 'text-element';	
const SettingsMap = [
	{
		attr: 'on',
		type: 'checkbox', // element checkbox
		on: 'use-element-on',
		off: 'use-element-off',
	},
];


const fontsize_formats = '8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 21px 22px 23px 24px 25px 26px 27px 28px 29px 30px 31px 32px 33px 34px 35px 36px 37px 38px 39px 40px 41px 42px 43px 44px 45px 46px 47px 48px 49px 50px 51px 52px 53px 54px 55px 56px 57px 58px 59px 60px 61px 62px 63px 64px 65px 66px 67px 68px 69px 70px 71px 72px 73px 74px 75px 76px 77px 78px 79px 80px 81px 82px 83px 84px 85px 86px 87px 88px 89px 90px 91px 92px 93px 94px 95px 96px 97px 98px 99px 100px';

const font_formats = 'Roboto=Roboto,sans-serif;Open Sans=Open Sans,sans-serif;Roboto Condensed=Roboto Condensed,sans-serif;PT Sans=PT Sans,sans-serif;Roboto Slab=Roboto Slab,serif;Merriweather=Merriweather,serif;Open Sans Condensed=Open Sans Condensed,sans-serif;Lora=Lora,serif;Ubuntu=Ubuntu,sans-serif;Arimo=Arimo,sans-serif;Playfair Display=Playfair Display,serif;Noto Sans=Noto Sans,sans-serif;Lobster=Lobster,cursive;PT Serif=PT Serif,serif;PT Sans Narrow=PT Sans Narrow,sans-serif;Noto Serif=Noto Serif,serif;Ubuntu Condensed=Ubuntu Condensed,sans-serif;Exo 2=Exo 2,sans-serif;Roboto Mono=Roboto Mono,monospace;Cuprum=Cuprum,sans-serif;Fira Sans=Fira Sans,sans-serif;Rubik=Rubik,sans-serif;Cormorant Garamond=Cormorant Garamond,serif;Play=Play,sans-serif;Poiret One=Poiret One,cursive;EB Garamond=EB Garamond,serif;PT Sans Caption=PT Sans Caption,sans-serif;Russo One=Russo One,sans-serif;Comfortaa=Comfortaa,cursive;Istok Web=Istok Web,sans-serif;Playfair Display SC=Playfair Display SC,serif;Didact Gothic=Didact Gothic,sans-serif;Tinos=Tinos,serif;Seymour One=Seymour One,sans-serif;Stalinist One=Stalinist One,cursive;Ledger=Ledger,serif;Rubik Mono One=Rubik Mono One,sans-serif;Underdog=Underdog,cursive;El Messiri=El Messiri,sans-serif;Pattaya=Pattaya,sans-serif;Fira Mono=Fira Mono,monospace;Kurale=Kurale,serif;Cormorant SC=Cormorant SC,serif;Cormorant Unicase=Cormorant Unicase,serif;Cormorant Infant=Cormorant Infant,serif;Cormorant=Cormorant,serif;Prosto One=Prosto One,cursive;Kelly Slab=Kelly Slab,cursive;Tenor Sans=Tenor Sans,sans-serif;Andika=Andika,sans-serif;Anonymous Pro=Anonymous Pro,monospace;Forum=Forum,cursive;Yeseva One=Yeseva One,cursive;Rubik One=Rubik One,sans-serif;Oranienbaum=Oranienbaum,serif;Press Start 2P=Press Start 2P,cursive;Ubuntu Mono=Ubuntu Mono,monospace;Marmelad=Marmelad,sans-serif;Ruslan Display=Ruslan Display,cursive;Scada=Scada,sans-serif;PT Mono=PT Mono,monospace;PT Serif Caption=PT Serif Caption,serif;Marck Script=Marck Script,cursive;Jura=Jura,sans-serif;Neucha=Neucha,cursive;Philosopher=Philosopher,sans-serif;Bad Script=Bad Script,cursive;Cousine=Cousine,monospace;';

const fonts_url = 'https://fonts.googleapis.com/css?family=Andika|Anonymous+Pro:400,400i,700,700i|Arimo:400,400i,700,700i|Bad+Script|Comfortaa:400,700|Cormorant+Garamond:400,400i,700,700i|Cormorant+Infant:400,400i,700,700i|Cormorant+SC:400,700|Cormorant+Unicase:400,700|Cormorant:400,400i,700,700i|Cousine:400,400i,700,700i|Cuprum:400,400i,700,700i|Didact+Gothic|EB+Garamond|El+Messiri:400,700|Exo+2:400,400i,900,900i|Fira+Mono:400,700|Fira+Sans:400,400i,700,700i|Forum|Istok+Web:400,400i,700,700i|Jura:400,600|Kelly+Slab|Kurale|Ledger|Lobster|Lora:400,400i,700,700i|Marck+Script|Marmelad|Merriweather:400,400i,900,900i|Neucha|Noto+Sans:400,400i,700,700i|Noto+Serif:400,400i,700,700i|Open+Sans+Condensed:300,300i,700|Open+Sans:400,400i,800,800i|Oranienbaum|PT+Mono|PT+Sans+Caption:400,700|PT+Sans+Narrow:400,700|PT+Sans:400,400i,700,700i|PT+Serif+Caption:400,400i|PT+Serif:400,400i,700,700i|Pattaya|Philosopher:400,400i,700,700i|Play:400,700|Playfair+Display+SC:400,400i,900,900i|Playfair+Display:400,400i,900,900i|Poiret+One|Press+Start+2P|Prosto+One|Roboto+Condensed:400,400i,700,700i|Roboto+Mono:400,400i,700,700i|Roboto+Slab:400,700|Roboto:400,400i,900,900i|Rubik+Mono+One|Rubik+One|Rubik:400,400i,900,900i|Ruslan+Display|Russo+One|Scada:400,400i,700,700i|Seymour+One|Stalinist+One|Tenor+Sans|Tinos:400,400i,700,700i|Ubuntu+Condensed|Ubuntu+Mono:400,400i,700,700i|Ubuntu:400,400i,700,700i|Underdog|Yeseva+One&amp;subset=cyrillic';


import TinyMCE from 'tinymce';

@observer
export default class Text extends ExtendedComponent {
	
	render(){
		if( !this.props.parent.settings[ this.props.attr ].on ){
			return null;
		}
		return (
			<EditableText { ...this.props } />
		)
	}
}

@observer
class EditableText extends EditableElement {
	
	constructor( props ){
		super( props, { Name, SettingsMap } );
		
		this.id = 'panel-'+window.sessionCounter();
		
		this.initEditor = this.initEditor.bind(this);
		
		this.panel_horizontal_position = 'left';
		this.panel_vertical_position = 'top';
		
		this.has_changes = false;
	}
/*
	
	shouldComponentUpdate(){
		// log( shouldComponentUpdate )
		if( this.focused ){
		//	return false;
		}
	}
*/
	
	componentDidMount( props ){
		this.initEditor();
	}
	
	componentWillUnmount(){
		if( this.editor ){
			this.editor.destroy();	
		}
	}
	
	defaultSettings(){
		return {
			on: true,
			text: '<p>Text</p>',
		}
	}
	
	initEditor(){
		this.tinymce = tinymce.init({
			target: this.editor_el,
			skin: 'lightgray',
			// custom_undo_redo_levels: 1,
/*
			theme: 'modern',
			mobile: {
				theme: 'beta-mobile',
			},
*/
			plugins: "lists link textcolor colorpicker code fullscreen",
			toolbar: [
				'bold italic underline strikethrough subscript superscript | forecolor backcolor',
				'fontselect fontsizeselect styleselect',
				'link unlink | alignleft aligncenter alignright | bullist numlist | code fullscreen',
			],
			style_formats: [
				{title: 'Paragraph', format: 'p'},
				{title: 'Header 1', format: 'h1'},
				{title: 'Header 2', format: 'h2'},
				{title: 'Header 3', format: 'h3'},
				{title: 'Header 4', format: 'h4'},
				{title: 'Header 5', format: 'h5'},
				{title: 'Header 6', format: 'h6'},
			],
			menubar: false,
			height: 200,
			branding: false,
			font_formats,
			fontsize_formats,
			inline: true,
			fixed_toolbar_container: '#'+this.id,
			content_css: [
				fonts_url,
			],
			content_style: `
				* {
					font-family: 'Open Sans';
				}
			`,
			init_instance_callback: ( editor ) => {
				
				this.editor = editor;
				// this.refs.wysiwyg.classList.add('visible');
				
				editor.on('Click', ( e ) => {
					// log('Click');
					// this.change();
					this.repositionPanel( true );
				});
				editor.on('KeyUp', ( e ) => {
					// log('KeyUp');
					// this.change();
					this.repositionPanel();
				});
				editor.on('MouseUp', ( e ) => {
					// log('MouseUp');
					// this.change();
					this.repositionPanel();
				});
				editor.on('Change', ( e ) => {
					// log('Change');
					this.editor.undoManager.clear(); // do not store undos for the editor
					this.has_changes = true;
					this.repositionPanel();
				});
				editor.on('Blur', ( e ) => {
					// log('Blur');
					this.change();
				});
			}
		});
	}
	
	repositionPanel( update ){
		// set panel position here
		
		const editable_element = this.editable_el.getBoundingClientRect();
		// const editor_rect = this.editor_el.getBoundingClientRect();
			// this.editable_el.getElementsByClassName('mce-tinymce')[0].getBoundingClientRect();
		
		this.repositionHorizontal({ update, editable_element });
		this.repositionVertical({ update, editable_element });
	}
	repositionHorizontal({ update, editable_element }){
		
		const page_rect = document.getElementsByClassName('page-content')[0].getBoundingClientRect();
		let right = page_rect.width - editable_element.right;
		
		if( right >= 0 ){
			this.panel_el.style.left = '0px';
			this.panel_el.style.right = 'auto';
			this.panel_horizontal_position = 'right';
		}else{
			right = -right + 25; // scroll bar ?
			this.panel_el.style.left = 'auto';
			this.panel_el.style.right = `${right}px`;
			this.panel_horizontal_position = 'right';
		}
		
	}
	repositionVertical({ update, editable_element }){
		
		if( !update && this.panel_vertical_position == 'top' ){
			return;
		}
		
		const top_panel_height = 60;
		const panel_height = 102;
		const top = editable_element.top - top_panel_height;
		
		if( top >= panel_height ){ // position - top
			
			this.panel_el.style.top = `${-panel_height}px`;
			this.panel_vertical_position = 'top';
			
		}else{ // position - bottom
			
			this.panel_el.style.top = `${editable_element.height}px`;
			this.panel_vertical_position = 'bottom';
		}
	}
	
	change(){
		
		if( !this.has_changes ){
			return;
		}
		
		Undo.action({ 
			obj: this.settings, 
			attr: this.attr, 
			value: this.settings[ this.attr ],
		});
		
		this.settings[ this.attr ] = this.editor.getContent();
		
		this.has_changes = false;
	}
	
	render(){
		
		const s = this.settings;
		
		return (
			<div style={{ position: 'relative' }} 
				ref={ el => this.editable_el = el }
				className='editable-element'
				{ ...this.editable_wrap }
			>
				{ this.editable_hover }
				<div 
					id={this.id} 
					ref={ el => this.panel_el = el }
					className='text-editor-panel'
				></div>
				<div 
					dangerouslySetInnerHTML={{__html: s.text}} 
					onClick={this.openSettings}
					ref={ el => this.editor_el = el }
				></div>
			</div> 
		)
	}
}









