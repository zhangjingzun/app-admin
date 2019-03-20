<template>
  <d2-container :filename="filename" class="banner">
    <template slot="header">商品管理</template>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      add-title="我的新增"
      @custom-emit-detail-btn="handleDetail"
      @custom-emit-edit-btn="handleEdit"
      :rowHandle="rowHandle">
      <el-button slot="header" style="margin-bottom: 5px" @click="handleNew">新增商品</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
export default {
  name: 'shop',
  data () {
    return {
      filename: __filename,
      columns: [
        {
          title: '商品编号',
          key: 'number'
        },
        {
          title: '商品标题',
          key: 'title'
        },
        {
          title: '商品描述',
          key: 'desc'
        }
      ],
      data: [
        {
          number: '01',
          title: '亚合智能门',
          desc: '亚合智能门，是环保门，是会呼吸的门亚合智能门'
        },
        {
          number: '02',
          title: '亚合智能门',
          desc: '亚合智能门，是环保门，是会呼吸的门亚合智能门'
        },
        {
          number: '03',
          title: '亚合智能门',
          desc: '亚合智能门，是环保门，是会呼吸的门亚合智能门'
        }
      ],
      rowHandle: {
        custom: [
          {
            text: '详情',
            size: 'small',
            emit: 'custom-emit-detail-btn'
          },
          {
            text: '编辑',
            type: 'warning',
            size: 'small',
            emit: 'custom-emit-edit-btn'
          }
        ]
      }
    }
  },
  methods: {
    handleDetail () {
      console.log('go to detail')
    },
    handleEdit () {
      console.log('go to edit')
    },
    handleNew () {
      console.log('go to add')
    }
  }
}
</script>
