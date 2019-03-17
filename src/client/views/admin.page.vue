<template>
  <div class="admin-content">
    <div class="content-left" >
      <div class="article-item" :class="{active: item.id === id}" :key="item.id" v-for="(item, idx) in articles"
        @click="editItem(item.id)"
      >
        <div class="title">{{item.title}}</div>
        <div class="up" @click.stop="change(idx, -1)">上</div>
        <div class="down" @click.stop="change(idx, 1)">下</div>
      </div>
    </div>
    <div class="content-right">
      <div class="tool-bar">
        <button @click="clean">新增</button>
        <button :disabled="!title || !content || !time || !coverImg" @click="save">保存</button>
        
      </div>
      <div class="container">
        <div class="input-area">
          <Input class="input-title" v-model="title" placeholder="请输入标题" />
          <date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
          >
          </date-picker>
          <Upload
            class="avatar-uploader"
            action="/article/upload"
            :on-success="handleSuccess"
            :show-file-list="false"
            >
            <img v-if="coverImg" :src="coverImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </Upload>
        </div>
        <div class="content-area" ref="content">
          <quill-editor 
            v-model="content"
            :options="editorOption"
          >
          </quill-editor>
        </div>
      </div>
    </div>
    <div class="loading">loading```</div>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { mapState } from 'vuex'
import { Quill, quillEditor } from 'vue-quill-editor'
import {ImageDrop} from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import { ImageUpload } from 'quill-image-upload'
import { getUUID } from '../util'
import {DatePicker, Input, Upload} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Quill.register('modules/imageUpload', ImageUpload)
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

const editorOption = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ],
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: false
    },
    imageUpload: {
      url: '/article/upload',
      method: 'POST',
      name: 'file',
      callbackOK: (serverResponse, next) => {
				next(serverResponse.data)
			}
    },
    imageResize: {
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white'
      },
      modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
    }
  }
}

export default {
  data() {
    return {
      editorOption,
      id: '',
      title: '',
      content: '',
      coverImg: '',
      time: new Date(),
      lock: false
    }
  },
  components: {
    quillEditor,
    DatePicker,
    Input,
    Upload
  },
  computed: {
		...mapState('article', [
			'articles'
		])
	},
  mounted() {
    this.$store.dispatch('article/getArticles')
    const height = this.$refs.content.offsetHeight - 66 + 'px'
    document.querySelector('.quill-editor:not(.bubble) .ql-container').style.height = height
    document.querySelector('.quill-editor:not(.bubble) .ql-container .ql-editor').style.height = height
  },
  methods: {
    clean() {
      this.id = ''
      this.title = ''
      this.content = ''
      this.coverImg = ''
      this.time = new Date()
    },
    editItem(id) {
      this.id = id
      this.$store.dispatch('article/getArticle', id).then(({data}) => {
        const {
          title,
          content,
          coverImg,
          time
        } = data.data
        this.title = title
        this.content = content
        this.coverImg = coverImg
        this.time = new Date(time)
      })
    },
    handleSuccess({data}) {
      this.coverImg = data
    },
    save() {
      if(!this.id) {
        this.id = getUUID()
      }
      this.$store.dispatch('article/setArticle', {
        id: this.id,
        content: this.content,
        coverImg: this.coverImg,
        title: this.title,
        time: this.time.getTime()
      }).then(res => {
        this.clean()
        this.$store.dispatch('article/getArticles')
      })
    },
    change(idx, flag) {
      if(this.lock) return
      if(idx + flag < 0 || idx + flag >= this.articles.length) return
      this.lock = true
      const list = []
      this.articles.map((d, i) => {
        if(i === idx) {
          list[i + flag] = d
        } else if(i === idx + flag) {
          list[idx] = d
        } else {
          list[i] = d
        }
      })
      this.$store.dispatch('article/setArticles', {
        list
      }).then(d => {
        this.lock = false
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.admin-content
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  >*
    position absolute
    top 0
    bottom 0
  .content-left
    left 0
    width 300px
    overflow scroll
  .content-right
    left 300px
    right 0
    background #efefef
  .loading
    display none
  .container
    width 1024px
    margin 0 auto
    background #fff
    height 100%
    padding-top 50px
    overflow scroll
  .tool-bar
    position absolute
    top 0
    left 0
    right 0
    z-index 999
    height 50px
    background #fff
    border-left 1px solid #eee
    border-bottom 1px solid #eee
    line-height 50px
    padding 0 20px
    text-align right
    .avatar-uploader
      height 
    button
      background #409EFF
      border none
      color #ffffff
      padding 8px 20px
      border-radius 5px
      outline 0
      &[disabled]
        background #ccc
  .input-area
    height 90px
    width 100%
    position relative
    padding-right 120px
    .avatar-uploader
      height 90px
      width 120px
      right 0
      top 0
      position absolute
      background #fff
    .avatar-uploader-icon
      font-size: 28px
      color: #8c939d
      width: 120px
      height: 90px
      line-height: 90px
      text-align: center
      background #fafafa
    .avatar
      width 100%
      height 100%
    .input-title
      font-size 20px
      height 50px
      line-height 50px
      border-bottom 1px solid #ccc
      >>>.el-input__inner
        border none
    >>>.el-date-editor 
      input 
        border none
  .content-area
    height 'calc(100% - 90px)' % 100%
    >>>.quill-editor:not(.bubble) .ql-container .ql-editor
      min-height 50px
  .article-item
    line-height 60px
    height 60px
    font-size 18px
    border-bottom 1px solid #eee
    padding 0 10px
    transition .3s
    user-select none
    cursor pointer
    position relative
    &:hover
      padding-left 20px
    .title
      overflow hidden
      text-overflow ellipsis
      width 200px
    .up, .down
      width 30px
      height 30px
      position absolute 
      top 0
      right 0
      text-align center
      line-height 30px
      border-left 1px solid #eee
    .down
      border-top 1px solid #eee
      top auto
      bottom 0
>>>.ql-editor img
  margin 0 auto
  display block
</style>


