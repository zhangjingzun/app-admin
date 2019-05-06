import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/about',
  name: 'about',
  meta,
  component: layoutHeaderAside,
  children: (pre => [
  ])('demo-')
}
