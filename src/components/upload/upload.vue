<template>
    <div>
        <input type="file" @change="uploadChange" style="display:none;" id="uploadInput">
    </div>
</template>
<script>
export default {
  name: 'upload',
  data () {
    return {
      inputFile: null,
      inputValue: null
    }
  },
  methods: {
    uploadChange (e) {
      let img = e.target.files[0]
      this.$emit('uploadCallBack', img)
    }
  }
}
</script>
