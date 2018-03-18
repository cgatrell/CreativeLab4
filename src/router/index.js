import Vue from 'vue'
import Router from 'vue-router'
import ShoppingList from '@/components/ShoppingList'
import Lasagna from '@/components/Lasagna'
import Stroganoff from '@/components/Stroganoff'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingList',
      component: ShoppingList
    },
    {
      path: '/lasagna',
      name: 'Lasagna',
      component: Lasagna
    },
    {
      path: '/stroganoff',
      name: 'Stroganoff',
      component: Stroganoff
    },  

  ]
})
