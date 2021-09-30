<template>
  <view class="page">
    <view class="userCont poRelative">
      <view class="flexBetween Ctitle">
        <u-icon name="home" size="40" @click="toHome()"></u-icon>
        <view>员工中心</view>
        <u-icon name="setting" size="40" @click="option.typeShow = true"></u-icon>
        <u-action-sheet @click="typeChange" v-model="option.typeShow" :list="option.type"></u-action-sheet>
      </view>
      <view class="flexStart artName">
        <u-avatar :src="userInfo.imgurl" :show-level="true"></u-avatar>
        <view class="artPhone ml5">
          {{userInfo.username}} | {{userInfo.uid}}
          <br />
          <span>欢迎您</span>
        </view>
      </view>
      <view class="vipCard">
        <view class="flexBetween colorjin">
          <view class="fw600 mt5 f16">
            <u-icon name="integral" class="mr5"></u-icon>
            <span>ROLE-{{userInfo.role}}</span>
          </view>
        </view>
      </view>
      <img src="/static/icons/arc.png" class="boxImg" />
    </view>
    <view class="box">
      <view class="boxCont">
        <view class="detailsText fw600 mb10">个人业绩</view>
        <view class="flexBetween">
          <view class="navItem">
            <u-count-to
              :start-val="0"
              :end-val="userResults.month"
              separator=","
              font-size="28"
              color="#45b2fd"
              bold
            ></u-count-to>
            <view>本月业绩</view>
          </view>
          <view class="navItem">
            <u-count-to
              :start-val="0"
              :end-val="userResults.year"
              separator=","
              font-size="28"
              color="#45b2fd"
              bold
            ></u-count-to>
            <view>本年业绩</view>
          </view>
          <view class="navItem">
            <u-count-to
              :start-val="0"
              :end-val="userResults.all"
              separator=","
              font-size="28"
              color="#45b2fd"
              bold
            ></u-count-to>
            <view>总业绩</view>
          </view>
        </view>
      </view>
      <view class="boxCont mt10">
        <view class="detailsText fw600 mb10" style="border-left: 3px solid #45b2fd;">团队业绩</view>
        <view class="flexBetween">
          <view class="navItem">
            <u-count-to
              :start-val="0"
              :end-val="teamResults.month"
              separator=","
              font-size="28"
              color="#45b2fd"
              bold
            ></u-count-to>
            <view>本月业绩</view>
          </view>
          <view class="navItem">
            <u-count-to
              :start-val="0"
              :end-val="teamResults.year"
              separator=","
              font-size="28"
              color="#45b2fd"
              bold
            ></u-count-to>
            <view>本年业绩</view>
          </view>
          <view class="navItem">
            <u-count-to
              :start-val="0"
              :end-val="teamResults.all"
              separator=","
              font-size="28"
              color="#45b2fd"
              bold
            ></u-count-to>
            <view>总业绩</view>
          </view>
        </view>
      </view>
      <view class="mt10">
        <u-cell-group class="f12">
          <u-cell-item title="客户代办" icon="chat-fill" @click="cellChange('agents')">
            <span class="colorRed fw600" v-if="agentsList.length>0">{{agentsList.length}}</span>
          </u-cell-item>
          <u-cell-item title="客户合同" icon="account-fill" @click="cellChange('myContract')"></u-cell-item>
          <u-cell-item title="贷款申请" icon="rmb-circle-fill" @click="cellChange('loan')"></u-cell-item>
          <u-cell-item title="企业申请" icon="home-fill" @click="cellChange('enterprise')"></u-cell-item>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: '',
      agentsList: '', //待办列表
      option: { //弹出框
        typeShow: false,
        type: [
          {
            text: '个人资料',
            color: 'red'
          }
        ]
      },
      userResults:{
        month:0,
        year:0,
        all:0
      },
      teamResults:{
        month:0,
        year:0,
        all:0
      }
    }
  },
  onLoad() {
    this.userInfo = uni.getStorageSync('userInfo')
    this.findUserPer() //个人业绩和代办统计
    this.findTeamPer() //团队业绩
  },
  methods: {
    // 查询团队业绩
    async findTeamPer(){
      let arrUser = await this.findTeamUser() //当前员工所在团队的人数信息
      let arr = []
      for(let item of arrUser){
        var obj = await this.findTeam(item.uid)
        obj.map(val=>{arr.push(val)})
      }
      //团队业绩统计
      this.teamResults = await this.statistics(arr)
    },
    // 查询个人业绩
    async findUserPer(){
      let arr = await this.findTeam(this.userInfo.uid)
      //个人业绩统计
      this.userResults = await this.statistics(arr)
      //合同去重
      var result = [];
      var obj = {};
      for(var i =0; i<arr.length; i++){
        if(!obj[arr[i]._id]){
          result.push(arr[i]);
          obj[arr[i]._id] = true;
        }
      }
      this.agentsList = this.$commonJS.agents(result) // 客户代办
    },
    //根据合同列表分时间段统计业绩
    statistics(arr){
      let obj = {month:0,year:0,all:0}
      let nowTieme = new Date().toLocaleString().split(' ')[0].split('/')
      arr.map(item=>{
        let time = item.time.split(' ')[0].split('/')
        let exp = parseInt(item.expenses) || 0
        obj.all += exp
        if(nowTieme[0] == time[0]){
          obj.year += exp
        }
        if(nowTieme[1] == time[1]){
          obj.month += exp
        }
      })
      return obj
    },
    async findTeam(uid){
      // 合同总数查询
      let arr1 = await this.findCont('manager1',uid)
      let arr2 = await this.findCont('manager2',uid)
      let arr3 = await this.findCont('manager3',uid)
      let arr = arr1.concat(arr2).concat(arr3)
      return arr  // 业绩统计（只要当前员工包含在客户经理、权证经理、审核经理中的一个，都会算业绩，且可以同时担任多个经理，业绩就翻倍）
    },
    async findCont(name,uid){
      //查询经理的合同
      var data = {
        skip: 0,
        limit: 9999999,
        fuzz: name,
        input: uid
      }
      let arr = await this.$axios.post(this.$api.findContract, data)
        if (
          arr.code == 200 &&
          arr.data.length > 0 &&
          arr.data[0].data.length > 0
        ) {
          return arr.data[0].data
        }else{
          return []
        }
    },
    //查询当前用户所属团队的人
    async findTeamUser(){
      var data = {
        skip: 0,
        limit: 9999999,
        fuzz: 'team',
        input: this.userInfo.team
      }
      let arr = await this.$axios.post(this.$api.findUser, data)
      if (
          arr.code == 200 &&
          arr.data.length > 0 &&
          arr.data[0].data.length > 0
        ) {
          return arr.data[0].data
        }else{
          return []
        }
    },
    typeChange(index) {
      if (index == 0) {
        uni.navigateTo({
          url: '/pages/userInfo/userInfo'
        })
      }
    },
    cellChange(path) {
      if (path == 'agents' && this.agentsList.length > 0) {
        //客户代办
        uni.navigateTo({
          url:
            '/pages/agents/agents?data=' +
            encodeURIComponent(JSON.stringify(this.agentsList))
        })
      } else if(path == 'myContract'){
        //客户合同
        uni.navigateTo({
          url:
            '/pages/myContract/myContract?data=' + 'myVipUser'
        })
      } else{
        uni.navigateTo({
          url: `/pages/${path}/${path}`
        })
      }
    },
    toHome() {
      uni.switchTab({
        url: '/pages/user/user'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsText {
  border-left: 3px solid #45b2fd;
  padding-left: 5px;
}
::v-deep .u-cell__left-icon-wrap {
  color: #45b2fd;
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
  background: linear-gradient(to top right, #45b2fd, #b085f9);
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
  padding-left: 10px;
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
