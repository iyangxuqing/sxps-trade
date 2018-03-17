<template>
	<div class="purchase" :class="{'show': show}" @click="cancel">
		<div class="purchase-content" :class="{'show': show}" @click="contentTap">
			<div v-if="item">
				<div class="purchase-info">
					<div class="purchase-image" :class="{'show': show, 'large': imageLarge}" @click="imageTap">
						<img :src="item.specs[specsIndex].image"/>
					</div>
					<div class="purchase-text">
						<div class="purchase-title" v-if="specsIndex > 0">{{item.specs[0].title}} - {{item.specs[specsIndex].title}}</div>
						<div class="purchase-title" v-if="specsIndex == 0">{{item.specs[specsIndex].title}}</div>
						<div class="purchase-descs" v-if="item.specs[specsIndex].descs">{{item.specs[specsIndex].descs}}</div>
						<div class="purchase-price"><span class="yuan">￥</span>{{item.specs[specsIndex].price}}</div>
					</div>
				</div>

				<div class="purchase-specses" v-if="item.specs.length > 1">
					<div class="purchase-specs" :class="{'active': specs.active}" v-for="(specs, index) in item.specs" v-if="index > 0" @click="specsTap">{{specs.title}}<span v-if="specs.num">{{specs.num}}</span></div>
				</div>

				<div class="purchase-row purchase-number">
					<div class="purchase-number-label">购买数量</div>
					<div class="purchase-number-icon" @click="numberMinus">
						<div class="purchase-number-icon-inner">
							<img src="@/common/image/minus.png" />
						</div>
					</div>
					<div class="purchase-number-input">
						<input :value="item.specs[specsIndex].num==0 ? '' : item.specs[specsIndex].num" placeholder="0" maxlength="4" @blur="numberInput" />
					</div>
					<div class="purchase-number-icon" @click="numberPlus">
						<div class="purchase-number-icon-inner">
							<img src="@/common/image/plus.png" />
						</div>
					</div>
				</div>

				<div class="purchase-row purchase-message">
					<input :value="item.specs[specsIndex].message" placeholder="买家留言" maxlength="27" @blur="messageInput" />
				</div>

				<div class="purchase-row purchase-buttons">
					<div class="purchase-button cancel" @click="cancel">取 消</div>
					<div class="purchase-button confirm" @click="confirm">确 定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				item: null,
				show: false,
				imageLarge: false,
				specsIndex: 0
			}
		},
		created() {
			this.$bus.$on('purchase-show', (item) => {
				this.item = item
				this.show = true
				console.log('purchase', item)
			})
		},
		methods: {
			contentTap(e) {
				e.preventDefault()
				e.stopPropagation()
			},
			cancel() {
				this.show = false
			},
			confirm() {
				this.cancel()
			},
			imageTap() {
				console.log('imageTap')
				this.imageLarge = !this.imageLarge
			},
			specsTap() {

			},
			numberPlus() {

			},
			numberMinus() {

			},
			numberInput() {

			},
			messageInput() {

			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.purchase
		position: absolute
		left: 0
		right: 0
		bottom: 0
		height: 0
		z-index: 9999
		background: rgba(0, 0, 0, 0.4)
		&.show
			height: 100%
		.purchase-content
			position: absolute
			left: 0
			right: 0
			bottom: 0
			height: 0
			background-color: #fff
			transition: all 300ms ease
			transform: translate3d(0, 0, 0)
			&.show
				height: 351px
				
			.purchase-info
				height: 110px
				border-bottom: 1px solid #ddd
				.purchase-image
					position: absolute
					top: 0
					left: 15px
					z-index: 999
					width: 150px
					height: 150px
					overflow: hidden
					border-radius: 8px
					background-color: #fff
					transition: all 300ms ease
					transform: translate3d(0, 0, 0)
					&.show
						margin-top: -50px
						&.large
							top: -25px
							left: 0
							width: 375px
							height: 375px
					img
						width: 100%
						height: 100%
					
				.purchase-text
					position: absolute
					top: 10px
					left: 175px
					right: 15px
					display: flex
					flex-direction: column
					justify-content: center
					height: 90px

					.purchase-title
						font-size: 15px
						color: #333
						word-break: keep-all
						white-space: nowrap
						overflow: hidden
						margin-bottom: 5px

					.purchase-descs
						font-size: 13px
						max-height: 30px
						overflow: hidden
						color: #888
						margin-bottom: 5px
						
					.purchase-price
						font-size: 24px
						color: #f63
						.yuan
							font-size: 18px

			.purchase-specses
				display: flex
				flex-wrap: wrap
				align-content: flex-start
				font-size: 12px
				height: 90px
				padding: 10px 15px 0
				border-bottom: 1px solid #ddd

				.purchase-specs
					position: relative
					height: 30px
					line-height: 30px
					font-size: 12px
					padding: 0 8px
					border-radius: 5px
					border: 1px solid #ddd
					margin-right: 10px
					margin-bottom: 10px
					&:last-child
						margin-right: 0
					&.active
						color: #f63
						border: 1px solid #f63
					span
						position: absolute
						top: -8px
						right: 0
						font-size: 12px
						color: #f63
						line-height: 1
						padding: 0 3px
						border-radius: 50%
						border: 1px solid #f63
						background-color: #fff
					
			.purchase-row
				display: flex
				align-items: center
				height: 50px
				padding: 0 15px

			.purchase-number
				/* plus icon 外围有20rpx空白 */
				padding-right: 10rpx
				border-bottom: 1px solid #ddd

				.purchase-number-label
					flex-grow: 1
					font-size: 12px
					color: #888

				.purchase-number-icon
					flex-shrink: 0
					width: 50px
					height: 50px
					padding: 10px

					.purchase-number-icon-inner
						width: 100%;
						height: 100%;
						padding: 8px
						border-radius: 8px
						border: 1px solid #ccc

				.purchase-number-input
					display: flex
					align-items: center
					width: 40px
					input
						text-align: center

			.purchase-message
				font-size: 12px
				border-bottom: 1px solid #ddd

			.purchase-buttons
				justify-content: space-between
				font-size: 15px

				.purchase-button
					display: flex
					align-items: center
					justify-content: center
					width: 120px
					height: 32px
					border-radius: 5px
					border: 1px solid #ddd

					&.confirm
						color: #fff
						background-color: #f93
						border: 1px solid transparent
</style>