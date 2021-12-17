<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="招聘详情"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>

    <view class="content">
      <div class="fw600 f18 mb10 mt5">{{ newsDetails.companyname }}</div>
      <view class="flexBetween">
        <view class="reTitle fw600 f16">
          {{ newsDetails.name }}
          <u-tag
            class="ml10"
            text="急聘"
            mode="dark"
            bg-color="#fe1a19"
          ></u-tag>
        </view>
        <view class="colorBlue fw600 mt5" v-if="newsDetails.salary">{{ newsDetails.salary }}</view>
      </view>
      <view class="textOver2 mt5 color3" v-if="newsDetails.address">工作地址：{{ newsDetails.address }}</view>
      <view class="flexBetween mt5 mb10">
        <view class="color2" v-if="newsDetails.education"> 学历要求：{{ newsDetails.education }}</view>
        <view class="color2">{{ newsDetails.time }}</view>
      </view>
      <u-line class="mt10"></u-line>
      <view class="detailsText fw600 mb10 mt10">招聘详情</view>
      <!-- <view v-html="newsDetails.details"></view> -->
      <view class="detail-content">
        <u-parse
          :html="newsDetails.details"
          :domain="$URL"
          :lazy-load="true"
          :show-with-animation="true"
        ></u-parse>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      //新闻列表
      newsDetails: {},
    };
  },
  onLoad(option) {
    this.newsDetails = JSON.parse(option.data);
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.detailsText {
  border-left: 3px solid #11bbb8;
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
