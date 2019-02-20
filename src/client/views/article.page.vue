<template>
	<div class="layout" style="background: #f4f4f4">
		<div class="container">
			<div class="monkey-detail-area">
				<div class="title">{{detail.title}}
					<aside>{{date}}发布</aside>
				</div>
				<div class="content" v-html="detail.content"></div>
			</div>
		</div>
	</div>
</template>
<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
	data() {
		return {
			detail: {}
		}
	},
	computed: {
		date() {
			return moment(this.detail.time).fromNow()
		}
	},
	mounted() {
		this.$store.dispatch('article/getArticle', this.$route.params.id).then(({data}) => {
			this.detail = data.data
		})
	}
}
</script>
<style lang="stylus">
.monkey-detail-area
	width 1024px
	background #fff
	margin 20px auto
	.title
		font-size 24px
		font-font-weight 300
		padding 30px 30px 16px
		aside
			font-size 12px
			color #bbb
	.content
		color #666666
		padding 10px 0 30px
		>*
			padding 0 25px
		h1,h2,h3,h4,h5,h6
			margin-bottom .5rem
		p
			line-height 1.6
			margin-bottom 10px
		img
			margin-bottom 10px
			max-width 100%
</style>


