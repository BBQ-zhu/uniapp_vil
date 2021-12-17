<template>
  <view class="page" style="height: calc(100vh - 50px)">
    <view class="userCont poRelative">
      <view class="flexBetween Ctitle">
        <u-icon name="kefu-ermai" size="40" @click="$commonJS.gottkefu"></u-icon>
        <view>个人中心</view>
        <u-icon name="grid" size="40" @click="gridLogin"></u-icon>
      </view>
      <view class="flexStart artName">
        <u-avatar src="/static/imgs/vipCard.png"></u-avatar>
        <view v-if="!vipUserInfo.username" class="artPhone mt10" @click="vipLogin">游客请登录</view>
        <view v-else class="artPhone f16">
          {{ vipUserInfo.username }} {{ $commonJS.phoneNum(vipUserInfo.phone)}}
          <br />
          <span style="margin-left: 3px">欢迎您</span>
        </view>
      </view>
      <view class="vipCard">
        <view class="flexBetween colorjin">
          <view class="fw600 mt5 f16">
            <u-icon name="integral" class="mr5"></u-icon>
            <span>ZCloud会员</span>
          </view>
          <view v-if="!vipUserInfo.username" class="vipBtn color1" @click="vipLogin">立即登录</view>
          <view v-if="vipUserInfo.username" class="vipBtn color1" @click="show = true">退出登录</view>
          <!-- <view v-else class="fw600 mt5 f16">{{vipUserInfo.username}}</view> -->
        </view>
      </view>
      <img src="/static/icons/arc.png" class="boxImg" />
    </view>
    <view class="box">
      <view class="boxCont flexBetween">
        <view class="navItem" @click="toView('application')">
          <view class="f18 fw600 colorGreen">{{ applicatList.length }}</view>
          <view>我的申请</view>
        </view>
        <view class="navItem" @click="toView('agents')">
          <view class="f18 fw600 colorGreen">{{ agentsList.length }}</view>
          <view>我的代办</view>
        </view>
        <view class="navItem" @click="toView('myContract')">
          <view class="f18 fw600 colorGreen">{{ myContList }}</view>
          <view>我的合同</view>
        </view>
      </view>
      <view class="mt10">
        <u-cell-group class="border5 f12">
          <u-link href="http://zhulif.com/company/index.html">
            <u-cell-item title="关于我们" icon="account-fill"></u-cell-item>
          </u-link>
          <u-cell-item title="加入我们" icon="plus-people-fill" @click="cellChange('joinUs')"></u-cell-item>
          <u-cell-item title="推荐客户" icon="tags-fill" @click="cellChange('referCustomers')"></u-cell-item>
          <u-cell-item title="商务合作" icon="thumb-up-fill" @click="cellChange('business')"></u-cell-item>
          <u-cell-item title="意见/投诉" icon="server-man" @click="cellChange('complain')"></u-cell-item>
        </u-cell-group>
      </view>
      <institutions style="margin-top:70px;"></institutions>
      <view class="conCenter u-text-center bd-bg mt30">
        <u-link href="https://beian.miit.gov.cn/" class="beian">备案号：蜀ICP备20004812号-1</u-link>
      </view>
    </view>
    <u-modal
      v-model="show"
      content="确认退出登录？"
      @confirm="vipLogout"
      @cancel="show = false"
      :show-cancel-button="true"
    ></u-modal>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      vipUserInfo: '',
      applicatList: [], //我的申请
      agentsList: [], //我的代办
      myContList: '0' //我的合同
    }
  },
  onShow() {
    this.vipUserInfo = uni.getStorageSync('vipUserInfo') || {}
    if (this.vipUserInfo.username) {
      this.applicat()
      this.myCont()
    }
  },
  methods: {
    vipLogout() {
      //退出登录
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('vipUserInfo')
      //重置数据
      this.applicatList = []
      this.agentsList = []
      this.myContList = '0'
      this.vipUserInfo = ''
    },
    applicat() {
      //我的申请
      var data = {
        skip: 0,
        limit: 999,
        fuzz: 'phone',
        input: this.vipUserInfo.phone
      }
      this.$axios.post(this.$api.findAgent, data).then(res => {
        if (
          res.code == 200 &&
          res.data.length > 0 &&
          res.data[0].data.length > 0
        ) {
          let arr = res.data[0].data
          let newarr = []
          let i = 0
          let j = 0
          for (i = 0; i < arr.length; i++) {
            for (j = i + 1; j < arr.length; j++) {
              if (arr[i]['proid'] === arr[j]['proid']) {
                j = false
                break
              }
            }
            if (j) newarr.push(arr[i].type.split('-')[1])
          }
          this.applicatList = newarr
        }
      })
    },
    myCont() {
      //我的合同
      var data = {
        skip: 0,
        limit: 99999,
        fuzz: 'phone',
        input: this.vipUserInfo.phone
      }
      this.$axios.post(this.$api.findContract, data).then(res => {
        if (
          res.code == 200 &&
          res.data.length > 0 &&
          res.data[0].data.length > 0
        ) {
          this.myContList = res.data[0].total[0].total
          //我的代办提醒计算
          let arr = res.data[0].data
          let newArr = []
          arr.map(item=>{
            if(item.status == "签约成功"){
              newArr.push(item)
            }
          })
          this.agentsList = this.$commonJS.agents(newArr)
        }
      })
    },
    vipLogin() {
      uni.navigateTo({
        url: '/pages/vipLogin/vipLogin'
      })
    },
    toView(rooter) {
      if (rooter == 'agents' && this.agentsList.length > 0) {
        //我的代办
        uni.navigateTo({
          url:
            '/pages/agents/agents?data=' +
            encodeURIComponent(JSON.stringify(this.agentsList))
        })
      } else if (rooter == 'application' && this.applicatList != []) {
        //我的申请
        uni.navigateTo({
          url:
            '/pages/application/application?data=' +
            encodeURIComponent(JSON.stringify(this.applicatList))
        })
      } else if (rooter == 'myContract' && this.myContList != '0') {
        //我的合同
        uni.navigateTo({
          url: '/pages/myContract/myContract'
        })
      }
    },
    cellChange(name) {
      if (name == 'joinUs') {
        uni.navigateTo({
          url: '/pages/joinUs/joinUs?name=' + name
        })
      } else {
        uni.navigateTo({
          url: '/pages/business/business?name=' + name
        })
      }
    },
    // 内部登录
    gridLogin() {
      if (!this.vipUserInfo.username) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        })
        return
      }
      //先判断是否存在该员工
      var data = {
        skip: 0,
        limit: 1,
        fuzz: 'phone',
        input: this.vipUserInfo.phone
      }
      this.$axios.post(this.$api.findUser, data).then(res => {
        if (
          res.code == 200 &&
          res.data.length > 0 &&
          res.data[0].data.length > 0
        ) {
          uni.setStorageSync('userInfo', res.data[0].data[0])
          uni.navigateTo({
            url: '/pages/internal/internal'
          })
        } else {
          uni.showToast({
            title: '暂无权限',
            icon: 'none'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.beian {
  font-size: 10px !important;
  color: #b7b7b7 !important;
}
::v-deep .u-cell__left-icon-wrap {
  color: #11bbb8;
}
.navItem {
  width: 30%;
  text-align: center;
  line-height: 25px;
}
.box {
  padding: 2px 15px;
  font-size: 12px;
}
.boxCont {
  width: 100%;
  border-radius: 1px;
  background: #fff;
  padding: 10px;
}
.userCont {
  width: 100%;
  height: 160px;
  background: linear-gradient(to right bottom, #46e3c4, #3cc8c9);
}
.Ctitle {
  padding: 10px;
  color: #fff;
}
.artName {
  padding: 10px 30px;
}
.artPhone {
  color: #fff;
  font-size: 16px;
  // font-weight: 600;
  padding-left: 11px;
  line-height: 22px;
}
.boxImg {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.vipCard {
  width: 90%;
  height: 50px;
  padding: 8px 12px;
  background: #000;
  // opacity: 0.8;
  border-radius: 8px;
  position: absolute;
  bottom: 0;
  left: 5%;
}
.vipBtn {
  width: auto;
  height: 25px;
  line-height: 25px;
  text-align: center;
  padding: 0 10px;
  border-radius: 25px;
  background: linear-gradient(to right, #f9e6af, #ffd465);
}
</style>
