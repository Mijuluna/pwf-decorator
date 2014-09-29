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
				var list = pwf.list_scope('jq.deco.');

				for (var i = 0; i < list.length; i++) {
					var obj = pwf.get_class(list[i]);

					if (obj.public.meta.parents.indexOf('jq.abstract.deco') >= 0 && !obj.static.disabled) {
						obj.scan(tar);
					}
				}
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


			this.decorate_checkbox = function(el)
			{
				var input   = pwf.jquery('<div class="input"></div>');
				var wrapper;
				var context;

				el.wrap('<div class="deco-checkbox"></div>');
				wrapper = el.parent();
				wrapper.append(input);
				el.hide();

				context = {'box':el, 'deco':input};

				input.bind('click.deco', context, callback_checkbox);
				input.bind('change.deco', context, callback_checkbox_change);
				el.bind('change.deco', context, callback_checkbox_change);
				el.bind('click.deco', context, callback_checkbox_change);
				callback_checkbox_change({"data":context});
			};


			var callback_checkbox = function(e)
			{
				e.preventDefault();
				e.stopPropagation();

				if (e.data.box.prop('checked')) {
					e.data.box.prop('checked', false);
				} else {
					e.data.box.prop('checked', true);
				}

				e.data.box.trigger('change');
				//~ callback_checkbox_change(e);
			};


			var callback_checkbox_change = function(e)
			{
				if (e.data.box.prop('checked')) {
					e.data.deco.addClass('checked');
				} else {
					e.data.deco.removeClass('checked');
				}
			};



			this.bind_select_clickable_el = function(el, clickable)
			{
				return clickable.bind('click.deco', {"el":el, "deco":this, "clickable":clickable}, function(e) {
					if (!el.hasClass('no-body-click')) {
						pwf.jquery('body').click();
					}

					e.data.deco.display_menu(e.data.el, clickable);
					e.stopPropagation();
				});
			};


			this.reposition_menu = function(el, menu)
			{
				var
					win = pwf.jquery(window),
					select   = el.parent(),
					soffset  = select.offset(),
					win_top  = soffset.top - win.scrollTop(),
					win_bot  = win.scrollTop() + win.height() - soffset.top - select.height(),
					flip     = win_top > win_bot,
					top;

				menu.css({"display":'block', "visibility":'hidden', 'margin-top':0});

				if (flip) {
					top = soffset.top - (menu.offset().top + menu.height()) - 1;
					menu.css({"margin-top": top + 'px'}).addClass('top');
				}

				menu.css('visibility', 'visible').hide().fadeIn(100);
			};


			var callback_option = function(e)
			{
				e.stopPropagation();
				e.preventDefault();

				e.data.el.parent().find('.value').html(e.data.opt.html());

				var opts = e.data.el.find('option');

				for (var i = 0; i < opts.length; i++) {
					pwf.jquery(opts[i]).prop('selected', false).removeAttr('selected');
				}

				e.data.opt.attr('selected', true).click();
				e.data.deco.hide_menu(e.data.el, e.data.clickable);
			};


			this.hide_menu = function(el, clickable)
			{
				pwf.jquery('body').unbind('click.deco');
				el.parent().find('.menu').fadeOut(100, function() {
					pwf.jquery(this).remove();
				});
				this.bind_select_clickable_el(el, clickable);
			};
		};


	if (typeof pwf == 'object') {
		pwf.register(mod_name, mod);
	}

	if (typeof module != 'undefined') {
		module.exports = mod;
	}
}());
