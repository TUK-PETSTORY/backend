const { pool } = require('../../database');

exports.save = async (userId, postId, siteId) => {
    const query = `INSERT INTO likes(user_id, post_id, site_id) VALUES (?, ?, ?)`;
    const result = await pool.query(query, [userId, postId, siteId]);
    return result.affectedRows > 0;
}

exports.deleteById = async (likeId) => {
    const query = `DELETE FROM likes WHERE id = ?`;
    const result = await pool.query(query, [likeId]);
    return result.affectedRows > 0;
}

exports.getByUserId = async (userId) => {
    const query = `SELECT s.* FROM sites s
                    JOIN (
                        SELECT DISTINCT site_id
                        FROM likes
                        WHERE user_id = ? AND post_id = 0
                    ) l ON s.id = l.site_id`;
    const rows = await pool.query(query, [userId]);
    return rows.length === 0 ? null : rows;
};
