var http = require('http');
var fs = require('fs');

function start() {
	fs.readFile('./web/index.html', function (err, html) {
	if (err) {
		throw err; 
	}       
	http.createServer(function(request, response) {  
		response.writeHeader(200, {"Content-Type": "text/html"});  
		response.write(html);  
		response.end();  
	}).listen(8888);
	});
}

exports.start = start;