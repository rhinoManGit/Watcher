/**
 * Created by wd14931 on 2016/3/21.
 */
var settings = require('../settings.json');
var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

function JDBC(){
    this.connect();
}

JDBC.prototype = {

    connect: function(){
        this.mongodb = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});
    },

    find: function(col, query, callback){

        var mongodb = this.mongodb;
        // 打开数据库
        mongodb.open(function(err, db){
            if(err)
                return callback(err);

            // 读取users 集合
            db.collection(col, function(err, collection){

                if(err){
                    mongodb.close();
                    return callback(err);
                }

                // 从users这个集合中获取键值为name的一个文档
                collection.findOne(query, function(err, user){
                    mongodb.close();

                    if(err)
                        return callback(err);

                    callback(null, user);
                });
            });
        });
    },

    save: function(col, doc, callback){

        var mongodb = this.mongodb;
        // 打开数据库
        mongodb.open(function(err, db){
            if(err)
                return callback(err);

            // 读取users 集合
            db.collection(col, function(err, collection){

                if(err){
                    mongodb.close();
                    return callback(err);
                }

                // 将用户数据插入coll 集合
                collection.insert(doc, {safe: true}, function(err, user){
                    mongodb.close();

                    if(err)
                        return callback(err);

                    callback(null, user[0]);
                });
            });
        });
    }
};

module.exports = JDBC;
