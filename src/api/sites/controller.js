const repository = require('./repository');

exports.save = async (req, res) => {
    const { siteName, content, siteUrl, imgUrl } = req.body;
    const item = await repository.save(siteName, content, siteUrl, imgUrl);

    if (item == null) {
        res.send({ success: false, message: '입력한 내용을 다시 한 번 확인해주세요.' })
    } else {
        res.send({ success: true, message: '사이트를 성공적으로 저장하였습니다.' })
    }
}

exports.all = async (req, res) => {
    const user = req.user; // 미들웨어에서 추가된 사용자 정보
    // 데이터베이스에서 사용자 정보 조회
    const items = await repository.findAll();

    // 사용자 정보가 없을 경우
    if (items == null) {
        res.send({ success: false, message: '가입된 유저가 없습니다.' });
    } else {
        // 사용자 정보가 있을 경우
        res.send({ success: true, sites: items });
    }
}