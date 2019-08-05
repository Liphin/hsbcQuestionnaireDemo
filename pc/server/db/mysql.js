/**
 * Created by Administrator on 2018/12/30.
 */
const data = require('../serverSerData');
const mysql = require('mysql');

if (data.setting['mysql']['toConnect']) {
    data.dbPool.mysql = mysql.createPool({
        connectionLimit: data.setting['mysql']['connectionLimit'],
        host: data.setting['mysql']['host'],
        user: data.setting['mysql']['user'],
        password: data.setting['mysql']['password'],
        database: data.setting['mysql']['database']
    });
}