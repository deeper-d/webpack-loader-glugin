const log = require('../utils')

/**
 * loader 做的事, 在 css 文件最前面加上文档注释
 */
module.exports = (content) => {
    log('content', content)
    // 先转成模板字符串的形式
    let a = '`/*author: gua*/\n'
    let b = '`'
    let s = a + content + b
    // 接着手动处理成 module.exports = xxx 的形式, 这样才能暴露这个变量
    // 然后在其他地方才可以使用
    let r = 'module.exports = ' + s
    log('r is')
    log(r)
    // r 的结果如下

    // module.exports = `
    // /*author: gua*/
    // body {
    //     background: pink;
    // }`

    // 返回 r, r 会被 webpack 处理成一个模块(通过 module.exports), 这样在 js 里面就可以导入模块
    return r
}