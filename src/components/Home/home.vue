<template>
	<div class="home"></div>
</template>

<script type="text/ecmascript-6">
	import { getBuyersByTrades } from '@/api/buyer'

	export default {
		created() {
			getBuyersByTrades().then((buyers) => {
				console.log(buyers)
			})
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>