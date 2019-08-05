/**
 * Created by Administrator on 2018/11/26.
 * nodeJs使用mongodb的公共调用方法
 */
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = '*****';
const mgDataBase = 'hsbc';

/**
 * 连接数据库操作
 * @param callback
 */
let connectToMongo = function (callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        assert.equal(null, err);
        callback(db);
    });
};

/**
 * 查询数据库操作
 * @param collection
 * @param findObj
 * @param callback
 */
let findDocuments = function (collection, findObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        //根据条件查找collection中相应数据
        db.db(mgDataBase).collection(collection).find(findObj).toArray(function (err, docs) {
            assert.equal(null, err);
            callback(docs);
            db.close();
        });
    })
};


/**
 * 查询具体字段数据
 * @param collection
 * @param findObj
 * @param findField
 * @param callback
 */
let findSpecificField = function (collection, findObj, findField, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        //根据条件查找collection中相应数据
        db.db(mgDataBase).collection(collection).find(findObj).project(findField).toArray(function (err, docs) {
            assert.equal(null, err);
            callback(docs);
            db.close();
        });
    })
};


/**
 * 返回当前文档数据总数
 * @param collection
 * @param callback
 */
let getCount = function (collection, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        db.db(mgDataBase).collection(collection, function (error, collection) {
            collection.count({}, function (err, numOfDocs) {
                assert.equal(null, err);
                callback(numOfDocs);
                db.close();
            });
        });
    })
};


/**
 * 插入一条数据的数据库操作
 * @param db
 * @param collection
 * @param insertObj
 * @param callback
 */
let insertOneDocuments = function (collection, insertObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        db.db(mgDataBase).collection(collection).insertOne(insertObj, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};

/**
 * 插入多条数据的数据库操作
 * @param db
 * @param collection
 * @param insertObj
 * @param callback
 */
let insertManyDocuments = function (collection, insertObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        db.db(mgDataBase).collection(collection).insertMany(insertObj, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};

/**
 * 更一条新数据操作
 * @param db
 * @param collection
 * @param whereStr 查询条件
 * @param updateObj 更新对象
 * @param callback
 */
let updateOneDocuments = function (collection, whereStr, updateObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        let updateStr = {$set: updateObj};
        db.db(mgDataBase).collection(collection).updateOne(whereStr, updateStr, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};

/**
 * 更多条新数据操作
 * @param db
 * @param collection
 * @param whereStr 查询条件
 * @param updateObj 更新对象
 * @param callback
 */
let updateManyDocuments = function (collection, whereStr, updateObj, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        let updateStr = {$set: updateObj};
        db.db(mgDataBase).collection(collection).updateMany(whereStr, updateStr, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};


/**
 * 删除一条数据操作
 * @param db
 * @param collection
 * @param whereStr 查询条件
 * @param callback
 */
let deleteOneDocuments = function (collection, whereStr, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        db.db(mgDataBase).collection(collection).deleteOne(whereStr, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};

/**
 * 删除多条数据操作
 * @param db
 * @param collection
 * @param whereStr 查询条件
 * @param callback
 */
let deleteManyDocuments = function (collection, whereStr, callback) {
    //连接mongoDB数据库
    connectToMongo(function (db) {
        db.db(mgDataBase).collection(collection).deleteMany(whereStr, function (err, res) {
            assert.equal(null, err);
            callback(res);
            db.close();
        });
    })
};


module.exports = {
    getCount: getCount,
    dbArbitration: mgDataBase,
    connectToMongo: connectToMongo,
    findDocuments: findDocuments,
    findSpecificField: findSpecificField,
    insertOneDocuments: insertOneDocuments,
    insertManyDocuments: insertManyDocuments,
    updateOneDocuments: updateOneDocuments,
    updateManyDocuments: updateManyDocuments,
    deleteOneDocuments: deleteOneDocuments,
    deleteManyDocuments: deleteManyDocuments
};





