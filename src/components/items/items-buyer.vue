<template>
	<div class="items">
		<div class="items-wrapper">
			<div class="item" v-for="item in categoryItems" @tap="itemTap(item)">
				<div class="item-image"><img :src="item.specs[0].image"/></div>
				<div class="item-title">{{item.specs[0].title}}</div>
			</div>
		</div>
	</div>
 </template>

<script type="text/ecmascript-6">

	import BScroll from '@/base/better-scroll/src'
	import { getItems } from '@/api/items'

	export default {
	 	data() {
	 		return {
	 			cid: '',
	 			items: [],
	 			categoryItems: []
	 		}
 		},
		created() {
			getItems({onShelf: 1}).then((items) => {
				this.items = items
				this._initScroll()
			})
			this.$bus.$on('activeCateId', (cid) => {
				this.cid = cid
			})
		},
		activated() {
			// this._initScroll()
		},
		watch: {
			'cid': function() {
				let _items = []
				for (let i in this.items) {
					if (this.items[i].cid == this.cid) {
						_items.push(this.items[i])
					}
				}
				this.categoryItems = _items
				this.scroll && this.scroll.scrollTo(0, 0)
			},
			'items': function() {
				let _items = []
				for (let i in this.items) {
					if (this.items[i].cid == this.cid) {
						_items.push(this.items[i])
					}
				}
				this.categoryItems = _items
			}			
		},
		methods: {
			itemTap(item) {
				console.log('itemTap', item)
				this.$bus.$emit('purchase-show', item)
			},
			_initScroll() {
				setTimeout(() => {
					if(!this.scroll) {
						this.scroll = new BScroll('.items', {
							tap: true,
						})
					}
				}, 20)
			},
		},
		components: {
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.items
		position: relative
		height: 100%
		overflow: hidden
		.items-wrapper
			display: flex
			flex-wrap: wrap
			padding: 15px
			.item
				$width = calc((100vw - 60px)/3)
				width: $width
				margin-bottom: 5px
				cursor: pointer
				position: relative
				&:nth-of-type(3n+2)
					margin-left: 15px
					margin-right: 15px
				.item-image
					width: 100%
					height: $width
					img
						width: 100%
						height: 100%
				.item-title
					height: 36px
					line-height: 30px
					text-align: center
					font-size: 13px
				&.offshelf::after
					content: ''
					position: absolute
					left: 10%
					bottom: 20px
					width: 80%
					height: 1px
					background: red			
			.item-new
				.item-image
					padding: 30px
					opacity: 0.3
					border: 1px solid #333
	.pc 
		.items
			.item
				width: calc((100% - 30px)/3)
				.item-image
					height: 104px					
</style>