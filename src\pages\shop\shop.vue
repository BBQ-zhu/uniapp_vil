<template>
  <view class="page">
    <u-modal
      v-model="show"
      content="即将进入商城"
      @confirm="navGo"
      @cancel="close"
      :show-cancel-button="true"
    ></u-modal>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  onShow: function () {
    this.show = true;
  },
  methods: {
    navGo() {
      var a = document.createElement("a");
      a.setAttribute("href", "http://cs.zjmy.live/"); //商城跳转地址
      document.body.appendChild(a);
      a.click();
    },
    close() {
      this.show = false;
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
  },
};
</script>

<style scoped>
::v-deep .u-model__title {
  padding-bottom: 3px;
}
</style>
