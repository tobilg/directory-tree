# fs2obj

## Current status

[![Build Status](https://secure.travis-ci.org/tobilg/fs2obj.png?branch=master)](http://travis-ci.org/tobilg/fs2obj)
[![Dependency Status](https://david-dm.org/tobilg/fs2obj.png)](https://david-dm.org/tobilg/fs2obj)

## Basic usage

### fs2obj( path [, options] )

To all the files and folder from a start folder and any sub-folders:

	var fs2obj = require('fs2obj');
	var structure = fs2obj('/path/to/folder');

Resulting object will look like:

```
{
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
}
```

## Advanced usage

Options can be passed to alter the behaviour.

### filterFiles

A regular expression for what files to include. First matching group defines the key used in returned object.
Defaults to `/^(.+)\.js(on)?$/` (i.e. include all `.js` and `.json` files)

	// Include all .js files except those starting with `_`
	fs2obj('/path/to/folder', { filterFiles: /^([^_].*)\.js$/ });

### filterFolders

A regular expression for what folders to iterate into. First matching group defines the key used in returned object.
Defaults to `/^([^\.].*)$/` (i.e. process all folders except those beginning with `.`)

	// Process all folders except those starting with `.` or `_`
	fs2obj('/path/to/folder', { filterFolders: /^([^\._].*)$/ });

### includeBasePath

A boolean value whether the base path (from the start folder) should be included or not.

### includeRealPath

A boolean value whether the real path should be included or not.

## Tests

Use `npm test` to run the tests.

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/tobilg/fs2obj/issues
