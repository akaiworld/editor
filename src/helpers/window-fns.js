
window.log = ( ...texts ) => {
	texts.forEach(( text ) => {
		console.log( text );
	});
}

window.sessionCounter = () => {
	return window.sessionCounter.n++;
}
window.sessionCounter.n = 0;

// classes( 'some-class', { 'some-class-2': true }, { 'some-class-3': false } )
window.classes = function( ..._cls ){
	var cls = [];
	_cls.forEach(( cl ) => {
		if( typeof cl === 'object' ){
			for( var i in cl ){
				if( !cl[i] ){
					return;
				}
				cl = i;
				break;
			}
		}
		if( !cl ){
			return;
		}
		cls.push( cl );
	});
	return cls.join(' ');
}