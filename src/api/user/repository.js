const { pool } = require('../../database')

exports.join = async (accountId, password, name) => {
    const query = `INSERT INTO users(account_id, password, name) VALUES (?,?,?)`;
    return await pool.query(query, [accountId, password, name]);
}

exports.login = async (accountId, password) => {
    const query = `SELECT * FROM users WHERE account_id = ? AND password = ?`;
    let result = await pool.query(query, [accountId, password]);
    return (result.length < 0) ? null : result[0];
}

exports.findByAccountId = async (accountId) => {
    let result = await pool.query(`SELECT count(*) count FROM users where account_id = ?`, [accountId]);
    return (result.length < 0) ? null : result[0];
}

exports.findId = async (id) => {
    const result = await pool.query(
        `SELECT id, account_id, name, file_id, created_at FROM users WHERE id = ?`, [id]);
    return (result.length < 0) ? null : result[0];
}