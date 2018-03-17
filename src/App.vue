<template>
  <div id="app" :class="{'pc': isPc}">
  	<Header :back="false"/>
  	<div class="content">
  		<keep-alive>
		    <router-view/>
  		</keep-alive>
  	</div>
    <TabBar/>
 		<Purchase></Purchase>
 		<Alert></Alert>
		<ActionSheet></ActionSheet>
  </div>
</template>

<script type="text/ecmascript-6">
	import { isPc } from '@/common/js/dom'
	import Header from '@/components/header/header'
	import TabBar from '@/components/tabbar/tabbar'
	import Purchase from '@/components/purchase/purchase'
	import Alert from '@/components/alert/alert'
	import ActionSheet from '@/components/actionsheet/actionsheet'
	
	export default {
	  name: 'App',
	  data() {
	  	return {
		  	isPc: false
	  	}
	  },
	  created() {
	  	this.isPc = isPc()
	  },
	  components: {
	  	Header,
	  	TabBar,
	  	Purchase,
	  	Alert,
	  	ActionSheet
	  }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	#app
		position: absolute
		width: 100%
		height: 100%
		padding: 45px 0
		overflow: hidden
		&.pc
			top: 50%
			left: 50%
			width: 375px
			height: 667px
			margin-top: -333px
			margin-left: -187px
			border: 1px solid #ccc
			box-shadow: 0px 0px 10px 2px #ccc		
		.content
			height: 100%
			overflow: hidden
</style>
