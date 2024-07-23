const { pool } = require('../../database')

exports.save = async (siteName, content, siteLink, imgUrl) => {
    const query = `INSERT INTO sites(site_name, content, site_link, img_url) VALUES (?,?,?,?)`;
    return await pool.query(query, [siteName, content, siteLink, imgUrl]);
}

exports.findAll = async () => {
    const rows = await pool.query(`SELECT * FROM sites`);
    return (rows.length === 0) ? null : rows;
}