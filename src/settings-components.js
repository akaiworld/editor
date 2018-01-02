
export const SettingsComponents = {
	'element-checkbox': true,
	'list-element-checkbox': true,
	'checkbox': true,
	'options': true,
	'title': true,
	'delimiter': true,
	'color': true,
	'text-wysiwyg': false,
	'short-text': true,
	'long-text': false,
	'image-uploader': true,
}

for( let component_id in SettingsComponents ){
	
	if( SettingsComponents[ component_id ] ){
		SettingsComponents[ component_id ] = require( './settings-components/'+component_id+'.js' ).default;
	}
}
