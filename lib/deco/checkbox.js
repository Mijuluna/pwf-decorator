(function()
{
	var
		mod_name = 'jq.deco.checkbox',
		mod_inst = true,
		obj = {
			'parents':['jq.abstract.deco', 'jq.abstract.deco.box'],

			'static':{
				'selectors':['input[type=checkbox]']
			},
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


