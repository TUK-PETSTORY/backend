const repository = require('./repository');

exports.save = async (req, res) => {
    const { userId, postId, siteId } = req.body;
    const success = await repository.save(userId, postId, siteId);

    if (success) {
        res.send({ success: true, message: '좋아요를 성공적으로 저장하였습니다.' });
    } else {
        res.send({ success: false, message: '좋아요 저장에 실패하였습니다. 입력한 내용을 다시 한 번 확인해주세요.' });
    }
}

exports.delete = async (req, res) => {
    const { likeId } = req.params;
    const success = await repository.deleteById(likeId);

    if (success) {
        res.send({ success: true, message: '좋아요를 성공적으로 삭제하였습니다.' });
    } else {
        res.send({ success: false, message: '좋아요 삭제에 실패하였습니다. 해당 ID를 확인해주세요.' });
    }
}

exports.findByUserId = async (req, res) => {
    const user = req.user;
    const items = await repository.getByUserId(user.id);

    if (items) {
        res.send({ success: true, items });
    } else {
        res.send({ success: false, message: '조회된 항목이 없습니다.' });
    }
}
