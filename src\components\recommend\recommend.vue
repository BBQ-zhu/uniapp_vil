<template>
  <view class="content">
    <view class="flexBetween mb15">
      <view class="conName">{{name}}</view>
    </view>
    <view v-for="(item,index) in recomList" :key="index+'re'" @click="reChange(item)">
      <view class="flexStart ml5" style="align-items: center;">
        <u-image :src="item.productlogo" width="140rpx" height="140rpx" shape="square" border-radius="8rpx" ></u-image>
        <view class="ml10" style="width:calc(100% - 100px)">
          <view class="reTitle">{{item.name}}
            <u-tag class="ml10" text="爆款" mode="dark" bg-color="#fe1a19"></u-tag>
          </view>
          <view class="textOver1 mt5 color3">{{item.description}}</view>
          <view class="flexStart mt5">
            <u-tag text="无隐形费用" mode="light" type="success" class="mr5"></u-tag>
            <u-tag text="全程托管" mode="light" type="warning" class="mr5"></u-tag>
            <u-tag text="专家顾问" mode="light" ></u-tag>
          </view>
        </view>
      </view>
      <view class="flexBetween mt5">
        <view class="flexCenter ml5">
          <u-icon name="star-fill" class="colorYellow"></u-icon>
          <u-icon name="star-fill" class="colorYellow"></u-icon>
          <u-icon name="star-fill" class="colorYellow"></u-icon>
          <u-icon name="star-fill" class="colorYellow"></u-icon>
          <u-icon name="star-fill" class="colorYellow"></u-icon>
          <view class="colorYellow ml10">￥<span class="f18">{{item.newprice}}</span></view>
        </view>
        <view class="color3 ml20">{{item.volume || 0}}+销量</view>
      </view>
      <u-line style="margin:15px 0"></u-line>
    </view>
    <u-loadmore :status="status" />
  </view>
</template>

<script>
export default {
  props:['name','recomList','status'],
  data() {
    return {
      
    }
  },
  methods: {
    reChange(item){
      uni.navigateTo({
        url:'/pages/details/details?name=' + item.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.reTitle{
  font-size: 16px;
  font-weight: 600;
}
::v-deep .u-size-default{
  padding:3px 5px;
}
.ml12{
  margin-left:12px;
}
</style>
