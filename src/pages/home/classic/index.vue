<template>
  <d2-container :filename="filename">
    <template slot="header">分类管理</template>
  </d2-container>
</template>

<script>
export default {
  name: 'classic',
  data () {
    return {
      filename: __filename
    }
  }
}
</script>
