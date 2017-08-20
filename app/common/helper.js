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

function responseHandler(err, message, data) {
    if(err) {
        console.log(err);
        if(message) {
            console.log(message);
        }
        if(data) {
            console.log(data);
        }
    } else {
        if(message) {
            console.log(message);
        }
        if(data) {
            console.log(data);
        }
    }
}



module.exports = {
    responseHandler
};

