import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/home',
  name: 'home',
  meta,
  redirect: { name: 'banner' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'banner', name: `${pre}banner`, component: () => import('@/pages/home/banner'), meta: { ...meta, title: '轮播图管理' } },
    { path: 'classic', name: `${pre}classic`, component: () => import('@/pages/home/classic'), meta: { ...meta, title: '分类管理' } }
  ])('demo-')
}
