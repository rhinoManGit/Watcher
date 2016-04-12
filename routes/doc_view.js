/**
 * Created by wd14931 on 2016/3/21.
 */
var express = require('express');
var router = express.Router();

var JDBC = require('../models/JDBC');
var User = require('../models/User');

/* GET home page */
router.get('/', function(req, res){
    console.log(45646)
    res.render('editor', { title: 'Markdown前端文档驿站' });
});

module.exports = router;