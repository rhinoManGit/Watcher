/**
 * Created by wd14931 on 2016/3/21.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: '用户登陆' });
});

module.exports = router;