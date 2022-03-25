const Router = require('koa-router');
const tasks = new Router();
const tasksCtrl = require('./tasks.ctrl');
const { auth } = require('../../lib');

const multer = require('@koa/multer');
const path = require('path');



tasks.get('/', tasksCtrl.showTasks);

module.exports = tasks;