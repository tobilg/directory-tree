var fs2obj = require('../lib/');

var modules = fs2obj('./exampleFolder');
console.log(JSON.stringify(modules));