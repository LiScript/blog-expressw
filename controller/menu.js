const xss = require('xss')
const { exec } = require('../db/mysql')
const XEUtils = require('xe-utils')

const systemmenu = () => {
    const sql = `
        select * from systemmenu;
    `
    return exec(sql).then(rows => {
        // console.log()
        return XEUtils.toArrayTree(rows, { parentKey: 'parentID' })
    })
}

const updateMenu = (id, menuData) => {
    const name = menuData.name
    const title = menuData.title
    const component = menuData.component
    const url = menuData.url
    const icon = menuData.icon
    const redirect = menuData.redirect
    const description = menuData.description
    const parentID = menuData.parentID
    const sql = `
    update systemmenu set name='${name}',title='${title}',component='${component}',url='${url}',icon='${icon}',redirect='${redirect}',description='${description}',
    parentID=${parentID} where id=${id}
    `
    return exec(sql).then(updateDate => {
        if (updateDate.affectedRows > 0) {
            return true
        }
        return false
    })
}

const addMenu = (menuData = {}) => {
    const name = menuData.name
    const title = menuData.title
    const component = menuData.component
    const url = menuData.url
    const icon = menuData.icon
    const redirect = menuData.redirect
    const description = menuData.description
    const parentID = menuData.parentID
    const sql = `
        insert into systemmenu (name, title, component, url, icon, redirect, description, parentID)
        values ('${name}', '${title}', '${component}', '${url}', '${icon}', '${redirect}', '${description}', ${parentID});
    `
    return exec(sql).then(rows => {
        return rows[0] || ''
    })
}

const delMenu = (menuId) => {
    const sql = `delete from systemmenu where id='${menuId}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    systemmenu,
    addMenu,
    delMenu,
    updateMenu
}