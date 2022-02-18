const Router = require('koa-router');
const userInfo = new Router();
const userInfoCtrl = require('./userInfo.ctrl');
const { auth } = require('../../../lib');

userInfo
.get('/getAllAdm', userInfoCtrl.getAllAdm);

userInfo.use(auth.login);
userInfo.use(auth.level1);

userInfo
.get('/token', userInfoCtrl.token)
.get('/userMe', userInfoCtrl.userMe)
.post('/update', userInfoCtrl.update)  // 자신의 회원정보수
.delete('/delete', userInfoCtrl.delete)  // 자신의 회원 탈퇴

userInfo.use(auth.level2);

userInfo// create 은 user 라우트 단계에서 처리됨.
.get('/show', userInfoCtrl.show)
.get('/search', userInfoCtrl.search)
//TODO: search filter 걸어서 만들기

userInfo.use(auth.level3);

userInfo
.post('/userUpdate', userInfoCtrl.userUpdate)
.delete('/userDelete', userInfoCtrl.userDelete);
// .post('/setAdmin', userInfoCtrl.setADM)  // 회원 관리자 승격/강등 관리
// .post('/setMasterAdmin', userInfoCtrl.setMasterADM)  // 최고 관리자 승격/강등 관리

module.exports = userInfo
