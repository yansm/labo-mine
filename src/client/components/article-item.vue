<template>
	<div class="monkey-articles-item pointer" ref="item" :class="{active}" @click="handleClick">
		<div class="img" :style="{height: height + 'px'}">
			<img :src="data.coverImg">
		</div>
		<div class="content">
			<div class="title">{{data.title}}</div>
		</div>
		<div class="footer">
			<div class="time">{{date}}</div>
		</div>
	</div>
</template>
<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
	data() {
		return {
			active: false,
			height: 158,
		}
	},
  props: {
		data: {
			default: {}
		}
	},
	computed: {
		date() {
			return moment(this.data.time).fromNow()
		}
	},
	mounted() {
		this.height = this.$refs.item.offsetWidth * 158 / 210
		setTimeout(() => {
			this.active = true
		}, Math.floor(Math.random()*1000) + 300)
	},
	methods: {
		handleClick() {
			this.$router.push('/article/' + this.data.id)
		}
	}
}
</script>
<style lang="stylus" scoped>
.monkey-articles-item
	float left
	width 210px
	margin-right 20px
	margin-bottom 20px
	background #fff
	border-radius 5px
	transition all .3s, transform .4s .05s, opacity .5s
	opacity 0
	transform scale(1.6)
	&.active
		opacity 1
		transform scale(1)
	&:hover
		box-shadow 0 0 30px -5px rgba(0,0,0,.3)
		.img img
			transform scale(1.1)
	.content
		padding 11px 16px 13px
		.title
			margin-bottom 1px
			position relative
			height 20px
			line-height 20px
			white-space nowrap
			text-overflow ellipsis
			overflow hidden
	.bar,.footer
		display flex
		color #bbb
		font-size 12px
		justify-content space-between
	.bar
		margin-top 30px
		>div
			&:before
				content ''
				display inline-block
				width 16px
				height 16px
				background center center no-repeat
				background-size 16px auto
				vertical-align top
				margin-right 5px
		.bar-item-1:before
			background-image url(../static/images/home/card-liulan.svg)
		.bar-item-2:before
			background-image url(../static/images/home/card-pinglun.svg)
		.bar-item-3:before
			background-image url(../static/images/home/card-zan.svg)
		
	.footer
			line-height 50px
			padding 0 16px
			border-top 1px solid #eee
			.time
				text-align right
				width 100%
			.avator
				width 24px
				height 24px
				border-radius 50%
				overflow hidden
				margin-right 6px
				display inline-block
				vertical-align middle
				img 
					width 100%
					height 100%
					vertical-align top
	.img
		height 158px
		overflow hidden
		img 
			transition .3s
			height 100%
			width 100%
@media screen and (max-width: 756px)
	.monkey-articles-item
		width 'calc(50% - 5px)' % 100%
		margin 0 10px 10px 0
		display inline-block
		float initial
		&:nth-child(2n)
			margin-right 0
</style>


