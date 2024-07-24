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
 *         fileId:
 *           type: integer
 *           description: "파일 ID (옵션)"
 *         imgUrl:
 *           type: string
 *           description: "이미지 url (옵션)"
 *         userId:
 *           type: integer
 *           description: "사용자 ID"
 *         category:
 *           type: string
 *           description: "게시물 카테고리"
 *         petName:
 *           type: string
 *           description: "애완동물 이름"
 *         petAge:
 *           type: integer
 *           description: "애완동물 나이"
 *       example:
 *         title: "우리 애기"
 *         content: "애기 최고 짱이야"
 *         fileId: 0
 *         imgUrl: ""
 *         userId: 1
 *         category: "자식자랑"
 *         petName: "멍멍이"
 *         petAge: 5
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
 *                 example: "우리 애기"
 *               content:
 *                 type: string
 *                 example: "우리 애기가 짱이야"
 *               fileId:
 *                 type: integer
 *                 example: 0
 *               imgUrl:
 *                 type: string
 *                 example: ""
 *               userId:
 *                 type: integer
 *                 example: 1
 *               category:
 *                 type: string
 *                 example: "자식자랑"
 *               petName:
 *                 type: string
 *                 example: "멍멍이"
 *               petAge:
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
 *             title: "우리 애기"
 *             content: "애기 최고 짱이야"
 *             fileId: 0
 *             imgUrl: ""
 *             userId: 1
 *             category: "자식자랑"
 *             petName: "멍멍이"
 *             petAge: 5
 *             created_at: "2024-07-23"
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
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "우리 애기 수정"
 *               content:
 *                 type: string
 *                 example: "이 닦을 때 뽀로로 틀어주면 됨"
 *               fileId:
 *                 type: integer
 *                 example: 0
 *               imgUrl:
 *                 type: string
 *                 example: ""
 *               userId:
 *                 type: integer
 *                 example: 1
 *               category:
 *                 type: string
 *                 example: "육아꿀팁"
 *               petName:
 *                 type: string
 *                 example: "멍멍이"
 *               petAge:
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

/**
 * @swagger
 * paths:
 *  /post/all:
 *    get:
 *      summary: "게시물 전체 조회"
 *      description: "게시물 전체 정보를 반환합니다."
 *      tags: [Posts]
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        "200":
 *          description: 게시물 전체 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: "요청 성공 여부"
 *                  postList:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Post'
 *                example:
 *                  success: true
 *                  postList:
 *                    - id: 1
 *                      title: "우리 애기 자랑"
 *                      content: "울 애기 최공"
 *                      fileId: 1
 *                      imgUrl: "http://example.com/image.png"
 *                      userId: "1"
 *                      category: "자식자랑"
 *                      petName: "구름이"
 *                      petAge: 5
 *                      createAt: "2024-07-23T04:47:14Z"
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
postRouter.get("/all", postController.getAllPosts);

/**
 * @swagger
 * paths:
 *  /post/all:
 *    get:
 *      summary: "게시물 전체 조회"
 *      description: "게시물 전체 정보를 반환합니다."
 *      tags: [Posts]
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        "200":
 *          description: 게시물 전체 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: "요청 성공 여부"
 *                  postList:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Post'
 *                example:
 *                  success: true
 *                  postList:
 *                    - id: 1
 *                      title: "우리 애기 자랑"
 *                      content: "울 애기 최공"
 *                      fileId: 1
 *                      imgUrl: "http://example.com/image.png"
 *                      userId: "1"
 *                      category: "자식자랑"
 *                      petName: "구름이"
 *                      petAge: 5
 *                      createAt: "2024-07-23T04:47:14Z"
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
postRouter.get("/all", postController.getAllPosts);

/**
 * @swagger
 * paths:
 *  /post/{category}:
 *    get:
 *      summary: "특정 카테고리의 게시물 조회"
 *      description: "특정 카테고리에 속하는 게시물과 해당 게시글 작성자 정보를 반환합니다."
 *      tags: [Posts]
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: category
 *          required: true
 *          schema:
 *            type: string
 *          description: "조회할 게시물의 카테고리"
 *      responses:
 *        "200":
 *          description: 카테고리별 게시물 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: "요청 성공 여부"
 *                  postDetailInfo:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/PostDetail'
 *                example:
 *                  success: true
 *                  postDetailInfo:
 *                    - id: 1
 *                      title: "우리 애기 자랑"
 *                      content: "울 애기 최공"
 *                      fileId: 1
 *                      imgUrl: "http://example.com/image.png"
 *                      userId: 1
 *                      category: "자식자랑"
 *                      petName: "구름이"
 *                      petAge: 5
 *                      createAt: "2024-07-23T04:47:14Z"
 *                      user:
 *                        name: "홍길동"
 *                        imgUrl: "http://example.com/user.png"
 *                        fileId: 2
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
postRouter.get("/:category", postController.getPostDetailInfo);

/**
 * @swagger
 * paths:
 *  /post/userId/{userId}:
 *     get:
 *       summary: "사용자의 모든 게시글 조회"
 *       description: "특정 사용자의 모든 게시글을 조회합니다."
 *       tags: [Posts]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           description: "사용자 ID"
 *           schema:
 *             type: integer
 *       responses:
 *         "200":
 *           description: 게시글 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: "요청 성공 여부"
 *                   userPosts:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Post'
 *                 example:
 *                   success: true
 *                   userPosts:
 *                     - id: 1
 *                       title: "우리 애기"
 *                       content: "애기 최고 짱이야"
 *                       fileId: 1
 *                       imgUrl: ""
 *                       userId: 1
 *                       category: "자식자랑"
 *                       petName: "멍멍이"
 *                       petAge: 5
 *                       created_at: "2024-07-23T12:34:56Z"
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
// postRouter.get("/userId/:userId", postController.getUserPosts);

module.exports = postRouter;
