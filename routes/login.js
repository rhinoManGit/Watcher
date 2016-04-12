/**
 * Created by wd14931 on 2016/3/21.
 */
var express = require('express');
var router = express.Router();

var JDBC = require('../models/JDBC');
var User = require('../models/User');

/* GET home page */
router.post('/', function(req, res){

    var name = req.body.user_name,
        password = req.body.pass_word;

    var jdbc = new JDBC();

    jdbc.find('FRONT_USER', {NAME: name}, function(stat, data){

        if(data && name === data.NAME && password === data.PASSWORD){
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