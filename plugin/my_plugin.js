const log = require('../utils')

/**
 * 插件的作用就是在输出目录下生成一个文件 filelist.md
 */
class MyPlugin {
    // webpack 运行的时候, 会初始化 plugin(new Class 的形式), 并且传入相应参数
    constructor(options) {
        log('options in constructor', options)
        this.options = options
    }
    // apply 方法会被 webpack compiler 调用
    // webpack 会在整个生命周期中触发事件(hook), 而 apply 在整个生命周期中都可以使用
    apply(compiler) {
        // 监听 done 这个 hooks
        // done 表示的是 编译已经完成, 除了 done, 还有很多其他 hooks
        // https://webpack.docschina.org/api/compiler-hooks/
        const pluginName = this.constructor.name
        compiler.hooks.done.tap(pluginName, () => {
            log('call in done event')
        })
        // 生成文件到 output 目录之前会触发 emit 事件
        // 通过异步的 tapAsync 方式触发
        compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
            // compilation.assets 包含所有要输出的资源, 在输出之前, 可以修改这个对象改变最终输出的值
            let assets = compilation.assets
            log('assets', assets)
            let filelist = 'build 输入的文件:\n\n'
            Object.keys(assets).forEach(e => {
                filelist += `- ${e} \n`
            })
            // 设置 filelist.md 的输出结果
            compilation.assets['filelist.md'] = {
                // 必须制定 source 和 size 这两个 key, 并且对应的 value 必须是函数
                // source 对应的函数中返回输出的文件内容
                source: function() {
                    // 可以输出字符串或者输出 buffer
                    return filelist
                },
                // size 对应的函数中返回输出文件的大小
                size: function() {
                    return filelist.length
                }
            }

            // 因为 emit 是一个异步 hook, 所以需要调用 callback 函数, 这样 webpack 就会执行下一步
            callback()
        })
    }
}

module.exports = MyPlugin