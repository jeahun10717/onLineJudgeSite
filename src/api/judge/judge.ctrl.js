const multer = require('@koa/multer');
const Joi = require('joi');
const path = require('path');
const { param } = require('../users');


exports.judge = async (ctx) => {
    const params = Joi.object({
        problemName : Joi.string().required(),
        problemNum : Joi.string().required(),
        studentID : Joi.string().required()
    }).validate(ctx.request.body);

    console.log("test");
    console.log(ctx.request.body);
    console.log(params.value);

    const storage = multer.diskStorage({
        destination: function(ctx, file, cb){
            cb(null, `./python/Student_Id/${params.value.studentID}`);
        },
        filename: function(ctx, file, cb) {
            cb(null, file.originalname); // 업로드 할 파일 원래 이름으로 저장
        }
    })
    const upload = multer({
        storage: storage
    });
    
    upload.fields([{name: "test", maxcount : 1}])
    // upload.single('test')
    console.log(ctx.files);
}