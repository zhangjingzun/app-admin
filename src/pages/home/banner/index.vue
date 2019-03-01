<template>
  <d2-container :filename="filename" class="banner">
    <template slot="header">轮播图管理</template>
    <div class="banner-list">
      <div class="banner-item" v-for="(item, index) in bannerList" :key="index">
        <div class="item-num" v-if="index < 10">0{{index}}</div>
        <div class="item-num" v-else>{{index}}</div>
        <div class="item-img">
          <img :src="item.banner_src" alt="">
        </div>
        <div class="item-btn">
          <a href="javascipt:;" @click="deleteBanner(index)">删除</a>
        </div>
      </div>
      <div class="banner-item">
        <div class="item-num"></div>
        <d2-icon name="plus-square-o" class="upload-icon"/>
      </div>
    </div>
    <layer ref="layer" @delBannerItem="delBannerItem"/>
  </d2-container>
</template>

<script>
import layer from '@/components/layer/layer.vue'
export default {
  name: 'banner',
  components: {
    layer
  },
  data () {
    return {
      filename: __filename,
      delIndex: '',
      bannerList: [
        {
          banner_src: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2332766625,3603062590&fm=85&app=63&f=JPG?w=121&h=75&s=AB28E2064677362F860FCE610300607B',
          banner_id: 1
        },
        {
          banner_src: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2332766625,3603062590&fm=85&app=63&f=JPG?w=121&h=75&s=AB28E2064677362F860FCE610300607B',
          banner_id: 2
        }
      ]
    }
  },
  methods: {
    deleteBanner (index) {
      this.delIndex = index
      this.$refs.layer.confirmShow({
        content: '确定删除此项吗？',
        yes: 'delBannerItem'
      })
    },
    delBannerItem () {
      console.log(this.delIndex)
      if (this.delIndex !== '') {
        this.bannerList.splice(this.delIndex, 1)
      }
    }
  }
}
</script>
