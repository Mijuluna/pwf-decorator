if (!pwf.get_module_status('jquery-compat')) {
	require('pwf-jquery-compat');
}

require('./abstract/deco.js');
require('./abstract/deco/box');
require('./abstract/deco/menu');
require('./deco/select/opt');
require('./deco/checkbox');
require('./deco/radio');
require('./deco/select');

module.exports = require('./decorator');
