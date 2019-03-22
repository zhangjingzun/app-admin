import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/shop',
  name: 'shop',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: '/shop/add',
      name: `${pre}add`,
      component: () => import('@/pages/shop/add'),
      meta: { ...meta, title: '新增商品' }
    }
  ])('demo-')
}
