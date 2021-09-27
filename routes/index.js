var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var viewFrom = "848A4D9D07.jpg";
  var errorCode = 0;
  var errorMsg = "";
  if (req.query.viewFrom != undefined) {
    var imgList = JSON.parse(fs.readFileSync("./public/results.json"));
    var found = 0;
    for (var i = 0; i < imgList.length; i++) {
      if (imgList[i]['id'] == req.query.viewFrom) {
        viewFrom = req.query.viewFrom;
        found = 1;
        break;
      }
    }
    if (!found) {
      errorCode = 1;
      errorMsg = "Requested image " + req.query.viewFrom + " not found";
    }
  }
  res.render('index', {viewFrom: viewFrom, errorCode: errorCode, errorMsg, errorMsg});
});

router.get('getCaption', function(req, res, next) {
  console.log(req.query);
  if (req.query.filename != undefined) {
    var imgList = JSON.parse(fs.readFileSync("./public/results.json"));
    for (var i = 0; i < imgList.length; i++) {
      if (imgList[i]['id'] == req.query.filename) {
        res.send(imgList[i]['caption']);
        break;
      }
    }
  }
  else res.status(404);
});

module.exports = router;
