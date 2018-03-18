import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import GoodsBuyer from '@/components/goods-buyer/goods-buyer'
import TradeEdit from '@/components/trade/trade-edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods-buyer'
    },
    {
      path: '/goods-buyer',
      name: 'GoodsBuyer',
      component: GoodsBuyer
    },
    {
    	path: '/trade-edit',
    	name: 'TradeEdit',
    	component: TradeEdit,
    },
    {
      path: '/trade-edit/goods-buyer',
      name: 'TradeEdit-GoodsBuyer',
      component: GoodsBuyer
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
