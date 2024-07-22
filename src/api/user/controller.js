const repository = require('./repository');
const crypto = require('crypto');
const jwt = require('./jwt');

exports.join = async (req, res) => {
    const { accountId, password, name } = req.body;
    let { count } = await repository.findByAccountId(accountId);

    if (count > 0) {
        return res.send({ result: "fail", message: '중복된 아이디가 존재합니다.' });
    }

    const result = await crypto.pbkdf2Sync(password, process.env.SALT_KEY, 50, 100, 'sha512')
    const { affectedRows, insertId } = await
        repository.join(accountId, result.toString('base64'), name);

    if (affectedRows > 0) {
        const data = await jwt({ id: insertId, name });
        res.send({ result: 'ok', access_token: data })
    } else {
        res.send({ result: 'fail', message: '알 수 없는 오류' });
    }
}

exports.login = async (req, res) => {
    const { accountId, password } = req.body;
    const result = await crypto.pbkdf2Sync(password, process.env.SALT_KEY, 50, 100, 'sha512')
    const item = await repository.login(accountId, result.toString('base64'));

    if (item == null) {
        res.send({ result: 'fail', message: '휴대폰 번호 혹은 비밀번호를 확인해 주세요' })
    } else {
        const data = await jwt({ id: item.id, name: item.name });
        res.send({ result: 'ok', access_token: data })
    }
}

exports.show = async (req, res) => {
    const user = req.user; // 미들웨어에서 추가된 사용자 정보
    // 데이터베이스에서 사용자 정보 조회
    const item = await repository.findId(user.id);

    // 사용자 정보가 없을 경우
    if (item == null) {
        res.send({ result: 'fail', message: '회원을 찾을 수 없습니다.' });
    } else {
        // 사용자 정보가 있을 경우
        res.send({ result: 'ok', data: item });
    }
}