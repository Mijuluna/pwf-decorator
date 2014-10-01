(function()
{
	var
		mod_name = 'jq.deco.radio',
		mod_inst = true,
		mod = {
			'parents':['jq.abstract.deco', 'jq.abstract.deco.box'],

			'static':{
				'selectors':['input[type=radio]']
			},

			'proto':{
				'prefix':'radio',

				'after_change':function(p)
				{
					pwf.jquery('.' + this.meta.static.to_cname(this.meta.cname)).trigger('change', {
						'stop':true
					});
				}
			},


			'public':{
				'update_val':function(p, e)
				{
					if (!(e instanceof Object && e.stop)) {
						p('after_change');
					}

					return this.get('input').prop('checked') ? this.check():this.uncheck();
				},


				'toggle':function(p)
				{
					this.get('input').prop('checked', true).trigger('change');
					return this.update_val();
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
