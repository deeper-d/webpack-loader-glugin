// 导入 css 文件, 因为在 webpack.config.js 里配置了处理 css 文件的 loader
// 所以这个语法并不会直接报错
// import * as xxx 的意思是导入 main.css 整个文件, 然后用别名 mainCss
// mainCss 就是 main.css 导出的内容
// 也就是 css-loader 中返回的内容中 exports 出来的值(这句有点绕, 具体看 css-loader 的例子）
import * as css from './a.css'

const styleTemplate = (css) => {
    let t = `
    <style>
        ${css}
    </style>
    `
    return t
}

const insertCss = () => {
    let s = styleTemplate(css)
    document.head.insertAdjacentHTML('beforeend', s)
}

const bindEvents = () => {
    let button = document.querySelector('#id-button')
    button.addEventListener('click', (event) => {
        document.body.classList.toggle('gua-pink')
    })
}

const __main = () => {
    insertCss(css)
    bindEvents()
}

__main()
