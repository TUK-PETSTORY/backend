const express = require('express');
const router = express.Router();

const webController = require('../web/controller');

const userRoute = require("./user_router");

const { logRequestTime } = require('../middleware/log');

router.get('/', webController.home);
// 특정 라우트에 대해 로그 미들웨어 적용
router.get('/page/:route', logRequestTime, webController.page);

// 전역적으로 로그 미들웨어 적용
router.use(logRequestTime);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 로그인 회원가입 조회
 */
router.use("/user", userRoute);

module.exports = router;