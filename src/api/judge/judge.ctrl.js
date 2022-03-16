const multer = require('@koa/multer');
const Joi = require('joi');
const axios = require('axios');
const path = require('path');
const { params } = require('../users');
const userDB = require('../../databases/models/user');
const { PythonShell } = require('python-shell');

const spawn = require('child_process').spawnSync;

exports.judge = async (ctx, next)=>{
    const params = Joi.object({
        problemName: Joi.string().required(),
        problemNum: Joi.string().required()
    }).validate(ctx.request.body);

    if(params.error) ctx.throw(400, "잘못된 요청입니다.");

    const { problemName, problemNum } = params.value;

    const hexUUID = Buffer.from(ctx.request.user.UUID, 'hex');
    const userInfo = await userDB.isExistFromUUID(hexUUID);
    const studentID = userInfo.student_ID;

    const result = spawn('python', [`${__dirname}/python/test.py`, "111", "222"]);

    let shellScript;
    // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다. 
    
    // await result.stdout.on('data', (data) => {
    //     shellScript = data
    //     console.log(data.toString()+ "!!!!!!!!!!!!!!!!!!!!!!!!!!"); 
    // }); 
    // // 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다. 
    // await result.stderr.on('data', (data) => { 
    //     console.log(data.toString()); 
    // });
    

    // let options = {
    //     mode: 'text',
    //     pythonPath: 'python3', 
    //     pythonOptions: ['-u'],
    //     scriptPath: '.', // 수정필요
    //     args: [`${problemName}, ${problemNum}`]
    // }
    
    // let shellScript;

    // console.log(PythonShell.run('./src/api/judge/python/test.py', options, function (err, results) {
    //     if (err) throw err;
    //     // console.log('results: %j', results);
    //     shellScript = results;
    //     // 파일 삭제 
    //     return results
    // }))
 
    ctx.body = {
        status: 200,
        result: result.output.map(i => i && i.toString())
    }   
}