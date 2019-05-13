import shop from './modules/shop'

import layoutHeaderAside from '@/layout/header-aside'

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页 必须 name:index
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true,
          title: '首页'
        },
        component: () => import('@/pages/index')
      },
      // 商品分类管理
      {
        path: 'classic',
        name: 'classic',
        meta: {
          auth: true,
          title: '分类管理'
        },
        component: () => import('@/pages/classic')
      },
      // 轮播图管理
      {
        path: 'banner',
        name: 'banner',
        meta: {
          auth: true,
          title: '轮播图管理'
        },
        component: () => import('@/pages/banner')
      },
      // 轮播图管理
      {
        path: 'join',
        name: 'join',
        meta: {
          auth: true,
          title: '宣传管理'
        },
        component: () => import('@/pages/join')
      },
      // 商品管理页面
      {
        path: 'shop',
        name: 'shop',
        meta: {
          auth: true,
          title: '商品管理'
        },
        component: () => import('@/pages/shop')
      },
      // 关于我们
      {
        path: 'about',
        name: 'about',
        meta: {
          auth: true,
          title: '关于我们'
        },
        component: () => import('@/pages/about')
      },
      // {
      //   path: 'user',
      //   name: 'about',
      //   meta: {
      //     auth: true,
      //     title: '账号管理'
      //   },
      //   component: () => import('@/page/user')
      // },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      }
    ]
  },
  shop
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
