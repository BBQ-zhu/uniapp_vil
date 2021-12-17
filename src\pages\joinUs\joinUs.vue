<template>
  <view class="page" style="height: calc(100vh + 10px)">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="加入我们"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>
    <!-- 轮播图 -->
    <u-swiper :list="swiperList" @click="swiperChange"></u-swiper>
    <view style>
      <!-- 招聘列表 -->
      <recruit class="mt10" :recruitList="recruitList" :status="loadStatus"></recruit>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [],
      type: '',
      //招聘列表
      recruitList: [],
      loadStatus: 'momore', //loadmore 加载前, loading 加载中, momore 没有数据了
      find: {
        currentPage: 1, //当前页码
        limit: 10 //每一页的数量
      }
    }
  },
  onLoad(option) {
    this.type = option.name
    this.getImg()
    this.getRecruitList() // 获取招聘列表
  },
  onReachBottom() {
    // 监听上拉加载
    // 监听上拉加载
    this.loadStatus = 'loading'
    this.find.currentPage++
    this.getRecruitList()
  },
  methods: {
    getImg() {
      this.$axios.post(this.$api.findScrollImg, 'post').then(res => {
        this.swiperList = []
        let arr = res.data
        arr.map(item => {
          if (item.typeid == this.type) {
            var obj = { image: '', path: '' }
            obj.image = item.scroimg
            obj.path = item.link
            this.swiperList.push(obj)
          }
        })
      })
    },
    getRecruitList() {
      var data = {
        skip: this.find.limit * (this.find.currentPage - 1),
        limit: this.find.limit
      }
      this.$axios.post(this.$api.findRecruiting, data).then(res => {
        if (res.code == 200) {
          let arr = res.data[0].data
          if (arr.length == 0) {
            this.loadStatus = 'momore'
            this.find.currentPage--
          } else {
            this.loadStatus = 'loadmore'
            this.recruitList = this.recruitList.concat(arr)
          }
        } else {
          this.find.currentPage--
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
