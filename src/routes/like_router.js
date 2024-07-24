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
 *  /like/count/post/{postId}:
 *    get:
 *      summary: "특정 포스트 ID의 좋아요 갯수 조회"
 *      description: "특정 포스트 ID의 좋아요 갯수를 반환합니다."
 *      tags: [Likes]
 *      security:
 *         - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: postId
 *          required: true
 *          schema:
 *            type: integer
 *            example: 1
 *      responses:
 *        "200":
 *          description: 좋아요 갯수 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  count:
 *                    type: integer
 *                    example: 10
 */
router.get('/count/post/:postId', controller.countByPostId);

/**
 * @swagger
 * paths:
 *  /like/count/site/{siteId}:
 *    get:
 *      summary: "특정 사이트 ID의 좋아요 갯수 조회"
 *      description: "특정 사이트 ID의 좋아요 갯수를 반환합니다."
 *      tags: [Likes]
 *      security:
 *         - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: siteId
 *          required: true
 *          schema:
 *            type: integer
 *            example: 1
 *      responses:
 *        "200":
 *          description: 좋아요 갯수 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  count:
 *                    type: integer
 *                    example: 5
 */
router.get('/count/site/:siteId', controller.countBySiteId);

/**
 * @swagger
 * paths:
 *  /like/user/{userId}/post/zero:
 *    get:
 *      summary: "특정 유저 ID와 포스트 ID가 0인 모든 좋아요 조회"
 *      description: "특정 유저 ID와 포스트 ID가 0인 모든 좋아요를 조회합니다."
 *      tags: [Likes]
 *      security:
 *         - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          schema:
 *            type: integer
 *            example: 1
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
 *                        user_id:
 *                          type: integer
 *                          example: 1
 *                        post_id:
 *                          type: integer
 *                          example: 0
 *                        site_id:
 *                          type: integer
 *                          example: 1
 */
router.get('/user/:userId/post/zero', controller.findByUserIdAndPostIdZero);

/**
 * @swagger
 * paths:
 *  /like/user/{userId}/site/zero:
 *    get:
 *      summary: "특정 유저 ID와 사이트 ID가 0인 모든 좋아요 조회"
 *      description: "특정 유저 ID와 사이트 ID가 0인 모든 좋아요를 조회합니다."
 *      tags: [Likes]
 *      security:
 *         - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          schema:
 *            type: integer
 *            example: 1
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
 *                        user_id:
 *                          type: integer
 *                          example: 1
 *                        post_id:
 *                          type: integer
 *                          example: 1
 *                        site_id:
 *                          type: integer
 *                          example: 0
 */
router.get('/user/:userId/site/zero', controller.findByUserIdAndSiteIdZero);

module.exports = router;