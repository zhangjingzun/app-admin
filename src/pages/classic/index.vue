<template>
  <d2-container :filename="filename">
    <template slot="header">分类管理</template>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="dataList"
      add-title="我的新增"
      :edit-template="editTemplate"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      @dialog-cancel="handleDialogCancel"
      :rowHandle="rowHandle"
      @row-remove="handleRowRemove"
      @row-edit="handleRowEdit"
      @dialog-open="handleOpenDialog">
      <el-button slot="header" style="margin-bottom: 5px" @click="addRowWithNewTemplate">新增分类</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import * as requestApi from '../../request'
export default {
  name: 'classic',
  data () {
    return {
      filename: __filename,
      today: '',
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '分类名称',
          key: 'class_name'
        },
        {
          title: '创建时间',
          key: 'creat_time'
        }
      ],
      dataList: [
      ],
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
      rowHandle: {
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true
        },
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small'
        }
      },
      editTemplate: {
        class_name: {
          title: '分类名称',
          value: ''
        }
      }
    }
  },
  created () {
    this.getClassicList()
  },
  methods: {
    // 获取分类列表
    getClassicList () {
      let _this = this
      requestApi.apiGetClassic().then(res => {
        if (res.code === 0) {
          _this.dataList = res.data
        } else {
          _this.showWarning('网络错误，稍后重试')
        }
      })
    },
    // 获取当前时间
    getThisDate () {
      var date = new Date()
      var y = date.getFullYear()
      var m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`
      var d = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
      this.today = `${y}-${m}-${d}`
    },
    // 删除分类
    handleRowRemove ({ index, row }, done) {
      let id = this.dataList[index].id
      let _this = this
      requestApi.apiDelClassic(id).then(res => {
        if (res.code === 1) {
          _this.showWarning(_this, res.msg)
        } else {
          _this.showSuccess(_this, res.msg)
          done()
        }
      })
    },
    // 传入自定义模板的新增
    addRowWithNewTemplate () {
      this.$refs.d2Crud.showDialog({
        mode: 'add',
        template: {
          class_name: {
            title: '分类名称',
            value: ''
          }
        }
      })
    },
    // 添加事件
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      let name = row.class_name
      let _this = this
      requestApi.apiAddClassic(name).then(res => {
        _this.formOptions.saveLoading = false
        if (res.code === 1) {
          _this.showWarning(_this, res.msg)
        } else {
          _this.showSuccess(_this, res.msg)
          _this.dataList = res.data
          done()
        }
      })
    },
    // 编辑完毕
    handleRowEdit ({ index, row }, done) {
      let id = this.dataList[index].id
      let name = row.class_name
      let _this = this
      this.formOptions.saveLoading = true
      requestApi.apiAddClassic(name, id).then(res => {
        _this.formOptions.saveLoading = false
        if (res.code === 1) {
          _this.showWarning(_this, res.msg)
        } else {
          _this.showSuccess(_this, res.msg)
          _this.dataList = res.data
          done()
        }
      })
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    },
    handleOpenDialog ({ mode, row }) {
    }
  }
}
</script>
