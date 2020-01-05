const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: 'bank',
  },
  {
    title: '商品',
    key: '/products',
    icon: 'appstore',
    children: [
      {
        title: '品类管理',
        key: '/category',
        icon: 'bars',
      },
      {
        title: '商品管理',
        key: '/products0',
        icon: 'tool',
        children: [
          {
            title: '商品管理01',
            key: '/product01',
            icon: 'bars',
          },
          {
            title: '商品管理02',
            key: '/product02',
            icon: 'bars',
          },
        ]
      }
    ]
  }
]
export default menuList