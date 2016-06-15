var Monkberry = require('monkberry');
var Template = require('./view.monk');

var view = Monkberry.render(Template, document.body);
view.update({name: 'Monkberry'});
