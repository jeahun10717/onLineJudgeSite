const Router = require('koa-router');
const judge = new Router();
const judgeCtrl = require('./judge.ctrl');
const { auth } = require('../../lib');
// const fs = require('fs');
// const db = require('../../databases/models/user')

const multer = require('@koa/multer')
const cppUpload = require('../../lib/multer/index')
const path = require('path');

const {PythonShell} = require('python-shell');

// const upload = multer();



// const storage = multer.diskStorage({
//     destination: async function(ctx, file, cb){
//         const hexUUID = Buffer.from(ctx.user.UUID, 'hex');
//         const userInfo = await db.isExistFromUUID(hexUUID);
//         const studentID = userInfo.student_ID;
//         const storePath = path.join(__dirname, `./python/Student_Id/${studentID}`);

//         if(!fs.existsSync(storePath)){
//             fs.mkdirSync(storePath);
//         }
//         cb(null, storePath);
//     },
//     filename: function(ctx, file, cb){
//         cb(null, file.originalname);
//     }
// })

// const upload = multer({
//     storage
// })


// judge.get('/', (ctx) => {
//     ctx.body = (`
//     <form action="/" method="post">
//         <input type="text" name="name" placeholder="파일이름을 입력하세요."/>
//         <input type="number" name="num" placeholder="과제번호를 입력하세요."/>
//         <input type="submit" value="전송">
//     </form>
//     `)
// })

// judge.post('/', (ctx) => {
//     const name = ctx.request.body.name || "" // 파일 받아와서 이름으로 수정
//     const num = ctx.request.body.num || 0 // TASK 번호

//     console.log(ctx.request.body);

//     // TODO: num, name 수정

//     let options = {
//         mode: 'text',
//         pythonPath: 'python3', 
//         pythonOptions: ['-u'],
//         scriptPath: '.', // 수정필요
//         args: [`${name} ${num}`]
//     }
    
//     PythonShell.run('./python/judge.py', options, function (err, results) {
//         if (err) throw err;
//         console.log('results: %j', results);
//         //파일 삭제
//         res.json(results.map((d) => d.split(',')))
//     })
// })


judge.use(auth.login);
judge.use(auth.level1);

// judge.get('/test', judgeCtrl.test);
// judge.post('/multerTest', upload.single('test'));
// judge.post('/multerTest', judgeCtrl.judge);

//judge.post('/multerTest', judgeCtrl.multerInit, judgeCtrl.judge);
// judge.post('/multerTest',judgeCtrl.judge);
judge.post('/multerTest', cppUpload.single('test'),judgeCtrl.judge);

// console.log(upload, "@@@@@@@@@@@@@@@@@@@");

module.exports = judge;