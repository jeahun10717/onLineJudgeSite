const Router = require('koa-router');
const tasks = new Router();
const tasksCtrl = require('./tasks.ctrl');
const { auth } = require('../../lib');

const multer = require('@koa/multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: function(ctx, file, cb){
        cb(null, `./src/multerFileTest/`);
    },
    filename: function(ctx, file, cb) {
        cb(null, file.originalname); // 업로드 할 파일 원래 이름으로 저장
    }
})
const upload = multer({
    storage: storage
});

tasks.use(auth.login);
tasks.use(auth.level1);

tasks.get('/', tasksCtrl.showTasks);
// tasks.post('/multerTest', upload.fields([{name: 'file'}]),tasks.multerTest);

module.exports = tasks;