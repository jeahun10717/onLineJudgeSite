const multer = require('@koa/multer');
const Joi = require('joi');
const axios = require('axios');
const path = require('path');
const { param } = require('../users');
const db = require('../../databases/models/user')

exports.judge = async (ctx)=>{
    // console.log(ctx);
    console.log(ctx.file);
    // console.log(ctx.request.body);
    // ctx.body = {
    //     status : '제발 성공 ㅜㅜㅜㅜ'
    // }
}

exports.multerInit = async (ctx, next) => {

    // 학번을 불러오기 위한 소스
    const hexUUID = Buffer.from(ctx.request.user.UUID, 'hex');
    const userInfo = await db.isExistFromUUID(hexUUID);
    const studentID = userInfo.student_ID;

    const storage = multer.diskStorage({
        destination: function(ctx, file, cb){
            cb(null, path.join(__dirname, `./python/Student_Id/1705645`));
        },
        filename: function(ctx, file, cb) {
            cb(null, file.originalname); // 업로드 할 파일 원래 이름으로 저장
        }
    })
    const upload = multer({
        storage: storage
    });

    // var path = window.location.pathname;

    console.log(__dirname);
    // console.log(upload, "!!!!!!!!!!!!!!!!");

    upload.single('test');

    // console.log(studentID);
    // console.log(storage);
    // console.log(upload);

    // console.log(ctx);
    next();
}