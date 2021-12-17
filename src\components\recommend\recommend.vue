<template>
  <view class="content">
    <view class="flexBetween mb15">
      <view class="conName">{{ name }}</view>
    </view>
    <view
      v-for="(item, index) in recomList"
      :key="index + 're'"
      @click="reChange(item)"
    >
      <view class="flexStart ml5" style="align-items: center">
        <u-image
          :src="item.productlogo"
          width="140rpx"
          height="140rpx"
          shape="square"
          border-radius="8rpx"
        ></u-image>
        <view class="ml10" style="width: calc(100% - 100px)">
          <view class="reTitle"
            >{{ item.name }}
            <u-tag
              v-if="item.recomtype"
              class="ml10"
              :text="item.recomtype"
              mode="dark"
              :type="changeTypeTag('tag1', item.recomtype)"
            ></u-tag>
          </view>
          <view class="textOver1 mt5 color3">{{ item.description }}</view>
          <view class="flexStart mt5">
            <u-tag
              class="mr5"
              v-for="val in item.recomintro"
              :key="val"
              :text="val"
              :type="changeTypeTag('tag2', val)"
              mode="light"
            ></u-tag>
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
          <view class="colorYellow ml10" v-if="item.newprice"
            >￥<span class="f18">{{ item.newprice }}</span></view
          >
        </view>
        <view class="color3 ml20">{{ item.totalview || 0 }}+浏览量</view>
      </view>
      <u-line style="margin: 15px 0"></u-line>
    </view>
    <u-loadmore :status="status" /> 
  </view>
</template>

<script>
export default {
  props: ["name", "recomList", "status"],
  data() {
    return {};
  },
  methods: {
    reChange(item) {
      uni.navigateTo({
        url: "/pages/details/details?name=" + item.name,
      });
    },
    changeTypeTag(type, name) {
      let x = "";
      if (type == "tag1") {
        // 爆款.独家.新品.优惠.限时
        switch (name) {
          case "爆款":
            x = "error";
            break;
          case "独家":
            x = "primary";
            break;
          case "新品":
            x = "success";
            break;
          case "优惠":
            x = "warning";
            break;
          case "限时":
            x = "error";
            break;
          default:
            x = "error";
        }
      } else if (type == "tag2") {
        // 无隐形费用、全程托管、专家顾问、一对一服务、急速办理、官方保障、银企合作
        switch (name) {
          case "无隐形费用":
            x = "success";
            break;
          case "全程托管":
            x = "primary";
            break;
          case "专家顾问":
            x = "warning";
            break;
          case "一对一服务":
            x = "warning";
            break;
          case "急速办理":
            x = "error";
            break;
          case "官方保障":
            x = "primary";
            break;
          case "银企合作":
            x = "success";
            break;
          default:
            x = "error";
        }
      }
      return x;
    },
  },
};
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
