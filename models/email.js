/**
 *
 * Created by wd14931 on 2016/3/21.
 * QQ����POP3/SMTP��ʱ���½����Ҫ����Ȩ����Ϊ����
 * QQ��Ȩ��: ftxuvgzbnvjgbfhd
 *
 */

var nodemailer = require('nodemailer');
var settings = require('../settings.json');

/*
* to: e.g wd14931@ly.com,xjh09835@ly.com
* */

function sendEmail(cfg){

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: "QQ",
        secure: true,
        auth: {
            user: settings.emailName,
            pass: settings.emailPass
        },
        pool: true
    });

    var mailOptions = {
        from: cfg.from || 'gnyfront<765974196@qq.com>',
        to: cfg.to || 'wd14931@ly.com',
        subject: cfg.topic || 'gnyfront'
    };

    if(cfg.text){
        mailOptions['text'] = cfg.text;
    }

    if(cfg.html){
        mailOptions['html'] = cfg.html;
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else
            console.log('Message sent: ' + info.response);

        cfg.callback && cfg.callback();

        transporter.close();
    });
}


module.exports = sendEmail;
