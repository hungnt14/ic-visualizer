var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.query.filename != undefined) {
      var imgList = JSON.parse(fs.readFileSync("./public/results.json"));
      for (var i = 0; i < imgList.length; i++) {
        if (imgList[i]['id'] == req.query.filename) {
          res.json({caption: imgList[i]['captions']});
          break;
        }
      }
    }
    else res.status(404);
});

module.exports = router;