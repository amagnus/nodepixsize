var sys = require ('sys'),
url = require('url'),
http = require('http'),
qs = require('querystring');
var easyimg = require('easyimage');

http.createServer(function (req, res) {
  
 
    if(req.method=='POST') {
            var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                
                var POST =  qs.parse(body);
		console.log(POST);
            });
    }
    else if(req.method=='GET') {
        var url_parts = url.parse(req.url,true);
	console.log(url_parts.query);
    }

console.log(url_parts.query[1]);
    
    easyimg.resize({src:'beach.jpg', dst:'beach-small.jpg', width:640, height:480}, function(err, stdout, stderr) {
    	if (err) throw err;
    	console.log('Resized to 640x480');
    });

}).listen(3000, "127.0.0.1");
