<template>
	<div class="page goods">
		<div class="cates-container">
			<CatesBuyer></CatesBuyer>
		</div>
		<div class="items-container">
			<ItemsBuyer></ItemsBuyer>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import CatesBuyer from '@/components/cates/cates-buyer'
	import ItemsBuyer from '@/components/items/items-buyer'

	export default {
		activated() {
			this.$bus.$emit('setHeaderTitle', '商品')
		},
		components: {
			CatesBuyer,
			ItemsBuyer
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.goods
		height: 100%
		.cates-container
			height: 90px
		.items-container
			height: calc(100% - 90px)
</style>