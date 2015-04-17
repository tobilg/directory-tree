// --------------------
// directory-tree module
// Tests
// --------------------

// modules
var chai = require('chai'),
    expect = chai.expect,
    pathModule = require('path'),
    requireDirectoryTree = require('../lib/');

// init
chai.config.includeStack = true;

// tests

var path = pathModule.join(__dirname, './exampleFolder');

describe('default', function() {
    it('reads whole tree', function() {
        var tree = requireDirectoryTree(path);

        expect(tree).to.deep.equal({
            "items": [
                {
                    "name": "file1.js",
                    "type": "file"
                },
                {
                    "name": "file2.conf",
                    "type": "file"
                },
                {
                    "name": "file3.txt",
                    "type": "file"
                },
                {
                    "items": [
                        {
                            "name": "test1-file.txt",
                            "type": "file"
                        },
                        {
                            "items": [
                                {
                                    "name": "subtest-file1.txt",
                                    "type": "file"
                                }
                            ],
                            "name": "subtest1",
                            "type": "folder"
                        }
                    ],
                    "name": "test1",
                    "type": "folder"
                }
            ]
        });
    });
});