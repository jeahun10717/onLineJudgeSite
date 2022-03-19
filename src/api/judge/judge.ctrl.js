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
    const rawShellStr = pyShStr[1].split('\n');

    const scoreArr = new Array(10);
    for (let i = 1; i < rawShellStr.length; i++) {
        scoreArr[i] = rawShellStr[i].split(',');
    }

    console.log(scoreArr);

    // arr[5][2] (빈 배열 생성)

    ctx.body = {
        status: 200,
        result: result.output.map(i => i && i.toString())
    }   
}