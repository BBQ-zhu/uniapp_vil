<template>
  <view class="zai-box">
    <u-navbar back-txt="返回" back-icon-color="#fff" title="登录" title-color="#fff" :background="{backgroundImage:'linear-gradient(to right top,#45b2fd, #b085f9)'}"></u-navbar>
    <img src="../../static/zaizai-login/login.png" mode="aspectFit" class="zai-logo mt20" />
    <view class="zai-title" style="margin-top:55px;">LOG IN</view>
    <view class="zai-form">
      <input class="zai-input" v-model="name" placeholder="请输入账号" />
      <input class="zai-input" v-model="password" password placeholder="请输入密码" />
      <view class="zai-label" ><span @click="register">忘记密码？</span></view>
      <button class="zai-btn" @click="login">立即登录</button>
      <view hover-class="none" class="zai-label">@铸力金融服务外包有限公司.</view>
      <u-toast ref="uToast" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (name == '' || password == '') {
        this.$refs.uToast.show({
          title: '请输入账号和密码'
        })
      } else {
        // 登录
      }
    },
    register() {
      uni.navigateTo({
        url: '/pages/register/register'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.zai-box {
  padding: 0 100upx;
  position: relative;
}
.zai-logo {
  width: 100%;
  width: 100%;
  height: 310upx;
}
.zai-title {
  position: absolute;
  top: 0;
  line-height: 360upx;
  font-size: 68upx;
  color: #fff;
  text-align: center;
  width: 100%;
  margin-left: -100upx;
}
.zai-form {
  margin-top: 200upx;
}
.zai-input {
  background: #e2f5fc;
  margin-top: 30upx;
  border-radius: 100upx;
  padding: 20upx 40upx;
  font-size: 36upx;
}
.input-placeholder,
.zai-input {
  color: #94afce;
}
.zai-label {
  padding: 60upx 0;
  text-align: center;
  font-size: 30upx;
  color: #a7b6d0;
}
.zai-btn {
  background: linear-gradient(to top right, #45b2fd, #b085f9);
  color: #fff;
  border: 0;
  border-radius: 100upx;
  font-size: 36upx;
}
.zai-btn:after {
  border: 0;
}
/*按钮点击效果*/
.zai-btn.button-hover {
  transform: translate(1upx, 1upx);
}
</style>
