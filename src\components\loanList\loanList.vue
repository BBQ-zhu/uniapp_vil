<template>
  <view class="contentBox">
    <view class="flexBetween mb10" style="align-items: center">
      <view class="flex">
        <u-button
          v-if="only !='true'"
          @click="btnClick"
          data-name="3333"
          :plain="false"
          :shape="'shape'"
          :size="'mini'"
          :ripple="false"
          :type="'success'"
          >新增客户</u-button
        >
        <view class="conName ml10" style="padding-top: 5px">数据列表</view>
      </view>
      <view v-if="only !='true'" class="f12 color2 ml10">(审核结束的数据将不再展示)</view>
    </view>
    <u-line></u-line>
    <u-swipe-action
      :disabled="only =='true' ? true : false"
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
          <view>{{ item.houses == "是" ? "有" : "无" }}</view>
          <view class="ml10">房</view>
          <view>{{ item.car == "是" ? "有" : "无" }}</view>
          <view class="ml10">车</view>
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
            <view class="color2">{{ item.hires}}</view>
            <view class="color2">{{ item.time }}</view>
          </view>
        </view>
      </view>
      <u-line></u-line>
    </u-swipe-action>
    <view @click="$emit('reachBottom')">
      <view style="width: 100%; height: 20px"></view>
      <!-- 加载更多组件 -->
      <u-loadmore :status="status" />
    </view>
    <!-- 匹配产品列表弹出 -->
    <u-popup v-model="showList" mode="bottom" border-radius="14">
      <scroll-view
        scroll-y="true"
        style="width: 95%; height: calc(70vh); margin: 0 auto; padding: 10px"
      >
        <view
          style="border-bottom: 1px solid #909399; padding: 15px 10px 20px 10px"
          class="flexBetween f18 fw600 u-text-center"
        >
          <view>
            可贷笔数：
            <span class="colorYellow">{{ recomList.length }}</span>
          </view>
          <view>
            最高可贷金额：
            <span class="colorYellow">{{ recomMony }}万</span>
          </view>
        </view>
        <recommend
          class="mt10"
          :name="'匹配产品(请尽快到线下网点办理放款手续)'"
          :recomList="recomList"
          :status="'nomore'"
        ></recommend>
      </scroll-view>
    </u-popup>
    <u-loading
      :show="loadingShow"
      size="80"
      color="#11BBB8"
      mode="circle"
      style="position: fixed; top: 50%; left: 45%; z-index: 9999"
    ></u-loading>
  </view>
</template>

<script>
export default {
  props: ["only","name", "list", "status"],
  data() {
    return {
      showList: false,
      recomList: [], //推荐产品
      recomMony: 0, //可贷金额
      loadingShow: false,
      options: [
        {
          text: "匹配",
          style: {
            backgroundColor: "#11BBB8",
          },
        },
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
        //匹配按钮
        this.alignment(this.list[index]);
      } else if (index1 == 1) {
        //编辑按钮
        this.contentClick(index);
        this.list[index].show = false;
      } else if (index1 == 2) {
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
                .post(_this.$api.deleteCustomer, { _id: _this.list[index]._id })
                .then(async (res) => {
                  if (res.code == 200) {
                    let userInfo = uni.getStorageSync("userInfo");
                    let dataLogs = {
                      user: `${userInfo.username}(${userInfo.uid})`,
                      logdata: JSON.stringify(_this.list[index]),
                      remarks: `移动端-删除-贷款客户资料`,
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
    //产品匹配
    async alignment(obj) { 
      this.loadingShow = true;
      var data = {
        skip: 0,
        limit: 99999999,
        fuzz: "cation",
        input: "true",
      };
      await this.$axios
        .post(this.$api.findProduct, data)
        .then((res) => {
          if (res.code == 200) {
            let arr = res.data[0].data;
            this.recomList = [];
            this.recomMony = 0;
            // 第一轮匹配：需求资金、贷款期限是否在范围内
            // let newArr1 = [];
            // arr.map((item) => {
            //   if (
            //     parseFloat(obj.fund) >= parseFloat(item.minamount) &&
            //     parseFloat(obj.fund) <= parseFloat(item.maxamount) &&
            //     parseFloat(obj.tenor) >= parseFloat(item.minterm) &&
            //     parseFloat(obj.tenor) <= parseFloat(item.maxterm)
            //   ) {
            //     newArr1.push(item);
            //   }
            // });
            // 第二轮匹配：匹配特殊字段
            arr.map((item) => {
              let check = [];
              //根据匹配条件筛选值
              for (let val of item.match) {
                if (
                  typeof item[val] == "object" &&
                  val != "address"
                ) {
                  check.push(item[val].includes(obj[val]));
                } else if (val == "address" && obj[val].length) {
                  check.push(
                    item[val][0] == obj[val][0] && item[val][1] == obj[val][1]
                  );
                } else if (val == "age" && obj[val]) {
                  check.push(item[val] >= obj[val]);
                } else if (val == "revenue" && obj[val]) { //月收入
                  check.push(item[val] <= obj[val]);
                } else if (obj[val]) {
                  check.push(item[val] == obj[val]);
                }
              }
              if(item.match.length == 0){
                this.recomList.push(item);
              }
              if (item.key == "选中的都需要满足") {
                if (
                  check.every((item) => {
                    return item == true;
                  })
                ) {
                  this.recomList.push(item);
                }
              } else if (item.key == "选中的满足任意一条") {
                if (
                  check.some((item) => {
                    return item == true;
                  })
                ) {
                  this.recomList.push(item);
                }
              }
            });
            this.recomList.map((item) => {
              this.recomMony += parseFloat(item.maxamount || 0) || 0;
            });
            this.showList = true;
          } else {
            this.$u.toast(`匹配失败`);
          }
          this.loadingShow = false;
        })
        .catch(() => {
          this.$u.toast(`匹配失败`);
          this.loadingShow = false;
        });
    },
    //新增按钮
    btnClick() {
      uni.navigateTo({
        url: "/pages/loan/loan",
      });
    },
    //单个点击
    contentClick(index) {
      uni.navigateTo({
        url:
          "/pages/loan/loan?data=" +
          encodeURIComponent(JSON.stringify(this.list[index]))+"&only="+this.only, //this.list[index]
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
