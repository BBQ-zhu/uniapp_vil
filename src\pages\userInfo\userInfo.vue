<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="个人资料"
      title-color="#fff"
      :background="{backgroundImage:'linear-gradient(to right bottom,#46e3c4,#3cc8c9)'}"
    ></u-navbar>
    <view class="content">
      <view class="flexCenter mt10">
        <u-image width="150" height="150" :src="ruleForm.imgurl"></u-image>
      </view>
      <u-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <div class="flexCenter">
          <u-form-item label="工号:" prop="uid">
            <u-input v-model="ruleForm.uid" disabled placeholder="请完善员工ID"></u-input>
          </u-form-item>
          <u-form-item label="姓名:" prop="username">
            <u-input v-model="ruleForm.username" disabled placeholder="请完善员工姓名"></u-input>
          </u-form-item>
          <u-form-item label="团队:" prop="team">
            <u-input v-model="ruleForm.team" disabled placeholder="请完善所在团队"></u-input>
          </u-form-item>
          <u-form-item label="角色:" prop="role">
            <u-input v-model="ruleForm.role" disabled placeholder="请完善员工角色"></u-input>
          </u-form-item>
          <u-form-item label="电话:" prop="phone">
            <u-input v-model="ruleForm.phone" disabled placeholder="请完善员工电话"></u-input>
          </u-form-item>
          <u-form-item label="身份证:" prop="idcard">
            <u-input v-model="ruleForm.idcard" disabled placeholder="请完善身份证"></u-input>
          </u-form-item>
          <u-form-item label="常住址:" prop="address">
            <u-input v-model="ruleForm.address" disabled placeholder="请完善常住址"></u-input>
          </u-form-item>
        </div>
      </u-form>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        imgurl: '',
        uid: '',
        team: '',
        username: '',
        role: '',
        phone: '',
        idcard: '', //身份证
        address: '', //家庭住址
        time: ''
      }
    }
  },
  onLoad(){
    this.findUser()
  },
  methods: {
    findUser() {
      var data = {
        skip: 0,
        limit: 1,
        fuzz: 'phone',
        input: uni.getStorageSync('userInfo').phone
      }
      this.$axios.post(this.$api.findUser, data).then(res => {
        if(res.code == 200){
          this.ruleForm = res.data[0].data[0]
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
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
  z-index: 2;
  box-shadow: 0 20upx 40upx -16upx #909399;
  box-shadow: 1px 2px 5px #909399;
  background: linear-gradient(to right, #46e3c4, #3cc8c9, #46e3c4);
}
::v-deep .u-input__right-icon__item {
  margin-left: -13px;
}
.content {
  padding: 10px 14px;
  margin-bottom: 50px;
}
</style>
