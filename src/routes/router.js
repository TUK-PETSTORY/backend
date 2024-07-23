const express = require("express");
const router = express.Router();

const webController = require("../web/controller");

const userRoute = require("./user_router");
const postRoute = require("./post_router");
const siteRoute = require("./site_router");

const { logRequestTime } = require("../middleware/log");
const authenticateToken = require("../middleware/auth");

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

// 피드 관련 라우트, 모든 요청에 인증 필요
router.use(authenticateToken); // 이후 모든 라우트에 인증 적용

/**
 * @swagger
 * tags:
 *   name: Sites
 *   description: 추천 사이트 등록 조회
 */
router.use("/site", siteRoute);

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: 게시물 관련 API (게시물 생성, 조회, 수정, 삭제 등)
 */
router.use("/posts", postRoute);

module.exports = router;
