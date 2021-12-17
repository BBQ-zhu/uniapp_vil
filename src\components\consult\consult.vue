<template>
  <view class="demand"> 
    <view class="con-title">专业顾问一对一服务</view>
    <view class="con-serve">
      <span class="colorYellow">2000名</span>专业顾问已为
      <span class="colorYellow">100万+</span>的企业/用户提供服务
    </view>
    <view class="flex mt15">
      <view class="con-Btn colorYellow">贷款</view>
      <view class="con-Btn colorYellow">政策</view>
      <view class="con-Btn colorYellow">记账</view>
      <view class="con-Btn colorYellow">商标</view>
      <view class="con-Btn colorYellow">注册</view>
      <view class="con-Btn colorYellow">更多服务</view>
    </view>
    <view>
      <u-form :model="form" ref="uForm" label-width="100rpx">
        <u-form-item
          label="我需求"
          prop="title"
          :leftIconStyle="{ color: '#EB6618', fontSize: '26rpx' }"
          left-icon="file-text"
          label-width="140"
        >
          <u-input v-model="form.title" placeholder="请输入我需求" />
        </u-form-item>
        <u-form-item
          label="手机号"
          prop="phone"
          :leftIconStyle="{ color: '#EB6618', fontSize: '26rpx' }"
          left-icon="phone"
          label-width="140"
        >
          <u-input v-model="form.phone" type="number" placeholder="请输入手机号" />
        </u-form-item>
        <u-button class="mt15 yellowBtn border50" type="warning" shape="square" @click="submit">立即咨询</u-button>
      </u-form>
      <view class="flex flexAround mt10">
        <view>
          <u-icon name="integral-fill" size="26" class="colorGreen mr5"></u-icon>信息安全
        </view>
        <view>
          <u-icon name="heart-fill" size="26" class="colorGreen mr5"></u-icon>官方服务
        </view>
        <view>
          <u-icon name="bell-fill" size="26" class="colorGreen mr5"></u-icon>服务透明
        </view>
      </view>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        phone: ''
      }
      // rules: {
      //   title: [{
      //     required: true,
      //     message: '请输入需求',
      //     trigger: ['change', 'blur']
      //   }],
      //   phone: [
      //     {
      //       required: true,
      //       message: '请输入手机号',
      //       trigger: ['change', 'blur']
      //     },
      //     {
      //       validator: (rule, value, callback) => {
      //         return this.$u.test.mobile(value)
      //       },
      //       message: '请输入正确手机号',
      //       trigger: ['change', 'blur']
      //     }
      //   ]
      // }
    }
  }, 
  // mounted() {
  // 	this.$refs.uForm.setRules(this.rules);
  // },
  methods: {
    submit() {
      if(!uni.getStorageSync('vipUserInfo')){
        this.$u.route({
              url:"pages/vipLogin/vipLogin"
            });
      }
      //提交
      if (!this.form.title || !this.form.phone) {
        this.$refs.uToast.show({
          title: '请输入信息'
        })
        return
      }
      if (!/^1[3|4|5|7|8]\d{9}$/.test(this.form.phone)) {
        this.$refs.uToast.show({
          title: '请输入正确手机号'
        })
        return
      }
      let obj = {
        type: '专业顾问', // 分类
        proname: '专业顾问', // 产品名称
        name: uni.getStorageSync('vipUserInfo').username || '移动端客服', // 姓名
        phone: this.form.phone, // 电话
        remarks: this.form.title,
        status:'待审核',
        manager1:''
      }
      this.$axios.post(this.$api.createIntegrate, obj).then(res => {
        if (res.code == 200) {
          let data = {
            proid: '',
            type: '专业顾问', // 数据来源
            name: uni.getStorageSync('vipUserInfo').username || '移动端咨询', // 客户名称
            phone: this.form.phone, // 电话
            submitby: uni.getStorageSync('vipUserInfo').username || '未登录提交', // 提交人
            handler: 'all', // 处理人
            path: '/Integrate', // 跳转至综合服务
            read: 'false' // 是否已处理
          } 
          this.$axios.post(this.$api.createAgent, data).then(res => {
            if (res.code == 200) {
              this.$refs.uToast.show({
                title: "提交成功",
                type: "success",
              });
              this.form = {
                title: "",
                phone: "",
              };
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.demand {
  width: 100%;
  height: auto;
  padding: 20px 18px;
  background: #ffffff;
  border-radius: 8px;
  text-align: center;
}
.con-title {
  font-size: 18px;
  font-weight: 800;
}
.con-serve {
  font-size: 12px;
  padding-top: 10px;
}
.con-Btn {
  width: auto;
  height: 20px;
  line-height: 20px;
  box-sizing: border-box;
  padding: 0 7px;
  text-align: center;
  background: #fff4e6;
  border-radius: 20px;
  font-size: 12px;
  margin-right: 5px;
}
</style>
