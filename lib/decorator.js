(function() {
	var
		mod_name = 'decorator',
		mod = function()
		{
			this.init = function()
			{
				this.scan();
				return true;
			};


			this.is_ready = function()
			{
				return pwf.cr(['jq.abstract.deco']);
			};


			this.scan = function(tar)
			{
				var
					list = pwf.list_scope('jq.deco.'),
					changed = [];

				for (var i = 0; i < list.length; i++) {
					var obj = pwf.get_class(list[i]);

					if (obj.public.meta.parents.indexOf('jq.abstract.deco') >= 0 && !obj.static.disabled) {
						changed = pwf.merge(changed, obj.scan(tar));
					}
				}

				return changed;
			};


			this.decorate_radio = function(el)
			{
				var
					input = pwf.jquery('<div class="input"></div>'),
					wrapper,
					context;

				el.wrap('<div class="deco-radio"></div>');
				wrapper = el.parent();
				wrapper.append(input);
				el.hide();

				context = {'box':el, 'deco':input, 'wrap':wrapper};

				wrapper.bind('change.deco', context, callback_radio_change);
				input.bind('click.deco', context, callback_radio);

				el
					.bind('click.deco', context, callback_radio_change)
					.bind('change.deco', context, callback_radio_change);

				callback_checkbox_change({"data":context});
			};


			var callback_radio = function(e)
			{
				e.preventDefault();
				e.stopPropagation();

				if (e.data.box.prop('checked')) {
					e.data.box.prop('checked', false);
				} else {
					e.data.box.prop('checked', true);
				}

				callback_radio_update(e);
			};


			var callback_radio_update = function(e)
			{
				var selector = 'input[name=' + e.data.box.attr('name') + ']';
				pwf.jquery(selector).trigger('change');
			};


			var callback_radio_change = function(e)
			{
				if (e.data.box.attr('type') == 'radio') {
					var fire = false;

					if (e.data.box.prop('checked')) {
						if (fire = !e.data.deco.hasClass('checked')) {
							e.data.deco.addClass('checked');
						}
					} else {
						if (fire = e.data.deco.hasClass('checked')) {
							e.data.deco.removeClass('checked');
						}
					}

					if (fire) {
						callback_radio_update(e);
					}
				}
			};
		};


	if (typeof pwf == 'object') {
		pwf.register(mod_name, mod);
	}

	if (typeof module != 'undefined') {
		module.exports = mod;
	}
}());
