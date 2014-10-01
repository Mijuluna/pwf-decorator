(function()
{
	var
		mod_name = 'jq.deco.select',
		mod_inst = true,
		mod = {
			'parents':['jq.abstract.deco', 'jq.abstract.deco.menu'],


			'static':{
				'selectors':['select']
			},


			'storage':{
				'selected':null,

				'opts':{
					'draw':{
						'opt':'jq.deco.select.opt'
					},
					'time':{
						'fade':{
							'in':200,
							'out':250
						}
					}
				}
			},


			'proto':{
				'prefix':'select',
				'els':[
					{
						'name':'box',
						'els':[
							{
								'name':'label',
								'els':['text']
							},
							{
								'name':'button',
								'els':['text']
							}
						]
					},

					{
						'name':'menu',
						'css':{
							'display':'none'
						},
						'els':[
							{
								'name':'inner',
								'tag':'ul',
								'prefix':'select-menu'
							}
						]
					}
				],


				'create_struct':function(p)
				{
					p('update_selected');
					p('update_text');
					p('bind_events');

					this.menu_close(false);
				},


				'update_selected':function(p)
				{
					var input = this.get('input');

					p.storage.selected = input.find('option:selected');

					if (!p.storage.selected.length) {
						p.storage.selected = input.find('option').first();
					}
				},


				'update_text':function(p)
				{
					this.get_el('box.label.text').html(p.storage.selected.html());
				},


				'bind_events':function(p)
				{
					this.get('input').bind('change', this, p.get('callbacks.update_val'));
					this.get_el('box').bind('click', this, p.get('callbacks_menu.toggle'))
					this.get_el().bind('opt_select', this, p.get('callbacks.opt_select'));
				},


				'menu_check':function(p)
				{
					var el = this.get_el('menu.inner');

					if (!el.html()) {
						var opts = this.get('input').find('option');

						for (var i = 0, len = opts.length; i < len; i++) {
							p('create_item', pwf.jquery(opts[i]));
						}
					}
				},


				'create_item':function(p, opt)
				{
					pwf.create(this.get('draw.opt'), {
						'el':opt,
						'name':opt.html(),
						'parent':this.get_el('menu.inner'),
						'value':opt.val()
					});
				},


				'callbacks':
				{
					'opt_select':function(e, opt) {
						e.stopPropagation();
						e.data.select(opt);
					},

					'update_val':function(e) {
						e.data.update_val();
					}
				}
			},


			'public':{
				'update_val':function(p)
				{
					this.get_el('box.label.text').html(this.get('input').find('option:selected').html());
					return this;
				},


				'select':function(p, opt)
				{
					var
						input = this.get('input'),
						opts  = input.find('option');

					for (var i = 0, len = opts.length; i < len; i++) {
						var el = pwf.jquery(opts[i]);

						el.removeAttr('selected');
					}

					opt.get('el').prop('selected', true);
					input.trigger('change', opt.get('val'));

					p('update_selected');
					p('update_text');

					this.menu_close();
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
