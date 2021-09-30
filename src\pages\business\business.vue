<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      :title="type == 'business' ? '商务合作':'推荐客户'"
      title-color="#fff"
      :background="{backgroundImage:'linear-gradient(to right bottom,#46e3c4,#3cc8c9)'}"
    ></u-navbar>
	  <!-- 轮播图 -->
    <u-swiper :list="swiperList" @click="swiperChange"></u-swiper>
    <view style="padding:0 15px 15px 15px;">
      <!-- 滚动消息 -->
			<u-notice-bar :list="notList" mode="vertical" class="mt10"></u-notice-bar>
      <!-- 商务合作 -->
			<joinUsMit class="mt10" v-if="type == 'business'"></joinUsMit>
      <!-- 推荐客户 -->
			<referCustomers class="mt10" v-if="type == 'referCustomers'"></referCustomers>
      <!-- 企业学堂 -->
			<school class="mt15"></school>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
			swiperList:[],
      type:'',
      //滚动通知
			notList:[
				'绵阳用户 135****0896 刚交易了 商标注册',
				'绵阳用户 180****6872 刚交易了 银行开户',
				'绵阳用户 137****1709 刚交易了 代理记账',
				'绵阳用户 153****3634 刚交易了 贷款服务',
				'绵阳用户 189****9938 刚交易了 资质认证',
				'绵阳用户 158****5264 刚交易了 抵押贷款',
				'绵阳用户 138****6056 刚交易了 专家顾问',
				'绵阳用户 150****5526 刚交易了 法律服务',
				'绵阳用户 138****8967 刚交易了 专利注册'
			],
		}
  },
  onLoad(option) {
    this.type = option.name
    this.getImg()
  },
  methods: {
    getImg(){
      this.$axios.post(this.$api.findScrollImg, 'post').then(res => {
        this.swiperList = []
        let arr = res.data
        arr.map(item=>{
          if(item.typeid == this.type){
            var obj = {image: '',path: ''}
            obj.image = item.scroimg
            obj.path = item.link
            this.swiperList.push(obj)
          }
        })
      })
    }
	}
}
</script>

<style lang="scss" scoped>

</style>
