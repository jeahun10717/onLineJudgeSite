const Router = require('koa-router');
const judge = new Router();
const judgeCtrl = require('./judge.ctrl');
const { auth } = require('../../lib');

const multer = require('@koa/multer')
const path = require('path');
// const storage = multer.diskStorage({
//     destination: function(ctx, file, cb){
//         cb(null, `./src/multerFileTest/`);
//     },
//     filename: function(ctx, file, cb) {
//         cb(null, file.originalname); // 업로드 할 파일 원래 이름으로 저장
//     }
// })
// const upload = multer({
//     storage: storage
// });


const {PythonShell} = require('python-shell');

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

// judge.get('/test', judgeCtrl.test);
judge.post('/multerTest', judgeCtrl.judge);

module.exports = judge;