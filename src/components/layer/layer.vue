<template>
    <div id="layer">
        <transition name="fade">
            <div class="loading" v-show="loadingFlag">
                <d2-icon name="spinner" class="loading-icon"/>
                <span class="loading-text">加载中</span>
            </div>
        </transition>
        <transition name="bounce">
            <div class="alert" v-show="alertFlag">
                <span class="alert-text">{{alertMsg}}</span>
            </div>
        </transition>
        <transition name="bounce">
            <div class="confirm" v-show="confirmFlag">
                <div class="confirm-header">{{confirmTitle}}</div>
                <div class="confirm-content">{{confirmContent}}</div>
                <div class="confirm-btn">
                    <a href="javascript:;" v-show="showCancelBtn" @click="cancelConfirm">取消</a>
                    <a href="javascript:;" v-show="showSureBtn" @click="sureConfirm">确定</a>
                </div>
            </div>
        </transition>

    </div>
</template>
<script>
export default {
  name: 'layer',
  data () {
    return {
      loadingFlag: false,
      confirmFlag: false,
      alertFlag: false,
      alertMsg: '',
      confirmTitle: '提示：',
      confirmContent: '',
      showCancelBtn: true,
      showSureBtn: true,
      sureCallBack: '',
      cancelCallBack: ''
    }
  },
  mounted () {
  },
  methods: {
    alertShow (msg, time) {
      this.alertMsg = msg
      this.alertFlag = true
      let timer = 2000
      if (time) {
        timer = time
      }
      setTimeout(() => {
        this.alertHide()
      }, timer)
    },
    alertHide () {
      this.alertFlag = false
    },
    loadingShow () {
      this.loadingFlag = true
    },
    loadingHide () {
      this.loadingFlag = false
    },
    confirmShow (options) {
      if (options.title) {
        this.confirmTitle = options.title
      }
      if (options.content) {
        this.confirmContent = options.content
      }
      if (options.cancelShow) {
        this.showCancelBtn = options.cancelShow
      }
      if (options.sureShow) {
        this.showSureBtn = options.sureShow
      }
      if (options.yes) {
        this.sureCallBack = options.yes
      }
      if (options.no) {
        this.cancelCallBack = options.no
      }
      this.confirmFlag = true
    },
    confirmHide (options) {
      this.confirmFlag = false
    },
    cancelConfirm () {
      if (this.cancelCallBack !== '') {
        this.$emit(this.cancelCallBack)
      }
      this.confirmHide()
    },
    sureConfirm () {
      if (this.sureCallBack !== '') {
        this.$emit(this.sureCallBack)
      }
      this.confirmHide()
    }
  }
}
</script>
