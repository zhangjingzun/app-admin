export default {
  install (Vue, options) {
    Vue.prototype.showSuccess = function (that, msg) {
      that.$message({
        message: msg,
        type: 'success'
      })
    }
    Vue.prototype.showWarning = function (that, msg) {
      that.$message({
        message: msg,
        type: 'warning'
      })
    }
  }
}
