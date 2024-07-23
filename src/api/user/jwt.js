const jwt = require('jsonwebtoken');
const util = require('util');

const singAsync = util.promisify(jwt.sign);
const privateKey = process.env.JWT_KEY;

async function generateToken(paylod) {
    return await singAsync(paylod, privateKey);
}

module.exports = generateToken;