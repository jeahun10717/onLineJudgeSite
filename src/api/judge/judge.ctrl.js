const multer = require('@koa/multer');
const Joi = require('joi');
const axios = require('axios');
const path = require('path');
const { params } = require('../users');
const userDB = require('../../databases/models/user');
const { PythonShell } = require('python-shell');

// const spawn = require('child_process').spawnSync;

exports.judge = async (ctx, next)=>{
    const spawn = require('child_process').spawnSync;

    const params = Joi.object({
        problemName: Joi.string().required(),
        problemNum: Joi.string().required()
    }).validate(ctx.request.body);

    if(params.error) ctx.throw(400, "잘못된 요청입니다.");

    const { problemName, problemNum } = params.value;

    const hexUUID = Buffer.from(ctx.request.user.UUID, 'hex');
    const userInfo = await userDB.isExistFromUUID(hexUUID);
    const studentID = userInfo.student_ID;

    const result = spawn('python', [`${__dirname}/python/judge.py`, `${problemName}`, `${problemNum}`, `${studentID}`]);
    
    const pyShStr = result.output.map(i => i && i.toString());
    // console.log(pyShStr[1]);
    // const score;
    // const str = JSON.parse(pyShStr[1])
    // console.log(pyShStr.result[0], pyShStr.result[1], pyShStr.result[2]);
    
    //TODO: python shell 이 던져주는 자료가 아래 형태가 아닐 떄 만들어야 함
    // [
    //     [ '1', '10', '0.30614', 'Perfect Credit' ],
    //     [ '2', '10', '0.01038', 'Perfect Credit' ],
    //     [ '3', '10', '0.01084', 'Perfect Credit' ],
    //     [ '4', '10', '0.01141', 'Perfect Credit' ],
    //     [ '5', '10', '0.01181', 'Perfect Credit' ],
    //     [ '6', '10', '0.01278', 'Perfect Credit' ],
    //     [ '7', '10', '0.01244', 'Perfect Credit' ],
    //     [ '8', '10', '0.01221', 'Perfect Credit' ],
    //     [ '9', '10', '0.01312', 'Perfect Credit' ],
    //     [ '10', '10', '0.01463', 'Perfect Credit' ]
    //   ]
    const shellStr = pyShStr[1].split('\n').map(i=>i.split(','));

    // const scoreArr = new Array(10);
    // for (let i = 1; i < scoreArr.length + 1; i++) {
    //     scoreArr[i - 1] = shellStr[i].split(',');
    // }

    console.log(shellStr);

    // arr[5][2] (빈 배열 생성)

    ctx.body = {
        status: 200,
        result: shellStr
    }   
}