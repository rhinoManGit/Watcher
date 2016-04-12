/**
 * Created by wd14931 on 2016/3/18.
 */

var crypto = require('crypto'),
    User = require('../models/User');

app.post('/reg', function(req, res){
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];

    // 检查两次输入是否一样
    if(password_re !== password){
        req.flash('error', '两次输入的密码不一致！');
        return res.redirect('/reg');
    }

    //生成密码 MD5 值
    var md5 = crypto.create('md5'),
        password = md5.update(password).digest('hex');

    var newUser = new User({
        name: name,
        password: password,
        email: req.body.email
    });

    // 检查用户名是否已经存在
    User.get(name, function(err, user){

        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }

        if(user){
            req.flash('error', '用户已存在！');
            return res.redirect('/reg');
        }

        // 不存在则添加
        newUser.save(function(err, user){

            if(err){
                req.flash('error', err);
                return res.redirect('/reg');
            }

            req.session.user = user;
            req.flash('success', '注册成功！');
            res.redirect('/');
        });
    });
});