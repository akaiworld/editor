const blocks_num = 1;
export const Blocks = {}

for( let i = 1; i <= blocks_num; i++ ){
	Blocks[ 'block-'+i ] = require( './blocks-components/block-'+i+'.js' ).default;
}