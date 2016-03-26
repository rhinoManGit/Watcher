/**
 * Created by wd14931 on 2016/3/21.
 */
var express = require('express');
var router = express.Router();
var JDBC = require('../models/JDBC');

function findUrl(req, res, url){

    var jdbc = new JDBC();

    jdbc.find('FRONT_DOC', {url: url.replace(/\/geturl\//, '')}, function(stat, data){

        if(data){
            res.send(data.content);
        }else{
            res.send({success: true, content: null});
        }
    });
}

module.exports = findUrl;