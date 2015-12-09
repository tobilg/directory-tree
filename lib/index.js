// --------------------
// directory-tree module
// --------------------

// modules
var fs = require('fs'),
    pathModule = require('path'),
    _ = require('lodash');

// exports
module.exports = function(path, options) {
    // parse options
    options = options || {};

    options = _.extend({
        initialPath: fs.realpathSync(path),
        filterFiles: /^(.+)\.*?$/,
        filterFolders: /^([^\.].*)$/,
        includeBasePath: false,
        includeRealPath: false
    }, options);

    return processFolder(path, options);
};

function processFolder(path, options)
{
    // get list of files in dir
    var files = fs.readdirSync(path);
    files.sort();

    //var realPath = fs.realpathSync(path);

    // get index file
    var result = {};

    // create files parameter
    var resultFiles = [];

    // get all files
    var folders = [];
    files.forEach(function(file) {
        var filePath = pathModule.join(path, file),
            stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            folders.push(file);
            return;
        }

        if (options.filterFiles) {
            var match = file.match(options.filterFiles);
            if (!match) return;
            file = match[1];
        }

        var fileObj = {"name": file, "type": "file", size: stats.size};

        if (options.includeBasePath) {
            fileObj.basePath = filePath.replace(options.initialPath, '').replace(/\\/g, '/');
        }
        if (options.includeRealPath) {
            fileObj.realPath = fs.realpathSync(filePath);
        }

        resultFiles.push(fileObj);

    });

    // push to items array
    result.items = resultFiles;

    // all folders
    folders.forEach(function(file) {
        if (options.filterFolders) {
            var match = file.match(options.filterFolders);
            if (!match) return;
            file = match[1];
        }

        // get real path
        var realPath = pathModule.join(path, file);

        // recurse
        var resultFolder = processFolder(realPath, options);

        // set folder properties
        resultFolder.name = file;
        resultFolder.type = "folder";

        if (options.includeBasePath) {
            resultFolder.basePath = realPath.replace(options.initialPath, '').replace(/\\/g, '/');
        }
        if (options.includeRealPath) {
            resultFolder.realPath = realPath;
        }

        result.items.push(resultFolder);

    });

    return result;
}
