import React, { Component } from 'react';

const fontsize_formats = '8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 21px 22px 23px 24px 25px 26px 27px 28px 29px 30px 31px 32px 33px 34px 35px 36px 37px 38px 39px 40px 41px 42px 43px 44px 45px 46px 47px 48px 49px 50px 51px 52px 53px 54px 55px 56px 57px 58px 59px 60px 61px 62px 63px 64px 65px 66px 67px 68px 69px 70px 71px 72px 73px 74px 75px 76px 77px 78px 79px 80px 81px 82px 83px 84px 85px 86px 87px 88px 89px 90px 91px 92px 93px 94px 95px 96px 97px 98px 99px 100px';

const font_formats = 'Roboto=Roboto,sans-serif;Open Sans=Open Sans,sans-serif;Roboto Condensed=Roboto Condensed,sans-serif;PT Sans=PT Sans,sans-serif;Roboto Slab=Roboto Slab,serif;Merriweather=Merriweather,serif;Open Sans Condensed=Open Sans Condensed,sans-serif;Lora=Lora,serif;Ubuntu=Ubuntu,sans-serif;Arimo=Arimo,sans-serif;Playfair Display=Playfair Display,serif;Noto Sans=Noto Sans,sans-serif;Lobster=Lobster,cursive;PT Serif=PT Serif,serif;PT Sans Narrow=PT Sans Narrow,sans-serif;Noto Serif=Noto Serif,serif;Ubuntu Condensed=Ubuntu Condensed,sans-serif;Exo 2=Exo 2,sans-serif;Roboto Mono=Roboto Mono,monospace;Cuprum=Cuprum,sans-serif;Fira Sans=Fira Sans,sans-serif;Rubik=Rubik,sans-serif;Cormorant Garamond=Cormorant Garamond,serif;Play=Play,sans-serif;Poiret One=Poiret One,cursive;EB Garamond=EB Garamond,serif;PT Sans Caption=PT Sans Caption,sans-serif;Russo One=Russo One,sans-serif;Comfortaa=Comfortaa,cursive;Istok Web=Istok Web,sans-serif;Playfair Display SC=Playfair Display SC,serif;Didact Gothic=Didact Gothic,sans-serif;Tinos=Tinos,serif;Seymour One=Seymour One,sans-serif;Stalinist One=Stalinist One,cursive;Ledger=Ledger,serif;Rubik Mono One=Rubik Mono One,sans-serif;Underdog=Underdog,cursive;El Messiri=El Messiri,sans-serif;Pattaya=Pattaya,sans-serif;Fira Mono=Fira Mono,monospace;Kurale=Kurale,serif;Cormorant SC=Cormorant SC,serif;Cormorant Unicase=Cormorant Unicase,serif;Cormorant Infant=Cormorant Infant,serif;Cormorant=Cormorant,serif;Prosto One=Prosto One,cursive;Kelly Slab=Kelly Slab,cursive;Tenor Sans=Tenor Sans,sans-serif;Andika=Andika,sans-serif;Anonymous Pro=Anonymous Pro,monospace;Forum=Forum,cursive;Yeseva One=Yeseva One,cursive;Rubik One=Rubik One,sans-serif;Oranienbaum=Oranienbaum,serif;Press Start 2P=Press Start 2P,cursive;Ubuntu Mono=Ubuntu Mono,monospace;Marmelad=Marmelad,sans-serif;Ruslan Display=Ruslan Display,cursive;Scada=Scada,sans-serif;PT Mono=PT Mono,monospace;PT Serif Caption=PT Serif Caption,serif;Marck Script=Marck Script,cursive;Jura=Jura,sans-serif;Neucha=Neucha,cursive;Philosopher=Philosopher,sans-serif;Bad Script=Bad Script,cursive;Cousine=Cousine,monospace;';

const fonts_url = 'https://fonts.googleapis.com/css?family=Andika|Anonymous+Pro:400,400i,700,700i|Arimo:400,400i,700,700i|Bad+Script|Comfortaa:400,700|Cormorant+Garamond:400,400i,700,700i|Cormorant+Infant:400,400i,700,700i|Cormorant+SC:400,700|Cormorant+Unicase:400,700|Cormorant:400,400i,700,700i|Cousine:400,400i,700,700i|Cuprum:400,400i,700,700i|Didact+Gothic|EB+Garamond|El+Messiri:400,700|Exo+2:400,400i,900,900i|Fira+Mono:400,700|Fira+Sans:400,400i,700,700i|Forum|Istok+Web:400,400i,700,700i|Jura:400,600|Kelly+Slab|Kurale|Ledger|Lobster|Lora:400,400i,700,700i|Marck+Script|Marmelad|Merriweather:400,400i,900,900i|Neucha|Noto+Sans:400,400i,700,700i|Noto+Serif:400,400i,700,700i|Open+Sans+Condensed:300,300i,700|Open+Sans:400,400i,800,800i|Oranienbaum|PT+Mono|PT+Sans+Caption:400,700|PT+Sans+Narrow:400,700|PT+Sans:400,400i,700,700i|PT+Serif+Caption:400,400i|PT+Serif:400,400i,700,700i|Pattaya|Philosopher:400,400i,700,700i|Play:400,700|Playfair+Display+SC:400,400i,900,900i|Playfair+Display:400,400i,900,900i|Poiret+One|Press+Start+2P|Prosto+One|Roboto+Condensed:400,400i,700,700i|Roboto+Mono:400,400i,700,700i|Roboto+Slab:400,700|Roboto:400,400i,900,900i|Rubik+Mono+One|Rubik+One|Rubik:400,400i,900,900i|Ruslan+Display|Russo+One|Scada:400,400i,700,700i|Seymour+One|Stalinist+One|Tenor+Sans|Tinos:400,400i,700,700i|Ubuntu+Condensed|Ubuntu+Mono:400,400i,700,700i|Ubuntu:400,400i,700,700i|Underdog|Yeseva+One&amp;subset=cyrillic';

// this should not be observable to not autoupdate
export default class TextWysiwyg extends Component {
/*
	props: {
		attr: 'text',
		type: 'text-wysiwyg',
	}
*/
	constructor( props ){
		super( props );
		
		this.settings = Store.current.get().settings;
		this.attr = props.map.attr;
		
		this.change = this.change.bind(this);
		this.initEditor = this.initEditor.bind(this);
		
		this.state = {
			value: this.settings[ this.attr ] || '',
		}
	}
	
	componentWillReceiveProps( props ){
		this.settings = Store.current.get().settings;
		this.attr = props.map.attr;
		
		this.editor.destroy();
		
		this.setState({
			value: this.settings[ this.attr ] || '',
		});
	}
	
	componentWillUnmount(){
		this.editor.destroy();
	}
	
	initEditor(){
		
		this.refs.wysiwyg.classList.remove('visible');
		setTimeout(() => {
		
/*
			if( Lang.str({ ru: 'ru_RU' }) == 'ru_RU' ){
				tiny_mce_settings_0.language = 'ru_RU';
				tiny_mce_settings_0.language_url = '/lib/tinymce_ru_RU.js';
			}
*/
			tinymce.init({
				target: this.refs.editor,
				skin: 'lightgray',
				plugins: "lists link textcolor colorpicker code fullscreen",
				toolbar: [
					'bold italic underline strikethrough subscript superscript | forecolor backcolor',
					'link unlink | fontselect fontsizeselect h1 h2 h3',
					'alignleft aligncenter alignright | bullist numlist | code fullscreen',
				],
				menubar: false,
				height: 200,
				branding: false,
				font_formats,
				fontsize_formats,
				inline: true,
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
					
					this.refs.wysiwyg.classList.add('visible');
					
					editor.on('Click', ( e ) => {
						// log('Click');
						this.change();
					});
					editor.on('KeyUp', ( e ) => {
						// log('KeyUp');
						this.change();
					});
					editor.on('Undo', ( e ) => {
						// log('Undo');
						this.change();
					});
					editor.on('Redo', ( e ) => {
						// log('Redo');
						this.change();
					});
					editor.on('Change', ( e ) => {
						// log('Change');
						this.change();
					});
				}
			});
		}, 200);
	}
	
	change(){
		this.settings[ this.attr ] = this.editor.getContent();
	}
	
	render(){
		setTimeout( this.initEditor, 0 );
		return (
			<div className='text-wysiwyg' ref='wysiwyg'>
				<div className='editor' ref='editor' value={this.state.value} onChange={() => {}}>{this.state.value}</div>
			</div>
		)
	}
}