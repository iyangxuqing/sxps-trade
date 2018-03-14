import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import TradeEdit from '@/components/trade/trade-edit'
import Buyers from '@/components/buyers/buyers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/trade-edit',
    	name: 'TradeEdit',
    	component: TradeEdit
    },
    {
    	path: '/buyers',
    	name: 'Buyers',
    	component: Buyers
    }
  ]
})
