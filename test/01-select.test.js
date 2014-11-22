var assert = require('assert');

describe('event test', function() {
	before(require('./utils/create_env'));

	it('tests select box deco object constructor', function() {
		var
			select  = pwf.create('input.select', {'parent':pwf.body}),
			changed = pwf.decorator.scan(),
			tags    = pwf.get_class('jq.abstract.deco').tags,
			test;

		assert.equal(changed.length, 1);
		test = changed.pop();

		assert.equal(select.get_el('input').hasClass(tags.bound), true);
	});
});
