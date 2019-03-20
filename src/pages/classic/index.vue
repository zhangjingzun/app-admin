<template>
  <d2-container :filename="filename">
    <template slot="header">分类管理</template>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      add-title="我的新增"
      :edit-template="editTemplate"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      @dialog-cancel="handleDialogCancel"
      :rowHandle="rowHandle"
      @row-remove="handleRowRemove"
      @d2-data-change="handleDataChange"
      @row-edit="handleRowEdit">
      <el-button slot="header" style="margin-bottom: 5px" @click="addRowWithNewTemplate">新增分类</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
export default {
  name: 'classic',
  data () {
    return {
      filename: __filename,
      today: '',
      columns: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '分类名称',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'date'
        }
      ],
      data: [
        {
          id: '01',
          date: '2018-05-05',
          name: '分类1',
          forbidRemove: false,
          showRemoveButton: true
        },
        {
          id: '02',
          date: '2018-05-05',
          name: '分类1',
          forbidRemove: false,
          showRemoveButton: true
        },
        {
          id: '03',
          date: '2018-05-05',
          name: '分类1',
          forbidRemove: false,
          showRemoveButton: true
        },
        {
          id: '04',
          date: '2018-05-05',
          name: '分类1',
          forbidRemove: false,
          showRemoveButton: true
        },
        {
          id: '05',
          date: '2018-05-05',
          name: '分类1',
          forbidRemove: false,
          showRemoveButton: true
        }
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
          confirm: true,
          show (index, row) {
            if (row.showRemoveButton) {
              return true
            }
            return false
          },
          disabled (index, row) {
            if (row.forbidRemove) {
              return true
            }
            return false
          }
        },
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small'
        }
      },

      editTemplate: {
        name: {
          title: '分类名称',
          value: ''
        }
      }
    }
  },
  created () {
    this.getThisDate()
  },
  methods: {
    // 获取当前时间
    getThisDate () { // author: meizz
      var date = new Date()
      var y = date.getFullYear()
      var m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`
      var d = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
      this.today = `${y}-${m}-${d}`
    },
    // 删除分类
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    // 传入自定义模板的新增
    addRowWithNewTemplate () {
      let _id = (this.data.length + 1) > 9 ? (this.data.length + 1) : `0${(this.data.length + 1)}`
      this.$refs.d2Crud.showDialog({
        mode: 'add',
        template: {
          id: {
            title: '序号',
            value: _id,
            component: {
              disabled: true
            }
          },
          date: {
            title: '创建时间',
            value: this.today,
            component: {
              disabled: true
            }
          },
          name: {
            title: '分类名称',
            value: ''
          }
        }
      })
    },
    // 添加事件
    handleRowAdd (row, done) {
      row.forbidRemove = false
      row.showRemoveButton = true
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        // done可以传入一个对象来修改提交的某个字段
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    },
    // 数据变化
    handleDataChange (data) {
      console.log(data)
    },
    // 编辑完毕
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    }
  }
}
</script>
