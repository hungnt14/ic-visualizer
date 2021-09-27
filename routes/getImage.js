var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.query.filename != undefined) {
      var imgList = JSON.parse(fs.readFileSync("./public/results.json"));
      for (var i = 0; i < imgList.length; i++) {
        if (imgList[i]['id'] == req.query.filename) {
            if (req.query.move="prev") {
                if (i == 0) i = imgList.length - 1;
                else i--;
                res.json({id: imgList[i]['id']});
            }
            if (req.query.move="next") {
                if (i == imgList.length - 1) i = 0;
                else i++;
                res.json({id: imgList[i]['id']});
            }
        }
      }
    }
    else res.status(404);
});

module.exports = router;