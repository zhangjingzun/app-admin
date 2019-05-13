<template>
  <d2-container :filename="filename" class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="背景图片">
        <el-row style="margin-bottom: 20px;" v-show="form.info_img != ''">
          <el-col style="width: 395px;margin-bottom: 10px;">
            <el-card :body-style="{ padding: '10px' }">
              <img style="width: 375px;height: 150px;" :src="`${hostUrl}${form.info_img}`" class="image">
            </el-card>
          </el-col>
        </el-row>
        <el-upload
          class="upload-demo"
          action="/"
          :before-upload="beforeUpload"
          :show-file-list="showFileList"
        >
          <el-button size="small" type="primary">点击更换</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺名称">
        <el-input v-model="form.info_name"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介">
        <el-input v-model="form.info_desc"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.info_user"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.info_tel"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input v-model="form.info_address"></el-input>
      </el-form-item>
      <el-form-item label="店铺经度">
        <el-input v-model="form.info_lon"></el-input>
      </el-form-item>

      <el-form-item label="店铺纬度">
        <el-input v-model="form.info_lat"></el-input>
      </el-form-item>

      <el-form-item label="视频链接">
        <el-input v-model="form.info_video"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即更新</el-button>
      </el-form-item>

    </el-form>
  </d2-container>
</template>
<script>
import * as requestApi from '../../request'
export default {
  data () {
    return {
      filename: __filename,
      showFileList: false,
      form: {
        info_name: '',
        info_desc: '',
        info_user: '',
        info_tel: '',
        info_address: '',
        info_lon: '',
        info_lat: '',
        info_img: '',
        info_video: ''
      },
      oldImg: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.getInfo()
    })
  },
  methods: {
    getInfo () {
      let _this = this
      requestApi.apiGetInfo().then(res => {
        if (res.code === 0) {
          _this.form = res.data
          if (_this.form.info_img !== '') {
            _this.oldImg.push(_this.form.info_img)
          }
        } else {
          _this.showWarning(_this, res.msg)
        }
      })
    },
    beforeUpload (file) {
      let name = file.name
      let data = new FormData()
      data.append('file', file)
      let _this = this
      requestApi.apiUploadAboutBanner(data).then(res => {
        if (res.code === 0) {
          this.showSuccess(this, '上传成功')
          if (_this.form.info_img !== '') {
            _this.oldImg.push(_this.form.info_img)
          }
          _this.form.info_img = res.data
        } else {
          this.showWarning(this, res.msg)
        }
      }).catch(e => {
        this.showWarning(this, `网络连接失败`)
      })
      return false
    },
    delOldImg () {
      let _this = this
      let data = {
        list: this.oldImg
      }
      requestApi.apiDelAboutBanner(data).then(res => {
      })
    },
    onSubmit () {
      if (this.oldImg.length > 0) {
        this.delOldImg()
      }
      let _this = this
      requestApi.apiUpdateInfo(this.form).then(res => {
        if (res.code === 0) {
          _this.showSuccess(_this, res.msg)
        } else {
          _this.showWarning(_this, res.msg)
        }
      })
    }
  }
}
</script>
