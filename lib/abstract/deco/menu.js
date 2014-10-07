(function()
{
	var
		mod_name = 'jq.abstract.deco.menu',
		mod_inst = true,
		mod = {
			'storage':{
				'opened':false,
			},


			'proto':{
				'menu_open_anim':function(p, next)
				{
					this.get_el('menu')
						.stop(true)
						.fadeIn(this.get('time.fade.in'), next);
				},


				'menu_close_anim':function(p, next)
				{
					this.get_el('menu')
						.stop(true)
						.fadeOut(this.get('time.fade.in'), next);
				},


				'menu_reposition':function(p)
				{
					var
						win      = pwf.jquery(window),
						el       = this.get_el(),
						menu     = this.get_el('menu'),
						soffset  = el.offset(),
						pos_top  = soffset.top - win.scrollTop(),
						pos_bot  = win.scrollTop() + win.height() - soffset.top - el.height(),
						top;

					menu.css({"display":'block', "visibility":'hidden', 'position':'absolute'});

					if (pos_top > pos_bot) {
						menu
							.addClass('on-top')
							.css({
								"bottom":el.outerHeight() + 'px',
								"top":'auto'
							});
					} else {
						menu
							.removeClass('on-top')
							.css({
								"top":el.outerHeight(),
								'bottom':'auto'
							});
					}

					menu.css({'display':'none', 'visibility':'visible'});
				},

				'callbacks_menu':{
					'toggle':function(e) {
						if (typeof data == 'undefined') {
							data = {};
						}

						e.stopPropagation();
						e.data.menu_toggle(data.anim, data.next);
					},

					'open':function(e) {
						if (typeof data == 'undefined') {
							data = {};
						}

						e.stopPropagation();
						e.data.menu_open(data.anim, data.next);
					},

					'close':function(e, data) {
						if (typeof data == 'undefined') {
							data = {};
						}

						e.data.menu_close(data.anim, data.next);
					}
				}
			},


			'public':{
				'menu_open':function(p, anim, next)
				{
					if (!p.storage.opened) {
						var el = this.get_el('menu');

						if (typeof anim == 'undefined') {
							anim = true;
						}

						p('menu_check');
						p('menu_reposition');

						p.storage.opened = true;

						this.get_el().parents().last().bind('click.' + this.meta.static.to_cname(this.meta.cname), this, p.get('callbacks_menu.close'));

						if (anim) {
							p('menu_open_anim', next);
						} else {
							el.stop(true).show();
							this.respond(next);
						}
					} else {
						this.respond(next);
					}

					return this;
				},


				'menu_close':function(p, anim, next)
				{
					if (p.storage.opened) {
						var el = this.get_el('menu');

						if (typeof anim == 'undefined') {
							anim = true;
						}

						p.storage.opened = false;

						if (anim) {
							p('menu_close_anim', next);
						} else {
							el.stop(true).hide();
							this.respond(next);
						}
					} else {
						this.respond(next);
					}

					return this;
				},


				'menu_toggle':function(p, anim, next)
				{
					return p.storage.opened ?
						this.menu_close(anim, next):
						this.menu_open(anim, next);
				}
			}
		};


	/// Register, because we have existing pwf
	if (typeof pwf == 'object') {
		pwf.rc(mod_name, mod);
	}

	/// Export module because we may be inside nodejs.
	if (typeof process != 'undefined') {
		module.exports = mod;
	}
})();
