/*
 * Copyright (C) 2017 nibbit., All Rights Reserved.
 */

'use strict';

/**
 * contains custom helper functions that are common to all modules
 *
 * @author      AON
 * @version     1.0.0
 */

// import modules
const redis = require('redis');


/**
 * implements custom HMGETALL command for redis using transactions through multi command
 *
 * @param   {Object}    req           express request instance
 * @param   {Object}    res           express response instance
 * @return  {Void}                    this method doesn't return anything
 */
function MHGETALL(keys, cb) {

    redis.multi({pipeline: false});

    keys.forEach(function(key, index){
        redis.hgetall(key);
    });

    redis.exec(function(err, result){
        cb(err, result);
    });
}


module.exports = {
	MHGETALL
};