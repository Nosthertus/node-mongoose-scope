# node-mongoose-scope
A mongoose library that sets a list of query fields in a scope

##Installataion
```SH
$ npm install mongoose-scope
```

##Usage
```Javascript
var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var scope    = require("mongoose-scope");

var User = new Schema({
	name: String,
	password: String,
	email: String,
	admin: Boolean,
	created: Date
}, {
	scopes: {
		bash: ["_id", "name", "email", "created"],
		detail: ["_id", "name", "email", "created", "admin"]
	}
});

User.plugin(scope);

var model = mongoose.model("User" User);

model.findByScope("bash", {name: "random"});
```

##Documentation
**.findByScope([ScopeName], [Criteria] optional) => Query**
executes a normal `find` with the selected fields defined in the scope, it takes a criteria object as optional second parameter

##License
MIT