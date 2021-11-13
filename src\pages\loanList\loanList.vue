<template>
  <view class="page" style="height: calc(100vh + 10px)">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="申请列表"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>

    <view style>
      <!-- 申请列表 -->
      <loanList :list="loanList" :status="loadStatus"></loanList>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo:{},
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
    this.type = option.name;
    this.userInfo = uni.getStorageSync("userInfo");
    this.getLoanList(); // 获取招聘列表
  }, 
  onReachBottom() {
    // 监听上拉加载
    this.loadStatus = "loading";
    this.getLoanList();
  },
  methods: {
    getLoanList() {
      var data = {
        skip: this.find.limit * (this.find.currentPage - 1),
        limit: this.find.limit,
        fuzz: 'manager1',
        input: this.userInfo.uid,
      };
      this.$axios.post(this.$api.findCustomer, data).then((res) => {
        let arr = res.data[0].data;
        if (arr.length == 0) {
          this.loadStatus = "momore";
        } else {
          this.loadStatus = "loadmore";
          this.find.currentPage++;
          let newArr = []
          arr.map(item=>{
            //草稿\待审核\驳回\通过
            if(item.status != '通过'){
              item.show = false
              item.time = item.time.split(' ')[0]
              newArr.push(item)
            }
          })
          this.loanList = this.loanList.concat(newArr);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
