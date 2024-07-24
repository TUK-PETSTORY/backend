const { pool } = require("../../database");

exports.writePost = async (
  title,
  content,
  fileId,
  imgUrl,
  userId,
  category,
  petName,
  petAge
) => {
  const query = `INSERT INTO posts(title, content, file_id, img_url, user_id, category, pet_name, pet_age) VALUES (?,?,?,?,?,?,?,?)`;
  return await pool.query(query, [
    title,
    content,
    fileId,
    imgUrl,
    userId,
    category,
    petName,
    petAge,
  ]);
};

exports.showByCategory = async (category) => {
  const query = `SELECT * FROM posts WHERE category = ?`;
  const result = await pool.query(query, [category]);
  return result.length === 0 ? null : result;
};

exports.update = async (
  id,
  title,
  content,
  fileId,
  imgUrl,
  userId,
  category,
  petName,
  petAge
) => {
  const query = `
      UPDATE posts
        SET title = ?, content = ?, file_id = ?, img_url = ?, user_id = ?, category = ?, pet_name = ?, pet_age = ?
        WHERE id = ?
    `;

  return await pool.query(query, [
    title,
    content,
    fileId,
    imgUrl,
    userId,
    category,
    petName,
    petAge,
    id,
  ]);
};

exports.delete = async (id) => {
  const query = `DELETE FROM posts WHERE id = ?`;
  return await pool.query(query, [id]);
};

exports.getAllPosts = async () => {
  const query = `SELECT * FROM posts`;
  return await pool.query(query);
};

exports.getPostDetailInfo = async (category) => {
  const query = `SELECT p.*,
    u.name AS user_name,
    u.img_url AS user_img_url,
    u.file_id AS user_file_id
FROM
    posts p
JOIN
    users u ON p.user_id = u.id
WHERE
    p.category = ?
ORDER BY
    p.created_at DESC; 
`;
  return await pool.query(query, [category]);
};

// exports.getUserPosts = async (userId) => {};
