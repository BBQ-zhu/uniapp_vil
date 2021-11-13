<template>
  <view class="demand">
    <view class="con-title">
      <span class="colorYellow">客户推荐</span>
    </view>
    <view class="con-serve">
      <span class="f14">
        累计推荐：
        <u-count-to
          :start-val="0"
          :end-val="55824"
          separator=","
          duration="3000"
          font-size="28"
          color="#45b2fd"
          bold
        ></u-count-to>
        次
      </span>
    </view>
    <view class="flex mt15">
      <view class="con-Btn greenBtn">+现金奖励</view>
      <view class="con-Btn greenBtn">+商城积分</view>
      <view class="con-Btn greenBtn">+合作升级</view>
      <view class="con-Btn greenBtn">+更多好礼</view>
    </view>
    <view>
      <u-form :model="form" ref="uForm" label-width="100rpx">
        <u-form-item
          label="客户需求"
          prop="title"
          :leftIconStyle="{ color: '#45b2fd', fontSize: '26rpx' }"
          left-icon="file-text"
          label-width="160"
        >
          <u-input v-model="form.title" placeholder="请输入客户需求" />
        </u-form-item>
        <u-form-item
          label="手机号码"
          prop="phone"
          :leftIconStyle="{ color: '#45b2fd', fontSize: '26rpx' }"
          left-icon="phone"
          label-width="160"
        >
          <u-input
            v-model="form.phone"
            type="number"
            placeholder="请输入手机号"
          />
        </u-form-item>
        <u-button
          class="mt15 greenBtn border50"
          type="warning"
          shape="square"
          @click="submit"
          >立即推荐</u-button
        >
      </u-form>
      <view class="flex flexAround mt10">
        <view>
          <u-icon name="integral-fill" size="26" class="colorBlue mr5"></u-icon
          >信息安全
        </view>
        <view>
          <u-icon name="heart-fill" size="26" class="colorBlue mr5"></u-icon
          >官方服务
        </view>
        <view>
          <u-icon name="bell-fill" size="26" class="colorBlue mr5"></u-icon
          >服务透明
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
        title: "",
        phone: "",
      },
    };
  },
  methods: {
    submit() {
      //提交
      if (!this.form.title || !this.form.phone) {
        this.$refs.uToast.show({
          title: "请输入信息",
        });
        return;
      }
      if (!/^1[3|4|5|7|8]\d{9}$/.test(this.form.phone)) {
        this.$refs.uToast.show({
          title: "请输入正确手机号",
        });
        return;
      }
      let obj = {
        type: "推荐客户", // 分类
        proname: '推荐客户', // 产品名称
        name: uni.getStorageSync('vipUserInfo').username || '前端提交客户', // 姓名
        phone: this.form.phone, // 电话
        remarks: this.form.title,
      };
      this.$axios.post(this.$api.createIntegrate, obj).then((res) => {
        if (res.code == 200) {
          let data = {
            proid: '',
            type: '推荐客户', // 数据来源
            name: uni.getStorageSync('vipUserInfo').username || '前端咨询', // 客户名称
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
      });
    },
  },
};
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
  color: white;
  // background: #f7d680;
  border-radius: 20px;
  font-size: 12px;
  margin-right: 5px;
}
</style>
