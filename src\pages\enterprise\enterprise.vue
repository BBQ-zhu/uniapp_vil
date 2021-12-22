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
        <view class="flexCenter">
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
          <u-form-item label="身份证号:" prop="idcard">
            <u-input v-model="ruleForm.idcard" placeholder="请输入身份证号"></u-input>
          </u-form-item>
          <u-form-item label="法人名称:" prop="gener">
            <u-input v-model="ruleForm.gener" placeholder="请输入法人名称"></u-input>
          </u-form-item>
          <u-form-item label="主营业务:" prop="main">
            <u-input v-model="ruleForm.main" placeholder="请输入主营业务"></u-input>
          </u-form-item>
          <u-form-item label="归属团队:" prop="hometeam">
            <u-input v-model="ruleForm.hometeam" placeholder="请选择归属团队" @focus="teamisShow = true"></u-input>
            <u-select
              v-model="teamisShow"
              mode="single-column"
              :list="teamList"
              @confirm="teamconfirm"
            ></u-select>
          </u-form-item>
          <u-form-item label="客户经理:" prop="manager1">
            <u-input
              v-model="ruleForm.manager1"
              @focus="findUser('manager1', ruleForm.manager1)"
              placeholder="请输入客户经理工号"
            ></u-input>
          </u-form-item>
          <u-form-item v-if="ruleForm.manager2" label="客服经理:" prop="manager2">
            <u-input
              v-model="ruleForm.manager2"
              disabled
              @focus="findUser('manager2', ruleForm.manager2)"
              placeholder="请输入客服经理工号"
            ></u-input>
          </u-form-item>
          <u-form-item v-if="ruleForm.manager3" label="代办客服:" prop="manager3">
            <u-input
              v-model="ruleForm.manager3"
              disabled
              @focus="findUser('manager3', ruleForm.manager3)"
              placeholder="请输入代办客服工号"
            ></u-input>
          </u-form-item>
          <u-form-item label="审核状态:" prop="status">
            <u-input disabled v-model="ruleForm.status" placeholder="审核状态"></u-input>
          </u-form-item>
          <view
            v-if="ruleForm.feedback"
            class="mt10 flexBetween"
            style="width:85%;margin-left:8.5%;font-size:15px;"
          >
            <view style="width:35%">审批反馈:</view>
            <view style="width:65%">{{ruleForm.feedback}}</view>
          </view>
        </view>
      </u-form>
    </view>
    <userList :UserCheck="UserCheck" @cellChange="cellChange"></userList>
    <view  v-if="only != 'true'" class="footerBox flexCenter">
      <u-button
        v-if="ruleForm.status =='草稿'"
        hover-class="none"
        type="primary"
        class="footer yellowBtn"
        @click="submit('save')"
      >保存草稿</u-button>
      <!-- 草稿、待审核、审核中、驳回、拒绝、通过、审核结束 -->
      <u-button
        v-if="ruleForm.status =='草稿' || ruleForm.status =='驳回'"
        hover-class="none"
        type="primary"
        class="footer"
        @click="submit('submit')"
      >提交申请</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isNew: false, //是否是新增
      teamList: [], //归属团队
      teamisShow: false,
      UserCheck: {
        //当前选择的输入框信息
        userShow: false,
        name: '',
        value: ''
      },
      ruleForm: {
        type: '', //代理记账、企业注册
        entername: '', //企业名称
        name: '', //负责人姓名
        phone: '', //负责人电话
        idcard: '', //负责人身份证
        gener: '', //法人
        zone: '', //区域
        fund: '', //注册资金
        super: '', //公司监事
        main: '', //主营项目
        scope: '', //经营范围
        accout: '', //天府通账号
        hometeam: '', //归属团队
        manager1: '', //客户经理
        manager2: '', //客服经理
        manager3: '', //代办客服
        status: '草稿', //审核状态 草稿、待审核、审核中、驳回、拒绝、通过、审核结束
        feedback: '', //反馈消息
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
          },
          {
            text: '商标注册'
          },
          {
            text: '公司变更'
          },
          {
            text: '公司注销'
          },
          {
            text: '许可证办理'
          },
          {
            text: '道路运输'
          },
          {
            text: '建筑资质'
          },
          {
            text: '网站建设'
          },
          {
            text: '其他服务'
          }
        ]
      },
      only:false
    }
  },
  onLoad(option) {
    this.only = option.only
    if (option.data) {
      this.ruleForm = JSON.parse(option.data)
      this.isNew = false
    } else {
      this.isNew = true
    }
    this.findTeams()
  },
  methods: {
    findTeams() {
      //查询团队
      this.$axios.post(this.$api.findTeam).then(res => {
        if (res.code == 200) {
          this.teamList = []
          let arr = res.data || []
          arr.map(item => {
            let obj = {}
            obj.value = item.teamname
            obj.label = item.teamname
            this.teamList.push(obj)
          })
        }
      })
    },
    //点击员工查询输入框
    findUser(name, value) {
      this.UserCheck.userShow = true
      this.UserCheck.name = name
      this.UserCheck.value = value
    },
    //现居城市切换
    teamconfirm(e) {
      this.ruleForm.hometeam = e[0].value
    },
    //
    cellChange(item) {
      this.UserCheck.userShow = false
      this.ruleForm[this.UserCheck.name] = item.uid
    },
    typeChange(index) {
      this.ruleForm.type = this.option.type[index].text
    },
    async submit(type) {
      if (!this.ruleForm.type) {
        uni.showToast({
          title: '请选择业务类型',
          icon: 'none'
        })
        return
      }
      if (!this.ruleForm.entername) {
        uni.showToast({
          title: '请输入企业名称',
          icon: 'none'
        })
        return
      }
      if (!this.ruleForm.name || !this.ruleForm.phone) {
        uni.showToast({
          title: '请输入负责人姓名和电话',
          icon: 'none'
        })
        return
      }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.ruleForm.phone)) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }
      if (this.ruleForm.idcard.length != 18) {
        uni.showToast({
          title: '请输入正确身份证号',
          icon: 'none'
        })
        return
      }
      if (!this.ruleForm.manager1) {
        uni.showToast({
          title: '请输入客户经理',
          icon: 'none'
        })
        return
      }
      if (type == 'save') {
        this.ruleForm.status = '草稿'
      }
      if (this.isNew) {
        var data = {
          skip: 0,
          limit: 9,
          category: '全部客户',
          fuzz: 'phone',
          input: this.ruleForm.phone
        }
        let res = await this.$axios.post(this.$api.findEnterprise, data)
        if (res.code == 200) {
          let tableData = res.data[0].data
          if (tableData.length != 0) {
            let val = tableData[0]
            let valtime = val.time.split(' ')[0]
            let time = `${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`
            if (valtime == time) {
              uni.showToast({
                title: '该客户今日已被'+val.manager1+'提交',
                icon: 'none'
              })
              return
            }
          }
        }
        if (type == 'submit') {
          this.ruleForm.status = '待审核'
        }
        this.$axios
          .post(this.$api.createEnterprise, this.ruleForm)
          .then(res => {
            if (type == 'submit' && res.code == 200) {
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
                }
              })
            }
          })
          .catch(() => {
            this.ruleForm.status = '草稿'
          })
      } else {
        if (type == 'submit') {
          this.ruleForm.status = '待审核'
        }
        this.$axios
          .post(this.$api.updateEnterprise, this.ruleForm)
          .then(res => {
            if (res.code == 200) {
              uni.showToast({
                title: '提交成功',
                icon: 'none'
              })
            }
          })
          .catch(() => {
            this.ruleForm.status = '草稿'
          })
      }
      let userInfo = uni.getStorageSync('userInfo')
      let dataLogs = {
        user: `${userInfo.username}(${userInfo.uid})`,
        logdata: JSON.stringify(this.ruleForm),
        remarks: `移动端-${this.isNew ? '新增' : '修改'}-企业客户资料`
      }
      this.$axios.post(this.$api.createlogs, dataLogs) //创建日志
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/internal/internal'
        })
      }, 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
.footerBox {
  width: 80%;
  position: fixed;
  bottom: 10px;
  left: 10%;
  z-index: 2;
}
.footer {
  width: 40%;
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  text-align: center;
  font-weight: 600;
  color: #fff;
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
