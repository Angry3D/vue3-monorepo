/* eslint-disable no-undef */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'
import { readdirSync } from 'fs'

// 获取所有项目文件夹信息
projectDirInfo = {} // { project: dirPath }
const rootDir = './src/projects/'
const curProject = process.env.project
if (!curProject) {
  throw new Error('Invalid project name')
}
readdirSync(rootDir).forEach((project) => {
  projectDirInfo[project] = resolve(__dirname, rootDir, project)
})

function getRoot(project) {
  return `${rootDir}${project}`
}

function getInput(project) {
  if (!projectDirInfo[project]) {
    throw new Error(`Project not found <${project}>`)
  }
  return { project: join(projectDirInfo[project], 'index.html') }
}

function getDefine(mode) {
  const mappings = loadEnv(mode, process.cwd())
  return Object.keys(mappings).reduce((obj, cur) => {
    obj[cur] = JSON.stringify(mappings[cur])
    return obj
  }, {})
}

function getPublicDir(project) {
  if (!projectDirInfo[project]) {
    throw new Error(`Project not found <${project}>`)
  }
  return join(projectDirInfo[project], 'public')
}

// https://cn.vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('project => ', curProject)
  console.log('mode => ', mode)
  console.log('root => ', getRoot(curProject))
  console.log('input => ', getInput(curProject))
  console.log('define => ', getDefine(mode))
  console.log('publicDir => ', getPublicDir(curProject))
  return {
    plugins: [vue()],
    root: getRoot(curProject),
    define: getDefine(mode),
    publicDir: getPublicDir(curProject),
    envDir: __dirname,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@libs': fileURLToPath(new URL('./src/libs', import.meta.url)),
        '@proja': fileURLToPath(new URL('./src/projects/project-a', import.meta.url)),
        '@projb': fileURLToPath(new URL('./src/projects/project-b', import.meta.url))
      }
    },
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: getInput(curProject)
      }
    }
  }
})
