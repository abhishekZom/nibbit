/**
 * Copyright (c) 2017, let's., All rights reserved.
 */

'use strict';

/**
 * The default app configuration
 *
 * @author      TCSCODER
 * @version     1.0.0
 */

module.exports = {
  PORT: process.env.PORT || 8080,
  API_VERSION: 'v1',

  // dbconnection options
  redisCreds: {
    user: "redistogo",
    password: "21021ab08f20e2dd51b750018d6b3fca",
    host: "greeneye.redistogo.com",
    port: 11341
  },
};
