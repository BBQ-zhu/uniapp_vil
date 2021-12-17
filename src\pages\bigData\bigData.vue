<template>
  <view class="page" style="height: calc(100vh + 10px);background:#fff;">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="大数据查询"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>

    <view>
      <u-button style="width:50%;margin:10px auto;margin-top:20px" @click="show = true">查询</u-button>
      <u-popup border-radius="10" v-model="show" :mode="mode" length="40%" :mask="mask">
        <view>
          <u-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="150"
            class="demo-ruleForm"
            style="margin:30px 20px"
          >
            <u-form-item label="客户类型" prop="payType">
              <u-radio-group v-model="ruleForm.type" @change="teamconfirm">
                <u-radio
                  shape="circle"
                  v-for="(item, index) in teamList"
                  :key="index"
                  :name="item.value"
                >{{ item.value }}</u-radio>
              </u-radio-group>
            </u-form-item>
            <u-form-item label="身份证号:" prop="idcard">
              <u-input v-model="ruleForm.idcard" placeholder="请输入身份证号"></u-input>
            </u-form-item>
            <u-button type="primary" style="width:50%;margin:40px auto;" @click="submit">确认</u-button>
          </u-form>
        </view>
      </u-popup>
      <!-- 贷款申请列表 -->
      <loanList v-if="ruleForm.type == '贷款客户' && !show" :only="'true'" :list="dataList" :status="loadStatus"></loanList>
      <!-- 企业申请列表 -->
      <enterpriseList v-if="ruleForm.type == '企业客户' && !show" :only="'true'" :list="dataList" :status="loadStatus"></enterpriseList>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      mode: 'top',
      mask: true,
      selectShow: false,
      teamList: [
        {
          value: '贷款客户',
          label: '贷款客户'
        },
        {
          value: '企业客户',
          label: '企业客户'
        }
      ],
      userInfo: {},
      ruleForm: {
        type: '贷款客户',
        idcard: ''
      },
      //申请列表
      dataList: [],
      loadStatus: 'momore', //loadmore 加载前, loading 加载中, momore 没有数据了
    }
  },
  onLoad() {
    this.userInfo = uni.getStorageSync('userInfo')
  },
  methods: {
    //确认按钮
    async submit() {
      if (this.ruleForm.idcard.length != 18) {
        uni.showToast({
          title: '请输入18位身份证号',
          icon: 'none'
        })
        return
      }
      var data = {
        skip: 0,
        limit: 9999999,
        fuzz: 'idcard',
        input: this.ruleForm.idcard,
        only:true //身份证号码必须全等才能查询出来
      }
      let res = await this.$axios.post(this.ruleForm.type == '贷款客户'? this.$api.findCustomer : this.$api.findEnterprise,data)
      if(res.code == 200){
        let arr = res.data[0].data
        this.dataList = arr
        if(arr.length == 0){
          uni.showToast({
            title: '暂无该用户数据',
            icon: 'none'
          })
        }
        this.show = false
      }
    },
    //客户类型切换
    teamconfirm(e) {
      this.ruleForm.type = e
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
