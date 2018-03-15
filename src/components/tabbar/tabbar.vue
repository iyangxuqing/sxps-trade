<template>
	<div class="tabbar">
		<div class="tab" :class="{'active': tab.active}" v-for="tab in tabs" @click="tabTap(tab)">{{tab.text}}</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import Vue from 'vue'

	export default {
		data() {
			return {
				tabs: [{
					id: 1,
					text: '商品',
					active: true
				}, {
					id: 2,
					text: '订单',
				}, {
					id: 3,
					text: '采购'
				}, {
					id: 4,
					text: '发货'
				}, {
					id: 5,
					text: '账单'
				}]
			}
		},
		methods: {
			tabTap(tab) {
				for (let i in this.tabs) {
					Vue.set(this.tabs[i], 'active', false)
					if (this.tabs[i].id == tab.id) {
						Vue.set(this.tabs[i], 'active', true)
					}
				}
				this.$emit('tabbar', tab)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.tabbar
		position: absolute
		display: flex
		align-items: center
		width: 100%
		height: 45px
		padding: 0 15px
		border-top: 1px solid #ddd
		.tab
			flex-basis: 0
			flex-grow: 1
			display: flex
			align-items: center
			justify-content: center
			height: 100%
			cursor: pointer
			&.active
				color: #f63
</style>