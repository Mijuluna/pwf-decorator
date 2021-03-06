(function()
{
	var
		mod_name = 'jq.abstract.deco',
		mod_inst = true,
		mod = {
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
						// Select root element of the DOM.
						tar = pwf.jquery(':eq(0)');
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
					this.static.disabled = false;
				}
			},


			'init':function(p)
			{
				p.storage.internal.after_init.push(function() {
					var input = this.get('input');

					if (input) {
						this.replace(input);
					}
				});
			},


			'storage':{
				'opts':{
					'input':null
				}
			},


			'public':{
				'replace':function(p, input)
				{
					this.get_el().insertAfter(input);

					p('el_attached');

					input
						.addClass(this.meta.static.tags.bound)
						.hide();
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
