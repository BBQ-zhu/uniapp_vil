<template>
  <view class="page" style="height: calc(100vh + 10px)">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="我的申请"
      title-color="#fff"
      :background="{backgroundImage:'linear-gradient(to right bottom,#46e3c4,#3cc8c9)'}"
    ></u-navbar>
     <view class="content">
     <!-- <u-search
        v-model="search"
        @custom="customFind"
        shape="round"
        placeholder="请输入产品名称"
        class="search"
      ></u-search> -->
      <!-- 产品服务列表 -->
      <recommend :recomList="recomList" :status="loadStatus"></recommend>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      //产品列表
      recomList: [],
      loadStatus:'nomore'
    }
  },
  onLoad(option) {
    this.proList = JSON.parse(option.data)
    this.proList.map( item=>{
       this.searchChange(item)
    })
  },
  methods: {
    async searchChange(name) {
      var data = {
        skip: 0,
        limit: 1,
        fuzz: 'name',
        input: name
      }
      await this.$axios.post(this.$api.findProduct, data).then(res => {
        if(res.code == 200 && res.data.length>0 && res.data[0].data.length>0){
          this.recomList.push(res.data[0].data[0])
        }
      })
    }
  }
}
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
