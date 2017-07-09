var _ = require("utils-pkg");

module.exports = function(schema, options){
	/**
	 * Compiles a object map of the properties that matches with the scope list
	 * 
	 * @param  {String} scope The name of the scope to match with the properties
	 * @return {Object}       The map of fields to apply in the field selection
	 */
	function getScopedFields(scope){
		var scoped = {};
		var opts   = schema.options;

		if(typeof opts.scopes !== "undefined"){
			for(p in schema.tree){
				if(_.inArray(opts.scopes[scope], p)){
					scoped[p] = true;
				}
			}
		}

		return scoped;
	}

	/**
	 * Add the query scope into the schema function
	 * this should do a normal find with the compiled selected fields
	 * 
	 * @param  {String} scope    The name of the scope to apply in the fields
	 * @param  {Object} criteria The criteria to set in the search
	 * @param  {Object} options  The options to pass in the search
	 * @return {Query}           The query result of the search
	 */
	schema.static("findByScope", function(scope, criteria = {}, options = {}){
		// Merge scope value into the search options
		options.$scope = scope;

		return this.find(criteria, getScopedFields(scope), options);
	});
};