<template>
  <view class="content">
    <view class="flex flexBetween mb15">
      <view class="conName">咨询顾问</view>
      <u-icon name="arrow-right color2"></u-icon>
    </view>
    <!-- 第一行 -->
    <view class="schoolSro">
      <view
        class="mr10 srcItem"
        v-for="(item, index) in consultantList.arr1"
        :key="index + 'consultant'"
      >
        <view class="recomed flexBetween">
          <view style="width:50%">
            <u-avatar :src="item.imgurl" :show-level="true" style="width: 55px; height: 55px"></u-avatar>
            <view class="reBtn yellowBtn mt5" @click="call(item.phone)">咨询顾问</view>
          </view>
          <view style="width:50%" >
            <view class="mt3">
              <u-icon name="account" color="#ff6600" ></u-icon>
              <span class="color2 colorYellow f12">金牌顾问</span>
            </view>
            <view class="mt3">{{ item.username }}</view>
            <view class="mt5 textOver3 f12 color3" >
              {{
              item.intro
              }}
            </view>
          </view>
        </view>
        
      </view>
    </view>
    <view class="schoolSro">
      <view
        class="mr10 srcItem"
        v-for="(item, index) in consultantList.arr2"
        :key="index + 'consultant'"
      >
        <view class="recomed flexBetween">
          <view style="width:50%">
            <u-avatar :src="item.imgurl" :show-level="true" style="width: 55px; height: 55px"></u-avatar>
            <view class="reBtn blueBtn mt5" @click="call(item.phone)">咨询经理</view>
          </view>
          <view style="width:50%" >
            <view class="mt3">
              <u-icon name="account" color="#11BBB8" ></u-icon>
              <span class="color2 colorGreen f12">客户经理</span>
            </view>
            <view class="mt3">{{ item.username }}</view>
            <view class="mt5 textOver3 f12 color3" >
              {{
              item.intro
              }}
            </view>
          </view>
        </view>
        
      </view>
    </view>
    <view class="schoolSro">
      <view
        class="mr10 srcItem"
        v-for="(item, index) in consultantList.arr3"
        :key="index + 'consultant'"
      >
        <view class="recomed flexBetween">
          <view style="width:50%">
            <u-avatar :src="item.imgurl" :show-level="true" style="width: 55px; height: 55px"></u-avatar>
            <view class="reBtn greenBtn mt5" @click="call(item.phone)">咨询经理</view>
          </view>
          <view style="width:50%">
            <view class="mt3">
              <u-icon name="account" color="#45b2fd"></u-icon>
              <span class="color2 colorBlue f12">市场经理</span>
            </view>
            <view class="mt3">{{ item.username }}</view>
            <view class="mt5 textOver3 f12 color3" >
              {{
              item.intro
              }}
            </view>
          </view>
        </view>
        
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      consultantList: {
        arr1: [],
        arr2: [],
        arr3: []
      }
    }
  },
  mounted() {
    this.findConsultantList()
  },
  methods: {
    // 获取员工列表
    async findConsultantList() {
      var data = {
        skip: 0,
        limit: 9999999,
        fuzz: 'isrecomed',
        input: '是'
      }
      await this.$axios.post(this.$api.findUser, data).then(res => {
        if (res.code == 200) {
          let arr = res.data[0].data
          arr.sort(() => {
            return 0.5 - Math.random()
          })
          let num = 1
          arr.map(item => {
            this.consultantList['arr' + num].push(item)
            if (num >= 3) {
              num = 1
            } else {
              num++
            }
          })
        }
      })
    },
    call(phone) {
      var a = document.createElement('a')
      a.setAttribute('href', 'tel:' + phone)
      document.body.appendChild(a)
      a.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.srcItem {
  border: 1px solid rgb(228, 231, 237);
  border-radius: 5px;
}
.reBtn {
  width: 63px;
  height: 23px;
  line-height: 23px;
  border-radius: 23px;
  color: #ffffff;
  text-align: center;
  font-size: 12px;
  margin-bottom:10px;
  position: relative;
  left:-3px;
}
.lineBtn {
  border: 1px solid #ff6600;
  color: #ff6600;
}
.lineBtn2 {
  border: 1px solid #3cc8c9;
  color: #3cc8c9;
}
.lineBtn3 {
  border: 1px solid #2979ff;
  color: #2979ff;
}
.recomed {
  width: 166px;
  height: 105px;
  padding: 10px 10px 0 10px;
}
.content {
  width: 100%;
  height: auto;
  padding: 15px 18px;
  background: #ffffff;
}
.conName {
  font-size: 17px;
  font-weight: 600;
}
.stitle {
  width: 160px;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  margin-top: 3px;
}
.play {
  width: 24px;
  height: 24px;
  line-height: 23px;
  text-align: center;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 5px #909399;
  position: absolute;
  left: 8px;
  top: 60px;
}
.schoolSro {
  display: flex;
  overflow-x: auto;
  margin-bottom: 10px;
}
.textOver3{
  text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
}
</style>
