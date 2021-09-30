<template>
  <view class="wrap">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="欢迎登录"
      title-color="#fff"
      :background="{backgroundImage:'linear-gradient(to right bottom,#46e3c4,#3cc8c9)'}"
    ></u-navbar>
    <view class="content">
      <view class="title">铸力供应链</view>
      <input class v-model="username" placeholder="请输入姓名" />
      <u-line></u-line>
      <input class="mt20" type="number" v-model="phone" placeholder="请输入手机号" />
      <u-line></u-line>
      <view class="tips">未注册的手机号验证后自动创建铸力账号</view>
      <button @tap="submit" :style="[inputStyle]" class="getCaptcha mr10">
        获取短信验证码
        <u-loading :show="loadingShow" mode="flower"></u-loading>
      </button>
      <view class="alternative">
        <view class="password"></view>
        <view class="issue">遇到问题</view>
      </view>
    </view>
    <view class="buttom">
      <view class="loginType flex">
        <view class="item">
          <view class="icon">
            <u-icon size="40" name="account" color="#11BBB8"></u-icon>
          </view>专家服务
        </view>
        <view class="item">
          <view class="icon">
            <u-icon size="40" name="integral" color="#11BBB8"></u-icon>
          </view>急速办理
        </view>
        <view class="item">
          <view class="icon">
            <u-icon size="40" name="lock" color="#11BBB8"></u-icon>
          </view>隐私保护
        </view>
      </view>
      <view class="hint">
        登录代表同意
        <text class="link" @click="show=true">铸力用户协议、隐私政策</text>，并授权使用您的账号信息
      </view>
    </view>
    <u-popup v-model="show" mode="bottom" border-radius="14">
      <scroll-view scroll-y="true" style="width:95%;height:600rpx;margin:0 auto;padding:10px;">
        <view class="fw600 mb10 f14" style="text-align:center">《用户协议、隐私政策》</view>
          授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息授权使用您的账号信息
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show:false,
      loadingShow: false,
      username: '',
      phone: ''
    }
  },
  computed: {
    inputStyle() {
      let style = {}
      if (this.username && this.phone) {
        style.color = '#fff'
        style.backgroundColor = this.$u.color['warning']
      }
      return style
    }
  },
  onLoad() {
    const vipUserInfo = uni.getStorageSync('vipUserInfo') || {}
    this.username = vipUserInfo.username || ''
    this.phone = vipUserInfo.phone || ''
  },
  methods: {
    submit() {
      if (!this.username) {
        uni.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
        return
      }
      if (this.$u.test.mobile(this.phone)) {
        this.loadingShow = true
        let second = 1
        let interval = setInterval(() => {
          second--
          if (second <= 0) {
            this.loadingShow = false
            clearInterval(interval)
            this.$u.route({
              url:'pages/vipLogin/code?phone=' +this.phone +'&username=' +this.username
            })
          }
        }, 1000)
      } else {
        uni.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 28rpx;
  .content {
    width: 600rpx;
    margin: 80rpx auto 0;

    .title {
      text-align: left;
      font-size: 60rpx;
      font-weight: 500;
      margin-bottom: 100rpx;
    }
    input {
      text-align: left;
      margin-bottom: 10rpx;
      padding-bottom: 6rpx;
    }
    .tips {
      color: $u-type-info;
      margin-bottom: 60rpx;
      margin-top: 18rpx;
    }
    .getCaptcha {
      background-color: rgb(253, 243, 208);
      color: $u-tips-color;
      border: none;
      font-size: 30rpx;
      padding: 12rpx 0;

      &::after {
        border: none;
      }
    }
    .alternative {
      color: $u-tips-color;
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
    }
  }
  .buttom {
    .loginType {
      display: flex;
      padding: 280rpx 50rpx 150rpx 50rpx;
      justify-content: space-between;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $u-content-color;
        font-size: 24rpx;
      }
    }

    .hint {
      padding: 20rpx 20rpx;
      font-size: 20rpx;
      color: $u-tips-color;
      text-align: center;
      .link {
        color: $u-type-warning;
      }
    }
  }
}
</style>
