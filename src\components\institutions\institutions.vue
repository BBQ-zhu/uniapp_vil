<template>
  <view >
    <view class="u-text-center" style="color: #b7b7b7">合作伙伴</view>
    <view class="flexBetween mt10">
    <img
      v-for="(item,index) in swiperList"
      :key="index+'ins'"
      :src="item.image"
      mode="aspectFit"
      style="width:24%;max-width:74px;"
      class="mt10"
    />
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      swiperList:[]
    }
  },
  mounted() {
    this.getImg()
  },
  methods: {
    getImg() {
      this.$axios.post(this.$api.findScrollImg).then(res => {
        this.swiperList = []
        let arr = res.data
        arr.map(item => {
          if (item.typeid == 'institutions') {
            var obj = { image: '', path: '' }
            obj.image = item.scroimg
            obj.path = item.link
            this.swiperList.push(obj)
          }
        })
        // this.swiperList = this.swiperList.concat(this.swiperList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
