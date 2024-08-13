1、安装VSCode（system install  版本)： 访问 https://code.visualstudio.com/docs/
【扩展】搜索“Chinese (Simplified) (简体中文) ”并安装；“Ctrl+Shift+P”显示“命令面板”，筛选“Configure Display Language”命令。选择“中文（简体）以切换 UI 语言
【扩展】安装open in browser、code runner

2、NVM 安装： https://github.com/coreybutler/nvm-windows/releases中Assets 选择 nvm-setup.exe下载并安装
安装路径改为“D:\Node\nvm”

3、Node安装：【开始】以管理员身份运行cmd；
查看可安装Node版本：nvm list available
安装Node：nvm install v20.15.0（安装最新lts版：nvm install lts）
启用Node：nvm use v20.15.0（查看当前Node版：node -v）

4、安装Vite(https://vitejs.cn/vite3-cn/guide) + React(https://react.dev/)
npm config set registry https://registry.npmjs.org/
npm config set proxy null
cd D:\web\obj（设置安装的路径，路径自己先创建）
npm create vite@latest mjkbobj-- --template react

  cd mjkbobj                （进入example项目文件夹）
  npm install                （失败的话多次安装--verbose）
  npm run dev               （启用服务）

5、安装Tailwind CSS
npm install -D tailwindcss postcss autoprefixer --verbose（失败的话多次安装）
npx tailwindcss init -p
在VSCode【扩展】安装Tailwind CSS IntelliSense
tailwind.config.js 文件中content: 添加 "./index.html", "./src/**/*.{html,js}",
新建src/input.css文件，输入
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
命令行npx tailwindcss -i ./src/input.css -o ./src/output.css --watch

在相关网页中应用<link href="./src/output.css" rel="stylesheet">


6、安装midway
cd D:\web\obj（设置安装的路径，路径自己先创建）
npm init midway
回车（默认koa-v3）
midwaybackend（项目名称）

  cd midwaybackend  （进入midwaybackend项目文件夹）
  npm install              （失败的话多次安装）
  npm run dev          （启用服务）

7、安装pkg
npm install -g pkg

