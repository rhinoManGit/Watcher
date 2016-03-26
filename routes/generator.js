/**
 * Created by wd14931 on 2016/3/21.
 */
var express = require('express');
var router = express.Router();

var JDBC = require('../models/JDBC');

/* GET home page */
router.post('/', function(req, res){

    if(!req.session.user){
        return res.redirect('/login');
    }

    var url = req.body.user_url,
        content = req.body.user_content;

    var user = req.session.user;

    // user.name: 用户名有唯一性
    var oJson = {
        url: url,
        content: content,
        user: user.name
    };
    console.log(req.host)
    var jdbc = new JDBC();

    jdbc.save('FRONT_DOC', oJson, function(stat, data){

        if(data){
            // 跳到成功页
            res.render('success', {url: 'geturl/' + url});
        }else{
            res.redirect('/submit');
        }
    });
});

module.exports = router;