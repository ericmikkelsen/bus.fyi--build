
var basename = require('path').basename;
var dirname = require('path').dirname;
var extname = require('path').extname;
var debug = require('debug')('metalsmith-readJSON');


function isJSON(str){
    const Str = str.contents.toString();
    try {
        const output = JSON.parse(Str);
        return output;
    } catch(e) {
        return null;
    }
}

/**
 * Expose `plugin`.
 */
 
module.exports = plugin;

/**
 * Metalsmith plugin to convert json files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options){
  options = options || {};
  var keys = options.keys || [];
  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
        const data = files[file];
        if (isJSON(data) === null){
            return;
        } else {
            const json = JSON.parse(data.contents.toString());
            var dir = dirname(file);
            var html = basename(file, extname(file)) + '.html';
            if ('.' != dir) html = dir + '/' + html;

            debug('converting file: %s', file);
            delete files[file];
            if( json['contents'] === undefined ) {
                //if there are no contents, just setup an empty string for contents
                json['contents'] = Buffer.from('');
            } else if(Buffer.isBuffer(json['contents']) !== true) {
                //If there are contents, but they are not a buffer, then turn them into a buffer
                //That way layouts doesn't complain.
                json['contents'] = Buffer.from(json['contents']);
            } 
            delete files[file];
            files[html] = json;
        }
    });
  };
}