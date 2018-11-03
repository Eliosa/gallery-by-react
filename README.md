# gallery-by-react
gallery program based on react

目录
-GALLERY-BY-REACT
---src  (源代码所在目录)
---test  （测试代码所在目录）
---editorconfig  (用来统一不同编辑器IDE的编码风格)
---eslintrc  (代码风格检测工具)
---yo-rc.json  （yoeman的配置文件，用来记录当前项目的一些配置信息）
---karma.conf.js  (karma测试工具的配置文件)
---pageage.json   （node项目的配置文件） 


# Start for development
npm start # or
npm run serve

# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Auto-run unit tests on file changes
npm run test:watch

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy


1. 安装yeoman脚手架工具
`npm install -g yo`

2. 在yeoman的官网 搜索相应的项目生成器， 进行快速搭建
`npm install -g generator-react-webpack`

3. 在Git上创建项目 并拉去到本地
`git clone 项目地址`

4. 进入项目目录 利用react-webpack generator 来生成相应的项目
yo react-webpack 项目名`

··········································

5. 上传相应代码至git
`git add -A`  
`git commit -m "finish"`
`git push`

6. github 提供了托管静态页面以便发布web页的服务——github pages，
    将项目中dist目录下的文件放入其中
    6.1  在.gitignore 中取出dist目录  然后再推送到远程的pages分支上
    `git add dist`
    `git commit -m "add dist"`
    `git subtree push --prefix=dist or origin gh-pages`

