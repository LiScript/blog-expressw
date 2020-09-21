const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const XEUtils = require('xe-utils')
const login = (username, password) => {
    username = escape(username)

    // 生成加密密码
    password = genPassword(password)
    password = escape(password)

    const sql = `
        select id, username, realname from user where username=${username} and password=${password}
    `
    // console.log('sql is', sql)
    return exec(sql).then(rows => {
        // console.log('sql is', rows)
        return rows[0] || {}
    })
}

const systemmenu = () => {
    const sql = `
        select * from systemmenu;
    `
    // console.log('sql is', sql)
    return exec(sql).then(rows => {
        // console.log()
        return XEUtils.toArrayTree(rows,{ parentKey: 'parentID' })
    })
}
module.exports = {
    login,
    systemmenu
}