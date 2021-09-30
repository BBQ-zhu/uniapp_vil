<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="我的合同"
      title-color="#fff"
      :background="{backgroundImage:'linear-gradient(to right bottom,#46e3c4,#3cc8c9)'}"
    ></u-navbar>

    <view class="content">
      <view class="reTitle fw600">
        {{contractDetails.name}}
        <u-tag class="ml10" :text="contractDetails.status" mode="dark" bg-color="#11BBB8"></u-tag>
      </view>
      <view class="textOver2 mt5 color3">{{contractDetails.conname}}</view>
      <view class="flexBetween mt10 mb10">
        <view class="colorRed">
          <span class="color1">服务费用：</span><span class="fw600">￥{{contractDetails.expenses}}</span>
        </view>
        <view class="color2">{{contractDetails.time}}</view>
      </view>
      <u-line class="mt10"></u-line>
      <view class="detailsText fw600 mb10 mt10">合同内容</view>

      <img v-if="contractDetails.status != '待签约' && contractDetails.status != '驳回'" :src="contractDetails.imgurl" style="width:100%;margin:0 auto;border-radius:5px;"/>
      <view v-else class="detail-content">
        <view v-html="contractDetails.remarks"></view>
      </view>

    </view>
    <!-- 操作按钮区 -->
    <uni-fab
      v-if="isUser != 'true'"
      :pattern="fab.pattern"
      :content="fab.content"
      :horizontal="fab.horizontal"
      :vertical="fab.vertical"
      :direction="fab.direction"
      @trigger="trigger"
    ></uni-fab>
    <!-- 水印效果 -->
    <!-- <jm-watermark></jm-watermark> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      fab: {
        horizontal: 'right',
        vertical: 'bottom',
        direction: 'horizontal', //horizontal - vertical
        pattern: {
          color: '#7A7E83',
          backgroundColor: '#fff',
          selectedColor: '#11BBB8',
          buttonColor: '#3fd0c8'
        },
        content: [
          {
            iconPath: '/static/icons/1.PNG',
            selectedIconPath: '/static/icons/1.PNG',
            text: '签约',
            active: false
          },
          {
            iconPath: '/static/icons/2.PNG',
            selectedIconPath: '/static/icons/2.PNG',
            text: '下载',
            active: false
          },
          {
            iconPath: '/static/icons/3.PNG',
            selectedIconPath: '/static/icons/3.PNG',
            text: '咨询',
            active: false
          }
        ]
      },
      signBase64:'', // 签名图片
      contractDetails: {}, //合同详情
      isUser:false //是否是内部查看
    }
  },
  onLoad(option) {
    this.isUser = option.isUser
    this.getContract(option.data)
  },
  methods: {
    //获取合同详情
    getContract(data) {
      this.$axios.post(this.$api.findOneContract, {_id:data}).then(res => {
        if(res.code==200){
          this.contractDetails = res.data[0]
        }else{
          uni.showToast({
            title: '查询失败',
            icon: 'none'
          })
        }
        
      })
    },
    trigger(e) {
      if (e.index == 0) { //签约按钮
        if (this.contractDetails.status == '待签约' || this.contractDetails.status == '驳回') { //待签约 审核中 （驳回 签约成功）
          uni.navigateTo({
            url: '/pages/sign/sign?data=' + encodeURIComponent(JSON.stringify(this.contractDetails))
          })
        } else {
          uni.showToast({
            title: '当前无法签约',
            icon: 'none'
          })
        }
      } else if (e.index == 1) { //下载文件
        if(this.contractDetails.status == '签约成功'){
          this.$commonJS.download(this.contractDetails.imgurl,'铸力电子合同')
          uni.showToast({
            title: '下载成功，请在您的浏览器下载地址中查找',
            icon: 'none'
          })
        }else{
          uni.showToast({
            title: '签约未完成',
            icon: 'none'
          })
        }
      } else {
        //咨询
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.contractImg{
  margin:0px;
  background-size:100% 100%;
  // background-attachment:fixed;
  background-size: cover;
}
.signBox{
  height:60px;
  line-height: 60px;
}
.drag-button {
  background: #ffffff;
  border: 0.5px solid #eeeeee;
  box-shadow: 0 5rpx 10rpx 0 rgba(0, 0, 0, 0.08);
  width: 100rpx;
  height: 100rpx;
  font-size: 24rpx;
  color: #000000;
  position: absolute;
  right: 40rpx;
  bottom: 188rpx;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.u-content {
  min-height:calc(73vh);
  padding: 24rpx 20rpx;
  line-height: 1.2;
  background: #fff;
  border-radius:5px ;
}
.detailsText {
  border-left: 3px solid #11bbb8;
  padding-left: 5px;
}
.content {
  padding: 10px 14px;
  margin-bottom: 110px;
}
</style>
