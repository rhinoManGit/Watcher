/**
 * Created by wd14931 on 2016/3/17.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('submit', { title: '自定义URL' });
    }else{
        res.redirect('/login');
    }
});

module.exports = router;