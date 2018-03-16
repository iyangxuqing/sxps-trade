import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import GoodsBuyer from '@/components/goods-buyer/goods-buyer'
import TradeEdit from '@/components/trade/trade-edit'
import Buyers from '@/components/buyers/buyers'

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
    	component: TradeEdit
    },
    {
    	path: '/trade-edit/buyers',
    	name: 'Buyers',
    	component: Buyers
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
