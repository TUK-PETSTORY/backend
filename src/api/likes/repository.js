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

exports.countByPostId = async (postId) => {
    const rows = await pool.query(`SELECT COUNT(*) as count FROM likes WHERE post_id = ?`, [postId]);
    return rows[0].count;
}

exports.countBySiteId = async (siteId) => {
    const rows = await pool.query(`SELECT COUNT(*) as count FROM likes WHERE site_id = ?`, [siteId]);
    return rows[0].count;
}

exports.findByUserIdAndPostIdZero = async (userId) => {
    const rows = await pool.query(`SELECT * FROM likes WHERE user_id = ? AND post_id = 0`, [userId]);
    return rows.length === 0 ? null : rows;
}

exports.findByUserIdAndSiteIdZero = async (userId) => {
    const rows = await pool.query(`SELECT * FROM likes WHERE user_id = ? AND site_id = 0`, [userId]);
    return rows.length === 0 ? null : rows;
}
