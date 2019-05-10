<template>
  <d2-container :filename="filename" class="banner">
    <template slot="header">轮播图管理</template>
    <el-row style="margin-bottom: 20px;">
      <el-col style="width: 395px;margin-bottom: 10px;" v-for="(item, index) in fileList" :key="index" :style="'margin-right: 20px;'">
        <el-card :body-style="{ padding: '10px' }">
          <img style="width: 375px;height: 150px;" :src="`${hostUrl}${item.url}`" class="image">
          <div style="padding: 14px;">
            <!-- <span style="display: block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{item.name}}</span> -->
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="delBanner(index)">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-upload
      class="upload-demo"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :file-list="fileList"
      :headers="headers"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :show-file-list="showFileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
    </el-upload>
  </d2-container>
</template>

<script>
import * as requestApi from '../../request'
export default {
  name: 'banner',
  data () {
    return {
      filename: __filename,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE',
        'Access-Control-Allow-Headers': 'x-requested-with,content-type'
      },
      fileList: [
      ],
      showFileList: false
    }
  },
  computed: {
  },
  created () {
    this.getBanner()
  },
  methods: {
    beforeUpload (file) {
      let name = file.name
      let arr = this.fileList
      if (arr.length === 3) {
        this.showWarning(this, `最多上传三张图片`)
        return false
      }
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
      requestApi.apiUploadJoin(data).then(res => {
        if (res.code === 0) {
          let data = res.data
          _this.showSuccess(this, '上传成功')
          _this.fileList.push(data)
        } else {
          _this.showWarning(this, res.msg)
        }
      }).catch(e => {
        _this.showWarning(this, `网络连接失败`)
      })
      return false
    },
    getBanner () {
      let _this = this
      requestApi.apiGetJoin().then(res => {
        if (res.code === 0) {
          let data = res.data
          _this.fileList = data
        } else {
          _this.showWarning(_this, res.msg)
        }
      }).catch(e => {
        _this.showWarning(_this, `获取数据失败，请稍后刷新重试`)
      })
    },
    delBanner (index) {
      let url = this.fileList[index].url
      let _this = this
      let i = index
      requestApi.apiDelJoin(url).then(res => {
        if (res.code === 0) {
          _this.showSuccess(_this, res.msg)
          _this.fileList.splice(i, 1)
        } else {
          _this.showWarning(_this, res.msg)
        }
      })
    },
    beforeRemove (file, fileList) {
    },
    handleRemove (file, fileList) {
    },
    handleSuccess () {
      this.showSuccess(this, `文件上传成功`)
    },
    handleError () {
      this.showWarning(this, `文件上传失败`)
    },
    handlePreview (file) {
      this.showWarning(this, `已存在文件${file.name}`)
    }
  }
}
</script>
