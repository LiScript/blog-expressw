var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login, systemmenu } = require('../controller/user')

router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
        // console.log(data)
        if (data.username) {
            // 设置 session
            req.session.username = data.username
            req.session.realname = data.realname
            req.session.id = data.id
            res.json(
                new SuccessModel(req.session)
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
});

router.get('/systemmenu', function (req, res, next) {
    const result = systemmenu()
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

module.exports = router;
