const multer = require('@koa/multer');
const Joi = require('joi');
const axios = require('axios');
const path = require('path');
const { param, params } = require('../users');
const db = require('../../databases/models/user')

exports.judge = async (ctx, next)=>{
    const parmas = Joi.object({
        problemName: Joi.string().required(),
        problemNum: Joi.string().required()
    }).validate(ctx.request.body);

    if(params.error) ctx.throw(400, "잘못된 요청입니다.");

    const hexUUID = Buffer.from(ctx.user.UUID, 'hex');
    const userInfo = await userDB.isExistFromUUID(hexUUID);
    const studentID = userInfo.student_ID;    
}