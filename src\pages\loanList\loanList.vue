<template>
  <view class="page" style="height: calc(100vh + 10px)">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      :title="type == 'loanList'?'贷款申请列表':'企业申请列表'"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>

    <view style>
      <!-- 贷款申请列表 --> 
      <loanList v-if="type == 'loanList'" :list="loanList" :status="loadStatus" @reachBottom="reachBottom"></loanList>
      <!-- 企业申请列表 -->
      <enterpriseList v-if="type == 'enterprise'" :list="loanList" :status="loadStatus" @reachBottom="reachBottom"></enterpriseList>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      type: "",
      //申请列表
      loanList: [],
      loadStatus: "momore", //loadmore 加载前, loading 加载中, momore 没有数据了
      find: {
        currentPage: 1, //当前页码
        limit: 20, //每一页的数量
      },
    };
  },
  onLoad(option) {
    this.type = option.data;
    this.userInfo = uni.getStorageSync("userInfo");
    this.getLoanList(); // 获取列表
  },
  onReachBottom() {
    // 监听上拉加载
    this.loadStatus = "loading";
    this.find.currentPage++;
    this.getLoanList();
  },
  methods: {
    reachBottom() {
      // 监听上拉加载
      this.loadStatus = "loading";
      this.find.currentPage++;
      this.getLoanList();
    },
    getLoanList() {
      var data = {
        skip: this.find.limit * (this.find.currentPage - 1),
        limit: this.find.limit,
        fuzz: "manager1",
        input: this.userInfo.uid,
      };
      this.$axios.post(this.type == 'loanList' ? this.$api.findCustomer : this.$api.findEnterprise, data).then((res) => {
        if (res.code == 200) {
          let arr = res.data[0].data
          if (arr.length == 0) {
            this.loadStatus = 'momore'
            this.find.currentPage--
          } else {
            this.loadStatus = 'loadmore'
            let newArr = [];
            arr.map((item) => {
              if (item.status != "审核结束") {
                item.show = false;
                item.time = item.time.split(" ")[0];
                newArr.push(item);
              }
            });
            this.loanList = this.loanList.concat(newArr)
          }
        } else {
          this.find.currentPage--
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
