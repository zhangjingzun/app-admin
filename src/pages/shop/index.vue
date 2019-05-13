<template>
  <d2-container :filename="filename" class="shop">
    <template slot="header">商品管理</template>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="dataList"
      add-title="我的新增"
      @custom-emit-detail-btn="handleDetail"
      @custom-emit-edit-btn="handleEdit"
      :rowHandle="rowHandle">
      <el-button slot="header" style="margin-bottom: 5px" @click="handleNew">新增商品</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import * as requestApi from '../../request'
export default {
  name: 'shop',
  data () {
    return {
      filename: __filename,
      columns: [
        {
          title: '商品ID',
          key: 'id'
        },
        {
          title: '商品标题',
          key: 'shop_name'
        },
        {
          title: '商品描述',
          key: 'shop_desc'
        }
      ],
      dataList: [
      ],
      rowHandle: {
        custom: [
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
  created () {
    this.$nextTick(() => {
      this.getShops()
    })
  },
  methods: {
    getShops () {
      requestApi.apiGetShopImg().then(res => {
        this.dataList = res.data
      })
    },
    handleDetail ({ index }) {
    },
    handleEdit ({ index }) {
      let id = this.dataList[index].id
      this.$router.push(`/shop/add?id=${id}`)
    },
    handleNew () {
      this.$router.push('/shop/add')
    }
  }
}
</script>
