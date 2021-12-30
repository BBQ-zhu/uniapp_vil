<template>
  <view class="contentBox">
    <view class="flexBetween mb10" style="align-items: center">
      <view class="flex">
        <u-button
          @click="btnClick"
          data-name="3333"
          :plain="false"
          :shape="'shape'"
          :size="'mini'"
          :ripple="false"
          :type="'success'"
          >新增客户</u-button
        >
        <view class="conName ml10" style="padding-top: 5px">申请列表</view>
      </view>
      <view class="f12 color2 ml10">(审核结束的数据将不再展示)</view>
    </view>
    <u-line></u-line>
    <u-swipe-action
      bg-color="#fff"
      @open="open"
      :index="index"
      v-for="(item, index) in list"
      :key="index + 'sip'"
      :show="item.show"
      @click="click"
      :btn-width="200"
      @close="close"
      :options="options"
      @content-click="contentClick"
    >
      <view
        class="flexStart mb10 mt10"
        style="align-items: center; padding: 0 10px"
      >
        <view class="newName blueBtn border5 flexAlignCenter">
          <view>{{ item.proname.substring(0,1) }}</view>
          <view class="ml10">{{ item.proname.substring(1,2) }}</view>
          <view>{{ item.proname.substring(2,3) }}</view>
          <view class="ml10">{{ item.proname.substring(3,4) }}</view>
        </view>
        <view class="ml10" style="width: calc(100% - 100px); flex: 1">
          <view class="flexBetween">
            <view class="reTitle">
              {{ item.name }} 
              <u-tag
                class="ml10"
                :text="item.status"
                mode="dark"
                bg-color="#fe1a19"
              ></u-tag>
            </view>
            <view class="colorGreen fw600">{{
              $commonJS.phoneNum(item.phone)
            }}</view>
          </view>
          <view class="textOver2 mt5 color3" style="width:100%"
            >审批反馈：{{item.feedback || '暂无'}}</view
          >
          <view class="flexBetween mt5">
            <view class="color2">客户状态：{{ item.vipstatus || "暂无" }}</view>
            <view class="color2">{{ item.time }}</view>
          </view>
        </view>
      </view>
      <u-line></u-line>
    </u-swipe-action>
    <view @click="$emit('reachBottom')">
      <view style="width: 100%; height: 20px" class="u-text-center" ></view>
      <!-- 加载更多组件 -->
      <u-loadmore :status="status" />
      <u-loading
        :show="loadingShow"
        size="80"
        color="#11BBB8"
        mode="circle"
        style="position: fixed; top: 50%; left: 45%; z-index: 9999"
      ></u-loading>
    </view>
  </view>
</template>

<script>
export default {
  props: ["name", "list", "status"],
  data() {
    return {
      showList: false,
      loadingShow: false,
      options: [
        {
          text: "编辑",
          style: {
            backgroundColor: "#2b3a4a",
          },
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#F56C6C",
          },
        },
      ],
    };
  },
  methods: {
    //右滑块点击
    click(index, index1) {
      if (index1 == 0) {
        //编辑按钮
        this.contentClick(index);
        this.list[index].show = false;
      } else if (index1 == 1) {
        //删除按钮
        if(this.list[index].status !='草稿'){
          this.$u.toast(`只能删除草稿状态的资料`);
          return
        }
        let _this = this;
        uni.showModal({
          title: "提示",
          content: "是否确认删除？",
          success: async (res) => {
            if (res.confirm) {
              _this.$axios
                .post(_this.$api.deleteIntegrate, { _id: _this.list[index]._id })
                .then(async (res) => {
                  if (res.code == 200) {
                    let userInfo = uni.getStorageSync("userInfo");
                    let dataLogs = {
                      user: `${userInfo.username}(${userInfo.uid})`,
                      logdata: JSON.stringify(_this.list[index]),
                      remarks: `移动端-删除-意向客户资料`,
                    };
                    await _this.$axios.post(_this.$api.createlogs, dataLogs); //创建日志
                    _this.list.splice(index, 1);
                    _this.$u.toast(`删除成功`);
                  } else {
                    _this.$u.toast(`删除失败`);
                  }
                });
            }
          },
        });
      }
    },
    //新增按钮
    btnClick() {
      uni.navigateTo({
        url: "/pages/intendedDetail/intendedDetail",
      });
    },
    //单个点击
    contentClick(index) {
      uni.navigateTo({
        url:
          "/pages/intendedDetail/intendedDetail?data=" +
          encodeURIComponent(JSON.stringify(this.list[index])), //this.list[index]
      });
    },
    open(index) {
      this.list[index].show = true;
      this.list.map((val, idx) => {
        if (index != idx) this.list[idx].show = false;
      });
    },
    close(index) {
      this.list[index].show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .content {
  padding: 0 10px;
}
.newName {
  width: 60px;
  height: 60px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.contentBox {
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
