<template>
  <div class="app full-height">
    <div class="monkey-header">
      <div class="container">
        <div class="logo pointer" @click="$router.push('/')">monkey</div>
        <div class="menu-area">
        </div>
      </div>
    </div>
    <div class="monkey-content">
      <transition name="page-trans">
        <router-view></router-view>
      </transition>
    </div>
    <transition name="page-fade">
      <div class="monkey-loading" v-if="loading">
        <div class="spinner"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('toggleLoading', false) // 关闭loading
    }, 500)
  }

}
</script>

<style lang="stylus">
html
  height 100%
body
  height 100%
body,html,ul,li,ol,img,input,p,h1,h2,h3,h4,h5,h6
  margin 0
  padding 0
*
  box-sizing border-box
.app
  display flex
  width 100%
  height 100%
  flex-direction column
.container
  width 1280px
  margin-left auto
  margin-right auto
.pointer
  cursor pointer
.layout
  width 100%
  height 100%
  overflow scroll
  -webkit-overflow-scrolling touch
  position absolute
  top 0
  left 0
.monkey-header
  background #262626
  height 56px
  line-height 56px
  .logo
    font-weight 700
    font-size 22px
    color #ffffff
    float left
    &:before
      width 36px
      height 36px
      background url(./static/images/home/me.png) center center no-repeat
      background-size contain
      content ''
      display inline-block
      vertical-align middle
      margin-right 10px      
      transform translateY(-4px)
  .menu-area
    float right 
    white-space nowrap
  .menu-item
    width 56px
    height 56px
    display inline-block
    background center center no-repeat
    background-size 20px 20px
    transition .3s
    &:hover
      background-color #282828
    &.menu-search
      background-image url(./static/images/home/nav-search.svg)
      &:hover
        background-image url(./static/images/home/nav-search-hover.svg)
        
.monkey-content
  flex 1
  position relative

.monkey-loading
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  z-index 100000
  background-color #262626
</style>
<style lang="stylus">
// 页面过渡动画
// 页面渐变
.page-fade-enter-active
  transition .5s
.page-fade-leave-active
  transition .5s
.page-fade-enter
  opacity 0
.page-fade-leave-to
  opacity 0
  transform scale(5)

// 页面左右移
.page-trans-enter-active
  transition .5s
.page-trans-leave-active
  transition .5s
.page-trans-enter
  opacity 0
  transform translateX(20px)
.page-trans-leave-to
  opacity 0
  transform translateX(-20px)
  


.spinner 
  width 60px
  height 60px
  position absolute 
  top 50%
  left 50%
  margin-top -30px
  margin-left -30px
  background-color #ffd100
  animation rotateplane 1.2s infinite ease-in-out
 
@-webkit-keyframes rotateplane 
  0% 
    transform: perspective(120px)
  50%
    transform: perspective(120px) rotateY(180deg)
  100%
    transform: perspective(120px) rotateY(180deg)  rotateX(180deg)

@media screen and (max-width: 756px)
  .app
    position fixed
    top 0
    left 0
    right 0
    bottom 0
  .container
    width 100%
    padding 0 12px
    min-height 100%
</style>

