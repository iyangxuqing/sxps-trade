<template>
	<div class="page trade-edit-wrapper">
		<div class="trades-wrapper">
			<div class="trades">
				<div class="trade" v-for="trade in trades">
					<div class="trade-info">
						<div class="trade-labels">
							<div class="trade-label tid">订单编号：{{trade.id}}</div>
							<div class="trade-label time">提交时间：{{trade.time}}</div>
							<div class="trade-label">
								<span class="trade-label-name">收货姓名：{{trade.receive_name}}</span>
								<span class="trade-label-phone">{{trade.receive_phone || trade.mobileNumber}}</span>
							</div>
							<div class="trade-label">收货地址：{{trade.receive_district}}{{trade.receive_address}}</div>
						</div>
						<div class="trade-labels">
							<div class="trade-label">{{trade.status}}</div>
						</div>
					</div>
					
					<div class="trade-orders">
						<div class="order" v-for="order in trade.orders" @tap="orderTap(order)">
							<div class="order-image"><img :src="order.image"/></div>
							<div class="order-text">
								<div class="order-text-title">{{order.title}}<span v-if="order.specs">-{{order.specs}}</span></div>
								<div class="order-text-descs" v-if="order.descs">{{order.descs}}</div>
								<div class="order-text-message" v-if="order.message">买家留言：{{order.message}}</div>
							</div>
							<div class="order-number">
								<div class="order-number-price"><span class="yuan">￥</span>{{order.price}}</div>
								<div class="order-number-num" v-if="order.realNum==''">{{order.num}}</div>
								<div class="order-number-num" v-if="order.realNum!=''">
									<span>{{order.realNum}}</span>
									<span style="color: #888">{{'(' + order.num + ')'}}</span>
								</div>
							</div>
						</div>
						<div class="order order-add" @tap="orderAddNewTap(trade.id)">
							<div class="order-add-left"><img src="@/common/image/plus.png"/></div>
							<div class="order-add-middle">添加新订单</div>
							<div class="order-add-right" @tap.stop="orderSelectTap(trade.id)"><img src="@/common/image/enter.png"/></div>
						</div>
					</div>

					<div class="trade-counts">
						<div class="trade-count" v-if="trade.status=='买家提交'">
							<div class="trade-count-col">合计 数量：{{trade.num}}</div>
							<div class="trade-count-col">金额：￥{{trade.amount}}</div>
						</div>
						<div class="trade-count" v-if="trade.status!='买家提交'">
							<div class="trade-count-col">合计 数量：{{trade.realNum}}</div>
							<div class="trade-count-col">金额：￥{{trade.realAmount}}</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import { getTrades } from '@/api/trade'
	import BScroll from '@/base/better-scroll/src'

	export default {
		name: 'TradeEdit',
		data() {
			return {
				trades: []
			}
		},
		created() {
			this.$bus.$on('purchase-confirm', (order) => {
				console.log(order)
			})
			getTrades().then((trades) => {
				this.trades = trades
			})			
		},
		mounted() {
			this.scroll = new BScroll('.trades-wrapper', {
				tap: true
			})
		},
		activated() {
			this.$bus.$emit('setHeader', {
				title: '订单',
				back: false
			})
			if (this.scroll) {
				this.scroll.refresh()
			}
		},
		methods: {
			orderTap(order) {
				this.tid = order.tid
				this.$bus.$emit('purchase-show', {
					iid: order.iid,
					sid: order.sid,
					num: order.num,
					message: order.message
				})
			},
			orderAddNewTap(tid) {
				this.tid = tid
				console.log(tid)
				console.log('order add new tap')
			},
			orderSelectTap(tid) {
				this.tid = tid
				this.$router.push({
					name: 'TradeEdit-GoodsBuyer',
					params: {
						tid: tid,
						pageBack: true,
						pageTitle: '商品选购'
					}
				})
			}
		},
		components: {
			// BScroll
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.yuan
		font-size: 12px
		transform: scale(0.8)
	
	.trade-edit-wrapper
		position: relative
		height: 100%
		overflow: hidden
	.trades-wrapper
		height: 100%
		overflow: hidden
	.trades
		padding: 15px
	.trade
		font-size: 13px
		color: #333
		& + &
			margin-top: 15px
		.trade-info
			display: flex
			align-items: center
			justify-content: space-between
			height: 86px
			padding-left: 10px
			padding-right: 10px
			background-color: #f0f0f0
			.trade-label + .trade-label
				margin-top: 5px
		.order
			display: flex
			align-items: center
			height: 80px
			& + .order
				border-top: 1px solid #ddd
			.order-image
				flex-shrink: 0
				width: 70px
				height: 70px
			.order-text
				flex-grow: 1
				display: flex
				flex-direction: column
				justify-content: center
				width: 200px
				padding-left: 5px
				.order-text-title
					font-size: 14px
				.order-text-descs
					font-size: 12px
					color: #888
					margin-top: 4px
				.order-text-message
					font-size: 12px
					color: #888
					overflow: hidden
					margin-top: 4px
			.order-number
				flex-shrink: 0
				display: flex
				flex-direction: column
				align-items: flex-end
				width: 70px
				padding-right: 5px
				.order-number-price
					margin-bottom: 4px
			&.order-add
				.order-add-left
					flex-shrink: 0
					width: 70px
					height: 70px
					padding: 16px
					opacity: 0.5
					border: 1px solid #ccc
				.order-add-middle
					flex-grow: 1
					padding-left: 5px
					color: #888
				.order-add-right
					width: 70px
					height: 70px
					padding: 25px
					margin-right: -10px
					opacity: 0.7
		
		.trade-counts
			display: flex
			align-items: center
			justify-content: flex-end
			height: 45px
			font-size: 12px
			padding-left: 10px
			padding-right: 10px
			background-color: #f0f0f0
			.trade-count
				display: flex
				align-items: center
				.trade-count-col
					width: 100px
					text-align: right
</style>