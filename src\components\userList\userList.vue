<template>
  <view>
    <u-popup v-model="UserCheck.userShow" mode="bottom" border-radius="14">
      <view style="width: 95%; margin: 0 auto; padding: 10px">
        <u-search v-model="UserCheck.value" @custom="customFind" shape="round" placeholder="请输入姓名或ID"></u-search>
      </view>
      <scroll-view
        scroll-y="true"
        style="width: 95%; height: calc(70vh); margin: 0 auto; padding:0 10px 0 10px "
      >
        <view class>
          <u-cell-group class="border5 f12">
            <u-cell-item
              v-for="(item,index) in searchList"
              :key="index+'user'"
              :title="`${item.username}（${item.uid}）`"
              :value="item.role"
              icon="account"
              @click="cellChange(item)"
            ></u-cell-item>
          </u-cell-group>
        </view>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
export default {
  props: {
    UserCheck: {
      type: Object
    }
  },
  data() {
    return {
      userList: [], //员工列表
      searchList:[] //查询结果列表
    }
  },
  async mounted() {
    await this.findUserList()
  },
  methods: {
    //搜索按钮
    customFind() {
      this.searchList = []
      this.userList.map(item=>{
        if(item.username.indexOf(this.UserCheck.value)>=0 || item.uid.indexOf(this.UserCheck.value)>=0){
          this.searchList.push(item)
        }
      })
    },
    //单个员工点击事件
    cellChange(item) {
      this.$emit('cellChange',item)
    },
    // 获取员工列表
    async findUserList() {
      var data = {
        skip: 0,
        limit: 99999999
      }
      await this.$axios.post(this.$api.findUser, data).then(res => {
        if (res.code == 200) {
          this.userList = res.data[0].data
          this.searchList = res.data[0].data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
