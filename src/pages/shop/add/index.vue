<template>
  <d2-container :filename="filename" class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.title"></el-input>
        <el-tag>30字以内</el-tag>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.desc"></el-input>
        <el-tag>50字以内</el-tag>
      </el-form-item>
      <el-form-item label="商品主图">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-tag>支持png/jpg</el-tag>
      </el-form-item>
      <el-form-item label="商品原价">
        <el-input v-model="form.old_price"></el-input>
        <el-tag>单位（元）</el-tag>
      </el-form-item>
      <el-form-item label="商品现价">
        <el-input v-model="form.price"></el-input>
        <el-tag>单位（元）</el-tag>
      </el-form-item>
      <el-form-item label="商品详情">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-tag>商品详情由图片组成，支持png/jpg</el-tag>
      </el-form-item>
      <!-- <el-form-item label="商品详情">
        <vue-ueditor-wrap :config="config" v-model="form.detail"></vue-ueditor-wrap>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
// import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  // components: {
  //   VueUeditorWrap
  // },
  data () {
    return {
      filename: __filename,
      form: {
        title: '',
        desc: '',
        old_price: '',
        price: '',
        image: [],
        // detail: '在此编辑详情',
        detailImgs: []
      }
      // config: {
        // // 编辑器不自动被内容撑高
        // autoHeightEnabled: false,
        // // 初始容器高度
        // initialFrameHeight: 240,
        // // 初始容器宽度
        // initialFrameWidth: '100%',
        // // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        // serverUrl: 'http://35.201.165.105:8000/controller.php',
        // // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/static/UEditor/'
      // }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess (response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    handleError () {
      this.$message({
        message: `文件上传失败`,
        type: 'warning'
      })
    },
    handlePreview (file) {
      console.log(file)
      this.$message({
        message: `已存在文件${file.name}`,
        type: 'warning'
      })
    }
  }
}
</script>
