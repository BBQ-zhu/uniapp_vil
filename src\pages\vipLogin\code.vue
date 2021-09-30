<template>
  <view class="wrap">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="验证码"
      title-color="#fff"
      :background="{backgroundImage:'linear-gradient(to right bottom,#46e3c4,#3cc8c9)'}"
    ></u-navbar>
    <view class="key-input">
      <view class="title">输入验证码</view>
      <view class="tips">验证码已发送至 +{{phone}}</view>
      <u-message-input
        :focus="true"
        :value="value"
        @change="change"
        @finish="finish"
        mode="bottomLine"
        :maxlength="maxlength"
      ></u-message-input>
      <!-- <text :class="{ error: error }">验证码错误，请重新输入</text> -->
      <view class="captcha">
        <text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到验证码点这里</text>
        <text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      maxlength: 4,
      value: '',
      second: 60,
      show: false,
      error: false,
      phone: '',
      username: '',
      code: ''
    }
  },
  computed: {},
  onLoad(option) {
    this.phone = option.phone
    this.username = option.username
    this.getCaptcha() //获取验证码
    let interval = setInterval(() => {
      this.second--
      if (this.second <= 0) {
        this.show = true
        if (this.value.lenth != 4) {
          this.error = true
        }
        clearInterval(interval)
      }
    }, 1000)
  },
  methods: {
    //获取验证码
    getCaptcha() {
      this.$axios
        .post(this.$api.getCodeVipuser, { phone: this.phone })
        .then(res => {
          console.log(res)
          if (res.code == 200) {
            uni.showToast({
              title: '获取验证码中',
              icon: 'none'
            })
            this.code = res.data
          } else {
            uni.showToast({
              title: '获取验证码失败',
              icon: 'none'
            })
            return false
          }
        })
    },
    // 收不到验证码选择时的选择
    noCaptcha() {
      var _this = this
      uni.showActionSheet({
        itemList: ['重新获取验证码'],
        success: function(res) {
          _this.getCaptcha()
        },
        fail: function(res) {} 
      })
    },

    // 输入完验证码最后一位执行
    finish(code) {
      console.log(code)
      // this.$axios.post(this.$api.checkCodeVipuser, {code:code}).then(async res => {
      //   console.log(res)
      // })
      if (this.code == code) {
        //查找用户是否存在
        this.findUser()
      } else {
        uni.showToast({
          title: '验证码有误',
          icon: 'none'
        })
      }
    },

    //查找用户是否存在
    findUser() {
      var finData = {
        skip: 0,
        limit: 1,
        fuzz: 'phone',
        input: this.phone
      }
      this.$axios.post(this.$api.findVipuser, finData).then(async res => {
        let arr = res.data[0].data
        if (arr.length == 0) {
          this.createUser()
        } else {
          await this.$axios
            .post(this.$api.updateVipuser, {
              _id: arr[0]._id,
              username: this.username
            })
            .then(res => {
              if (res.code == 200) {
                this.login()
              }
            })
        }
      })
    },
    //创建用户
    createUser() {
      let data = {
        phone: this.phone,
        username: this.username
      }
      this.$axios.post(this.$api.createVipuser, data).then(res => {
        if (res.code == 200) {
          this.login() //先创建再登录
        }
      })
    },
    //登录
    login() {
      let data = {
        phone: this.phone,
        username: this.username
      }
      this.$axios.post(this.$api.loginVipuser, data).then(res => {
        if (res.code == 200) {
          let arr = res.data
          arr.token = 'Bearer ' + arr.token
          uni.setStorageSync('vipUserInfo', arr)
          uni.navigateBack({
            delta: 2
          })
        }
      })
    },
    // 验证码change事件侦听
    change(value) {
      // console.log('change', value);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 80rpx;
}

.box {
  margin: 30rpx 0;
  font-size: 30rpx;
  color: 555;
}

.key-input {
  padding: 30rpx 0;
  text {
    display: none;
  }
  .error {
    display: block;
    color: red;
    font-size: 30rpx;
    margin: 20rpx 0;
  }
}

.title {
  font-size: 50rpx;
  color: #333;
}

.key-input .tips {
  font-size: 30rpx;
  color: #333;
  margin-top: 20rpx;
  margin-bottom: 60rpx;
}
.captcha {
  color: $u-type-warning;
  font-size: 30rpx;
  margin-top: 40rpx;
  .noCaptcha {
    display: block;
  }
  .regain {
    display: block;
  }
}
</style>
