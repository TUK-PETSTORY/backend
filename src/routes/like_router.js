const express = require('express');
const router = express.Router();
const controller = require('../api/likes/controller');

/**
 * @swagger
 * paths:
 *  /like:
 *    post:
 *      summary: "좋아요 저장"
 *      description: "좋아요를 저장합니다."
 *      tags: [Likes]
 *      security:
 *         - BearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: integer
 *                  example: 1
 *                postId:
 *                  type: integer
 *                  example: 1
 *                siteId:
 *                  type: integer
 *                  example: 1
 *      responses:
 *        "200":
 *          description: 좋아요 저장 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: "좋아요를 성공적으로 저장하였습니다."
 */
router.post('', controller.save);

/**
 * @swagger
 * paths:
 *  /like/{likeId}:
 *    delete:
 *      summary: "좋아요 삭제"
 *      description: "특정 ID의 좋아요를 삭제합니다."
 *      tags: [Likes]
 *      security:
 *         - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: likeId
 *          required: true
 *          schema:
 *            type: integer
 *            example: 1
 *      responses:
 *        "200":
 *          description: 좋아요 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: "좋아요를 성공적으로 삭제하였습니다."
 */
router.delete('/:likeId', controller.delete);

/**
 * @swagger
 * paths:
 *  /like/user:
 *    get:
 *      summary: "특정 유저의 좋아요된 사이트 조회"
 *      description: "특정 유저 ID와 포스트 ID가 0인 모든 좋아요된 사이트를 조회합니다. 인증된 사용자만 접근할 수 있습니다."
 *      tags: [Likes]
 *      security:
 *         - BearerAuth: []
 *      responses:
 *        "200":
 *          description: 좋아요 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  items:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          example: 1
 *                        siteName:
 *                          type: string
 *                          example: "PATHROOM"
 *                        content:
 *                          type: string
 *                          example: "반려동물을 위한 프리미엄 라이프 스타일 브랜드 PETHROOM!"
 *                        siteUrl:
 *                          type: string
 *                          example: "https://pethroom.com"
 *                        imgUrl:
 *                          type: string
 *                          example: "https://yt3.googleusercontent.com/ytc/AIdro_kbggBDMlka5N8AcWl0p-StiPEaK6WY14wVd7HEPK1LXNc=s900-c-k-c0x00ffffff-no-rj"
 *                        createdAt:
 *                          type: string
 *                          format: date-time
 *                          example: "2024-07-23T12:34:56Z"
 *        "401":
 *          description: 인증 실패
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "500":
 *          description: 서버 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/user', controller.findByUserId);

module.exports = router;