const express = require('express');
const router = express.Router();

const webController = require('./web/controller');
const apiUserController = require('./api/user/controller');

const { logRequestTime } = require('./middleware/log');

router.get('/', webController.home);
// 특정 라우트에 대해 로그 미들웨어 적용
router.get('/page/:route', logRequestTime, webController.page);

// 전역적으로 로그 미들웨어 적용
router.use(logRequestTime);

router.post('/api/login', apiUserController.login);
router.post('/api/join', apiUserController.join);
router.get('/api/user/my', apiUserController.show);
router.post('/api/user/my', apiUserController.update);

module.exports = router;