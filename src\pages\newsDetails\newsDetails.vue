<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="新闻详情"
      title-color="#fff"
      :background="{backgroundImage:'linear-gradient(to right bottom,#46e3c4,#3cc8c9)'}"
    ></u-navbar>

    <view class="content" >
      <view class="reTitle fw600">
        {{newsDetails.newsname}}
        <u-tag class="ml10" text="热门" mode="dark" bg-color="#fe1a19"></u-tag>
      </view> 
      <view class="textOver2 mt5 color3">{{newsDetails.message}}</view>
      <view class="flexBetween mt10 mb10">
        <view class="color2">{{newsDetails.num}}+阅读量</view>
        <view class="color2">{{newsDetails.time}}</view>
      </view>
      <u-line class="mt10"></u-line>
      <view class="detailsText fw600 mb10 mt10" >新闻详情</view>
      <!-- <view v-html="newsDetails.content"></view> -->
      <view class="detail-content">
        <u-parse :html="newsDetails.content" :domain="$URL" :lazy-load="true" :show-with-animation="true"></u-parse>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      //新闻列表
      newsDetails: {}
    }
  },
  onLoad(option){
    console.log(JSON.parse(option.data))
    this.newsDetails = JSON.parse(option.data)
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.detailsText {
  border-left: 3px solid #11BBB8;
  padding-left: 5px;
}
.search {
  background: #fff;
  padding: 10px;
}
.content {
  padding: 10px 14px;
  margin-bottom: 50px;
}
</style>
