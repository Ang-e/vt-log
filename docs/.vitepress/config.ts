import { defineConfig } from 'vitepress'

export default defineConfig({
  // 默认值：'en-US'，在页面 HTML 中呈现为 <HTML lang = "en-US"> 标记
  lang: 'zh-CN',
  title: "i许西的笔记",
  description: "i许西的笔记",
  // 部署地址子路径，默认值：'/'
  base: '/vt-log/',
  // 清理 html 后缀，默认值：false
  cleanUrls: true,
  // 标题格式模板，例如：':title - Custom Suffix'
  titleTemplate: false,
  // 要在页面 HTML 中的 < head > 标记中呈现的其他元素
  // head: [
  //   [
  //     'link',
  //     { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
  //   ]
  //   // would render: <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  // ],
  // 定义自定义目录 <-> URL 映射
  // rewrites: {
  //   'source/:page': 'destination/:page'
  // },
  // 储存 markdown 文件的目录，默认值：'.'
  // srcDir: './src'
  // 用于匹配应作为源内容排除的降价文件的 glob 模式
  // srcExclude: ['**/README.md', '**/TODO.md'],
  // 打包文件输出位置，默认值：'./.vitepress/dist'
  // outDir: '../public',
  // 缓存文件输出位置，默认值：'./.vitepress/cache'
  // cacheDir: './.vitepress/.vite',
  // 是否使用 Git 获取每个页面的最后更新时间戳
  lastUpdated: false,
  themeConfig: {
    logo: '/logo.png',
    // You can customize this item to replace the default site title (title in app config) in nav.
    siteTitle: 'i许西的笔记',
    // 自定义右侧栏的标题
    outlineTitle: '大纲',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    nav: nav(),
    sidebar: {
      '/JavaScript/': sidebarJs(),
      '/TypeScript/': sidebarTs(),
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright (c) 2023 Ang-e'
    }
  },
  rewrites: {
    'JavaScript/变量.md': 'JavaScript/index.md',
    'TypeScript/开始.md': 'TypeScript/index.md',
  },
})

function nav() {
  return [
    {
      text: 'Web',
      items: [
        { text: 'JavaScript', link: '/JavaScript/', activeMatch: '/JavaScript/'},
        { text: 'TypeScript', link: '/TypeScript/', activeMatch: '/TypeScript/'}
      ]
    },
  ];
}

function sidebarJs() {
  return [
    {
      text: '语言基础',
      collapsed: false,
      items: [
        { text: '变量', link: '/JavaScript/变量' },
        { text: '数据类型', link: '/JavaScript/数据类型' },
      ]
    },
  ];
}

function sidebarTs() {
  return [
    { text: '开始', link: '/TypeScript/开始' },
    { text: '基本类型', link: '/TypeScript/基本类型' },
    { text: '接口', link: '/TypeScript/接口' },
    { text: '类', link: '/TypeScript/类' },
    { text: '函数', link: '/TypeScript/函数' },
    { text: '泛型', link: '/TypeScript/泛型' },
    { text: '枚举', link: '/TypeScript/枚举' },
    { text: '高级类型', link: '/TypeScript/高级类型' },
    { text: '错误处理', link: '/TypeScript/错误处理' },
    { text: '常见用法', link: '/TypeScript/常见用法' },
    { text: 'React+', link: '/TypeScript/React+' },
  ];
}