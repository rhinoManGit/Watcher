/**
 * Created by wd14931 on 2016/3/21.
 */
var express = require('express');
var router = express.Router();
var markdown = require('markdown').markdown;

/* GET home page */
router.get('/', function(req, res){

    var text = req.param('penName');
    var html = markdown.toHTML(text);

    res.send(html);
});

module.exports = router;