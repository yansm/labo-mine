<template>
	<div class="layout" style="background: #f4f4f4">
		<div class="container">
			<div class="monkey-articles-area">
				<div>
					<article-item v-for="item in articles" :key="item.id" :data="item"/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import ArticleItem from '../components/article-item'
export default {
	computed: {
		...mapState('article', [
			'articles'
		])
	},
	components: {
		ArticleItem
	},
	mounted() {
		this.$store.dispatch('article/getArticles')
	}
}
</script>
<style lang="stylus">
.monkey-articles-area
	width 230px * 5 - 20
	margin 20px auto
	>div
		margin-right -20px
		&:after
			content ""
			display table
			clear both
</style>


