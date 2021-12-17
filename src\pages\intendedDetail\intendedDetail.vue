<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="意向客户"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>
    <view class="content">
      <u-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <view class="flexCenter">
          <u-form-item label="客户姓名:" prop="name">
            <u-input v-model="ruleForm.name" placeholder="请输入客户姓名"></u-input>
          </u-form-item>
          <u-form-item label="客户电话:" prop="phone">
            <u-input v-model="ruleForm.phone" placeholder="请输入客户电话"></u-input>
          </u-form-item>
          <u-form-item label="业务类型:" prop="proname">
            <u-input
              type="select"
              :select-open="option.pronameShow"
              v-model="ruleForm.proname"
              placeholder="请选择业务类型"
              @click="option.pronameShow = true"
            ></u-input>
            <u-action-sheet
              @click="pronameChange"
              v-model="option.pronameShow"
              :list="option.proname"
            ></u-action-sheet>
          </u-form-item>

          <span v-if="ruleForm.proname == '金融客户'">
            <u-form-item label="职业类型:" prop="hires">
              <u-input
                type="select"
                :select-open="option.hiresShow"
                v-model="ruleForm.hires"
                placeholder="请选择职业类型"
                @click="option.hiresShow = true"
              ></u-input>
              <u-action-sheet @click="hiresChange" v-model="option.hiresShow" :list="option.hires"></u-action-sheet>
            </u-form-item>
            <u-form-item label="是否有房:" prop="houses">
              <u-input
                type="select"
                :select-open="option.housesShow"
                v-model="ruleForm.houses"
                placeholder="请选择是否有房"
                @click="option.housesShow = true"
              ></u-input>
              <u-action-sheet
                @click="housesChange"
                v-model="option.housesShow"
                :list="option.houses"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="是否有车:" prop="car">
              <u-input
                type="select"
                :select-open="option.carShow"
                v-model="ruleForm.car"
                placeholder="请选择是否有车"
                @click="option.carShow = true"
              ></u-input>
              <u-action-sheet @click="carChange" v-model="option.carShow" :list="option.car"></u-action-sheet>
            </u-form-item>
            <u-form-item label="是否有商保:" prop="policy">
              <u-input
                type="select"
                :select-open="option.policyShow"
                v-model="ruleForm.policy"
                placeholder="请选择是否有商保"
                @click="option.policyShow = true"
              ></u-input>
              <u-action-sheet
                @click="policyChange"
                v-model="option.policyShow"
                :list="option.policy"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="是否有社保:" prop="social">
              <u-input
                type="select"
                :select-open="option.socialShow"
                v-model="ruleForm.social"
                placeholder="请选择是否有社保"
                @click="option.socialShow = true"
              ></u-input>
              <u-action-sheet
                @click="socialChange"
                v-model="option.socialShow"
                :list="option.social"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="是否有公积金:" prop="provident">
              <u-input
                type="select"
                :select-open="option.providentShow"
                v-model="ruleForm.provident"
                placeholder="请选择是否有公积金"
                @click="option.providentShow = true"
              ></u-input>
              <u-action-sheet
                @click="providentChange"
                v-model="option.providentShow"
                :list="option.provident"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="芝麻分:" prop="sesame">
              <u-input
                type="select"
                :select-open="option.sesameShow"
                v-model="ruleForm.sesame"
                placeholder="请选择芝麻分"
                @click="option.sesameShow = true"
              ></u-input>
              <u-action-sheet
                @click="sesameChange"
                v-model="option.sesameShow"
                :list="option.sesame"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="微粒贷:" prop="microcredit">
              <u-input
                type="select"
                :select-open="option.microcreditShow"
                v-model="ruleForm.microcredit"
                placeholder="请选择"
                @click="option.microcreditShow = true"
              ></u-input>
              <u-action-sheet
                @click="microcreditChange"
                v-model="option.microcreditShow"
                :list="option.microcredit"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="是否有信用卡:" prop="credit">
              <u-input
                type="select"
                :select-open="option.creditShow"
                v-model="ruleForm.credit"
                placeholder="请选择"
                @click="option.creditShow = true"
              ></u-input>
              <u-action-sheet
                @click="creditChange"
                v-model="option.creditShow"
                :list="option.credit"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="是否有烟草证:" prop="tobacco">
              <u-input
                type="select"
                :select-open="option.tobaccoShow"
                v-model="ruleForm.tobacco"
                placeholder="请选择"
                @click="option.tobaccoShow = true"
              ></u-input>
              <u-action-sheet
                @click="tobaccoChange"
                v-model="option.tobaccoShow"
                :list="option.tobacco"
              ></u-action-sheet>
            </u-form-item>
          </span>
          <span v-if="ruleForm.proname == '企业客户'">
            <u-form-item label="企服类型:" prop="comtype">
              <u-input
                type="select"
                :select-open="option.comtypeShow"
                v-model="ruleForm.comtype"
                placeholder="请选择"
                @click="option.comtypeShow = true"
              ></u-input>
              <u-action-sheet
                @click="comtypeChange"
                v-model="option.comtypeShow"
                :list="option.comtype"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item v-if="ruleForm.comtype == '其他服务'" label="其他服务:" prop="othercomtype">
              <u-input v-model="ruleForm.othercomtype" placeholder="其他服务"></u-input>
            </u-form-item>
          </span>

          <u-form-item label="客户经理:" prop="manager1">
            <u-input
              v-model="ruleForm.manager1"
              @focus="findUser('manager1', ruleForm.manager1)"
              placeholder="请输入客户经理工号"
            ></u-input>
          </u-form-item>
          <u-form-item v-if="ruleForm.manager2" label="金融客服:" prop="manager2">
            <u-input
              v-model="ruleForm.manager2"
              disabled
              @focus="findUser('manager2', ruleForm.manager2)"
              placeholder="请输入金融客服工号"
            ></u-input>
          </u-form-item>
          <u-form-item label="客户状态:" prop="vipstatus">
            <u-input disabled v-model="ruleForm.vipstatus" placeholder="客户状态"></u-input>
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
    <view class="footerBox flexCenter">
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
      >提交资料</u-button>
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
        type: '意向客户',
        proname: '', // 产品类型
        name: '', //提交人姓名
        phone: '', //提交人电话
        manager1: '', //客户经理
        manager2: '', //金融客服
        hires: '', //职业类型
        social: '', //社保情况
        provident: '', //公积金情况
        houses: '', //房屋情况
        car: '', //车辆情况
        policy: '', //保险情况
        sesame: '', //芝麻分
        microcredit: '', //微粒贷
        credit: '', //信用卡
        tobacco: '', //是否有烟草证
        comtype: '', //企业客户类型 公司注册、代理记账、商标注册、其他服务
        othercomtype: '', //其他服务补充
        vipstatus: '新客户', //客户状态 新客户、正在跟进、邀约上面、上门签单、办理成功、拒绝客户、放弃客户
        status: '草稿', //审核状态 草稿、待审核、审核中、驳回、拒绝、通过、审核结束
        feedback: '', //审批反馈
        schedate:0,
        remarks: '',
        time: ''
      },
      option: {
        comtypeShow: false,
        comtype: [
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
        ],
        pronameShow: false,
        proname: [
          {
            text: '金融客户'
          },
          {
            text: '企业客户'
          }
        ],
        hiresShow: false,
        hires: [
          {
            text: '企业主'
          },
          {
            text: '个体户'
          },
          {
            text: '公务员'
          },
          {
            text: '上班族'
          },
          {
            text: '自由职业'
          },
          {
            text: '无固定职业'
          }
        ],
        socialShow: false,
        social: [
          {
            text: '无社保'
          },
          {
            text: '未满6个月'
          },
          {
            text: '6个月以上'
          }
        ],
        providentShow: false,
        provident: [
          {
            text: '无公积金'
          },
          {
            text: '未满6个月'
          },
          {
            text: '6个月以上'
          }
        ],
        housesShow: false,
        houses: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        carShow: false,
        car: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        policyShow: false,
        policy: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        sesameShow: false,
        sesame: [
          {
            text: '无芝麻分'
          },
          {
            text: '小于600分'
          },
          {
            text: '600分~700分'
          },
          {
            text: '大于700分'
          }
        ],
        microcreditShow: false,
        microcredit: [
          {
            text: '无微粒贷'
          },
          {
            text: '小于1千'
          },
          {
            text: '1千~2千'
          },
          {
            text: '2千~5千'
          },
          {
            text: '5千~1万'
          },
          {
            text: '大于1万'
          }
        ],
        creditShow: false,
        credit: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        tobaccoShow: false,
        tobacco: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ]
      }
    }
  },
  onLoad(option) {
    if (option.data) {
      this.ruleForm = JSON.parse(option.data)
      this.isNew = false
    } else {
      this.isNew = true
    }
    // this.findTeams()
  },
  methods: {
    // findTeams() {
    //   //查询团队
    //   this.$axios.post(this.$api.findTeam).then(res => {
    //     if (res.code == 200) {
    //       this.teamList = []
    //       let arr = res.data || []
    //       arr.map(item => {
    //         let obj = {}
    //         obj.value = item.teamname
    //         obj.label = item.teamname
    //         this.teamList.push(obj)
    //       })
    //     }
    //   })
    // },
    //点击员工查询输入框
    findUser(name, value) {
      this.UserCheck.userShow = true
      this.UserCheck.name = name
      this.UserCheck.value = value
    },
    cellChange(item) {
      this.UserCheck.userShow = false
      this.ruleForm[this.UserCheck.name] = item.uid
    },

    async submit(type) {
      if (!this.ruleForm.name || !this.ruleForm.phone) {
        uni.showToast({
          title: '请输入客户姓名和电话',
          icon: 'none'
        })
        return
      }
      if (!/^1[3|4|5|7|8]\d{9}$/.test(this.ruleForm.phone)) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }
      if (!this.ruleForm.proname) {
        uni.showToast({
          title: '请选择业务类型',
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
        this.ruleForm.schedate = 0
      }
      if (type == 'submit') {
        this.ruleForm.status = '待审核'
        this.ruleForm.schedate = 7
      }
      if (this.isNew) {
        await this.$axios
          .post(this.$api.createIntegrate, this.ruleForm)
          .then(res => {
            if (type == 'submit' && res.code == 200) {
              let data = {
                proid: 'new',
                type: '提交-意向客户资料', // 数据来源
                name: this.ruleForm.name, // 客户名称
                phone: this.ruleForm.phone, // 电话
                submitby: this.ruleForm.manager1, // 提交人
                handler: this.ruleForm.manager2, // 处理人
                path: '/Integrate', // 跳转企业资料
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
      } else {
        this.$axios.post(this.$api.updateIntegrate, this.ruleForm).then(res => {
          if (res.code == 200) {
            uni.showToast({
              title: '提交成功',
              icon: 'none'
            })
          }
        })
      }
      let userInfo = uni.getStorageSync('userInfo')
      let dataLogs = {
        user: `${userInfo.username}(${userInfo.uid})`,
        logdata: JSON.stringify(this.ruleForm),
        remarks: `移动端-${this.isNew ? '新增' : '修改'}-意向客户资料`
      }
      this.$axios.post(this.$api.createlogs, dataLogs) //创建日志
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/internal/internal'
        })
      }, 1000)
    },

    pronameChange(index) {
      this.ruleForm.proname = this.option.proname[index].text
    },
    hiresChange(index) {
      this.ruleForm.hires = this.option.hires[index].text
    },
    socialChange(index) {
      this.ruleForm.social = this.option.social[index].text
    },
    providentChange(index) {
      this.ruleForm.provident = this.option.provident[index].text
    },
    housesChange(index) {
      this.ruleForm.houses = this.option.houses[index].text
    },
    carChange(index) {
      this.ruleForm.car = this.option.car[index].text
    },
    policyChange(index) {
      this.ruleForm.policy = this.option.policy[index].text
    },
    sesameChange(index) {
      this.ruleForm.sesame = this.option.sesame[index].text
    },
    microcreditChange(index) {
      this.ruleForm.microcredit = this.option.microcredit[index].text
    },
    creditChange(index) {
      this.ruleForm.credit = this.option.credit[index].text
    },
    tobaccoChange(index) {
      this.ruleForm.tobacco = this.option.tobacco[index].text
    },
    comtypeChange(index) {
      this.ruleForm.comtype = this.option.comtype[index].text
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
