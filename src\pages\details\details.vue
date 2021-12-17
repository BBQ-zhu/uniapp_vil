<template>
  <view class="page" style="background: #fff">
    <view class="poRelative">
      <img :src="details.productimg" width="100%" />
      <view class="back">
        <u-icon name="arrow-left" @click="back"></u-icon>
      </view>
    </view>
    <view class="contant">
      <view class="flex mb20 mt10">
        <view class="title f18 colorGreen fw600">{{ details.name }}</view>
        <view class="flex" v-if="details.newprice">
          <view class="colorYellow ml20 f18">
            ￥
            <span class="f18">{{ details.newprice }}</span>
          </view>
          <view
            v-if="details.oldprice"
            class="color3 ml20"
            style="text-decoration: line-through"
          >￥{{ details.oldprice }}</view>
        </view>
      </view>
      <u-line></u-line>
      <view class="color3 mt20 textOver2" style="line-height: 20px">{{ details.description }}</view>
      <view class="flex flexBetween mt20 mb20">
        <view v-for="item in details.recomintro" :key="item">
          <u-icon name="integral-fill" size="26" class="colorGreen mr5"></u-icon>
          {{item}}
        </view>
        <!-- <view>
          <u-icon name="integral-fill" size="26" class="colorGreen mr5"></u-icon
          >专家服务
        </view>
        <view>
          <u-icon name="integral-fill" size="26" class="colorGreen mr5"></u-icon
          >进度透明
        </view>
        <view>
          <u-icon name="integral-fill" size="26" class="colorGreen mr5"></u-icon
          >全程监管
        </view>-->
      </view>
      <u-line></u-line>
      <view class="boxCont flexBetween mt10" style="padding: 10px 10px 0 10px">
        <view class="navItem">
          <view class="colorGreen">{{ details.consulting || 0 }}+</view>
          <view class="color3 mt5">总计咨询</view>
        </view>
        <view class="navItem">
          <view class="colorGreen">{{ details.volume || 0 }}+</view>
          <view class="color3 mt5">总计销量</view>
        </view>
        <view class="navItem">
          <view class="colorGreen">{{ details.totalview || 0 }}+</view>
          <view class="color3 mt5">总浏览量</view>
        </view>
      </view>
    </view>
    <!-- 资质要求 -->
    <span v-if="details.cation == 'true'">
      <u-gap height="20" bg-color="#f1f2f6"></u-gap>
      <!-- 基本资料 -->
      <view class="contant color2">
        <view class="detailsText fw600 mb10 color1 f14">基本资料</view>
        <view v-if="details.interest" class="ml5 mb10">
          <u-icon name="star" class="colorGreen mr5"></u-icon>月利息:
          <span class="colorYellow fw600 ml5">{{ details.interest }}%</span>
        </view>
        <view v-if="details.minamount || details.maxamount" class="ml5 mb10">
          <u-icon name="star" class="colorGreen mr5"></u-icon>最低额度:
          <span class="colorYellow fw600 ml5">{{ details.minamount || 0 }}万</span>
          — 最高额度:
          <span class="colorYellow fw600 ml5">{{ details.maxamount || 0 }}万</span>
        </view>
        <view v-if="details.minterm || details.maxterm" class="ml5">
          <u-icon name="star" class="colorGreen mr5"></u-icon>最低期限:
          <span class="colorYellow fw600 ml5">{{ details.minterm }}月</span>
          — 最高期限:
          <span class="colorYellow fw600 ml5">{{ details.maxterm }}月</span>
        </view>
      </view>
      <!-- 资质要求 -->
      <u-gap height="20" bg-color="#f1f2f6"></u-gap>
      <view class="contant color2">
        <view class="detailsText fw600 mb10 color1 f14">
          资质要求
          <span
            v-if="details.key"
            class="colorGreen ml5"
          >({{ details.key.replace("选中的", "以下要求") }})</span>
        </view>
        <view v-if="details.age && details.match.includes('age')" class="borderBom">
          <u-icon name="tags" class="colorGreen mr5"></u-icon>年龄不超过：
          <span class="colorYellow fw600 ml5" style="flex: 1">{{ details.age }}岁</span>
        </view>
        <view v-if="details.revenue && details.match.includes('revenue')" class="borderBom">
          <u-icon name="tags" class="colorGreen mr5"></u-icon>月收入不低于：
          <span class="colorYellow fw600 ml5">{{ details.revenue }}元</span>
        </view>
        <view v-if="details.address && details.match.includes('address')" class="borderBom">
          <u-icon name="tags" class="colorGreen mr5"></u-icon>所在城市：
          <span class="colorYellow fw600 ml5">{{ details.address[0] }}-{{ details.address[1] }}</span>
        </view>

        <view
          v-if="
            details.houses &&
            details.houses.length &&
            details.match.includes('houses')
          "
          class="borderBom"
        >
          <span>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>是否需要有房:
          </span>
          <span class="colorYellow fw600 ml20 mt3">
            {{
            details.houses
            }}
          </span>
        </view>
        <view
          v-if="
            details.car && details.car.length && details.match.includes('car')
          "
          class="borderBom"
        >
          <span>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>是否需要有车:
          </span>
          <span class="colorYellow fw600 ml20 mt3">
            {{
            details.car
            }}
          </span>
        </view>
        <view
          v-if="
            details.policy &&
            details.policy.length &&
            details.match.includes('policy')
          "
          class="borderBom"
        >
          <span>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>是否需要有商保:
          </span>
          <span class="colorYellow fw600 ml20 mt3">
            {{
            details.policy
            }}
          </span>
        </view>
        <view
          v-if="
            details.credit &&
            details.credit.length &&
            details.match.includes('credit')
          "
          class="borderBom"
        >
          <span>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>是否需要有信用卡:
          </span>
          <span class="colorYellow fw600 ml20 mt3">
            {{
            details.credit
            }}
          </span>
        </view>
        <view
          v-if="
            details.social &&
            details.social.length &&
            details.match.includes('social')
          "
          class="borderBom"
        >
          <view>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>社保(至少满足以下任意一项)：
          </view>
          <view class="colorYellow fw600 ml20 mt3">
            {{
            details.social.join("、")
            }}
          </view>
        </view>
        <view
          v-if="
            details.provident &&
            details.provident.length &&
            details.match.includes('provident')
          "
          class="borderBom"
        >
          <view>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>公积金(至少满足以下任意一项)：
          </view>
          <view class="colorYellow fw600 ml20 mt3">
            {{
            details.provident.join("、")
            }}
          </view>
        </view>
        <view
          v-if="
            details.sesame &&
            details.sesame.length &&
            details.match.includes('sesame')
          "
          class="borderBom"
        >
          <view>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>芝麻分(至少满足以下任意一项)：
          </view>
          <view class="colorYellow fw600 ml20 mt3">
            {{
            details.sesame.join("、")
            }}
          </view>
        </view>
        <view
          v-if="
            details.microcredit &&
            details.microcredit.length &&
            details.match.includes('microcredit')
          "
          class="borderBom"
        >
          <view>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>微粒贷(至少满足以下任意一项)：
          </view>
          <view class="colorYellow fw600 ml20 mt3">
            {{
            details.microcredit.join("、")
            }}
          </view>
        </view>
        <view
          v-if="
            details.social &&
            details.social.length &&
            details.match.includes('social')
          "
          class="borderBom"
        >
          <view>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>职业要求(至少满足以下任意一项)：
          </view>
          <view class="colorYellow fw600 ml20 mt3">
            {{
            details.hires.join("、")
            }}
          </view>
        </view>
        <view v-if="details.othercomponents && details.othercomponents.length" class="borderBom">
          <view>
            <u-icon name="tags" class="colorGreen mr5"></u-icon>其他要求：
          </view>
          <view class="colorYellow fw600 ml20 mt3">
            {{
            details.othercomponents.join("、")
            }}
          </view>
        </view>
      </view>
      <!-- 企业要求 -->
      <span
        v-if="
              details.match.includes('identity') || 
              details.match.includes('establishment') || 
              details.match.includes('invoicing') || 
              details.match.includes('taxrecord') || 
              details.match.includes('grade') || 
              details.match.includes('paying') || 
              details.match.includes('enterprise') || 
              details.match.includes('ticket') 
              "
      >
        <u-gap height="20" bg-color="#f1f2f6"></u-gap>
        <view class="contant color2">
          <view class="detailsText fw600 mb10 color1 f14">
            企业要求
            <span
              v-if="details.key"
              class="colorGreen ml5"
            >({{ details.key.replace("选中的", "以下要求") }})</span>
          </view>
          <view
            v-if="
            details.identity &&
            details.identity.length &&
            details.match.includes('identity')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>需要为法人或是股东(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.identity.join("、")
              }}
            </view>
          </view>
          <view
            v-if="
            details.establishment &&
            details.establishment.length &&
            details.match.includes('establishment')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>企业成立时间(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.establishment.join("、")
              }}
            </view>
          </view>
          <view
            v-if="
            details.invoicing &&
            details.invoicing.length &&
            details.match.includes('invoicing')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>年开票金额(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.invoicing.join("、")
              }}
            </view>
          </view>
          <view
            v-if="
            details.taxrecord &&
            details.taxrecord.length &&
            details.match.includes('taxrecord')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>开票记录(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.taxrecord.join("、")
              }}
            </view>
          </view>
          <view
            v-if="
            details.grade &&
            details.grade.length &&
            details.match.includes('grade')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>纳税等级(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.grade.join("、")
              }}
            </view>
          </view>
          <view
            v-if="
            details.paying &&
            details.paying.length &&
            details.match.includes('paying')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>年纳税金额(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.paying.join("、")
              }}
            </view>
          </view>
          <view
            v-if="
            details.enterprise &&
            details.enterprise.length &&
            details.match.includes('enterprise')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>法人/股东变更(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.enterprise.join("、")
              }}
            </view>
          </view>
          <view
            v-if="
            details.ticket &&
            details.ticket.length &&
            details.match.includes('ticket')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>法人/股东占股(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.ticket.join("、")
              }}
            </view>
          </view>
        </view>
      </span>
      <!-- 烟草证要求 -->
      <span
        v-if="details.match.includes('tobaccotime') || details.match.includes('volumesmoke') ||details.match.includes('tobaccorank') "
      >
        <u-gap height="20" bg-color="#f1f2f6"></u-gap>
        <view class="contant color2">
          <view class="detailsText fw600 mb10 color1 f14">
            烟草证要求
            <span
              v-if="details.key"
              class="colorGreen ml5"
            >({{ details.key.replace("选中的", "以下要求") }})</span>
          </view>
          <view
            v-if="
            details.tobaccotime &&
            details.tobaccotime.length &&
            details.match.includes('tobaccotime')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>办证时间(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.tobaccotime.join("、")
              }}
            </view>
          </view>
          <view
            v-if="
            details.volumesmoke &&
            details.volumesmoke.length &&
            details.match.includes('volumesmoke')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>月开烟量(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.volumesmoke.join("、")
              }}
            </view>
          </view>
          <view
            v-if="
            details.tobaccorank &&
            details.tobaccorank.length &&
            details.match.includes('tobaccorank')
          "
            class="borderBom"
          >
            <view>
              <u-icon name="tags" class="colorGreen mr5"></u-icon>烟草证等级(至少满足以下任意一项)：
            </view>
            <view class="colorYellow fw600 ml20 mt3">
              {{
              details.tobaccorank.join("、")
              }}
            </view>
          </view>
        </view>
      </span>
      <u-gap height="20" bg-color="#f1f2f6"></u-gap>
      <view class="contant color2">
        <view class="detailsText fw600 mb10 color1 f14">办理所需资料</view>
        <view>
          <u-tag
            v-for="item in details.demand"
            :key="item"
            :text="item"
            mode="light"
            type="success"
            class="mr5 mb5"
          ></u-tag>
        </view>
        <view v-if="details.otherinformation" class="ml5 mt5" style="line-height: 20px">
          <view>
            <u-icon name="bell" class="colorGreen mr5"></u-icon>其他资料:
          </view>
          <view class="colorYellow fw600 ml20">
            {{
            details.otherinformation
            }}
          </view>
        </view>
      </view>
    </span>
    <u-gap height="20" bg-color="#f1f2f6"></u-gap>
    <view class="contant">
      <view class="detailsText fw600 mb10">服务详情</view>
      <u-parse :html="details.details" :domain="$URL" :lazy-load="true" :show-with-animation="true"></u-parse>
    </view>
    <u-gap height="20" bg-color="#f1f2f6"></u-gap>
    <consultant class="mt15"></consultant>
    <u-gap height="20" bg-color="#f1f2f6"></u-gap>
    <view class="contant mb30">
      <view class="detailsText fw600">用户评论</view>
      <comment class="mt10"></comment>
    </view>
    <view class="action-btn-group footer">
      <u-button
        @click="$commonJS.gottkefu"
        hover-class="none"
        type="primary"
        class="action-btn no-border buy-now-btn"
      >电话咨询</u-button>
      <u-button
        hover-class="none"
        type="primary"
        class="action-btn no-border add-cart-btn"
        @click="handling"
      >立即办理</u-button>
    </view>
  </view>
</template> 

<script>
import fixedInfo from '../../common/js/fixedInfo.js'
export default {
  data() {
    return {
      fixedInfo: fixedInfo,
      details: {}
    }
  },
  async onLoad(option) {
    await this.searchChange(option.name)
    this.updataProduct()
  },
  methods: {
    call() {
      var a = document.createElement('a');
			a.setAttribute('href', 'tel:4001109939');
			document.body.appendChild(a);
			a.click();
    },
    // 修改产品浏览量
    updataProduct() {
      let ruleForm = {
        _id: this.details._id,
        totalview: parseInt(this.details.totalview || 0) + 1 + ''
      }
      this.$axios.post(this.$api.updataProduct, {
        data: JSON.stringify(ruleForm)
      })
    },
    //立即办理
    handling() {
      var finData = {
        skip: 0,
        limit: 9999,
        fuzz: 'phone',
        input: uni.getStorageSync('vipUserInfo').phone
      }
      this.$axios.post(this.$api.findAgent, finData).then(res => {
        let arr = res.data[0].data
        if (arr.length == 0) {
          this.createAgent()
        } else {
          let key = true
          arr.map(item => {
            if (this.details._id == item.proid && item.read == 'false') {
              uni.showToast({
                title: '您的该服务正在处理中',
                icon: 'none'
              })
              key = false
            }
          })
          if (key) {
            this.createAgent()
          }
        }
      })
    },
    createAgent() {
      let obj = {
        type: this.details.type, // 咨询类型
        proname: this.details.name, // 咨询产品
        name: uni.getStorageSync('vipUserInfo').username, // 姓名
        phone: uni.getStorageSync('vipUserInfo').phone, // 电话
        remarks: '',
        status:'待审核',
        manager1:''
      }
      this.$axios.post(this.$api.createIntegrate, obj).then(res => {
        if (res.code == 200) {
          //创建日志
          let data = {
            proid: this.details._id,
            type: this.details.type + '-' + this.details.name, // 数据来源
            name: uni.getStorageSync('vipUserInfo').username, // 客户名称
            phone: uni.getStorageSync('vipUserInfo').phone, // 电话
            submitby: uni.getStorageSync('vipUserInfo').username, // 提交人
            handler: 'all', // 处理人
            path: '/Integrate', // 跳转至综合服务
            read: 'false' // 是否已处理
          }
          this.$axios.post(this.$api.createAgent, data).then(res => {
            if (res.code == 200) {
              uni.showToast({
                title: '业务经理稍后为您服务',
                icon: 'none',
                duration: 3000
              })
            }
          })
        }
      })
    },
    async searchChange(name) {
      var data = {
        skip: 0,
        limit: 10,
        fuzz: 'name',
        input: name
      }
      await this.$axios.post(this.$api.findProduct, data).then(res => {
        this.details = res.data[0].data[0]
      })
    },
    back() {
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.borderBom {
  line-height: 20px;
  padding: 8px 0;
  border-bottom: 1px solid rgb(230, 260, 237);
}
.action-btn-group {
  display: flex;
  height: 76upx;
  border-radius: 100px;
  overflow: hidden;
  box-shadow: 0 20upx 40upx -16upx #909399;
  box-shadow: 1px 2px 5px #909399;
  background: linear-gradient(to right, #46e3c4, #3cc8c9, #46e3c4);
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translateY(-50%);
    height: 28upx;
    width: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.5);
  }
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180upx;
    height: 100%;
    font-size: $font-base;
    padding: 0;
    border-radius: 0;
    background: transparent;
  }
}
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
  // opacity: 0.9;
}
.navItem {
  width: 20%;
  margin-bottom: 20px;
  text-align: center;
  line-height: 20px;
}
.details {
  line-height: 16px;
}
.detailsText {
  border-left: 3px solid #11bbb8;
  padding-left: 5px;
}
.boxCont {
  width: 100%;
  border-radius: 1px;
  background: #fff;
  padding: 10px;
  text-align: center;
}
.contant {
  padding: 10px 15px;
  background: #fff;
}
.title {
}
.back {
  width: 25px;
  height: 25px;
  line-height: 25px;
  background: #000;
  opacity: 0.6;
  border-radius: 50%;
  color: #fff;
  padding-left: 3px;
  font-size: 16px;
  position: fixed;
  top: 12px;
  left: 8px;
  z-index: 2;
}
</style>
