const express = require('express');
const router = express.Router();

const authenticateToken = require('./middleware/auth');

const webController = require('./web/controller');
const apiUserController = require('./api/user/controller');

const { logRequestTime } = require('./middleware/log');

router.get('/', webController.home);
// 특정 라우트에 대해 로그 미들웨어 적용
router.get('/page/:route', logRequestTime, webController.page);

// 전역적으로 로그 미들웨어 적용
router.use(logRequestTime);

// 사용자 관련 라우트
router.post('/auth/join', apiUserController.join);
router.post('/auth/login', apiUserController.login);

// 피드 관련 라우트, 모든 요청에 인증 필요
router.use(authenticateToken);  // 이후 모든 라우트에 인증 적용

// 마이페이지 라우트, 인증 필요
router.get('/api/user/show', apiUserController.show);

module.exports = router;