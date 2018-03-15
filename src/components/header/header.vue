<template>
	<div class="header">
		<div class="header-left">
			<div class="icon" v-if="back" @click="backTap"><img src="@/common/image/enter.png"/></div>
		</div>
		<div class="header-center">{{Title}}</span></div>
		<div class="header-right"></div>
	</div>
</template>

<script type="text/ecmascript-6">

	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			back: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				Title: this.title
			}
		},
		created() {
			this.$bus.$on('setHeaderTitle', (title) => {
				this.Title = title
			})
		},
		methods: {
			backTap() {
				this.$emit('back')
				this.$bus.$emit('back')
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.header
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 45px
		display: flex
		align-items: center
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
			.icon
				width: 100%
				height: 100%
				transform: rotate(180deg)
				img
					width: 100%
					height: 100%
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