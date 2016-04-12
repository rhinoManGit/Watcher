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
        to: 'wd14931@ly.com',//,xjh09835@ly.com
        topic: 'test',
        html: '<h4>hello 姜丽华</h4><p>nice to meet you!</p><p><strong>属性</strong><br>所有HTML标签和属性都应该全部用小写，属性值用引号包裹。<br></p>',
        callback: function(){}
    });
});

module.exports = router;