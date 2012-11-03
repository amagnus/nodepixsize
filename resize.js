var easyimg = require('easyimage');

easyimg.resize({src:'beach.jpg', dst:'beach-small.jpg', width:400, height:200}, function(err, stdout, stderr) {
    if (err) throw err;
    console.log('Resized to 640x480');
});
