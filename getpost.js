var sys = require ('sys'),
url = require('url'),
http = require('http'),
fs = require('fs'),
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

    var request = http.get(url_parts['u'], function(res){
    	var imagedata = ''
    	res.setEncoding('binary')

    	res.on('data', function(chunk){
            imagedata += chunk
   	})

    	res.on('end', function(){
        	fs.writeFile('logo.png', imagedata, 'binary', function(err){
            		if (err) throw err
            		    console.log('File saved.')
        	})
    	})
    })

    setTimeout(function() {
        console.log("hello");
    }, 2000)
 
    easyimg.resize({src:'logo.png', dst:'logo-small.png', width:url_parts['w'], height:url_parts['h']}, function(err, stdout, stderr) {
    	if (err) throw err;
    	console.log('Resized');
    });

}).listen(3000, "127.0.0.1");
