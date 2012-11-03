var http = require('http');

http.get('http://www.slax.org/modules/screenshots/3/3469_big.png', function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
}).on('error', function(e) {
  console.log('ERROR: ' + e.message);
});



var http = require('http')
  , fs = require('fs');

var request = http.get('http://www.slax.org/modules/screenshots/3/3469_big.png', function(res){
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
