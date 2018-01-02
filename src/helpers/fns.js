export class Lang {
	
	constructor( texts = {}, lang = 'en' ){
		this.texts = texts;
		this.lang = lang;
	}
	
	get( text, lang ){
		lang = lang || this.lang;
		if( this.texts[ text ] && this.texts[ text ][ lang ] ){
			return this.texts[ text ][ lang ];
		}
		return false;
	}
}