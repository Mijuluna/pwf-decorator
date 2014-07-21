var assert = require('assert');

require('pwf.js');

describe('event test', function() {
	before(require('./utils/create_env'));

	it('tests select box change events', function() {
		var
			values = [],
			input  = pwf.create('input.select', {
				'parent':pwf.body,
				'name':'select',
				'options':[
					{'name':'1', 'value':1},
					{'name':'2', 'value':2},
					{'name':'3', 'value':3},
				],
				'on_change':function(val) {
					values.push(val);
				}
			}),
			deco, current, menu, temp;

		pwf.decorator.scan(input.get_el());

		deco    = input.get_el('wrapper').find('.deco-select');
		current = deco.find('.current');

		assert.equal(deco.length, 1);
		assert.equal(current.length, 1);

		current.click();

		menu = deco.find('.menu');

		menu.find('.val_1').click();
		assert.equal(values.pop(), 1);

		menu.find('.val_2').click();
		assert.equal(values.pop(), 2);

		menu.find('.val_1').click();
		assert.equal(values.pop(), 1);

		menu.find('.val_').click();
		assert.equal(values.pop(), '');
	});
});
