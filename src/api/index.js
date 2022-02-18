const Router = require('koa-router');
const users = require('./users');
const score = require('./score');
const tasks = require('./tasks');
const judge = require('./judge');

const api = new Router();

api.use('/users', users.routes());
api.use('/score', score.routes());
api.use('/tasks', tasks.routes());
api.use('/judge', judge.routes());

module.exports = api;
