const userRouter = require('express').Router()
const authenticateToken = require('../middleware/auth');
const userController = require("../api/user/controller")

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "사용자 ID"
 *         account_id:
 *           type: string
 *           description: "계정 ID"
 *         name:
 *           type: string
 *           description: "사용자 이름"
 *         file_id:
 *           type: integer
 *           description: "파일 ID (옵션)"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: "사용자 생성일시"
 *       example:
 *         id: 1
 *         account_id: "develop"
 *         name: "하이 짱구"
 *         file_id: 0
 *         created_at: "2024-07-23T04:47:14Z"
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: "요청 성공 여부"
 *         message:
 *           type: string
 *           description: "에러 메시지"
 *       example:
 *         success: false
 *         message: "가입된 유저가 없습니다."
 */

/**
@swagger
 * paths:
 *  /user/join:
 *    post:
 *      summary: "회원 가입"
 *      description: "회원 가입을 위한 요청을 처리합니다."
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accountId:
 *                  type: string
 *                  example: "test"
 *                password:
 *                  type: string
 *                  example: "test"
 *                name:
 *                  type: string
 *                  example: "test"
 *      responses:
 *        "200":
 *          description: 회원 가입 성공 및 토큰 반환
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  access_token:
 *                    type: string
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2VmOydtCDsp7HqtawiLCJpYXQiOjE3MjE3MTIwNTV9.AU56H3pOT6svDQSfLJNSZgNbKA6wM29T0rZlBtFkjqI"
 */
// 사용자 관련 라우트
userRouter.post('/join', userController.join);

/**
 * @swagger
 * paths:
 *  /user/login:
 *    post:
 *      summary: "로그인"
 *      description: "사용자가 로그인하기 위한 요청을 처리합니다."
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accountId:
 *                  type: string
 *                  example: "test"
 *                password:
 *                  type: string
 *                  example: "test"
 *      responses:
 *        "200":
 *          description: 로그인 성공 및 토큰 반환
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  access_token:
 *                    type: string
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Iu2VmOydtCDsp7HqtawiLCJpYXQiOjE3MjE3MTIwNTV9.AU56H3pOT6svDQSfLJNSZgNbKA6wM29T0rZlBtFkjqI"
 */
userRouter.post('/login', userController.login);

// 피드 관련 라우트, 모든 요청에 인증 필요
userRouter.use(authenticateToken);  // 이후 모든 라우트에 인증 적용

/**
 * @swagger
 * paths: 
 *  /user/show:
 *     get:
 *       summary: "단일 사용자 조회"
 *       description: "인증된 사용자의 정보를 조회합니다."
 *       tags: [Users]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         "200":
 *           description: 사용자 정보 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: "요청 성공 여부"
 *                   user:
 *                     $ref: '#/components/schemas/User'
 *                 example:
 *                   success: true
 *                   user:
 *                     id: 1
 *                     account_id: "develop"
 *                     name: "하이 짱구"
 *                     file_id: 0
 *                     created_at: "2024-07-23T12:34:56Z"
 *         "401":
 *           description: 인증 실패
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         "404":
 *           description: 사용자 정보 없음
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *               example:
 *                 success: false
 *                 message: "회원을 찾을 수 없습니다."
 *         "500":
 *           description: 서버 오류
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
userRouter.get('/show', userController.show);   // 마이페이지 라우트, 인증 필요

/**
 * @swagger
 * paths:
 *   /user/all:
 *     get:
 *       summary: "모든 사용자 조회"
 *       description: "모든 사용자 정보를 조회합니다. 인증된 사용자만 접근할 수 있습니다."
 *       tags: [Users]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         "200":
 *           description: 사용자 정보 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: "요청 성공 여부"
 *                   users:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/User'
 *                 example:
 *                   success: true
 *                   users:
 *                     - id: 1
 *                       account_id: "develop"
 *                       name: "하이 짱구"
 *                       file_id: 0
 *                       created_at: "2024-07-23T12:34:56Z"
 *                     - id: 2
 *                       account_id: "test"
 *                       name: "test"
 *                       file_id: 0
 *                       created_at: "2024-07-23T12:35:00Z"
 *         "401":
 *           description: 인증 실패
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         "500":
 *           description: 서버 오류
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
userRouter.get("/all", userController.all);

module.exports = userRouter