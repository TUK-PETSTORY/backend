const express = require("express");
const router = express.Router();

const webController = require("../web/controller");

const userRoute = require("./user_router");
const postRoute = require("./post_router");

const { logRequestTime } = require("../middleware/log");

router.get("/", webController.home);
// 특정 라우트에 대해 로그 미들웨어 적용
router.get("/page/:route", logRequestTime, webController.page);

// 전역적으로 로그 미들웨어 적용
router.use(logRequestTime);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 로그인 회원가입 조회
 */
router.use("/user", userRoute);
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: 게시물 관련 API (게시물 생성, 조회, 수정, 삭제 등)
 */
router.use("/posts", postRoute);

module.exports = router;
