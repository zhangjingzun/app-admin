<template>
  <d2-container :filename="filename" class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.shop_name"></el-input>
        <el-tag>30字以内</el-tag>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input v-model="form.shop_desc"></el-input>
        <el-tag>50字以内</el-tag>
      </el-form-item>

      <el-form-item label="商品主图">
        <el-row style="margin-bottom: 20px;" v-if="shopImg.length > 0">
          <el-col style="width: 200px;margin-bottom: 10px;" v-for="(item, index) in shopImg" :key="index" :style="'margin-right: 20px;'">
            <el-card :body-style="{ padding: '10px' }">
              <img style="width: 180px;height: 180px;" :src="`${hostUrl}${item}`" class="image">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="delBanner(index, 1)">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-upload
          action="/"
          ref="uploadImg"
          :show-file-list="showFileList"
          :before-upload="beforeUpload"
        >
          <el-button size="small" @click="uploadType = '1'" type="primary">点击上传</el-button>
          <el-tag>支持png/jpg</el-tag>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品原价">
        <el-input v-model="form.shop_old_price"></el-input>
        <el-tag>单位（元）</el-tag>
      </el-form-item>

      <el-form-item label="商品现价">
        <el-input v-model="form.shop_price"></el-input>
        <el-tag>单位（元）</el-tag>
      </el-form-item>

      <el-form-item label="关注人数">
        <el-input v-model="form.shop_count"></el-input>
        <el-tag>单位（人）</el-tag>
      </el-form-item>

      <el-form-item label="商品分类">
        <el-select v-model="selectValue" placeholder="请选择" @change="classicChange">
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.class_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品详情">
        <el-row style="margin-bottom: 20px;" v-if="detailImg.length > 0">
          <el-col style="width: 200px;margin-bottom: 10px;" v-for="(item, index) in detailImg" :key="index" :style="'margin-right: 20px;'">
            <el-card :body-style="{ padding: '10px' }">
              <img style="width: 180px;height: 180px;" :src="`${hostUrl}${item}`" class="image">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="delBanner(index, 2)">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-upload
          action="/"
          ref="uploadDetail"
          :show-file-list="showFileList"
          :before-upload="beforeUpload"
        >
        <el-button size="small" @click="uploadType = '2'" type="primary">点击上传</el-button>
        <el-tag>商品详情由图片组成，支持png/jpg</el-tag>
        </el-upload>
      </el-form-item>

      <el-form-item label="是否推荐">
        <el-radio v-model="form.is_recommend" label="1">是</el-radio>
        <el-radio v-model="form.is_recommend" label="0">否</el-radio>
      </el-form-item>

      <el-form-item label="是否热门">
        <el-radio v-model="form.is_hot" label="1">是</el-radio>
        <el-radio v-model="form.is_hot" label="0">否</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{submitBtnText}}</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>

    </el-form>
  </d2-container>
</template>
<script>
import * as requestApi from '../../../request'
export default {
  data () {
    return {
      filename: __filename,
      shopImg: [
      ],
      detailImg: [
      ],
      submitBtnText: '立即创建',
      shopId: null,
      uploadType: '1',
      showFileList: false,
      classList: [
      ],
      selectValue: '',
      form: {
        shop_name: '',
        shop_desc: '',
        shop_old_price: '',
        shop_price: '',
        shop_img: '',
        shop_detail: '',
        is_hot: '0',
        is_recommend: '0',
        classic_id: null,
        shop_count: 0
      },
      removeImgList: [
      ]
    }
  },
  created () {
    this.$nextTick(() => {
      this.getClassicList()
      let id = this.$route.query.id
      if (id) {
        // edit
        this.shopId = id
        this.getDetail(id)
        this.submitBtnText = '确认修改'
      }
    })
  },
  methods: {
    // 获取分类列表
    getClassicList () {
      let _this = this
      requestApi.apiGetClassic().then(res => {
        if (res.code === 0) {
          _this.classList = res.data
        } else {
          _this.showWarning('网络错误，稍后重试')
        }
      })
    },
    // 分类选择
    classicChange (item) {
      this.form.classic_id = item
    },
    // 获取商品详情
    getDetail (id) {
      let _this = this
      requestApi.apiGetShopDetail(id).then(res => {
        if (res.code === 0) {
          let data = res.data
          _this.form = {
            shop_name: data.shop_name,
            shop_desc: data.shop_desc,
            shop_old_price: data.shop_old_price,
            shop_price: data.shop_price,
            shop_img: '',
            shop_detail: '',
            is_hot: data.is_hot,
            is_recommend: data.is_recommend,
            classic_id: data.classic_id,
            shop_count: data.shop_count
          }
          let classList = _this.classList
          classList.forEach((item, index) => {
            if (item.id === data.classic_id) {
              _this.selectValue = item.class_name
            }
          })
          _this.shopImg = data.shop_img.split(',')
          _this.detailImg = data.shop_detail.split(',')
        }
      })
    },
    onSubmit () {
      if (this.removeImgList.length > 0) {
        this.removeImageFunc()
      }
      this.$refs.uploadImg.submit()
      let data = this.form
      if (data.shop_count) {
        data.shop_count = parseFloat(data.shop_count)
      }
      let arr = this.shopImg
      data.shop_img = arr.join(',')
      let list = this.detailImg
      data.shop_detail = list.join(',')
      let _this = this
      if (this.shopId) {
        data.shopId = this.shopId
        requestApi.apiAddShop(data).then(res => {
          if (res.code === 0) {
            _this.showSuccess(_this, res.msg)
            setTimeout(() => {
              _this.goBack()
            }, 1000)
          } else {
            _this.showWarning(_this, res.msg)
          }
        })
      } else {
        data.shopId = null
        requestApi.apiAddShop(data).then(res => {
          if (res.code === 0) {
            _this.showSuccess(_this, res.msg)
            setTimeout(() => {
              _this.goBack()
            }, 1000)
          } else {
            _this.showWarning(_this, res.msg)
          }
        })
      }
    },
    goBack () {
      this.$router.replace('/shop')
    },
    beforeUpload (file) {
      let uploadType = this.uploadType
      let arr = []
      let imgLength = 5
      if (uploadType === '1') {
        arr = this.shopImg
      } else {
        arr = this.detailImg
        imgLength = 15
      }
      if (arr.length === imgLength) {
        this.showWarning(this, `最多上传${imgLength}张图片`)
        return false
      }
      let name = file.name
      let canFlag = true
      arr.forEach((item, index) => {
        if (item.name === name) {
          canFlag = false
        }
      })
      if (!canFlag) {
        this.showWarning(this, `该图片已存在`)
        return false
      }
      let data = new FormData()
      data.append('file', file)
      let _this = this
      requestApi.apiAddShopImg(data).then(res => {
        if (res.code === 0) {
          this.showSuccess(this, '上传成功')
          if (uploadType === '1') {
            _this.shopImg.push(res.data.url)
          } else {
            _this.detailImg.push(res.data.url)
          }
        } else {
          this.showWarning(this, res.msg)
        }
      }).catch(e => {
        this.showWarning(this, `网络连接失败`)
      })
      return false
    },
    removeImageFunc () {
      let arr = this.removeImgList
      let data = {
        list: arr
      }
      requestApi.apiDelShopImg(data).then(res => {
      })
    },
    delBanner (index, type) {
      let arr = []
      if (type === 1) {
        arr = this.shopImg
      } else {
        arr = this.detailImg
      }
      let url = arr[index]
      let i = index
      if (type === 1) {
        this.shopImg.splice(i, 1)
      } else {
        this.detailImg.splice(i, 1)
      }
      this.removeImgList.push(url)
    }
  }
}
</script>
