(function()
{
	var
		mod_name = 'jq.abstract.deco.box',
		mod_inst = true,
		obj = {
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
					'change':function(e) {
						e.stopPropagation();
						e.data.toggle();
					},

					'update':function(e) {
						e.stopPropagation();
						e.data.update_val();
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
					this.get_el().addClass('checked');
					this.get_el('tick').show();

					return this;
				},


				'uncheck':function(p)
				{
					this.get_el().removeClass('checked');
					this.get_el('tick').hide();

					return this;
				},


				'toggle':function(p)
				{
					return p.storage.checked ? this.uncheck():this.check();
				}
			}
		};


	/// Register, because we have existing pwf
	if (typeof pwf == 'object') {
		pwf.rc(mod_name, obj);
	}

	/// Export module because we may be inside nodejs.
	if (typeof process != 'undefined') {
		module.exports = mod;
	}
})();
