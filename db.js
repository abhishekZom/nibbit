/*
 * Copyright (C) 2017 nibbit., All Rights Reserved.
 */

'use strict';

/**
 * creates an instance for redis using set configurations. This instance will be same for every module requiring it
 *
 * @author      AON
 * @version     1.0.0
 */


const config = require('./config/config');
const redis = require('redis');
const bluebird = require('bluebird');


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
module.exports = redis.createClient('redis://' + config.redisCreds.user + ':' + config.redisCreds.password + '@' + config.redisCreds.host + ':' + config.redisCreds.port);