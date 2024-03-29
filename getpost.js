var sys = require ('sys'),
url = require('url'),
http = require('http'),
fs = require('fs'),
qs = require('querystring');
var easyimg = require('easyimage');

http.createServer(function (req, res) {

    // Retrieve parameters from URL
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

    // Write picture from specified URL on the disk
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
			
			// Resize picture to requested dimensions and save it
			easyimg.resize({src:'logo.png', dst:'logo-small.png', width:url_parts['w'], height:url_parts['h']}, function(err, stdout, stderr) {
                            if (err) throw err;
                                console.log('Resized');
                        });

			// As we save more and more images to the disk we'll get storage problems
			// We might put these images into cache
        	})
    	})
    })

// Return resized image, with big timeout for large images
// A better way to do this is to implement async module to control execution order
setTimeout(function() {
    var img = fs.readFileSync('./logo-small.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
}, 10000)

// Implementing a caching system is appropriate to return images already requested before.
// We need to implement a queueing system to handle simultaneous requests.


}).listen(3000, "127.0.0.1");
