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
