<template>
  <view class="page" style="height: calc(100vh + 10px)">
    <view class="container">
      <view class="flexBetween" style="line-height: 21px">
        <view> <u-icon name="map-fill" size="28"></u-icon>绵阳 </view>
        <view class="flexCenter center">
          <view>
            服务
            <view class="serve"></view>
          </view>
          <navigator url="/pages/news/news">新闻</navigator>

          <u-link href="http://zhulif.com/company/index.html">
            <view class="line" style="margin-top: 4px">关于</view>
          </u-link>
        </view>
        <view @click="toAgents">
          <!-- <u-badge type="error" size="mini" :count="agentsList.length"></u-badge> -->
          <u-icon name="chat" size="40"></u-icon>
        </view>
      </view>
      <view class="find" @click="findProdect('')">
        <u-icon name="search" size="35" class="findIcon"></u-icon>代理记账
      </view>
      <view class="serveList flex mt15">
        <view class="fw600 mr5">热搜</view>
        <view class="serveBtn" @click="findProdect('工商注册')">工商注册</view>
        <view class="serveBtn" @click="findProdect('商标')">商标</view>
        <view class="serveBtn" @click="findProdect('代理记账')">代理记账</view>
        <view class="serveBtn" @click="findProdect('法律')">法律</view>
        <view class="serveBtn" @click="findProdect('注销')">注销</view>
      </view>
      <view class="wrap mt15">
        <!-- 轮播图 -->
        <u-swiper :list="swiperList" @click="swiperChange"></u-swiper>
      </view>
    </view>
    <view class="conCenter mt10">
      <!-- 导航区域 -->
      <navigation :navList="navList"></navigation>
      <!-- 分割线 -->
      <u-line class="line" :hair-line="false"></u-line>
      <!-- 滚动消息 -->
      <u-notice-bar :list="notList" mode="vertical" class="mt10"></u-notice-bar>
      <!-- 专家顾问 -->
      <consult class="mt10"></consult>
      <!-- 企业学堂 -->
      <school class="mt15"></school>
    </view>
    <!-- 咨询顾问 -->
    <consultant class="mt15"></consultant>
    <!-- 推荐服务 -->
    <recommend
      class="mt10"
      :name="'推荐服务'"
      :recomList="recomList"
      :status="loadStatus"
    ></recommend>
  </view>
</template>

<script>
export default {
  data() {
    return {
      agentsList: "", //代办数量
      //轮播图
      swiperList: [],
      //导航图标
      navList: [],
      //滚动通知
      notList: [
        "绵阳用户 135****0896 刚交易了 商标注册",
        "绵阳用户 180****6872 刚交易了 银行开户",
        "绵阳用户 137****1709 刚交易了 代理记账",
        "绵阳用户 153****3634 刚交易了 贷款服务",
        "绵阳用户 189****9938 刚交易了 资质认证",
        "绵阳用户 158****5264 刚交易了 抵押贷款",
        "绵阳用户 138****6056 刚交易了 专家顾问",
        "绵阳用户 150****5526 刚交易了 法律服务",
        "绵阳用户 138****8967 刚交易了 专利注册",
      ],
      find: {
        currentPage: 1, //当前页码
        limit: 10, //每一页的数量
      },
      //推荐服务
      recomList: [],
      loadStatus: "loadmore", //loadmore 加载前, loading 加载中, momore 没有数据了
    };
  },
  onLoad() {
    this.scroImgList(); //获取轮播图
    this.searchChange(); //推荐产品
    this.findNavList(); //查询导航
    if (uni.getStorageSync("vipUserInfo")) {
      this.myCont(); //代办数量
    }
  },
  onReachBottom() {
    // 监听上拉加载
    // 监听上拉加载
    this.loadStatus = "loading";
    this.searchChange();
  },
  methods: {
    myCont() {
      //我的代办数量
      var data = {
        skip: 0,
        limit: 999,
        fuzz: "phone",
        input: (uni.getStorageSync("vipUserInfo") || {}).phone,
      };
      this.$axios.post(this.$api.findContract, data).then((res) => {
        if (
          res.code == 200 &&
          res.data.length > 0 &&
          res.data[0].data.length > 0
        ) {
          this.agentsList = this.$commonJS.agents(res.data[0].data);
        }
      });
    },
    toAgents() {
      //跳转至我的代办
      if (this.agentsList.length > 0) {
        uni.navigateTo({
          url:
            "/pages/agents/agents?data=" +
            encodeURIComponent(JSON.stringify(this.agentsList)),
        });
      }
    },
    // 获取导航列表
    async findNavList() {
      await this.$axios.post(this.$api.findProductClass).then((res) => {
        this.navList = [];
        let arr = res.data;
        let isTrue = []
        arr.map((item) => {
          if (item.super == "是") {
            var obj = { image: "", title: "", path: "",number:''};
            obj.image = item.imgurl;
            obj.title = item.name;
            obj.path = item.name;
            obj.number = item.number;
            isTrue.push(obj);
          }
        });
        this.navList = this.$commonJS.bubbleSort(isTrue,'number')
      });
    },
    // 轮播图
    async scroImgList() {
      await this.$axios.post(this.$api.findScrollImg).then((res) => {
        this.swiperList = [];
        let arr = res.data;
        arr.map((item) => {
          if (item.typeid == "mobScroll") {
            var obj = { image: "", path: "" };
            obj.image = item.scroimg;
            obj.path = item.link;
            this.swiperList.push(obj);
          }
        });
      });
    },
    //查询产品列表
    async searchChange() {
      var data = {
        skip: this.find.limit * (this.find.currentPage - 1),
        limit: this.find.limit,
        fuzz: "recommend",
        input: "推荐",
      };
      await this.$axios.post(this.$api.findProduct, data).then((res) => {
        let arr = res.data[0].data;
        if (arr.length == 0) {
          this.loadStatus = "momore";
        } else {
          this.loadStatus = "loadmore";
          this.find.currentPage++;
          this.recomList = this.recomList.concat(arr);
        }
      });
    },
    //轮播图跳转
    swiperChange(e) {
      if (this.swiperList[e].path) {
        uni.navigateTo({
          url: "/pages/details/details?name=" + this.swiperList[e].path,
        });
      }
    },
    findProdect(name) {
      // encodeURIComponent(JSON.stringify(res.data))
      uni.navigateTo({
        url: "/pages/findProdect/findProdect?name=" + name + "&fuzz=" + "name",
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.wrap {
  border-radius: 5px;
  box-shadow: 0 5px 10px -5px #dddcda;
}
.container {
  width: 100%;
  height: 212px;
  padding: 16px 14px;
  box-sizing: border-box;
  color: #ffffff;
  background: linear-gradient(to top, #46e3c4, #3cc8c9);
  // background-color: #11bbb8;
}
.center {
  width: 120px;
  display: flex;
  justify-content: space-between;
}
.serve {
  width: 20px;
  height: 2px;
  border-radius: 5px;
  text-align: center;
  background-color: #ffffff;
  margin-top: 5px;
  margin-left: 2px;
}
.find {
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-radius: 30px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 10px;
  color: #b7b7b7;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 12px;
}
.serveList {
  width: auto;
  height: 20px;
  line-height: 20px;
  box-sizing: border-box;
}
.serveBtn {
  padding: 0 7px;
  text-align: center;
  background: #fff;
  opacity: 0.6;
  border-radius: 20px;
  color: #909399;
  font-size: 12px;
  margin-right: 5px;
}
.findIcon {
  position: relative;
  top: 1px;
  padding-right: 2px;
}
.conCenter {
  padding: 10px 14px;
}
</style>
