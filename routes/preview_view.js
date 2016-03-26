/**
 * Created by wd14931 on 2016/3/21.
 */
var express = require('express');
var router = express.Router();

var JDBC = require('../models/JDBC');
var User = require('../models/user');

/* GET home page */
router.get('/', function(req, res){

    res.render('preview', { content: 'preview' });
});

module.exports = router;