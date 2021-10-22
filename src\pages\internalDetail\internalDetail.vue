<template>
  <view class="page" style="background:#fff;">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="内部资料"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>
    <view>
      <view>
      <!-- 头部切换 -->
        <view class="content" >
          <u-subsection class="mt5" @change="sectChange" :active-color="activeColor" :list="list" :current="0"></u-subsection>
        </view>
        <u-gap height="20" bg-color="#f1f2f6" ></u-gap>
      </view>
      <!-- 列表 -->
      <view class="mt10 content">
        <u-cell-group class="f12">
          <u-cell-item
            v-for="(item,index) in interList"
            :key="index+'cell'"
            :title="item.newsname"
            @click="cellChange(item)"
          ></u-cell-item>
        </u-cell-group>
      </view>
    </view>

    <!-- 弹出框 -->
    <u-popup v-model="show" mode="bottom" border-radius="14">
      <scroll-view
        scroll-y="true"
        style="width: 95%; height: calc(70vh); margin: 0 auto; padding: 10px"
      >
        <view class="fw600 mb10 f14" style="text-align: center;">{{interDetail.newsname}}</view>
        <view class="color2 mb20" >{{interDetail.message}}</view>
        <view class="fw600 mb10" style="border-left:2px solid #11BBB8;padding-left:5px;">资料详情</view>
        <u-parse
        :html="interDetail.content"
        :domain="$URL"
        :lazy-load="true"
        :show-with-animation="true"
      ></u-parse>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      interDetail: {},
      list: [{ name: '资料一' }, { name: '资料二' }, { name: '资料三' }],
      activeColor: this.$u.color['warning'],
      interList: [],
      list1: [],
      list2: [],
      list3: []
    }
  },
  mounted() {
    this.findInternal()
  },
  methods: {
    // 列表点击查看详情
    cellChange(item) {
      this.show = true
      this.interDetail = item
    },
    //顶部分页
    sectChange(index) {
      if (index == 0) {
        this.interList = this.list1
      } else if (index == 1) {
        this.interList = this.list2
      } else if (index == 2) {
        this.interList = this.list3
      }
    },
    findInternal() {
      var data = {
        skip: 0,
        limit: 9999999
      }
      this.$axios.post(this.$api.findInternal, data).then(res => {
        if (res.code == 200) {
          let arr = res.data[0].data
          this.list1 = []
          this.list2 = []
          this.list3 = []
          arr.map(item => {
            if (item.type == '资料一') {
              this.list1.push(item)
            } else if (item.type == '资料二') {
              this.list2.push(item)
            } else if (item.type == '资料三') {
              this.list3.push(item)
            }
          })
          this.interList = this.list1
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.content {
  padding: 10px 14px;
  // background:#fff;
}
</style>
