<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="我的合同"
      title-color="#fff"
      :background="{backgroundImage:'linear-gradient(to right bottom,#46e3c4,#3cc8c9)'}"
    ></u-navbar>
    <view class="content">
      <u-card v-for="(item,index) in contractList" :key="index" :title="'电子合同'" :sub-title="item.time" title-color="#11BBB8" @click="toContract(item)">
        <view class slot="body">
          <view class="u-body-item u-flex u-col-between u-p-t-0">
            <view class="u-body-item-title textOver2">{{item.conname}}</view>
          </view>
        </view>
        <view slot="foot" ><u-icon name="integral-fill" size="34" color="#11BBB8" label-color="#11BBB8" :label="item.status"></u-icon></view>
      </u-card>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      find:{
        currentPage:1,
        limit:99999
      },
      contractList:[],
      isUser:false
    }
  },
  async onLoad(option){
    if(option.data == 'myVipUser'){ //内部员工查询客户合同
      this.isUser = true
      // this.worksGetContractList()
      let arr1 =await this.worksGetContractList('manager1')
      let arr2 =await this.worksGetContractList('manager2')
      let arr3 =await this.worksGetContractList('manager3')
      let arr = arr1.concat(arr2).concat(arr3)
      var result = [];
      var obj = {};
      for(var i =0; i<arr.length; i++){
        if(!obj[arr[i]._id]){
          result.push(arr[i]);
          obj[arr[i]._id] = true;
        }
      }
      this.contractList = result
    }else{
      this.isUser = false
      this.getContractList()
    }
  },
  methods: {
    toContract(item){
      uni.navigateTo({
        url: '/pages/myContractDetails/myContractDetails?data=' + item._id + '&isUser=' + this.isUser
      })
    },
    getContractList() {
      var data = {
        skip: this.find.limit * (this.find.currentPage - 1),
        limit: this.find.limit,
        fuzz: 'phone',
        input: (uni.getStorageSync('vipUserInfo') || {}).phone
      }
      this.$axios.post(this.$api.findContract, data).then(res => {
        this.contractList = res.data[0].data
      })
    },
    async worksGetContractList(name){
      var data = {
        skip: this.find.limit * (this.find.currentPage - 1),
        limit: this.find.limit,
        fuzz: name,
        input: uni.getStorageSync('userInfo').uid
      }
      let arr = await this.$axios.post(this.$api.findContract, data)
        if (
          arr.code == 200 &&
          arr.data.length > 0 &&
          arr.data[0].data.length > 0
        ) {
          return arr.data[0].data
        }else{
          return []
        }
    }
  }
}
</script>

<style lang='scss' scoped>
.newName {
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.conBox{
  width:73px;
  height:40px;
  // background: linear-gradient(to right, #ff8b00, #fe5e01) 
}
</style>
