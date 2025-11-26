var http = require('http');
var path = require('path');
var filehandler = require('./filehandler');
var extract = require('./extract');
var wss = require('./websockets-server');

var mimeTypes = {
   '.html': 'text/html',
   '.txt': 'text/plain',
   '.pdf': 'application/pdf',
   '.mp3': 'audio/mpeg',
   '.mp4': 'video/mp4',
   '.jpg': 'image/jpg',
 };

 var handleError = function (err, res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(
    '<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>' +
      err.message +
      '</p><p>You Appear to be Trying to Access a File that is Not Within This Library. Either Try Again or Send An Error Log to the Administrator.</p></body></html>'
  );
};

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');

  if (req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Form submitted successfully!');
    return;
  }

  var filePath = extract(req.url);

  filehandler.readFile(filePath, function (err, data) {
    if (err) {
      handleError(err, res);
    } else {
      var ext = path.extname(filePath);
      var contentType = mimeTypes[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(3000);