<template>
  <view class="content">
    <view class="flexBetween mb15">
      <view class="conName">新闻列表</view>
    </view>
    <view v-for="(item,index) in newsList" :key="index+'re'" @click="reChange(item)">
      <view class="flexStart" style="align-items: center;">
        <view class="newName blueBtn border5 flexAlignCenter">
          <view>铸</view>
          <view class="ml10">力</view>
          <view>新</view>
          <view class="ml10">闻</view>
        </view>
        <view class="ml10" style="width:calc(100% - 100px)">
          <view class="reTitle">{{item.newsname}}
            <u-tag class="ml10" text="热门" mode="dark" bg-color="#fe1a19"></u-tag>
          </view>
          <view class="textOver2 mt5 color3">{{item.message}}</view>
          <view class="flexBetween mt5">
            <view class="color2">{{item.num}}+阅读量</view>
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
  props:['name','newsList','status'],
  data() {
    return {
      
    }
  },
  methods: {
    reChange(item){
      uni.navigateTo({
        url:'/pages/newsDetails/newsDetails?data=' + encodeURIComponent(JSON.stringify(item))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.newName{
  width:60px;
  height:60px;
  color:#fff;
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
