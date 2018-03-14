<template>
	<div class="header">
		<div class="header-left" @tap="back"><img src="@/common/image/enter.png"/></div>
		<div class="header-center">{{title}}</span></div>
		<div class="header-right"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		methods: {
			back() {
				this.$emit('back')
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.header
		display: flex
		align-items: center
		height: 45px
		font-size: 14px
		box-sizing: border-box
		border-bottom: 1px solid #ddd
		.header-left
			flex-shrink: 0
			display: flex
			align-items: center
			justify-content: center
			width: 44px
			height: 100%
			cursor: pointer
			padding: 12px
			img
				width: 100%
				height: 100%
				transform: rotate(180deg)
		.header-center
			flex-grow: 1
			text-align: center
			letter-spacing: 1px
		.header-right
			display: flex
			align-items: center
			justify-content: center
			width: 44px
			height: 100%
</style>