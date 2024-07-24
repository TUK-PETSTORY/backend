const express = require("express");
const postRouter = express.Router();

const postController = require("../api/posts/postController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       security:
 *         - BearerAuth: []
 *       properties:
 *         id:
 *           type: integer
 *           description: "게시물 ID"
 *         title:
 *           type: string
 *           description: "게시물 제목"
 *         content:
 *           type: string
 *           description: "게시물 내용"
 *         file_id:
 *           type: integer
 *           description: "파일 ID (옵션)"
 *         image_id:
 *           type: string
 *           description: "이미지 ID (옵션)"
 *         user_id:
 *           type: integer
 *           description: "사용자 ID"
 *         category:
 *           type: string
 *           description: "게시물 카테고리"
 *         pet_name:
 *           type: string
 *           description: "애완동물 이름"
 *         pet_age:
 *           type: integer
 *           description: "애완동물 나이"
 *       example:
 *         title: "제목"
 *         content: "게시물 내용"
 *         file_id: 3
 *         image_id: '이미지 아이디'
 *         user_id: 3
 *         category: "카테고리"
 *         pet_name: "멍멍이"
 *         pet_age: 5
 */

/**
 * @swagger
 * /post/write:
 *   post:
 *     summary: "게시물 작성"
 *     description: "새로운 게시물을 작성합니다."
 *     tags: [Posts]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "제목"
 *               content:
 *                 type: string
 *                 example: "게시물 내용"
 *               file_id:
 *                 type: integer
 *                 example: 3
 *               image_id:
 *                 type: string
 *                 example: '이미지 아이디'
 *               user_id:
 *                 type: integer
 *                 example: 3
 *               category:
 *                 type: string
 *                 example: "카테고리"
 *               pet_name:
 *                 type: string
 *                 example: "멍멍이"
 *               pet_age:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       "201":
 *         description: 게시물이 성공적으로 생성되었습니다.
 *       "400":
 *         description: 잘못된 입력 데이터입니다.
 *       "500":
 *         description: 서버 오류
 */
postRouter.post("/write", postController.writePost);

/**
 * @swagger
 * /post/category/{category}:
 *   get:
 *     summary: "카테고리별 게시물 조회"
 *     description: "특정 카테고리의 게시물 목록을 조회합니다."
 *     tags: [Posts]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: 지정된 카테고리에 대한 게시물 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *         example:
 *           - id: 1
 *             title: "제목"
 *             content: "게시물 내용"
 *             file_id: 3
 *             image_id: '이미지 아이디'
 *             user_id: 3
 *             category: "카테고리"
 *             pet_name: "멍멍이"
 *             pet_age: 5
 *       "400":
 *         description: 카테고리 값이 필요합니다.
 *       "500":
 *         description: 서버 오류
 */
postRouter.get("/category/:category", postController.getPostsByCategory);

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: "게시물 수정"
 *     description: "게시물을 수정합니다."
 *     tags: [Posts]
 *     security:
 *        - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 2
 *               title:
 *                 type: string
 *                 example: "제목"
 *               content:
 *                 type: string
 *                 example: "게시물 내용"
 *               file_id:
 *                 type: integer
 *                 example: 3
 *               image_id:
 *                 type: string
 *                 example: '이미지 아이디'
 *               user_id:
 *                 type: integer
 *                 example: 3
 *               category:
 *                 type: string
 *                 example: "카테고리"
 *               pet_name:
 *                 type: string
 *                 example: "멍멍이"
 *               pet_age:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       "200":
 *         description: 게시물이 성공적으로 수정되었습니다.
 *       "400":
 *         description: 필수 필드가 누락되었습니다.
 *       "500":
 *         description: 서버 오류
 */
postRouter.put("/:id", postController.updatePost);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: "게시물 삭제"
 *     description: "게시물을 삭제합니다."
 *     tags: [Posts]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: 게시물이 성공적으로 삭제되었습니다.
 *       "500":
 *         description: 서버 오류
 */
postRouter.delete("/:id", postController.deletePost);

module.exports = postRouter;
