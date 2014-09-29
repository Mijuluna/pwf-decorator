(function()
{
	var
		mod_name = 'jq.abstract.deco',
		mod_inst = true,
		obj = {
			'parents':['jq.struct'],

			'static':{
				'disabled':false,
				'selectors':[],

				'tags':{
					'bound':'deco-bound',
					'skip':'deco-skip'
				},


				'scan':function(tar)
				{
					var
						els,
						res = [];

					if (typeof tar === 'undefined') {
						tar = pwf.jquery('html');
					}

					els = tar.find(this.get_selector());

					for (var i = 0; i < els.length; i++) {
						var
							el   = pwf.jquery(els[i]),
							bind = true;

						for (var tag in this.static.tags) {
							if (el.hasClass(this.static.tags[tag])) {
								bind = false;
								break;
							}
						}

						if (bind) {
							res.push(this.decorate(el));
						}
					}

					return res;
				},


				'get_selector':function()
				{
					return this.static.selectors.join(', ');
				},


				'decorate':function(el)
				{
					return pwf.create(this.name, {'input':el});
				},


				'disable':function()
				{
					this.static.disabled = true;
				},


				'enabled':function()
				{
					this.static.enabled = true;
				}
			},


			'init':function(p)
			{
				var input = this.get('input');

				if (input) {
					this.get_el().insertAfter(input);

					p('el_attached');

					input
						.addClass(this.meta.static.tags.bound)
						.hide();
				}
			},


			'storage':{
				'opts':{
					'input':null
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
