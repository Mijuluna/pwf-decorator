var dom = require('jsdom');

module.exports = function(next) {
	if (typeof pwf == 'undefined') {
		require('pwf.js');
	}

	if (typeof pwf.window == 'undefined') {
		dom.defaultDocumentFeatures = {
			'FetchExternalResources':['script'],
			'ProcessExternalResources':['script'],
			'MutationEvents':'2.0',
			'QuerySelector':false
		};

		pwf.document = dom.jsdom('<html><head></head><body></body></html>');

		if (pwf.document.createWindow instanceof Function) {
			pwf.window = pwf.document.createWindow();
		} else {
			pwf.window = pwf.document.parentWindow;
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

	return pwf.wait_for('class', [
		'form',
		'input',
		'jq.abstract.deco',
		'jq.deco.select',
		'jq.deco.checkbox',
		'jq.deco.radio'
	], next);
};
