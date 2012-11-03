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
        var url_parts = url.parse(req.url,true).query;
	console.log(url_parts);
    }

    console.log(url_parts['w']);
    console.log(url_parts['h']); 
    console.log(url_parts['u']);

    var saved = http.get(("http://www.slax.org/modules/screenshots/3/3469_big.png", function(res) {
    	console.log("Got response: " + res.statusCode);
    }).on('error', function(e) {
    	console.log("Got error: " + e.message);	
    });

 
    easyimg.resize({src:'beach.jpg', dst:'beach-small.jpg', width:640, height:480}, function(err, stdout, stderr) {
    	if (err) throw err;
    	console.log('Resized');
    });

}).listen(3000, "127.0.0.1");
