<template>
  <view class="content">
    <view class="flexBetween mb15">
      <view class="conName">招聘信息</view>
    </view>
    <view v-for="(item,index) in recruitList" :key="index+'re'" @click="reChange(item)">
      <view class="flexStart" style="align-items: center;">
        <view class="newName greenBtn border5 flexAlignCenter">
          <view>人</view>
          <view class="ml10">才</view>
          <view>招</view>
          <view class="ml10">聘</view>
        </view>
        <view class="ml10" style="width:calc(100% - 100px)">
          <view class="flexBetween">
              <view class="reTitle">
                {{item.name}}
                <u-tag class="ml10" text="急聘" mode="dark" bg-color="#fe1a19"></u-tag>
              </view>
              <view class="colorBlue fw600">{{item.salary}}</view>
          </view>
          <view class="textOver1 mt5 color3">{{item.address}}</view>
          <view class="flexBetween mt5">
            <view class="color2">{{item.education}}</view>
            <view class="color2">{{item.time}}</view>
          </view>
        </view>
      </view>
      <u-line style="margin:15px 0"></u-line>
    </view>
    <u-loadmore :status="status" />
  </view>
</template>

<script>
export default {
  props: ['name', 'recruitList', 'status'],
  data() {
    return {}
  },
  methods: {
    reChange(item) {
      console.log(item)
      uni.navigateTo({
        url: '/pages/recruitDetails/recruitDetails?data=' + encodeURIComponent(JSON.stringify(item))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.newName {
  width: 60px;
  height: 60px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.content {
  width: 100%;
  height: auto;
  padding: 20px 18px;
  background: #ffffff;
}
.conName {
  font-size: 17px;
  font-weight: 800;
}
.reTitle {
  font-size: 16px;
  font-weight: 600;
}
::v-deep .u-size-default {
  padding: 3px 5px;
}
.ml12 {
  margin-left: 12px;
}
</style>
