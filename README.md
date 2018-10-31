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