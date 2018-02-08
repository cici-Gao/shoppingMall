import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import index from '@/components/index'
import assortment from '@/components/assortment'
import shoppingCart from '@/components/shoppingCart'
import personal from '@/components/personal'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/assortment',
      name: 'assortment',
      component: assortment
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    }
  ]
})
