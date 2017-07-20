var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
module.exports = function (context,cb) {
    var data = context.data.data;
    var url = context.data.url;
    var collection = context.data.collection;
    if(data&&url&&collection){
        MongoClient.connect(url,function(err,db){
            var dbCollection = db.collection(collection);
            if(Array.isArray(data)){
                //insert many
                dbCollection.insertMany(data,function(err,result){
                    db.close();
                    if(err){
                        return cb(err);
                    }
                    cb(null,result);
                })
            }else{
                //insert one
                dbCollection.insertOne(data,function(err,result){
                    db.close();
                    if(err){
                        return cb(err);
                    }
                    cb(null,result);
                })
            }
        });   
    }else{
        cb(null,{error:"fields are missing"})
    }
}