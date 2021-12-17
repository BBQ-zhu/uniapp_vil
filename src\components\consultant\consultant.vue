<template>
  <view class="content" v-if="consultantList.length">  
    <view class="flex flexBetween mb15">
      <view class="conName">咨询顾问</view>
      <u-icon name="arrow-right color2"></u-icon>
    </view>
    <view class="schoolSro">
      <view
        class="mr10 srcItem"
        v-for="(item, index) in consultantList"
        :key="index + 'consultant'"
      >
        <view
          class="recomed flexStart"
          style="align-items: center; flex-wrap: nowrap"
        >
          <view>
            <u-avatar
              :src="item.imgurl"
              :show-level="true"
              style="width: 55px; height: 55px"
            ></u-avatar>
          </view>
          <view class="ml10" style="width: 180px">
            <view class>
              {{ item.username }}
              <u-icon name="account" color="#11BBB8" class="ml10"></u-icon>
              <span class="color2 colorGreen f12">金牌咨询师</span>
            </view>
            <view class="mt5 textOver2 f12 color3" style="width: 160px">{{
              item.intro
            }}</view>
          </view>
        </view>
        <view class="flexCenter mb10">
          <view class="reBtn lineBtn" @click="$commonJS.gottkefu"
            >服务热线</view
          >
          <view class="reBtn yellowBtn ml10" @click="call(item.phone)"
            >咨询顾问</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      consultantList: [],
    };
  },
  mounted() {
    this.findConsultantList();
  },
  methods: {
    // 获取员工列表
    async findConsultantList() {
      var data = {
        skip: 0,
        limit: 999999,
        fuzz: "isrecomed",
        input: "是",
      };
      await this.$axios.post(this.$api.findUser, data).then((res) => {
        if (res.code == 200) {
          this.consultantList = [];
          this.consultantList = res.data[0].data;
        }
      });
    },
    call(phone) {
      var a = document.createElement("a");
      a.setAttribute("href", "tel:" + phone);
      document.body.appendChild(a);
      a.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.srcItem {
  border: 1px solid rgb(228, 231, 237);
  border-radius: 5px;
}
.reBtn {
  width: 70px;
  height: 23px;
  line-height: 23px;
  border-radius: 23px;
  color: #ffffff;
  text-align: center;
  font-size: 12px;
}
.lineBtn {
  border: 1px solid #ff6600;
  color: #ff6600;
}
.recomed {
  width: 250px;
  height: 80px;
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
}
</style>
