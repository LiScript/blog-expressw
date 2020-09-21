var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { systemmenu, addMenu, delMenu, updateMenu } = require('../controller/menu')
const loginCheck = require('../middleware/loginCheck')

router.get('/getAllMenu', (req, res, next) => {
    const result = systemmenu()
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/addMenu', loginCheck, (req, res, next) => {
    const result = addMenu(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/delMenu', loginCheck, (req, res, next) => {
    const result = delMenu(req.query.menuId)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除菜单失败')
            )
        }
    })
});

router.post('/updateMenu', loginCheck, (req, res, next) => {
    const result = updateMenu(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除菜单失败')
            )
        }
    })
});
module.exports = router;