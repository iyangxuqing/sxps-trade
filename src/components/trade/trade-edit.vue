<template>
	<div class="page trade-edit-wrapper">
		<Header title="订单编辑"></Header>
		<div class="buyer">
			<div class="buyer-row">
				<div class="buyer-name">{{buyer.receive_name}}</div>
				<div class="buyer-phone">{{buyer.receive_phone || buyer.mobileNumber}}</div>
			</div>
			<div class="buyer-row">
				<div class="buyer-address">{{buyer.receive_district}}{{buyer.receive_address}}</div>
			</div>
			<div class="buyer-more">
				<img src="@/common/image/enter.png">
			</div>
		</div>
		<div class="trades-wrapper">
			<div class="trades">
				<div class="trade" v-for="trade in trades">
					
					<div class="trade-info">
						<div class="trade-labels">
							<div class="trade-label tid">订单号：{{trade.id}}</div>
							<div class="trade-label time gray">{{trade.time}}</div>
						</div>
						<div class="trade-labels">
							<div class="trade-label">{{trade.status}}</div>
						</div>
					</div>
					
					<div class="trade-orders">
						<div class="order" v-for="order in trade.orders">
							<div class="order-image"><img :src="order.image"/></div>
							<div class="order-text">
								<div class="order-text-title">{{order.title}}<span v-if="order.specs">-{{order.specs}}</span></div>
								<div class="order-text-descs gray" v-if="order.descs">{{order.descs}}</div>
								<div class="order-text-message gray" v-if="order.message">买家留言：{{order.message}}</div>
							</div>
							<div class="order-number">
								<div class="order-number-price"><span class="yuan">￥</span>{{order.price}}</div>
								<div class="order-number-num" v-if="order.realNum==''">{{order.num}}</div>
								<div class="order-number-num" v-if="order.realNum!=''">
									<span>{{order.realNum}}</span>
									<span class="gray">{{'(' + order.num + ')'}}</span>
								</div>
							</div>
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

	import { getBuyersByTrades } from '@/api/buyer'
	import { getTrades } from '@/api/trade'
	import Header from '@/components/header/header'

	export default {
		name: 'TradeEdit',
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				buyer: {},
				trades: []
			}
		},
		created() {
			getBuyersByTrades().then((buyers) => {
				this.buyers = buyers
				this.buyer = buyers[0]
				getTrades({
					bid: this.buyer.bid
				}).then((trades) => {
					this.trades = trades
					console.log(trades)
				})			})
		},
		methods: {
			back() {
				this.$emit('back')
			}
		},
		components: {
			Header
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

	.gray
		color: #888
	.yuan
		font-size: 12px
		transform: scale(0.8)
		
	.buyer
		position: relative
		display: flex
		flex-direction: column
		justify-content: center
		height: 60px
		padding-left: 20px
		padding-right: 20px
		border-bottom: 1px solid #ddd
		.buyer-row
			display: flex
			.buyer-name
				width: 60px
			.buyer-address
				color: #888
		.buyer-row + .buyer-row
			margin-top: 6px
		.buyer-more
			position: absolute
			top: 50%
			right: 0
			transform: translateY(-50%)
			width: 50px
			height: 50px
			padding: 15px
			img
				width: 100%
				height: 100%
				opacity: 0.5

	.trades
		padding: 15px
	.trade
		font-size: 14px
		color: #333
		.trade-info
			display: flex
			align-items: center
			justify-content: space-between
			height: 55px
			padding-left: 10px
			padding-right: 10px
			background-color: #f0f0f0
			.trade-label.tid
				font-size: 14px
			.trade-label + .trade-label
				margin-top: 8px
		.order
			display: flex
			align-items: center
			height: 80px
			.order-image
				flex-shrink: 0
				width: 70px
				height: 70px
				img
					width: 100%
					height: 100%
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
		.order + .order
			border-top: 1px solid #ddd
		
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
	.trade + .trade
		margin-top: 15px
</style>