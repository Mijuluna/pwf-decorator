var
	assert = require('assert'),
	pwf    = require('../node_modules/pwf-jquery-compat/node_modules/pwf.js');


$ = require('../node_modules/pwf-jquery-compat/node_modules/jquery');
require('pwf-jquery-compat');


describe('sanity', function() {
	it('tests only sanity of js code', function() {
		var mod = null;

		assert.doesNotThrow(function() {
			mod = require('../lib/decorator');
		}, 'An error was thrown during mod inclusion.');

		assert.notEqual(null, mod, 'mod was not loaded successfuly. Check if it\'s being exported properly.');
		pwf.test_sane = true;
	});
});
