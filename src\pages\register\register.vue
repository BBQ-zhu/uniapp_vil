<template>
  <view class="zai-box">
    <u-navbar back-txt="返回" back-icon-color="#fff" title="修改密码" title-color="#fff" :background="{backgroundImage:'linear-gradient(to right top,#45b2fd, #b085f9)'}"></u-navbar>
    <img src="/static/zaizai-login/register.png" mode="aspectFit" class="zai-logo mt20" />
    <view class="zai-title" style="margin-top:50px">CHANGE</view>
    <view class="zai-form">
      <input class="zai-input" v-model="name" placeholder="请输入用户名" />
      <input class="zai-input" v-model="password" type='password' placeholder="请输入新密码" />
      <view class="flexBetween" style="align-items:center;margin-top:15px;">
        <input class="zai-input" v-model="verCode" placeholder="请输入验证码" style="width:40%;margin-top:0;" />
        <view v-if="show" class="inBtn" @click="getNum">获取验证码</view>
        <view v-else class="inBtn color3">{{time}}秒</view>
      </view>

      <button class="zai-btn" @click="register">立即注册</button>
      <view class="zai-label" @click="toLogin">已有账号，点此去登录</view>
      <u-toast ref="uToast" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      name:'',
      password:'',
      verCode:'',
      time: 60,
      show: true,
      timeOut:null
    }
  },
  methods: {
    register(){
      if(!this.name || !this.password || !this.verCode){
        this.$refs.uToast.show({
          title: '请输入信息'
        })
      }
    },
    getNum() {
      this.show = false
      this.timeOut = setInterval(() => {
        this.setTime()
      }, 1000)
    },
    setTime() {
      if (this.time <= 1) {
        this.show = true
        this.time = 60
        clearInterval(this.timeOut)
        this.timeOut = null
      } else {
        this.time--
      }
    },
    toLogin(){
      uni.navigateTo({
        url:'/pages/login/login'
      })
    }
  }
}
</script>

<style lang='scss' scoped>

.inBtn {
  width: 40%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background: #e2f5fc;
  border-radius: 50px;
}
.zai-box {
  padding: 0 100upx;
  position: relative;
}
.zai-logo {
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
  margin-top: 60upx;
}
.zai-btn:after {
  border: 0;
}
/*按钮点击效果*/
.zai-btn.button-hover {
  transform: translate(1upx, 1upx);
}
</style>
