/**
 * 因为 JS 模块化机制
 * 需要 Component 类对各个具体的组件类有依赖关系
 * 才能调用到各个组件中注册 Component 的代码
 */
const fs = require('fs');
const path = require('path');
const FILENAME = 'componentLoader.js';
const componentPath = path.resolve(__dirname);

// loader, use in webpack
module.exports = function(source) {
    this.addDependency(componentPath);
    return source + generateRegisterStatement(componentPath);
};

// use in server pre run
if (process.argv.splice(2)[0] === 's') {
    let texts = generateRegisterStatement(componentPath);
    // TODO 这句是同步的 但是在bash中使用&连接的命令中会出现异步错误 即在代码重构之前没有完成文件读写
    // fs.appendFileSync(path.resolve(__dirname, '../Component.js'), texts);
}

function generateRegisterStatement(componentPath) {
    const files = fs.readdirSync(componentPath);

    let texts = '\n;';
    files.forEach((filename) => {
        if (filename === FILENAME) return;
        texts += '\nrequire("./components/' + filename.split(".js")[0] +'");';
    });
    return texts;
}

/*
// use in server pre run
if (process.argv.splice(2)[0] === 's') {
    let texts = generateRegisterStatement(componentPath);
    fs.appendFileSync(path.resolve(__dirname, '../Resource.js'), texts);
}

function generateRegisterStatement(componentPath) {
    const files = fs.readdirSync(componentPath);
    let texts = '';
    files.forEach(filename => {
        if (filename === FILENAME) return;
        let name = filename.split(".js")[0];
        texts += '\nComponents[\'' + name + '\'] = require("./components/' + name + '");';
    });
    texts += "\nconsole.log('done');";
    return texts;
}
 */