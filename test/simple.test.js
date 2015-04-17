var directoryTree = require('../lib/');

var modules = directoryTree('./test/exampleFolder');
console.log(JSON.stringify(modules));