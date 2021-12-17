<script>
import fixedInfo from '../../common/js/fixedInfo.js'
export default {
  data() {
    return {
      listShow1: false,
      listShow2: false,
      listShow3: false,
      listShow4: false,
      listShow5: false,
      listShow6: false,
      listShow7: false,
      listShow8: false,
      listShow9: false,
      listShow10: false,
      teamList: [],
      UserCheck: {
        //当前选择的输入框信息
        userShow: false,
        name: '',
        value: ''
      },
      userShow: false, //用户列表选择显示
      isNew: true, //是否是新增
      teamisShow: false, //团队选择
      isShow: false, // 现居城市
      ruleForm: {
        name: '', //姓名
        phone: '', //电话
        idcard: '', //身份证
        age: '', //年龄
        fund: '', //需求资金
        utility: '', //用途
        tenor: '', //贷款期限
        matrimony: '', //婚姻状况
        children: '', //是否有子女
        knowing: '', //已婚配偶是否已知晓
        domicile: '', //户籍所在地
        address: ['四川省', '绵阳市'], //现居城市
        addressdetail: '', //详细地址
        hires: '', //职业类型
        unit: '', //工作单位名称
        unitposition: '', //工作岗位
        unitadress: '', //单位地址
        unitphone: '', //单位电话
        entrytime: '', //入职时间
        revenue: '', //月收入
        social: '', //是否购买社保
        provident: '', //是否购买公积金、
        proyears: '', //公积金已缴存年限
        probase: '', //公积金已缴存基数
        socialyear: '', //社保缴存年限
        houses: '', //是否有房
        housesname: '', //小区名称
        houaddress: '', //小区位置
        housetime: '', //房屋购买时间
        housearea: '', //房屋面积
        housetype: '', //房屋类型：商品房、自建房
        houpayment: '', //全款还是按揭
        houmortgage: '', //是否已抵押
        houamount: '', //抵押贷款金额
        car: '', //是否有车
        carbrand: '', //车辆品牌
        caryear: '', //车辆购买时间
        carprice: '', //车辆评估价
        carpayment: '', //车辆全款还是按揭
        carema: '', //按揭剩余本金
        policy: '', //有无商业保单
        policyname: '', //投保公司名称
        policyear: '', //已投保年限
        policypre: '', //缴费金额
        paymentmethod: '', //缴费方式
        creditip: '', //征信是否白名单
        lawsuits: '', //是否有官司
        record: '', //是否有案底
        hobbies: '', //是否有不良嗜好
        contacts1: '', //紧急联系人1
        conphone1: '', //联系人电话1
        conrelat1: '', //联系人的关系1
        contacts2: '', //紧急联系人2
        conphone2: '', //联系人电话2
        conrelat2: '', //联系人的关系2
        contacts3: '', //紧急联系人3
        conphone3: '', //联系人电话3
        conrelat3: '', //联系人的关系3
        contacts4: '', //紧急联系人4
        conphone4: '', //联系人电话4
        conrelat4: '', //联系人的关系4
        hometeam: '', //归属团队
        manager1: '', //客户经理
        manager2: '', //金融客服
        manager3: '', //代办客服
        status: '草稿', //审核状态
        remarks: '', //备注信息
        time: '', //创建时间
        sesame: '', //芝麻分
        microcredit: '', //微粒贷
        credit: '', //信用卡
        invoicing: '', //年开票金额
        paying: '', //年缴税金额
        enterprise: '', //法人/股东变更
        ticket: '', //法人/股东占股
        identity: '', //法人/股东
        establishment: '', //企业成立时间
        taxrecord: '', //开票记录
        grade: '', //纳税等级
        tobacco: '', //是否有烟草证
        tobaccotime: '', //烟草证办证时间
        volumesmoke: '', //烟草证月开烟量
        tobaccorank: '', //烟草证等级
        feedback: '', //审批反馈
        productList: [], //匹配产品列表
        recomMony: 0 //匹配产品最高可贷金额
      },
      fixedInfo: fixedInfo, //选项配置
      option: {
        // 年开票额
        invoicingShow: false,
        invoicing: [
          {
            text: '小于50万'
          },
          {
            text: '50万~100万'
          },
          {
            text: '100万~200万'
          },
          {
            text: '大于200万'
          }
        ],
        // 开票记录
        taxrecordShow: false,
        taxrecord: [
          {
            text: '小于6个月'
          },
          {
            text: '6个月~12个月'
          },
          {
            text: '大于12个月'
          }
        ],
        // 纳税等级
        gradeShow: false,
        grade: [
          {
            text: 'A级'
          },
          {
            text: 'B级'
          },
          {
            text: 'C级'
          },
          {
            text: 'D级'
          },
          {
            text: 'M级'
          }
        ],
        // 年纳税金额
        payingShow: false,
        paying: [
          {
            text: '小于20万'
          },
          {
            text: '20万~50万'
          },
          {
            text: '大于50万'
          }
        ],
        // 法人/股东
        identityShow: false,
        identity: [
          {
            text: '法人'
          },
          {
            text: '股东'
          }
        ],
        // 企业成立时间
        establishmentShow: false,
        establishment: [
          {
            text: '小于3个月'
          },
          {
            text: '3个月~6个月'
          },
          {
            text: '6个月~1年'
          },
          {
            text: '1年~2年'
          },
          {
            text: '大于两年'
          }
        ],
        //法人/股东变更
        enterpriseShow: false,
        enterprise: [
          {
            text: '小于1年'
          },
          {
            text: '大于1年'
          }
        ],
        //法人/股东占股
        ticketShow: false,
        ticket: [
          {
            text: '小于10%'
          },
          {
            text: '大于10%'
          }
        ],
        // 办证时间
        tobaccotimeShow: false,
        tobaccotime: [
          {
            text: '小于1年'
          },
          {
            text: '大于1年'
          }
        ],
        // 月开烟量
        volumesmokeShow: false,
        volumesmoke: [
          {
            text: '小于5千元'
          },
          {
            text: '5千元~8千元'
          },
          {
            text: '大于8千元'
          }
        ],
        //烟草证等级
        tobaccorankShow: false,
        tobaccorank: [
          {
            text: '小于7档'
          },
          {
            text: '7档~10档'
          },
          {
            text: '大于10档'
          }
        ],
        paymentmethodShow: false,
        paymentmethod: [
          {
            text: '年缴'
          },
          {
            text: '月缴'
          }
        ],
        policyearShow: false,
        policyear: [
          {
            text: '半年以上'
          },
          {
            text: '一年以上'
          },
          {
            text: '两年以上'
          }
        ],
        statusShow: false,
        status: [
          {
            text: '草稿'
          },
          {
            text: '待审核'
          },
          {
            text: '驳回'
          },
          {
            text: '通过'
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
        ],
        enterpriseShow: false,
        enterprise: [
          {
            text: '小于1年'
          },
          {
            text: '大于1年'
          }
        ],
        ticketShow: false,
        ticket: [
          {
            text: '小于10%'
          },
          {
            text: '大于10%'
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
        matrimonyShow: false,
        matrimony: [
          {
            text: '已婚'
          },
          {
            text: '未婚'
          },
          {
            text: '离异'
          },
          {
            text: '丧偶'
          }
        ],
        knowingShow: false,
        knowing: [
          {
            text: '知晓'
          },
          {
            text: '不知晓'
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
        housetypeShow: false,
        housetype: [
          {
            text: '商品房'
          },
          {
            text: '商铺'
          },
          {
            text: '公寓'
          },
          {
            text: '安置房'
          },
          {
            text: '自建房'
          }
        ],
        houpaymentShow: false,
        houpayment: [
          {
            text: '全款'
          },
          {
            text: '按揭'
          },
          {
            text: '抵押'
          }
        ],
        houmortgageShow: false,
        houmortgage: [
          {
            text: '已抵押'
          },
          {
            text: '未抵押'
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
        carpaymentShow: false,
        carpayment: [
          {
            text: '全款'
          },
          {
            text: '按揭'
          },
          {
            text: '抵押'
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
        creditipShow: false,
        creditip: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        lawsuitsShow: false,
        lawsuits: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        recordShow: false,
        record: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        hobbiesShow: false,
        hobbies: [
          {
            text: 'A级'
          },
          {
            text: 'B级'
          },
          {
            text: 'C级'
          },
          {
            text: 'D级'
          }
        ],
        conrelat1Show: false,
        conrelat1: [
          {
            text: '配偶'
          },
          {
            text: '直系亲属'
          },
          {
            text: '朋友'
          },
          {
            text: '同事'
          }
        ],
        conrelat2Show: false,
        conrelat2: [
          {
            text: '配偶'
          },
          {
            text: '直系亲属'
          },
          {
            text: '朋友'
          },
          {
            text: '同事'
          }
        ],
        conrelat3Show: false,
        conrelat3: [
          {
            text: '配偶'
          },
          {
            text: '直系亲属'
          },
          {
            text: '朋友'
          },
          {
            text: '同事'
          }
        ],
        conrelat4Show: false,
        conrelat4: [
          {
            text: '配偶'
          },
          {
            text: '直系亲属'
          },
          {
            text: '朋友'
          },
          {
            text: '同事'
          }
        ]
      },
      itemStyle: {
        backgroundColor: '#fff'
      },
      headStyle: {
        marginTop: '10px',
        padding: '10px',
        borderLeft: '3px solid #11BBB8',
        boxShadow: '0 5px 5px -5px #dddcda'
      },
      bodyStyle: {
        padding: '10px',
        color: '#000',
        display: 'flex',
        justifyContent: 'center'
      }
    }
  },
  watch: {
    ruleForm: {
      handler(old, news) {
        // 判断一些字段是否填写，置空一些选项
        if (!this.ruleForm.houses || this.ruleForm.houses == '否') {
          this.ruleForm.housesname = '' //小区名称
          this.ruleForm.houaddress = '' //小区位置
          this.ruleForm.housetime = '' //房屋购买时间
          this.ruleForm.housearea = '' //房屋面积
          this.ruleForm.housetype = '' //房屋类型：商品房、自建房
          this.ruleForm.houpayment = '' //全款还是按揭
          this.ruleForm.houmortgage = '' //是否已抵押
          this.ruleForm.houamount = '' //抵押贷款金额
        }
        if (!this.ruleForm.car || this.ruleForm.car == '否') {
          this.ruleForm.carbrand = '' //车辆品牌
          this.ruleForm.caryear = '' //车辆购买时间
          this.ruleForm.carprice = '' //车辆评估价
          this.ruleForm.carpayment = '' //车辆全款还是按揭
          this.ruleForm.carema = '' //按揭剩余本金
        }
        if (!this.ruleForm.policy || this.ruleForm.policy == '否') {
          this.ruleForm.policyname = '' //投保公司名称
          this.ruleForm.policyear = '' //已投保年限
          this.ruleForm.policypre = '' //缴费金额
          this.ruleForm.paymentmethod = '' //缴费方式
        }
        if (!this.ruleForm.tobacco || this.ruleForm.tobacco == '否') {
          this.ruleForm.tobacco = '' //是否有烟草证
          this.ruleForm.tobaccotime = '' //烟草证办证时间
          this.ruleForm.volumesmoke = '' //烟草证月开烟量
          this.ruleForm.tobaccorank = '' //烟草证等级
        }
        if (
          !this.ruleForm.hires ||
          (this.ruleForm.hires != '企业主' && this.ruleForm.hires != '个体户')
        ) {
          this.ruleForm.invoicing = '' //年开票金额
          this.ruleForm.paying = '' //年缴税金额
          this.ruleForm.enterprise = '' //法人/股东变更
          this.ruleForm.ticket = '' //法人/股东占股
          this.ruleForm.identity = '' //法人/股东
          this.ruleForm.establishment = '' //企业成立时间
          this.ruleForm.taxrecord = '' //开票记录
          this.ruleForm.grade = '' //纳税等级
        }
      },
      immediate: true,
      deep: true,
      only:false
    }
  },
  onLoad(option) {
    this.only = option.only
    this.findTeams()
    if (option.data) {
      this.ruleForm = JSON.parse(option.data)
      this.isNew = false
    } else {
      this.isNew = true
    }
  },
  methods: {
    //点击员工查询输入框
    findUser(name, value) {
      this.UserCheck.userShow = true
      this.UserCheck.name = name
      this.UserCheck.value = value
    },
    //
    cellChange(item) {
      this.UserCheck.userShow = false
      this.ruleForm[this.UserCheck.name] = item.uid
    },
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
    // 校验电话号码
    checkNum(num) {},
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
          title: '请输入客户正确手机号',
          icon: 'none'
        })
        return
      }
      if (!this.ruleForm.manager1) {
        uni.showToast({
          title: '请在审核情况中添加客户经理',
          icon: 'none'
        })
        return
      }

      if (type == 'submit') {
        if (this.ruleForm.idcard.length != 18) {
          uni.showToast({
            title: '请输入正确身份证号',
            icon: 'none'
          })
          return
        }
        if (
          this.ruleForm.hires &&
          this.ruleForm.hires != '自由职业' &&
          this.ruleForm.hires != '无固定职业' &&
          !/^1[3|4|5|7|8]\d{9}$/.test(this.ruleForm.unitphone)
        ) {
          uni.showToast({
            title: '请输入正确单位手机号',
            icon: 'none'
          })
          return
        }
        if (
          (this.ruleForm.contacts1 &&
            !/^1[3|4|5|7|8]\d{9}$/.test(this.ruleForm.conphone1)) ||
          (this.ruleForm.contacts2 &&
            !/^1[3|4|5|7|8]\d{9}$/.test(this.ruleForm.conphone2)) ||
          (this.ruleForm.contacts3 &&
            !/^1[3|4|5|7|8]\d{9}$/.test(this.ruleForm.conphone3))
        ) {
          this.$message.error('请输入正确紧急联系人手机号')
          return
        }
        if (!this.ruleForm.hometeam) {
          uni.showToast({
            title: '请在审核情况中选择归属团队',
            icon: 'none'
          })
          return
        }
      }
      // 产品匹配
      await this.alignment(this.ruleForm)
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
        let res = await this.$axios.post(this.$api.findCustomer, data)
        if (res.code == 200) {
          let tableData = res.data[0].data
          if (tableData.length != 0) {
            let val = tableData[0]
            let valtime = val.time.split(' ')[0]
            let time = new Date().toLocaleDateString()
            if (valtime == time) {
              uni.showToast({
                title: '该用户今日已提交',
                icon: 'none'
              })
              return
            }
          }
        }
        if (type == 'submit') {
          this.ruleForm.status = '待审核'
        }
        this.$axios.post(this.$api.createCustomer, this.ruleForm).then(res => {
          if (res.code == 200) {
            let data = {
              proid: 'new',
              type: '提交-贷款客户', // 数据来源
              name: this.ruleForm.name, // 客户名称
              phone: this.ruleForm.phone, // 电话
              submitby: this.ruleForm.manager1, // 提交人
              handler: this.ruleForm.manager2, // 处理人
              path: '/Customer', // 跳转贷款客户
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
        }).catch(()=>{
          this.ruleForm.status = '草稿'
        })
      } else {
        if (type == 'submit') {
          this.ruleForm.status = '待审核'
        }
        this.$axios.post(this.$api.updateCustomer, this.ruleForm).then(res => {
          if (res.code == 200) {
            uni.showToast({
              title: '提交成功',
              icon: 'none'
            })
          }else{
            this.ruleForm.status = '草稿'
          }
        }).catch(()=>{
          this.ruleForm.status = '草稿'
        })
      }
      let userInfo = uni.getStorageSync('userInfo')
      let dataLogs = {
        user: `${userInfo.username}(${userInfo.uid})`,
        logdata: JSON.stringify(this.ruleForm),
        remarks: `移动端-${this.isNew ? '新增' : '修改'}-贷款客户资料`
      }
      this.$axios.post(this.$api.createlogs, dataLogs) //创建日志
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/internal/internal'
        })
      }, 1000)
    },
    //产品匹配方法
    async alignment(obj) {
      var data = {
        skip: 0,
        limit: 99999999,
        fuzz: 'cation',
        input: 'true'
      }
      await this.$axios
        .post(this.$api.findProduct, data)
        .then(res => {
          if (res.code == 200) {
            let arr = res.data[0].data
            this.recomList = []
            // 第一轮匹配：需求资金、贷款期限是否在范围内
            let newArr1 = []
            arr.map(item => {
              if (
                parseFloat(obj.fund) >= parseFloat(item.minamount) &&
                parseFloat(obj.fund) <= parseFloat(item.maxamount) &&
                parseFloat(obj.tenor) >= parseFloat(item.minterm) &&
                parseFloat(obj.tenor) <= parseFloat(item.maxterm)
              ) {
                newArr1.push(item)
              }
            })
            // 第二轮匹配：匹配特殊字段
            let recomList = []
            newArr1.map(item => {
              let check = []
              //根据匹配条件筛选值
              for (let val of item.match) {
                if (
                  typeof item[val] == 'object' &&
                  val != 'address' &&
                  obj[val]
                ) {
                  check.push(item[val].includes(obj[val]))
                } else if (val == 'address' && obj[val].length) {
                  check.push(
                    item[val][0] == obj[val][0] && item[val][1] == obj[val][1]
                  )
                } else if (val == 'age' && obj[val]) {
                  check.push(item[val] >= obj[val])
                } else if (val == 'revenue' && obj[val]) {
                  check.push(item[val] <= obj[val])
                } else if (obj[val]) {
                  check.push(item[val] == obj[val])
                }
              }
              if (item.key == '选中的都需要满足') {
                if (
                  check.every(item => {
                    return item == true
                  })
                ) {
                  recomList.push(item)
                }
              } else if (item.key == '选中的满足任意一条') {
                if (
                  check.some(item => {
                    return item == true
                  })
                ) {
                  recomList.push(item)
                }
              }
            })
            this.ruleForm.productList = []
            this.ruleForm.recomMony = 0
            recomList.map(item => {
              this.ruleForm.productList.push(item.name)
              this.ruleForm.recomMony += parseFloat(item.maxamount || 0) || 0
            })
          } else {
            this.$u.toast(`匹配产品失败`)
          }
        })
        .catch(() => {
          this.$u.toast(`匹配产品失败`)
        })
    },
    //现居城市切换
    confirm(e) {
      this.ruleForm.address = []
      this.ruleForm.address.push(e[0].value)
      this.ruleForm.address.push(e[1].value)
    },
    //归属团队
    teamconfirm(e) {
      this.ruleForm.hometeam = e[0].value
    },
    invoicingChange(index) {
      this.ruleForm.invoicing = this.option.invoicing[index].text
    },
    payingChange(index) {
      this.ruleForm.paying = this.option.paying[index].text
    },
    enterpriseChange(index) {
      this.ruleForm.enterprise = this.option.enterprise[index].text
    },
    ticketChange(index) {
      this.ruleForm.ticket = this.option.ticket[index].text
    },
    identityChange(index) {
      this.ruleForm.identity = this.option.identity[index].text
    },
    establishmentChange(index) {
      this.ruleForm.establishment = this.option.establishment[index].text
    },
    taxrecordChange(index) {
      this.ruleForm.taxrecord = this.option.taxrecord[index].text
    },
    gradeChange(index) {
      this.ruleForm.grade = this.option.grade[index].text
    },
    tobaccotimeChange(index) {
      this.ruleForm.tobaccotime = this.option.tobaccotime[index].text
    },
    volumesmokeChange(index) {
      this.ruleForm.volumesmoke = this.option.volumesmoke[index].text
    },
    tobaccorankChange(index) {
      this.ruleForm.tobaccorank = this.option.tobaccorank[index].text
    },
    policyearChange(index) {
      this.ruleForm.policyear = this.option.policyear[index].text
    },
    paymentmethodChange(index) {
      this.ruleForm.paymentmethod = this.option.paymentmethod[index].text
    },
    statusChange(index) {
      this.ruleForm.status = this.option.status[index].text
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
    enterpriseChange(index) {
      this.ruleForm.enterprise = this.option.enterprise[index].text
    },
    ticketChange(index) {
      this.ruleForm.ticket = this.option.ticket[index].text
    },
    socialChange(index) {
      this.ruleForm.social = this.option.social[index].text
    },
    matrimonyChange(index) {
      this.ruleForm.matrimony = this.option.matrimony[index].text
    },
    knowingChange(index) {
      this.ruleForm.knowing = this.option.knowing[index].text
    },
    hiresChange(index) {
      this.ruleForm.hires = this.option.hires[index].text
    },
    providentChange(index) {
      this.ruleForm.provident = this.option.provident[index].text
    },
    housesChange(index) {
      this.ruleForm.houses = this.option.houses[index].text
    },
    housetypeChange(index) {
      this.ruleForm.housetype = this.option.housetype[index].text
    },
    houpaymentChange(index) {
      this.ruleForm.houpayment = this.option.houpayment[index].text
    },
    houmortgageChange(index) {
      this.ruleForm.houmortgage = this.option.houmortgage[index].text
    },
    carChange(index) {
      this.ruleForm.car = this.option.car[index].text
    },
    carpaymentChange(index) {
      this.ruleForm.carpayment = this.option.carpayment[index].text
    },
    policyChange(index) {
      this.ruleForm.policy = this.option.policy[index].text
    },
    creditipChange(index) {
      this.ruleForm.creditip = this.option.creditip[index].text
    },
    lawsuitsChange(index) {
      this.ruleForm.lawsuits = this.option.lawsuits[index].text
    },
    recordChange(index) {
      this.ruleForm.record = this.option.record[index].text
    },
    hobbiesChange(index) {
      this.ruleForm.hobbies = this.option.hobbies[index].text
    },
    conrelat1Change(index) {
      this.ruleForm.conrelat1 = this.option.conrelat1[index].text
    },
    conrelat2Change(index) {
      this.ruleForm.conrelat2 = this.option.conrelat2[index].text
    },
    conrelat3Change(index) {
      this.ruleForm.conrelat3 = this.option.conrelat3[index].text
    },
    conrelat4Change(index) {
      this.ruleForm.conrelat4 = this.option.conrelat4[index].text
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
.listShow {
  height: 36px;
  line-height: 36px;
  padding: 0 20px 0 10px;
  border-left: 3px solid rgb(17, 187, 184);
  background: #fff;
  position: relative;
  z-index: 2;
  box-shadow: 0 5px 5px -5px #dddcda;
  margin-top: 10px;
}
::v-deep .u-collapse-body {
  // // height:auto !important;
  // height:1000px !important;
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
