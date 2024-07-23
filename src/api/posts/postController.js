const postService = require("./postRepository");
exports.createPost = async (req, res) => {
  try {
    let {
      title,
      content,
      file_id,
      image_id,
      user_id,
      category,
      pet_name,
      pet_age,
    } = req.body;

    // 필수 필드 확인
    if (!title || !content || !user_id || !category || !pet_name || !pet_age) {
      return res.status(400).json({
        success: false,
        message: "필수 입력값이 누락되었습니다.",
      });
    }
    // 게시물 생성
    await postService.createPost(
      title,
      content,
      file_id,
      image_id,
      user_id,
      category,
      pet_name,
      pet_age
    );

    // 성공 응답
    res.status(201).json({
      success: true,
      message: "게시글 등록에 성공했습니다.",
    });
  } catch (error) {
    // 오류 로그 및 응답
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "게시글 등록에 실패했습니다." });
  }
};

exports.getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "카테고리가 없습니다." });
    }

    const postList = await postService.showByCategory(category);
    if (postList === null)
      return res.send({ success: false, message: "게시글이 없습니다." });
    res.status(200).json({
      success: true,
      message: `${category}별 게시글 목록입니다.`,
      postList: postList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류입니다." });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const {
      id,
      title,
      content,
      file_id,
      image_id,
      user_id,
      category,
      pet_name,
      pet_age,
    } = req.body;

    if (
      !id ||
      !title ||
      !content ||
      !file_id ||
      !image_id ||
      !user_id ||
      !category ||
      !pet_name ||
      !pet_age
    ) {
      return res
        .status(400)
        .json({ success: false, message: "필수 입력 값이 누락되었습니다." });
    }

    const post = await postService.update(
      id,
      title,
      content,
      file_id,
      image_id,
      user_id,
      category,
      pet_name,
      pet_age
    );
    res
      .status(200)
      .json({
        success: true,
        message: "게시글이 수정되었습니다.",
        post: {
          id: id,
          title: title,
          content: content,
          file_id: file_id,
          image_id: image_id,
          user_id: user_id,
          category: category,
          pet_name: pet_name,
          pet_age: pet_age,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류입니다." });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    await postService.delete(id);
    res
      .status(200)
      .json({ success: true, message: "게시글이 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류입니다." });
  }
};
