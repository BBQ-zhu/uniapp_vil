<template>
  <view class="content flex flexStart">
    <view
      class="navItem"
      v-for="(item, index) in navList"
      :key="index + 'nav'"
      @click="navChange(item.path, 'type')"
    >
      <u-image 
        :src="item.image"
        width="60rpx"
        height="60rpx"
        shape="square"
        style="margin: 0 auto"
      ></u-image>
      <view>{{ item.title }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["navList"],
  data() {
    return {};
  },
  methods: {
    navChange(path, fuzz) {
      uni.navigateTo({
        url: "/pages/findProdect/findProdect?name=" + path + "&fuzz=" + fuzz,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 50px;
}
.navItem {
  width: 20%;
  margin-bottom: 20px;
  text-align: center;
  line-height: 20px;
}
</style>
