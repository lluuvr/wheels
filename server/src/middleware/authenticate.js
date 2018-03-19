const jwt = require('jsonwebtoken');
const db = require('../db');
const config = require('config');
const utils = require('../utils');

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token)
    return next(utils.error.UNAUTHORIZED);
  jwt.verify(token, config.get('server.secret.secret'), async (err) => {
    if (!!err)
      return next(utils.error.UNAUTHORIZED);
    req.acc = await db.Account.findByToken(token);
    if (!!req.acc) {
      next();
    } else
      return next(utils.error.UNAUTHORIZED);
  });
};

module.exports = authenticate;