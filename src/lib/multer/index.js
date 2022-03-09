const multer = require('@koa/multer');

const filepath = 'test';

const storage = multer.diskStorage({
    destination: function(ctx, file, cb){
        cb(null, `../python/${filepath}`);
    },
    filename: function(ctx, file, cb) {
        cb(null, file.originalname); // 업로드 할 파일 원래 이름으로 저장
    }
})