(function() {
	var
		mod_name = 'decorator',
		mod = function()
		{
			var
				selectors = ['select', 'input[type=checkbox]'],
				self = this;


			this.init = function()
			{
				this.scan();
				return true;
			};


			this.is_ready = function()
			{
				return pwf.mi(['jquery']);
			};


			this.scan = function(container)
			{
				var els = typeof container === 'undefined' ?
					pwf.jquery(this.get_selector()):
					container.find(this.get_selector());

				for (var i = 0; i < els.length; i++) {
					var el = pwf.jquery(els[i]);

					if (!el.hasClass('deco')) {
						this.decorate(el);
						el.addClass('deco');
					}
				}
			};


			this.get_selector = function()
			{
				return selectors.join(', ');
			};


			this.decorate = function(el)
			{
				var type = el.attr('type');

				if (el.is('select')) {
					type = 'select';
				}

				if (typeof this['decorate_' + type] === 'function') {
					this['decorate_' + type](el);
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


			this.decorate_select = function(el)
			{
				var wrapper  = pwf.jquery('<div class="deco-select"/>');
				var label    = pwf.jquery('<div class="label"/>');
				var current  = pwf.jquery('<span class="current"/>');
				var button   = pwf.jquery('<span class="insp button"/>');
				var text     = pwf.jquery('<span class="text value"/>');
				var selected = el.find('option:selected');

				wrapper.append(label.append([current, button]));
				current.append(text);
				el.parent().append(wrapper);
				wrapper.append([el]);
				el.hide();

				if (!selected.length) {
					selected = el.find('option').first();
				}

				text.html(selected.html());
				this.bind_select_clickable_el(el, pwf.jquery([current[0], button[0], label[0]]));
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


			this.display_menu = function(el, clickable)
			{
				pwf.jquery('body').bind('click.deco', {"el":el, "deco":this, "clickable":clickable}, function(e) {
					e.data.deco.hide_menu(e.data.el, e.data.clickable);
				});

				clickable.unbind('click.deco');

				var menu = menu = pwf.jquery('<ul class="plain menu"></ul>');
				var select_opts = el.find('option');
				var opts = [];

				for (var i = 0; i < select_opts.length; i++) {
					var eopt = pwf.jquery(select_opts[i]);

					if (!eopt.hasClass('nouse')) {
						var opt  = pwf.jquery('<li class="val_' + eopt.attr('value') + '"></li>');
						var text = pwf.jquery('<span class="text">'+(eopt.html())+'</span>');

						opt.append(text);
						opts.push(opt);
						opt.bind('click.deco', {"el":el, "deco":this, "opt":eopt, "opt_deco":text, "clickable":clickable}, callback_option);
					}
				}

				menu.hide();
				menu.append(opts);
				el.parent().append(menu);
				this.reposition_menu(el, menu);
			};


			this.update_select_text = function(el, t)
			{
				t.html(el.find('option:selected').html());
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
					pwf.jquery(opts[i]).attr('selected', false).prop('selected', false);
				}

				e.data.opt.attr('selected', true).prop('selected', true).click();
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
