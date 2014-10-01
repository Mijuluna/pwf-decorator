(function()
{
	var
		mod_name = 'jq.deco.select.opt',
		mod_inst = true,
		mod = {
			'parents':['jq.struct'],

			'storage':{
				'opts':{
					'tag':'li',
					'el':null,
				}
			},


			'proto':{
				'els':['text'],
				'prefix':'opt',

				'create_struct':function(p)
				{
					this.get_el('text').html(this.get('name'));
					this.get_el()
						.bind('click',  this, p.get('callbacks.select'))
						.bind('select', this, p.get('callbacks.select'));
				},


				'callbacks':
				{
					'select':function(e)
					{
						e.stopPropagation();
						e.data.get_el().trigger('opt_select', e.data);
					}
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
