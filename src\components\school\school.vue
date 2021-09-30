<template>
  <view class="border8 content">
    <view class="flex flexBetween mb15">
      <view class="conName">企业学堂</view>
      <u-icon name="arrow-right color2"></u-icon>
    </view>
    <view class="schoolSro">
      <view
        class="poRelative mr10"
        v-for="(item,index) in schoolList"
        :key="index+'school'"
        @click="schoolChange(index)"
      >
        <u-image v-if="item.show" :src="item.image" width="320rpx" height="180rpx" shape="square" border-radius="8rpx" ></u-image>
        <view v-if="item.show" class="play">
          <u-icon name="play-right-fill" size="20" color="#8699ad"></u-icon>
        </view>
        <video v-else :src="item.video" style="width:160px;height:90px;" class="border8"></video>
        <view class="stitle textOver2 color3">{{item.title}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      schoolList: []
    }
  },
  mounted(){
    this.findVideoList()
  },
  methods: {
        // 获取视频列表
    async findVideoList(){ 
      await this.$axios.post(this.$api.findVideo, 'post').then(res => {
        this.schoolList = []
        let arr = res.data
        arr.map(item=>{
          let obj = {}
          obj.image = item.videoimg
          obj.video = item.videourl
          obj.title = item.videoname
          obj.show = true
          this.schoolList.push(obj)
        })
      })
    },
    schoolChange(index){
      this.schoolList.map((item=>{
        item.show = true
      }))
      this.schoolList[index].show = false
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
.schoolSro{
  display: flex;
  overflow-x: auto;
}
</style>
