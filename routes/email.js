/**
 *
 * Created by wd14931 on 2016/3/21.
 *
 * QQ开启POP3/SMTP的时候登陆必须要用授权码作为密码
 * QQ授权码: ftxuvgzbnvjgbfhd
 *
 */
var express = require('express');
var router = express.Router();
var sendEmail = require('../models/email');

// send email
router.get('/', function(req, res){

    sendEmail({
        to: 'wd14931@ly.com,xjh09835@ly.com',
        topic: 'test',
        html: '<h2>hello 姜丽华</h2><p>nice to meet you!</p>',
        callback: function(){

        }
    });
});

module.exports = router;