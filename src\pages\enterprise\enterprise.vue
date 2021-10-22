<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="企业申请"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>
    <view class="content">
      <u-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <div class="flexCenter">
          <u-form-item label="业务类型:" prop="type">
            <u-input
              type="select"
              :select-open="option.typeShow"
              v-model="ruleForm.type"
              placeholder="请选择业务类型"
              @click="option.typeShow = true"
            ></u-input>
            <u-action-sheet @click="typeChange" v-model="option.typeShow" :list="option.type"></u-action-sheet>
          </u-form-item>
          <u-form-item label="企业名称:" prop="entername">
            <u-input v-model="ruleForm.entername" placeholder="请输入企业名称"></u-input>
          </u-form-item>
          <u-form-item label="负责人姓名:" prop="name">
            <u-input v-model="ruleForm.name" placeholder="请输入负责人姓名"></u-input>
          </u-form-item>
          <u-form-item label="负责人电话:" prop="phone">
            <u-input v-model="ruleForm.phone" placeholder="请输入负责人电话"></u-input>
          </u-form-item>
          <u-form-item label="法人:" prop="gener">
            <u-input v-model="ruleForm.gener" placeholder="请输入法人"></u-input>
          </u-form-item>
          <u-form-item label="主营项目:" prop="main">
            <u-input v-model="ruleForm.main" placeholder="请输入主营项目"></u-input>
          </u-form-item>
          <u-form-item label="客户经理:" prop="manager1">
            <u-input v-model="ruleForm.manager1" placeholder="请输入客户经理工号"></u-input>
          </u-form-item>
          <u-form-item label="权证经理:" prop="manager2">
            <u-input v-model="ruleForm.manager2" placeholder="请输入权证经理工号"></u-input>
          </u-form-item>
          <u-form-item label="审核经理:" prop="manager3">
            <u-input v-model="ruleForm.manager3" placeholder="请输入审核经理工号"></u-input>
          </u-form-item>
          <u-form-item label="审核状态:" prop="status">
            <u-input disabled v-model="ruleForm.status" placeholder="待审核"></u-input>
          </u-form-item>
        </div>
      </u-form>
    </view>
    <u-button hover-class="none" type="primary" class="footer" @click="submit">提交申请</u-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        type: '', //代理记账、企业注册
        entername: '', //企业名称
        name: '', //负责人姓名
        phone: '', //负责人电话
        gener: '', //法人
        zone: '', //区域
        fund: '', //注册资金
        super: '', //公司监事
        main: '', //主营项目
        scope: '', //经营范围
        accout: '', //天府通账号
        manager1: '', //客户经理
        manager2: '', //权证经理
        manager3: '', //审核经理
        status: '', //审核状态
        remarks: '' //备注
      },
      option: {
        typeShow: false,
        type: [
          {
            text: '代理记账'
          },
          {
            text: '企业注册'
          }
        ]
      }
    }
  },
  methods: {
    typeChange(index) {
      this.ruleForm.type = this.option.type[index].text
    },
    submit() {
      if (
        !this.ruleForm.type ||
        !this.ruleForm.name ||
        !this.ruleForm.phone ||
        !this.ruleForm.entername
      ) {
        uni.showToast({
          title: '请输入信息',
          icon: 'none'
        })
        return
      }
      if (!this.ruleForm.manager1 || !this.ruleForm.manager2) {
        uni.showToast({
          title: '请输入客户经理和权证经理',
          icon: 'none'
        })
        return
      }
      this.$axios.post(this.$api.createEnterprise, this.ruleForm).then(res => {
        if (res.code == 200) {
          let data = {
            proid: 'new',
            type: '提交-企业资料', // 数据来源
            name: this.ruleForm.name, // 客户名称
            phone: this.ruleForm.phone, // 电话
            submitby: this.ruleForm.manager1, // 提交人
            handler: this.ruleForm.manager2, // 处理人
            path: '/Enterprise', // 跳转企业资料
            read: 'false' // 是否已处理
          }
          this.$axios.post(this.$api.createAgent, data).then(res => {
            if (res.code == 200) {
              uni.showToast({
                title: '提交成功',
                icon: 'none'
              })
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1
                })
              }, 1000)
            }
          })
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
