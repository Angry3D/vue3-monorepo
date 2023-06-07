# vue3-monorepo

A template of vue3 monorepo project

一个基于 Vue3 的 `Monorepo` 方案模板

## 目录结构

```
vue3-monorepo
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── libs ### 公共库
│   │   ├── components
│   │   │   └── MyButton.vue
│   │   └── utils
│   │       └── index.js
│   ├── projects ### 各类项目，项目必须存放在该文件夹下
│   │   ├── project-a ### 项目A
│   │   │   ├── App.vue
│   │   │   ├── index.html
│   │   │   ├── main.js
│   │   │   ├── public
│   │   │   ├── router
│   │   │   ├── settings.js
│   │   │   ├── store
│   │   │   └── views
│   │   └── project-b ### 项目B
│   │       ├── App.vue
│   │       ├── index.html
│   │       ├── main.js
│   │       ├── public
│   │       ├── router
│   │       ├── settings.js
│   │       ├── store
│   │       └── views
│   └── settings.js
└── vite.config.js
```

## 运行或打包

> 打包时只会将指定项目的资源进行打包

#### 使用 `package.json` 配置好的脚本

在 `package.json` 中，已经配置好了 `project-a` 和 `project-b` 的运行和打包命令，可直接使用，如果添加新项目，可以先在此补充新的对应的命令即可

```bash
npm run dev:project-a # 本地开发
npm run build:dev:project-a # 开发环境打包
npm run build:test:project-a # 测试环境打包
npm run build:prod:project-a # 生产环境打包
```

#### 使用 `动态命令`

上面的方式虽然可以解决问题，但随着项目越来越多，`package.json` 的 `script` 区间必然将急速膨胀，因此，我们也提供一种 `动态命令` 的方式进行运行或打包

```bash
# project=xxx  用于指定项目的文件名称
project=project-a npm run dev # 本地开发
project=project-a npm run build:dev # 开发环境打包
project=project-a npm run build:test # 开发环境打包
project=project-a npm run build:prod # 开发环境打包
```

## 最佳实践

- 新增项目请务必放在 `src/projects` 目录下
- 每个项目有自己独立的 `index.html` / `main.js` / `store` / `router` 等，在 `libs` 下可以放入共享的资源，请不要直接导入其他项目中的代码或资源，而应该将公共部分放入 `libs` 中，再导入使用
- 公共配置放在 `src/settings.js` 中，每个项目下都有自己的配置，例如 `src/projects/project-a/settings.js`，两者将会自动合并，如果存在相同配置，会以项目中的配置为优先进行覆盖
- 需要注意一下，环境变量 `.env.xxx` 目前只支持所有项目共用，而没有做到每个项目单独配置
