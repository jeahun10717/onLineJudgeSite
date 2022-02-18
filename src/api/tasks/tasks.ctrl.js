const Joi = require('joi');
const { S3 } = require('../../lib');
const { tasks } = require('../../databases');
const { user } = require('../../databases');

exports.showTasks = async(ctx)=>{
    const { UUID } = ctx.request.user;
    const bufUUID = Buffer.from(UUID, 'hex');

    const result = await user.isExistFromUUID(bufUUID);
    // result.uuid = UUID;
    // console.log(result.auth);
    const userAuthLevel = result.auth; // 1은 일반유저, 2는 관리자 유저
    if(userAuthLevel == 1) { // 일반 유저일 때의 response

    }else if(userAuthLevel == 2){ // 관리자 유저일 떄의 response
        
    }

}