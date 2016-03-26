/**
 * Created by wd14931 on 2016/3/21.
 */
var express = require('express');
var router = express.Router();

var JDBC = require('../models/JDBC');
var User = require('../models/user');

/* GET home page */
router.post('/', function(req, res){

    var name = req.body.user_name,
        password = req.body.pass_word;

    var jdbc = new JDBC();

    jdbc.find('FRONT_USER', {name: name}, function(stat, data){

        if(data && name === data.name && parseInt(password, 10) === parseInt(data.password, 10)){
            // 登陆成功
            req.session['user'] = data;
            // 跳到首页
            res.redirect('/index');
        }else{
            res.redirect('/login');
        }
    });
});

module.exports = router;