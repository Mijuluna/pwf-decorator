if (pwf.status('jquery-compat') == 'undefined') {
	require('pwf-jquery-compat');
}

require('./abstract/deco');
require('./abstract/deco/box');
require('./abstract/deco/menu');
require('./deco/select/opt');
require('./deco/checkbox');
require('./deco/radio');
require('./deco/select');

module.exports = require('./decorator');
