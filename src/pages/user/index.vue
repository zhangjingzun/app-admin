<template>
  <d2-container :filename="filename" class="add">
    <el-form ref="form" :model="form" label-width="80px">
    </el-form>
  </d2-container>
</template>
<script>
import * as requestApi from '../../request'
export default {
  data () {
    return {
      filename: __filename,
      form: {
      }
    }
  },
  created () {
    this.$nextTick(() => {
    })
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>
