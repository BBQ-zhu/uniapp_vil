<template>
  <view class="page" style="height: calc(100vh + 10px)">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="产品查询"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>
    <view class="content">
      <u-search
        v-model="search"
        @custom="customFind"
        shape="round"
        placeholder="请输入产品名称"
        class="search"
      ></u-search>
      <!-- 产品服务列表 -->
      <recommend
        style="margin-top: 60px"
        :recomList="recomList"
        :status="loadStatus"
      ></recommend>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      find: {
        currentPage: 1, //当前页码
        limit: 10, //每一页的数量
      },
      search: "",
      fuzz: "name",
      //产品列表
      recomList: [],
      loadStatus: "loadmore", //loadmore 加载前, loading 加载中, momore 没有数据了
    };
  },
  onReachBottom() {
    // 监听上拉加载
    this.loadStatus = "loading";
    this.find.currentPage++
    this.searchChange();
  },
  onLoad(option) {
    this.search = option.name;
    this.fuzz = option.fuzz;
    this.searchChange();
  },
  methods: {
    customFind() {
      this.find.currentPage = 1;
      this.recomList = [];
      this.loadStatus = "loadmore";
      this.fuzz = "name";
      this.searchChange();
    },
    async searchChange() {
      var data = {
        skip: this.find.limit * (this.find.currentPage - 1),
        limit: this.find.limit,
        fuzz: this.fuzz,
        input: this.search,
      };
      await this.$axios.post(this.$api.findProduct, data).then((res) => {
        if (res.code == 200) {
          let arr = res.data[0].data
          if (arr.length == 0) {
            this.loadStatus = 'momore'
            this.find.currentPage--
          } else {
            this.loadStatus = 'loadmore'
            this.recomList = this.recomList.concat(arr)
          }
        } else {
          this.find.currentPage--
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.search {
  width: 100%;
  position: fixed;
  top: 44px;
  z-index: 1;
  box-shadow: 0 5px 8px -5px #909399;
  background: #fff;
  padding: 10px;
}
.content {
  // margin-bottom: 100px;
}
</style>
