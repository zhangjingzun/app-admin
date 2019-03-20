import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/home',
  name: 'home',
  meta,
  redirect: { name: 'banner' },
  component: layoutHeaderAside,
  children: (pre => [
    // {
    //   path: 'banner',
    //   name: `${pre}banner`,
    //   component: () => import('@/pages/home/banner'),
    //   meta: { ...meta, title: '轮播图管理' }
    // }
  ])('demo-')
}
