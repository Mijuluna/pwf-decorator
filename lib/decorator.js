(function() {
	var
		mod_name = 'decorator',
		mod = function()
		{
			this.init = function()
			{
				this.scan();
				return true;
			};


			this.is_ready = function()
			{
				return pwf.cr(['jq.abstract.deco']);
			};


			this.scan = function(tar)
			{
				var
					list = pwf.list_scope('jq.deco.'),
					changed = [];

				for (var i = 0; i < list.length; i++) {
					var obj = pwf.get_class(list[i]);

					if (obj.public.meta.parents.indexOf('jq.abstract.deco') >= 0 && !obj.static.disabled) {
						changed = pwf.merge(changed, obj.scan(tar));
					}
				}

				return changed;
			};
		};


	if (typeof pwf == 'object') {
		pwf.register(mod_name, mod);
	}

	if (typeof module != 'undefined') {
		module.exports = mod;
	}
}());
