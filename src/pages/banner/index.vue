<template>
  <d2-container :filename="filename" class="banner">
    <template slot="header">轮播图管理</template>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
    </el-upload>
  </d2-container>
</template>

<script>
export default {
  name: 'banner',
  data () {
    return {
      filename: __filename,
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
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
