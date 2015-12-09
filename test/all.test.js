// --------------------
// directory-tree module
// Tests
// --------------------

// modules
var chai = require('chai'),
    expect = chai.expect,
    pathModule = require('path'),
    requireFs2obj = require('../lib/');

// init
chai.config.includeStack = true;

// tests

var path = pathModule.join(__dirname, './exampleFolder');

describe('default', function() {
    it('reads whole tree', function() {
        var tree = requireFs2obj(path);

        expect(tree).to.deep.equal({
            "items": [{
                "name": "file1.js",
                "type": "file",
                "size": 0
            }, {
                "name": "file2.conf",
                "type": "file",
                "size": 0
            }, {
                "name": "file3.txt",
                "type": "file",
                "size": 15
            }, {
                "items": [{
                    "name": "test1-file.txt",
                    "type": "file",
                    "size": 0
                }, {
                    "items": [{
                        "name": "subtest-file1.txt",
                        "type": "file",
                        "size": 0
                    }],
                    "name": "subtest1",
                    "type": "folder"
                }],
                "name": "test1",
                "type": "folder"
            }]
        });
    });
});