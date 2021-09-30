<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="我的代办"
      title-color="#fff"
      :background="{backgroundImage:'linear-gradient(to right bottom,#45b2fd,#2979ff)'}"
    ></u-navbar>
    <view class="content">
      <u-card
        v-for="(item,index) in agentsList"
        :key="index"
        :title="item.type"
        :sub-title="item.optertime"
        title-color="#45b2fd"
      >
        <view class slot="body">
          <view class="flexBetween mb10 color2">
            <view>{{item.name}}</view>
            <view>{{item.phone}}</view>
          </view>
          <view class="u-body-item u-flex u-col-between u-p-t-0">
            <view class="u-body-item-title">{{item.title}}</view>
          </view>
        </view>
        <view slot="foot">
          <u-icon name="hourglass" size="34" color="#45b2fd"></u-icon>
          <u-count-down :timestamp="item.downtime" separator="zh"></u-count-down>
        </view>
      </u-card>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      agentsList: []
    }
  },
  onLoad(option) {
    this.agentsList = JSON.parse(option.data)
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.newName {
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.conBox {
  width: 73px;
  height: 40px;
  // background: linear-gradient(to right, #ff8b00, #fe5e01)
}
</style>
