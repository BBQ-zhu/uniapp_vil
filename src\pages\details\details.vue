<template>
  <view class="page" style="background: #fff">
    <view class="poRelative">
      <img :src="details.productimg" width="100%" />
      <view class="back">
        <u-icon name="arrow-left" @click="back"></u-icon>
      </view>
    </view>
    <view class="contant">
      <view class="flex mb20 mt10">
        <view class="title f18 colorGreen fw600">{{ details.name }}</view>
        <view class="flex">
          <view class="colorYellow ml20 f18">
            ￥
            <span class="f18">{{ details.newprice }}</span>
          </view>
          <view class="color3 ml20" style="text-decoration: line-through"
            >￥{{ details.oldprice }}</view
          >
        </view>
      </view>
      <u-line></u-line>
      <view class="color3 mt20 textOver2" style="line-height: 20px">{{
        details.description
      }}</view>
      <view class="flex flexBetween mt20 mb20">
        <view>
          <u-icon name="integral-fill" size="26" class="colorGreen mr5"></u-icon
          >急速办理
        </view>
        <view>
          <u-icon name="integral-fill" size="26" class="colorGreen mr5"></u-icon
          >专家服务
        </view>
        <view>
          <u-icon name="integral-fill" size="26" class="colorGreen mr5"></u-icon
          >进度透明
        </view>
        <view>
          <u-icon name="integral-fill" size="26" class="colorGreen mr5"></u-icon
          >全程监管
        </view>
      </view>
      <u-line></u-line>
      <view class="boxCont flexBetween mt10" style="padding: 10px 10px 0 10px">
        <view class="navItem">
          <view class="colorGreen">{{ details.consulting || 0 }}+</view>
          <view class="color3 mt5">总计咨询</view>
        </view>
        <view class="navItem">
          <view class="colorGreen">{{ details.totalales || 0 }}+</view>
          <view class="color3 mt5">总计销量</view>
        </view>
        <view class="navItem">
          <view class="colorGreen">{{ details.totalview || 0 }}+</view>
          <view class="color3 mt5">总浏览量</view>
        </view>
      </view>
    </view>
    <u-gap height="20" bg-color="#f1f2f6"></u-gap>
    <view class="contant">
      <view class="detailsText fw600 mb10">服务详情</view>
      <!-- <view class="details mt15" v-html="details.details"></view> -->
      <u-parse
        :html="details.details"
        :domain="$URL"
        :lazy-load="true"
        :show-with-animation="true"
      ></u-parse>
    </view>
    <u-gap height="20" bg-color="#f1f2f6"></u-gap>
    <consultant class="mt15"></consultant>
    <u-gap height="20" bg-color="#f1f2f6"></u-gap>
    <view class="contant mb30">
      <view class="detailsText fw600">用户评论</view>
      <comment class="mt10"></comment>
    </view>
    <view class="action-btn-group footer">
      <u-button
        @click="$commonJS.gottkefu"
        hover-class="none"
        type="primary"
        class="action-btn no-border buy-now-btn"
        >在线咨询</u-button
      >

      <u-button
        hover-class="none"
        type="primary"
        class="action-btn no-border add-cart-btn"
        @click="handling"
        >立即办理</u-button
      >
    </view>
  </view>
</template> 

<script>
export default {
  data() {
    return {
      details: {},
    };
  },
  onLoad(option) {
    this.searchChange(option.name);
  },
  methods: {
    //立即办理
    handling() {
      var finData = {
        skip: 0,
        limit: 9999, 
        fuzz: "phone",
        input: uni.getStorageSync('vipUserInfo').phone,
      };
      this.$axios.post(this.$api.findAgent, finData).then((res) => {
        let arr = res.data[0].data;
        if (arr.length == 0) {
          this.createAgent();
        } else {
          let key = true;
          arr.map((item) => {
            if (this.details._id == item.proid && item.read == "false") {
              uni.showToast({
                title: "您的该服务正在处理中",
                icon: "none",
              });
              key = false;
            }
          });
          if (key) { 
            this.createAgent();
          }
        }
      });
    },
    createAgent() {
      let data = {
        proid: this.details._id,
        type: this.details.type + "-" + this.details.name, // 数据来源
        name: uni.getStorageSync('vipUserInfo').username, // 客户名称
        phone: uni.getStorageSync('vipUserInfo').phone, // 电话
        submitby: uni.getStorageSync('vipUserInfo').username, // 提交人
        handler: "all", // 处理人
        path: "/Integrate", // 跳转至综合服务
        read: "false", // 是否已处理
      };
      this.$axios.post(this.$api.createAgent, data).then((res) => {
        if (res.code == 200) {
          uni.showToast({
            title: "业务经理稍后为您服务",
            icon: "none",
            duration: 3000,
          });
        }
      });
    },
    async searchChange(name) {
      var data = {
        skip: 0,
        limit: 10,
        fuzz: "name",
        input: name,
      };
      await this.$axios.post(this.$api.findProduct, data).then((res) => {
        this.details = res.data[0].data[0];
      });
    },
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.action-btn-group {
  display: flex;
  height: 76upx;
  border-radius: 100px;
  overflow: hidden;
  box-shadow: 0 20upx 40upx -16upx #909399;
  box-shadow: 1px 2px 5px #909399;
  background: linear-gradient(to right, #46e3c4, #3cc8c9, #46e3c4);
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translateY(-50%);
    height: 28upx;
    width: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.5);
  }
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180upx;
    height: 100%;
    font-size: $font-base;
    padding: 0;
    border-radius: 0;
    background: transparent;
  }
}
.footer {
  width: 70%;
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  text-align: center;
  font-weight: 600;
  color: #fff;
  position: fixed;
  bottom: 10px;
  left: 15%;
  // opacity: 0.9;
}
.navItem {
  width: 20%;
  margin-bottom: 20px;
  text-align: center;
  line-height: 20px;
}
.details {
  line-height: 16px;
}
.detailsText {
  border-left: 3px solid #11bbb8;
  padding-left: 5px;
}
.boxCont {
  width: 100%;
  border-radius: 1px;
  background: #fff;
  padding: 10px;
  text-align: center;
}
.contant {
  padding: 10px 15px;
  background: #fff;
}
.title {
}
.back {
  width: 25px;
  height: 25px;
  line-height: 25px;
  background: #000;
  opacity: 0.6;
  border-radius: 50%;
  color: #fff;
  padding-left: 3px;
  font-size: 16px;
  position: fixed;
  top: 12px;
  left: 8px;
  z-index: 2;
}
</style>
