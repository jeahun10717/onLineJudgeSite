const Router = require('koa-router');
const kakao = require('./kakao')
const add = require('./add');
const userInfo = require('./userInfo')

const users = new Router();
const Joi = require('joi');
const { user : User } = require('../../databases');
const { oauth,token,auth,login } = require('../../lib');

// users.get('/', (ctx, next)=>{
//     ctx.body = 'this is users page'
// })

users.post('/exist', async ctx=>{
  const params = Joi.object({
    login_type: Joi.number().integer().min(1).max(2).required(),
    access_token: Joi.string().required()
  }).validate(ctx.request.body);
  if(params.error) ctx.throw(400, '잘못된 요청');

  const { login_type, access_token } = params.value;
  let login_id;
  // kakao
  if(login_type === 2){
    const kakaoData = await oauth.kakaoData(access_token);
    login_id = `kakao:${kakaoData.id}`;
  }else if(login_type === 1){
    const naverData = await oauth.naverData(access_token);
    login_id = `naver:${naverData.id}`;
  }
  const isExist = await User.isExist(login_type, login_id);

  // const bufUUID = Buffer.from(isExist.uuid, 'hex');
  // const result = await User.isExistFromUUID(bufUUID);

  let myToken;
  // TODO: 밑에 소스 분기 안해도 풀리는 지 확인 필요
  if(isExist){
    myToken = token.get({UUID: isExist.uuid});
    const bufUUID = Buffer.from(isExist.uuid, 'hex');
    const result = await User.isExistFromUUID(bufUUID);
    // console.log(result.Auth);
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    ctx.body = {
      status: 200,
      data: {
        Auth: result.Auth,
        isExist: isExist ? true : false,
        access_token: myToken
      }
    }
}else{
    ctx.body = {
      status: 200,
      data: {
        isExist: isExist ? true : false,
        access_token: myToken,
        // Auth: result.Auth
      }
    }
}
// console.log(isExist);

});

users.post ('/', async (ctx,next) => {   //부동산 관련 가입 시 로그인 외 추가정보 기입을 위한 메소드
  const params = Joi.object({
      login_type: Joi.number().integer().min(1).max(2).required(),
      access_token: Joi.string().required(),
      phone: Joi.string().regex(/^[0-9]{8,13}$/).required(), // 회원전화번호
      name: Joi.string().required(),  // 회원 이름
      email: Joi.string().email().required(),
      student_ID: Joi.string().required(),
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
    const result = await User.isExistFromUserID(`kakao:${kakaoData.id}`)
    if(result) ctx.throw(400, "이미 존재하는 유저입니다.")
    // console.log(result);
    login_id = `kakao:${kakaoData.id}`;
  }
  else if(login_type === 1){  // naver login
    const naverData = await oauth.naverData(access_token);
    // console.log(naverData);
    const result = await User.isExistFromUserID(`naver:${naverData.id}`)
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

users.use('/kakao', kakao.routes());
users.use('/naver', require('./naver').routes())
users.use('/add', add.routes());
users.use('/userInfo', userInfo.routes());

module.exports = users;
