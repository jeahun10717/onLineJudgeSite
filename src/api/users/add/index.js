const Router = require('koa-router');
const add = new Router();
const { user } = require('../../../databases')
const { oauth,login, token } = require('../../../lib');

const Joi = require("joi")

add.post ('/', async (ctx,next) => {   //부동산 관련 가입 시 로그인 외 추가정보 기입을 위한 메소드
    const params = Joi.object({
        login_type: Joi.number().integer().min(1).max(2).required(),
        access_token: Joi.string().required(),
        phone: Joi.string().regex(/^[0-9]{8,13}$/).required(), // 회원전화번호
        name: Joi.string().required(),  // 회원 이름
        email: Joi.string().email().required(),
        regist_at: Joi.string().isoDate().default(new Date())
    }).validate(ctx.request.body);

    // console.log(params.error[0]);
    // console.log();
    // console.log(params.error.details[0].message);

    // console.log(throwErrMsg);
    if(params.error) {
      const errorMsg = params.error.details[0].message;
      const regexp = new RegExp(/^\"[a-zA-Z\_]{0,}\"/, "g");
      const throwErrMsg = regexp.exec(errorMsg);
      ctx.throw(400, throwErrMsg[0])
    };

    const { access_token, login_type, ...rest } = params.value;

    let login_id;

    if(login_type === 2){   // kakao login
      const kakaoData = await oauth.kakaoData(access_token);
      const result = await user.isExistFromUserID(`kakao:${kakaoData.id}`)
      if(result) ctx.throw(400, "이미 존재하는 유저입니다.")
      // console.log(result);
      login_id = `kakao:${kakaoData.id}`;
    }
    else if(login_type === 1){  // naver login
      const naverData = await oauth.naverData(access_token);
      // console.log(naverData);
      const result = await user.isExistFromUserID(`naver:${naverData.id}`)
      if(result) ctx.throw(400, "이미 존재하는 유저입니다.")
      login_id = `naver:${naverData.id}`;
    }

    // try{ // TODO: 이 부분에 왜 try-catch 로 했는지 확인하고 나중에 수정하기
      const userToken = await login.regist({
        login_type,
        login_id,
        ...rest
      })
    //   });
    // }catch(e){
    //   throw(400,e);
    // }
    // console.log(params);
    // console.log(params.value);
    // console.log(ctx.request.user);
    // console.log(UUID);

    // query=ctx.request.body
    // user.update(Buffer.from(UUID, 'hex'), query);
    // kakao:1659856827
    ctx.status = 200;
    ctx.body = {
        status: 200,
        result: {
          userToken: userToken.token
        }
    };
});

module.exports=add;
