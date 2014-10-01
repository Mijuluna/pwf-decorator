(function()
{
	var
		mod_name = 'jq.abstract.deco.box',
		mod_inst = true,
		mod = {
			'storage':{
				'checked':false
			},


			'proto':{
				'els':[
					{
						'name':'inner',
						'els':[
							{
								'name':'tick',
								'global':true
							}
						]
					}
				],


				'create_struct':function(p)
				{
					p('bind_events');

					this.update_val();
				},


				'bind_events':function(p)
				{
					var postfix = this.meta.static.to_cname(this.meta.cname);

					this.get_el()
						.bind('click.' + postfix, this, p.get('callbacks_box.change'))
						.bind('change.' + postfix, this, p.get('callbacks_box.update'));

					this.get('input')
						.bind('click.' + postfix, this, p.get('callbacks_box.update'))
						.bind('change.' + postfix, this, p.get('callbacks_box.update'));
				},


				'callbacks_box':
				{
					'change':function(e, data) {
						e.stopPropagation();
						e.data.toggle(data);
					},

					'update':function(e, data) {
						e.stopPropagation();
						e.data.update_val(data);
					}
				}
			},


			'public':{
				'update_val':function(p)
				{
					return this.get('input').prop('checked') ? this.check():this.uncheck();
				},


				'check':function(p)
				{
					p.storage.checked = true;

					this.get_el().addClass('checked');
					this.get_el('tick').show();

					return this;
				},


				'uncheck':function(p)
				{
					p.storage.checked = false;

					this.get_el().removeClass('checked');
					this.get_el('tick').hide();

					return this;
				},


				'toggle':function(p)
				{
					var input = this.get('input');

					if (p.storage.checked) {
						input.removeAttr('checked');
						this.uncheck();
					} else {
						input.prop('checked', true);
						this.check();
					}

					input.trigger('change');
					p('after_change');

					return this;
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
