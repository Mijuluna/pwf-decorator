module.exports = function(next) {
	if (typeof global.window == 'undefined') {
		pwf.document = require('jsdom').jsdom(),
		pwf.window = pwf.document.createWindow(),

		global.window   = pwf.window;
		global.document = pwf.document;

		require('pwf-form');
		require('../../lib/include');

		if (pwf.jquery.create instanceof Function) {
			pwf.jquery.create(pwf.window);
		}

		pwf.body = pwf.jquery('body');
	}

	pwf.wi(['decorator'], function(next) {
		return function() {
			next();
		};
	}(next));
};
