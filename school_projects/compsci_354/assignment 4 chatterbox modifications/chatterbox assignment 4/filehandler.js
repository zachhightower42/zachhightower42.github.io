var fs = require('fs');
var path = require('path');

function readFile(filePath, callback) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

module.exports = {
  readFile: readFile
};