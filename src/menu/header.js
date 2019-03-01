// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '首页管理',
    icon: 'folder-o',
    children: [
      { path: '/home/banner', title: '轮播图管理' },
      { path: '/home/classic', title: '分类管理' }
    ]
  }
]
