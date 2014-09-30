var dom = require('jsdom');

module.exports = function(next) {
	if (typeof pwf.window == 'undefined') {
		dom.defaultDocumentFeatures = {
			'FetchExternalResources':['script'],
			'ProcessExternalResources':['script'],
			'MutationEvents':'2.0',
			'QuerySelector':false
		};

		pwf.document = dom.jsdom('<html><head></head><body></body></html>');

		if (typeof pwf.document.createWindow == 'function') {
			pwf.window = pwf.document.createWindow();
		}

		global.document = pwf.document;
		global.window = pwf.window;
		global.sys = {
			'debug':{
				'frontend':true
			}
		};

		require('../../lib/include');
		require('pwf-form');

		if (typeof pwf.jquery.create == 'function') {
			pwf.jquery.create(pwf.window);
		}

		pwf.body = pwf.jquery('body');

		delete global.document;
		delete global.window;
	}

	return pwf.wcr(['form', 'input'], next);
};
