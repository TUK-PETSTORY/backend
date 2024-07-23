const siteRouter = require('express').Router();
const siteController = require("../api/site/controller");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Site:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "사이트 ID"
 *         site_name:
 *           type: string
 *           description: "사이트 이름"
 *         content:
 *           type: string
 *           description: "사이트 내용"
 *         site_link:
 *           type: string
 *           description: "사이트 링크"
 *         img_url:
 *           type: string
 *           description: "이미지 URL"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: "데이터 생성일시"
 *       example:
 *         id: 1
 *         site_name: "Example Site"
 *         content: "This is an example site"
 *         site_link: "http://example.com"
 *         img_url: "http://example.com/image.png"
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
 *         message: "에러 메시지"
 */

/**
 * @swagger
 * paths:
 *   /site/save:
 *     post:
 *       summary: "사이트 저장"
 *       description: "사이트 저장을 위한 요청을 처리합니다."
 *       tags: [Sites]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 siteName:
 *                   type: string
 *                   example: "PATHROOM"
 *                 content:
 *                   type: string
 *                   example: "반려동물을 위한 프리미엄 라이프 스타일 브랜 드 PETHROOM!"
 *                 siteLink:
 *                   type: string
 *                   example: "https://pethroom.com"
 *                 imgUrl:
 *                   type: string
 *                   example: "https://yt3.googleusercontent.com/ytc/AIdro_kbggBDMlka5N8AcWl0p-StiPEaK6WY14wVd7HEPK1LXNc=s900-c-k-c0x00ffffff-no-rj"
 *       responses:
 *         "200":
 *           description: 사이트 저장 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "사이트를 성공적으로 저장하였습니다."
 *         "400":
 *           description: 잘못된 요청
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
siteRouter.post('/save', siteController.save);

/**
 * @swagger
 * paths:
 *   /site/all:
 *     get:
 *       summary: "모든 사이트 조회"
 *       description: "모든 사이트 정보를 조회합니다. 인증된 사용자만 접근할 수 있습니다."
 *       tags: [Sites]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         "200":
 *           description: 사이트 정보 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: "요청 성공 여부"
 *                   sites:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Site'
 *                 example:
 *                   success: true
 *                   sites:
 *                     - id: 1
 *                       site_name: "PATHROOM"
 *                       content: "반려동물을 위한 프리미엄 라이프 스타일 브랜드 PETHROOM!"
 *                       site_link: "https://pethroom.com"
 *                       img_url: "https://yt3.googleusercontent.com/ytc/AIdro_kbggBDMlka5N8AcWl0p-StiPEaK6WY14wVd7HEPK1LXNc=s900-c-k-c0x00ffffff-no-rj"
 *                       created_at: "2024-07-23T12:34:56Z"
 *                     - id: 2
 *                       site_name: "arr"
 *                       content: "반려동물 옷은 아르르! 계절에 맞는 다양한 필수템! 우리 아이를 위한 편하면서 귀여운 반려동물 옷을 만나보세요 "
 *                       site_link: "https://www.arrr.kr"
 *                       img_url: "http://example2.com/image.png"
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
siteRouter.get("/all", siteController.all);

module.exports = siteRouter;
