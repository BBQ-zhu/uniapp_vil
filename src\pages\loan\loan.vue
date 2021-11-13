<template>
  <view class="page">
    <u-navbar
      back-txt="返回"
      back-icon-color="#fff"
      title="贷款申请"
      title-color="#fff"
      :background="{
        backgroundImage: 'linear-gradient(to right bottom,#46e3c4,#3cc8c9)',
      }"
    ></u-navbar>
    <view class="content">
      <u-form :model="ruleForm" label-width="200" ref="ruleForm">
        <u-collapse
          arrow-color="#11BBB8"
          :item-style="itemStyle"
          :head-style="headStyle"
          :body-style="bodyStyle"
        >
          <u-collapse-item title="基本情况" name="1">
            <div class="flexCenter">
              <u-form-item label="客户姓名:" prop="name">
                <u-input v-model="ruleForm.name" placeholder="请输入客户姓名"></u-input>
              </u-form-item>
              <u-form-item label="联系电话:" prop="phone">
                <u-input v-model="ruleForm.phone" placeholder="请输入联系电话"></u-input>
              </u-form-item>
              <u-form-item label="身份证号:" prop="idcard">
                <u-input v-model="ruleForm.idcard" placeholder="请输入身份证号"></u-input>
              </u-form-item>
              <u-form-item label="客户年龄:" prop="age">
                <u-input v-model="ruleForm.age" placeholder="请输入客户年龄"></u-input>
              </u-form-item>
              <u-form-item label="需求资金(万):" prop="fund">
                <u-input v-model="ruleForm.fund" placeholder="请输入需求资金(万)"></u-input>
              </u-form-item>
              <u-form-item label="资金用途:" prop="utility">
                <u-input v-model="ruleForm.utility" placeholder="请输入资金用途"></u-input>
              </u-form-item>
              <u-form-item label="贷款期限(月):" prop="tenor">
                <u-input v-model="ruleForm.tenor" placeholder="请输入贷款期限(月)"></u-input>
              </u-form-item>
              <u-form-item label="婚姻状况:" prop="matrimony">
                <u-input
                  type="select"
                  :select-open="option.matrimonyShow"
                  v-model="ruleForm.matrimony"
                  placeholder="请选择婚姻状况"
                  @click="option.matrimonyShow = true"
                ></u-input>
                <u-action-sheet
                  @click="matrimonyChange"
                  v-model="option.matrimonyShow"
                  :list="option.matrimony"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="子女情况:" prop="children">
                <u-input v-model="ruleForm.children" placeholder="请输入子女情况"></u-input>
              </u-form-item>
              <u-form-item label="配偶是否知晓:" prop="knowing">
                <u-input
                  type="select"
                  :select-open="option.knowingShow"
                  v-model="ruleForm.knowing"
                  placeholder="请选择配偶是否知晓"
                  @click="option.knowingShow = true"
                ></u-input>
                <u-action-sheet
                  @click="knowingChange"
                  v-model="option.knowingShow"
                  :list="option.knowing"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="户籍所在地:" prop="domicile">
                <u-input v-model="ruleForm.domicile" placeholder="请输入户籍所在地"></u-input>
              </u-form-item>
              <u-form-item label="现居城市:" prop="address">
                <!-- <u-input v-model="ruleForm.address" placeholder="请输入现居城市" @focus="isShow = true"></u-input> -->
                <view @click="isShow = true" style="min-width:155px">{{ruleForm.address[0]}}-{{ruleForm.address[1]}}</view>
                <u-select
                  v-model="isShow"
                  mode="mutil-column-auto"
                  :list="fixedInfo.address"
                  @confirm="confirm"
                ></u-select>
              </u-form-item>
              <u-form-item label="详细地址:" prop="addressdetail">
                <u-input v-model="ruleForm.addressdetail" placeholder="请输入现居详细地址"></u-input>
              </u-form-item>
            </div>
          </u-collapse-item>
          <u-collapse-item title="收入情况" name="2">
            <div class="flexCenter">
              <u-form-item label="职业类型:" prop="hires">
                <u-input
                  type="select"
                  :select-open="option.hiresShow"
                  v-model="ruleForm.hires"
                  placeholder="请选择职业类型"
                  @click="option.hiresShow = true"
                ></u-input>
                <u-action-sheet
                  @click="hiresChange"
                  v-model="option.hiresShow"
                  :list="option.hires"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="年开票金额:" prop="invoicing">
                <u-input v-model="ruleForm.invoicing" placeholder="请输入年开票金额"></u-input>
              </u-form-item>
              <u-form-item label="年缴税金额:" prop="paying">
                <u-input v-model="ruleForm.paying" placeholder="请输入年缴税金额"></u-input>
              </u-form-item>
              <u-form-item label="单位名称:" prop="unit">
                <u-input v-model="ruleForm.unit" placeholder="请输入单位名称"></u-input>
              </u-form-item>
              <u-form-item label="工作岗位:" prop="unitposition">
                <u-input v-model="ruleForm.unitposition" placeholder="请输入工作岗位"></u-input>
              </u-form-item>
              <u-form-item label="单位地址:" prop="unitadress">
                <u-input v-model="ruleForm.unitadress" placeholder="请输入单位地址"></u-input>
              </u-form-item>
              <u-form-item label="单位电话:" prop="unitphone">
                <u-input v-model="ruleForm.unitphone" placeholder="请输入单位电话"></u-input>
              </u-form-item>
              <u-form-item label="入职时间:" prop="entrytime">
                <u-input v-model="ruleForm.entrytime" placeholder="请输入入职时间"></u-input>
              </u-form-item>
              <u-form-item label="月收入(元):" prop="revenue">
                <u-input v-model="ruleForm.revenue" placeholder="请输入月收入(元)"></u-input>
              </u-form-item>
              <u-form-item label="是否有社保:" prop="social">
                <u-input
                  type="select"
                  :select-open="option.socialShow"
                  v-model="ruleForm.social"
                  placeholder="请选择是否有社保"
                  @click="option.socialShow = true"
                ></u-input>
                <u-action-sheet
                  @click="socialChange"
                  v-model="option.socialShow"
                  :list="option.social"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="是否有公积金:" prop="provident">
                <u-input
                  type="select"
                  :select-open="option.providentShow"
                  v-model="ruleForm.provident"
                  placeholder="请选择是否有公积金"
                  @click="option.providentShow = true"
                ></u-input>
                <u-action-sheet
                  @click="providentChange"
                  v-model="option.providentShow"
                  :list="option.provident"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="公积金年限:" prop="proyears">
                <u-input v-model="ruleForm.proyears" placeholder="请输入公积金年限"></u-input>
              </u-form-item>
              <u-form-item label="公积金基数:" prop="probase">
                <u-input v-model="ruleForm.probase" placeholder="请输入公积金基数"></u-input>
              </u-form-item>
              <u-form-item label="社保年限:" prop="socialyear">
                <u-input v-model="ruleForm.socialyear" placeholder="请输入社保年限"></u-input>
              </u-form-item>
            </div>
          </u-collapse-item>
          <u-collapse-item title="房屋情况" name="3">
            <div class="flexCenter">
              <u-form-item label="是否有房:" prop="houses">
                <u-input
                  type="select"
                  :select-open="option.housesShow"
                  v-model="ruleForm.houses"
                  placeholder="请选择是否有房"
                  @click="option.housesShow = true"
                ></u-input>
                <u-action-sheet
                  @click="housesChange"
                  v-model="option.housesShow"
                  :list="option.houses"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="小区名称:" prop="housesname">
                <u-input v-model="ruleForm.housesname" placeholder="请输入小区名称"></u-input>
              </u-form-item>
              <u-form-item label="小区地址:" prop="houaddress">
                <u-input v-model="ruleForm.houaddress" placeholder="请输入小区地址"></u-input>
              </u-form-item>
              <u-form-item label="购买时间:" prop="housetime">
                <u-input v-model="ruleForm.housetime" placeholder="请输入购买时间"></u-input>
              </u-form-item>
              <u-form-item label="房屋面积:" prop="housearea">
                <u-input v-model="ruleForm.housearea" placeholder="请输入房屋面积"></u-input>
              </u-form-item>
              <u-form-item label="房屋类型:" prop="housetype">
                <u-input
                  type="select"
                  :select-open="option.housetypeShow"
                  v-model="ruleForm.housetype"
                  placeholder="请选择房屋类型"
                  @click="option.housetypeShow = true"
                ></u-input>
                <u-action-sheet
                  @click="housetypeChange"
                  v-model="option.housetypeShow"
                  :list="option.housetype"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="购买方式:" prop="houpayment">
                <u-input
                  type="select"
                  :select-open="option.houpaymentShow"
                  v-model="ruleForm.houpayment"
                  placeholder="请选择购买方式"
                  @click="option.houpaymentShow = true"
                ></u-input>
                <u-action-sheet
                  @click="houpaymentChange"
                  v-model="option.houpaymentShow"
                  :list="option.houpayment"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="是否抵押:" prop="houmortgage">
                <u-input
                  type="select"
                  :select-open="option.houmortgageShow"
                  v-model="ruleForm.houmortgage"
                  placeholder="请选择是否抵押"
                  @click="option.houmortgageShow = true"
                ></u-input>
                <u-action-sheet
                  @click="houmortgageChange"
                  v-model="option.houmortgageShow"
                  :list="option.houmortgage"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="贷款金额:" prop="houamount">
                <u-input v-model="ruleForm.houamount" placeholder="抵押请输入贷款金额"></u-input>
              </u-form-item>
            </div>
          </u-collapse-item>
          <u-collapse-item title="车辆情况" name="4">
            <div class="flexCenter">
              <u-form-item label="是否有车:" prop="car">
                <u-input
                  type="select"
                  :select-open="option.carShow"
                  v-model="ruleForm.car"
                  placeholder="请选择是否有车"
                  @click="option.carShow = true"
                ></u-input>
                <u-action-sheet @click="carChange" v-model="option.carShow" :list="option.car"></u-action-sheet>
              </u-form-item>
              <u-form-item label="车辆品牌:" prop="carbrand">
                <u-input v-model="ruleForm.carbrand" placeholder="请输入车辆品牌"></u-input>
              </u-form-item>
              <u-form-item label="购车年限:" prop="caryear">
                <u-input v-model="ruleForm.caryear" placeholder="请输入购车年限"></u-input>
              </u-form-item>
              <u-form-item label="现评估价格:" prop="carprice">
                <u-input v-model="ruleForm.carprice" placeholder="请输入评估价格"></u-input>
              </u-form-item>
              <u-form-item label="购买方式:" prop="carpayment">
                <u-input
                  type="select"
                  :select-open="option.carpaymentShow"
                  v-model="ruleForm.carpayment"
                  placeholder="请选择购买方式"
                  @click="option.carpaymentShow = true"
                ></u-input>
                <u-action-sheet
                  @click="carpaymentChange"
                  v-model="option.carpaymentShow"
                  :list="option.carpayment"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="剩余待还:" prop="carema">
                <u-input v-model="ruleForm.carema" placeholder="按揭请填写待还金额"></u-input>
              </u-form-item>
            </div>
          </u-collapse-item>
          <u-collapse-item title="保单情况" name="5">
            <div class="flexCenter">
              <u-form-item label="商业保险:" prop="policy">
                <u-input
                  type="select"
                  :select-open="option.policyShow"
                  v-model="ruleForm.policy"
                  placeholder="请选择商业保险"
                  @click="option.policyShow = true"
                ></u-input>
                <u-action-sheet
                  @click="policyChange"
                  v-model="option.policyShow"
                  :list="option.policy"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="投保公司名称:" prop="policyname">
                <u-input v-model="ruleForm.policyname" placeholder="请输入投保公司名称"></u-input>
              </u-form-item>
              <u-form-item label="已保年限:" prop="policyear">
                <u-input v-model="ruleForm.policyear" placeholder="请输入已保年限"></u-input>
              </u-form-item>
              <u-form-item label="缴费金额:" prop="policypre">
                <u-input v-model="ruleForm.policypre" placeholder="请输入缴费金额"></u-input>
              </u-form-item>
            </div>
          </u-collapse-item>
          <u-collapse-item title="数据情况" name="6">
            <div class="flexCenter">
              <u-form-item label="芝麻分:" prop="sesame">
                <u-input
                  type="select"
                  :select-open="option.sesameShow"
                  v-model="ruleForm.sesame"
                  placeholder="请选择芝麻分"
                  @click="option.sesameShow = true"
                ></u-input>
                <u-action-sheet
                  @click="sesameChange"
                  v-model="option.sesameShow"
                  :list="option.sesame"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="微粒贷:" prop="microcredit">
                <u-input
                  type="select"
                  :select-open="option.microcreditShow"
                  v-model="ruleForm.microcredit"
                  placeholder="请选择"
                  @click="option.microcreditShow = true"
                ></u-input>
                <u-action-sheet
                  @click="microcreditChange"
                  v-model="option.microcreditShow"
                  :list="option.microcredit"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="信用卡:" prop="credit">
                <u-input
                  type="select"
                  :select-open="option.creditShow"
                  v-model="ruleForm.credit"
                  placeholder="请选择"
                  @click="option.creditShow = true"
                ></u-input>
                <u-action-sheet
                  @click="creditChange"
                  v-model="option.creditShow"
                  :list="option.credit"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="烟草证:" prop="tobacco">
                <u-input
                  type="select"
                  :select-open="option.tobaccoShow"
                  v-model="ruleForm.tobacco"
                  placeholder="请选择"
                  @click="option.tobaccoShow = true"
                ></u-input>
                <u-action-sheet
                  @click="tobaccoChange"
                  v-model="option.tobaccoShow"
                  :list="option.tobacco"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="企业税贷:" prop="enterprise">
                <u-input
                  type="select"
                  :select-open="option.enterpriseShow"
                  v-model="ruleForm.enterprise"
                  placeholder="请选择"
                  @click="option.enterpriseShow = true"
                ></u-input>
                <u-action-sheet
                  @click="enterpriseChange"
                  v-model="option.enterpriseShow"
                  :list="option.enterprise"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="企业票贷:" prop="ticket">
                <u-input
                  type="select"
                  :select-open="option.ticketShow"
                  v-model="ruleForm.ticket"
                  placeholder="请选择"
                  @click="option.ticketShow = true"
                ></u-input>
                <u-action-sheet
                  @click="ticketChange"
                  v-model="option.ticketShow"
                  :list="option.ticket"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="征信白名单:" prop="creditip">
                <u-input
                  type="select"
                  :select-open="option.creditipShow"
                  v-model="ruleForm.creditip"
                  placeholder="请选择征信白名单"
                  @click="option.creditipShow = true"
                ></u-input>
                <u-action-sheet
                  @click="creditipChange"
                  v-model="option.creditipShow"
                  :list="option.creditip"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="是否有官司:" prop="lawsuits">
                <u-input
                  type="select"
                  :select-open="option.lawsuitsShow"
                  v-model="ruleForm.lawsuits"
                  placeholder="请选择是否有官司"
                  @click="option.lawsuitsShow = true"
                ></u-input>
                <u-action-sheet
                  @click="lawsuitsChange"
                  v-model="option.lawsuitsShow"
                  :list="option.lawsuits"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="是否有案底:" prop="record">
                <u-input
                  type="select"
                  :select-open="option.recordShow"
                  v-model="ruleForm.record"
                  placeholder="请选择是否有案底"
                  @click="option.recordShow = true"
                ></u-input>
                <u-action-sheet
                  @click="recordChange"
                  v-model="option.recordShow"
                  :list="option.record"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="不良嗜好:" prop="hobbies">
                <u-input
                  type="select"
                  :select-open="option.hobbiesShow"
                  v-model="ruleForm.hobbies"
                  placeholder="请选择不良嗜好"
                  @click="option.hobbiesShow = true"
                ></u-input>
                <u-action-sheet
                  @click="hobbiesChange"
                  v-model="option.hobbiesShow"
                  :list="option.hobbies"
                ></u-action-sheet>
              </u-form-item>
            </div>
          </u-collapse-item>
          <u-collapse-item title="紧急情况" name="7">
            <div class="flexCenter">
              <u-form-item label="第一联系人:" prop="contacts1">
                <u-input v-model="ruleForm.contacts1" placeholder="请输入第一联系人姓名"></u-input>
              </u-form-item>
              <u-form-item label="联系人关系:" prop="conrelat1">
                <u-input
                  type="select"
                  :select-open="option.conrelat1Show"
                  v-model="ruleForm.conrelat1"
                  placeholder="请选择联系人关系"
                  @click="option.conrelat1Show = true"
                ></u-input>
                <u-action-sheet
                  @click="conrelat1Change"
                  v-model="option.conrelat1Show"
                  :list="option.conrelat1"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="联系人电话:" prop="conphone1">
                <u-input v-model="ruleForm.conphone1" placeholder="请输入第一联系人电话"></u-input>
              </u-form-item>
              <u-form-item label="第二联系人:" prop="contacts2">
                <u-input v-model="ruleForm.contacts2" placeholder="请输入第二联系人姓名"></u-input>
              </u-form-item>
              <u-form-item label="联系人关系:" prop="conrelat2">
                <u-input
                  type="select"
                  :select-open="option.conrelat2Show"
                  v-model="ruleForm.conrelat2"
                  placeholder="请选择联系人关系"
                  @click="option.conrelat2Show = true"
                ></u-input>
                <u-action-sheet
                  @click="conrelat2Change"
                  v-model="option.conrelat2Show"
                  :list="option.conrelat2"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="联系人电话:" prop="conphone2">
                <u-input v-model="ruleForm.conphone2" placeholder="请输入第二联系人电话"></u-input>
              </u-form-item>
              <u-form-item label="第三联系人:" prop="contacts3">
                <u-input v-model="ruleForm.contacts3" placeholder="请输入第三联系人姓名"></u-input>
              </u-form-item>
              <u-form-item label="联系人关系:" prop="conrelat3">
                <u-input
                  type="select"
                  :select-open="option.conrelat3Show"
                  v-model="ruleForm.conrelat3"
                  placeholder="请选择联系人关系"
                  @click="option.conrelat3Show = true"
                ></u-input>
                <u-action-sheet
                  @click="conrelat3Change"
                  v-model="option.conrelat3Show"
                  :list="option.conrelat3"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="联系人电话:" prop="conphone3">
                <u-input v-model="ruleForm.conphone3" placeholder="请输入第三联系人电话"></u-input>
              </u-form-item>
              <u-form-item label="第四联系人:" prop="contacts4">
                <u-input v-model="ruleForm.contacts4" placeholder="请输入第四联系人姓名"></u-input>
              </u-form-item>
              <u-form-item label="联系人关系:" prop="conrelat4">
                <u-input
                  type="select"
                  :select-open="option.conrelat4Show"
                  v-model="ruleForm.conrelat4"
                  placeholder="请选择联系人关系"
                  @click="option.conrelat4Show = true"
                ></u-input>
                <u-action-sheet
                  @click="conrelat4Change"
                  v-model="option.conrelat4Show"
                  :list="option.conrelat4"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="联系人电话:" prop="conphone4">
                <u-input v-model="ruleForm.conphone4" placeholder="请输入第四联系人电话"></u-input>
              </u-form-item>
            </div>
          </u-collapse-item>
          <u-collapse-item title="审核情况" name="8">
            <div>
              <u-form-item label="归属团队:" prop="hometeam">
              <u-input v-model="ruleForm.hometeam" placeholder="请选择归属团队" @focus="teamisShow = true"></u-input>
                <u-select
                  v-model="teamisShow"
                  mode="single-column"
                  :list="teamList"
                  @confirm="teamconfirm"
                ></u-select>
                </u-form-item>
              <u-form-item label="客户经理:" prop="manager1">
                <u-input v-model="ruleForm.manager1" @focus="findUser('manager1',ruleForm.manager1)" placeholder="请输入客户经理工号"></u-input>
              </u-form-item>
              <u-form-item label="权证经理:" prop="manager2">
                <u-input v-model="ruleForm.manager2" @focus="findUser('manager2',ruleForm.manager2)" placeholder="请输入权证经理工号"></u-input>
              </u-form-item>
              <u-form-item label="审核经理:" prop="manager3">
                <u-input v-model="ruleForm.manager3" @focus="findUser('manager3',ruleForm.manager3)" placeholder="请输入审核经理工号"></u-input>
              </u-form-item>
              <u-form-item label="审核状态:" prop="status">
              <u-input
                  type="select"
                  :select-open="option.statusShow"
                  v-model="ruleForm.status"
                  placeholder="请选择审核状态"
                  @click="option.statusShow = true"
                ></u-input>
                <u-action-sheet
                  @click="statusChange"
                  v-model="option.statusShow"
                  :list="option.status"
                ></u-action-sheet>
                </u-form-item>
            </div>
          </u-collapse-item>
        </u-collapse>
      </u-form>
    </view>
    <userList :UserCheck="UserCheck" @cellChange="cellChange" ></userList>
    <u-button hover-class="none" type="primary" class="footer" @click="submit">提交资料</u-button>
  </view>
</template>

<script>
import fixedInfo from '../../common/js/fixedInfo.js'
export default {
  data() {
    return {
      teamList:[],
      UserCheck:{ //当前选择的输入框信息
        userShow:false,
        name:'',
        value:''
      },
      userShow:false, //用户列表选择显示
      isNew: true, //是否是新增
      teamisShow:false, //团队选择
      isShow: false, // 现居城市
      ruleForm: {
        name: '', //姓名
        phone: '', //电话
        idcard: '', //身份证
        age: '', //年龄
        fund: '', //需求资金
        utility: '', //用途
        tenor: '', //贷款期限
        matrimony: '', //婚姻状况
        children: '', //是否有子女
        knowing: '', //已婚配偶是否已知晓
        domicile: '', //户籍所在地
        address: ['四川省','绵阳市'], //现居城市
        addressdetail: '', //详细地址
        hires: '', //雇佣类型
        unit: '', //工作单位名称
        unitposition: '', //工作岗位
        unitadress: '', //单位地址
        unitphone: '', //单位电话
        entrytime: '', //入职时间
        revenue: '', //月收入
        invoicing: '', //年开票金额
        paying: '', //年缴税金额
        social: '', //是否购买社保
        provident: '', //是否购买公积金、
        proyears: '', //公积金已缴存年限
        probase: '', //公积金已缴存基数
        socialyear: '', //社保缴存年限
        houses: '', //是否有房
        housesname: '', //小区名称
        houaddress: '', //小区位置
        housetime: '', //房屋购买时间
        housearea: '', //房屋面积
        housetype: '', //房屋类型：商品房、自建房
        houpayment: '', //全款还是按揭
        houmortgage: '', //是否已抵押
        houamount: '', //抵押贷款金额
        car: '', //是否有车
        carbrand: '', //车辆品牌
        caryear: '', //车辆购买时间
        carprice: '', //车辆评估价
        carpayment: '', //车辆全款还是按揭
        carema: '', //按揭剩余本金
        policy: '', //有无商业保单
        policyname: '', //投保公司名称
        policyear: '', //已投保年限
        policypre: '', //缴费金额
        creditip: '', //征信是否白名单
        lawsuits: '', //是否有官司
        record: '', //是否有案底
        hobbies: '', //是否有不良嗜好
        contacts1: '', //紧急联系人1
        conphone1: '', //联系人电话1
        conrelat1: '', //联系人的关系1
        contacts2: '', //紧急联系人2
        conphone2: '', //联系人电话2
        conrelat2: '', //联系人的关系2
        contacts3: '', //紧急联系人3
        conphone3: '', //联系人电话3
        conrelat3: '', //联系人的关系3
        contacts4: '', //紧急联系人4
        conphone4: '', //联系人电话4
        conrelat4: '', //联系人的关系4
        hometeam:'',//归属团队
        manager1: '', //客户经理
        manager2: '', //权证经理
        manager3: '', //审核经理
        status: '', //审核状态
        remarks: '', //备注信息
        time: '', //创建时间
        sesame: '', //芝麻分
        microcredit: '', //微粒贷
        credit: '', //信用卡
        tobacco: '', //烟草证
        enterprise: '', //企业税贷
        ticket: '' //企业票贷
      },
      fixedInfo: fixedInfo, //选项配置
      option: {
        statusShow:false,
        status:[
          {
            text:'草稿'
          },
          {
            text:'待审核'
          },
          {
            text:'驳回'
          },
          {
            text:'通过'
          }
        ],
        sesameShow: false,
        sesame: [
          {
            text: '无芝麻分'
          },
          {
            text: '600分以下'
          },
          {
            text: '600~650分'
          },
          {
            text: '650~700分'
          },
          {
            text: '700分以上'
          }
        ],
        microcreditShow: false,
        microcredit: [
          {
            text: '无微粒贷'
          },
          {
            text: '1~2千'
          },
          {
            text: '2~5千'
          },
          {
            text: '5千~1万'
          },
          {
            text: '1万以上'
          }
        ],
        creditShow: false,
        credit: [
          {
            text: '无信用卡'
          },
          {
            text: '有信用卡'
          }
        ],
        tobaccoShow: false,
        tobacco: [
          {
            text: '证件时间<1年'
          },
          {
            text: '证件时间>=1年'
          },
          {
            text: '月开烟量<8000元'
          },
          {
            text: '月开烟量>=8000元'
          },
          {
            text: '烟草等级<10档'
          },
          {
            text: '烟草等级>=10档'
          }
        ],
        enterpriseShow: false,
        enterprise: [
          {
            text: '成立时间<2年',
            label: '成立时间<2年'
          },
          {
            text: '成立时间>=2年',
            label: '成立时间>=2年'
          },
          {
            text: '年开票额<200万',
            label: '年开票额<200万'
          },
          {
            text: '年开票额>=200万',
            label: '年开票额>=200万'
          },
          {
            text: '纳税等级A'
          },
          {
            text: '纳税等级B'
          },
          {
            text: '纳税等级C'
          },
          {
            text: '纳税等级D'
          },
          {
            text: '纳税等级M'
          }
        ],
        ticketShow: false,
        ticket: [
          {
            text: '开票记录已12个月'
          },
          {
            text: '一年开票额>=10万'
          },
          {
            text: '一年内无法人变更'
          },
          {
            text: '法人占股>=10%'
          }
        ],
        socialShow: false,
        social: [
          {
            text: '无社保'
          },
          {
            text: '未满6个月'
          },
          {
            text: '6个月以上'
          }
        ],
        matrimonyShow: false,
        matrimony: [
          {
            text: '已婚'
          },
          {
            text: '未婚'
          },
          {
            text: '离异'
          },
          {
            text: '丧偶'
          }
        ],
        knowingShow: false,
        knowing: [
          {
            text: '知晓'
          },
          {
            text: '不知晓'
          }
        ],
        hiresShow: false,
        hires: [
          {
            text: '上班族'
          },
          {
            text: '自由职业'
          },
          {
            text: '企业主'
          },
          {
            text: '个体户'
          },
          {
            text: '公务员'
          },
          {
            text: '无固定职业'
          }
        ],
        providentShow: false,
        provident: [
          {
            text: '有'
          },
          {
            text: '无'
          }
        ],
        housesShow: false,
        houses: [
          {
            text: '无房产'
          },
          {
            text: '有房产不抵押'
          },
          {
            text: '有房产可抵押'
          }
        ],
        housetypeShow: false,
        housetype: [
          {
            text: '自建房'
          },
          {
            text: '商品房'
          }
        ],
        houpaymentShow: false,
        houpayment: [
          {
            text: '全款'
          },
          {
            text: '按揭'
          }
        ],
        houmortgageShow: false,
        houmortgage: [
          {
            text: '已抵押'
          },
          {
            text: '未抵押'
          }
        ],
        carShow: false,
        car: [
          {
            text: '无车产'
          },
          {
            text: '有车产不抵押'
          },
          {
            text: '有车产可抵押'
          }
        ],
        carpaymentShow: false,
        carpayment: [
          {
            text: '按揭'
          },
          {
            text: '全款'
          }
        ],
        policyShow: false,
        policy: [
          {
            text: '无保单'
          },
          {
            text: '未满一年'
          },
          {
            text: '1年以上'
          }
        ],
        creditipShow: false,
        creditip: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        lawsuitsShow: false,
        lawsuits: [
          {
            text: '有'
          },
          {
            text: '无'
          }
        ],
        recordShow: false,
        record: [
          {
            text: '有'
          },
          {
            text: '无'
          }
        ],
        hobbiesShow: false,
        hobbies: [
          {
            text: '有'
          },
          {
            text: '无'
          }
        ],
        conrelat1Show: false,
        conrelat1: [
          {
            text: '配偶'
          },
          {
            text: '直系亲属'
          },
          {
            text: '朋友'
          },
          {
            text: '同事'
          }
        ],
        conrelat2Show: false,
        conrelat2: [
          {
            text: '配偶'
          },
          {
            text: '直系亲属'
          },
          {
            text: '朋友'
          },
          {
            text: '同事'
          }
        ],
        conrelat3Show: false,
        conrelat3: [
          {
            text: '配偶'
          },
          {
            text: '直系亲属'
          },
          {
            text: '朋友'
          },
          {
            text: '同事'
          }
        ],
        conrelat4Show: false,
        conrelat4: [
          {
            text: '配偶'
          },
          {
            text: '直系亲属'
          },
          {
            text: '朋友'
          },
          {
            text: '同事'
          }
        ]
      },
      itemStyle: {
        backgroundColor: '#fff'
      },
      headStyle: {
        marginTop: '10px',
        padding: '10px',
        borderLeft: '3px solid #11BBB8',
        boxShadow: '0 5px 5px -5px #dddcda'
      },
      bodyStyle: {
        padding: '10px',
        color: '#000',
        display: 'flex',
        justifyContent: 'center'
      }
    }
  },
  onLoad(option) {
    this.findTeams()
    if (option.data) {
      this.ruleForm = JSON.parse(option.data)
      this.isNew = false
    } else {
      this.isNew = true
    }
  },
  methods: {
    //点击员工查询输入框
    findUser(name,value){
      this.UserCheck.userShow = true
      this.UserCheck.name = name
      this.UserCheck.value = value
    },
    //
    cellChange(item){
      this.UserCheck.userShow = false
      this.ruleForm[this.UserCheck.name] = item.uid
    },
    findTeams(){
      //查询团队
      this.$axios.post(this.$api.findTeam).then((res) => {
        if (res.code == 200) {
          this.teamList = []
          let arr = res.data || [];
          arr.map(item=>{
            let obj = {}
            obj.value = item.teamname
            obj.label = item.teamname
            this.teamList.push(obj)
          })
        }
      });
    },
    submit() {
      if (!this.ruleForm.name || !this.ruleForm.phone) {
        uni.showToast({
          title: '请在基本情况中添加客户姓名和电话',
          icon: 'none'
        })
        return
      }
      if (!this.ruleForm.manager1 || !this.ruleForm.manager2 ) {
        uni.showToast({
          title: '请在审核情况中添加客户经理和权证经理',
          icon: 'none'
        })
        return
      }
      if (!this.ruleForm.hometeam) {
        uni.showToast({
          title: '请在审核情况中选择归属团队',
          icon: 'none'
        })
        return
      }
      if (this.isNew) {
        this.$axios.post(this.$api.createCustomer, this.ruleForm).then(res => {
          if (res.code == 200) {
            let data = {
              proid: 'new',
              type: '提交-贷款资料', // 数据来源
              name: this.ruleForm.name, // 客户名称
              phone: this.ruleForm.phone, // 电话
              submitby: this.ruleForm.manager1, // 提交人
              handler: this.ruleForm.manager2, // 处理人
              path: '/Customer', // 跳转贷款资料
              read: 'false' // 是否已处理
            }
            this.$axios.post(this.$api.createAgent, data).then(res => {
              if (res.code == 200) {
                uni.showToast({
                  title: '提交成功',
                  icon: 'none'
                })
                setTimeout(() => {
                  uni.navigateTo({
                    url: '/pages/internal/internal'
                  })
                }, 1000)
              }
            })
          }
        })
      } else {
        this.$axios.post(this.$api.updateCustomer, this.ruleForm).then(res => {
          if (res.code == 200) {
            uni.showToast({
              title: '提交成功',
              icon: 'none'
            })
            setTimeout(() => {
                  uni.navigateTo({
                    url: '/pages/internal/internal'
                  })
                }, 1000)
          }
        })
      }
      let userInfo = uni.getStorageSync("userInfo")
      let dataLogs = {
        user: `${userInfo.username}(${userInfo.uid})`,
        logdata: JSON.stringify(this.ruleForm),
        remarks: `移动端-${this.isNew?'新增':'修改'}-贷款客户资料`
      }
      this.$axios.post(this.$api.createlogs, dataLogs)//创建日志
    },
    
    //现居城市切换
    confirm(e) {
      this.ruleForm.address = [] 
      this.ruleForm.address.push(e[0].value)
      this.ruleForm.address.push(e[1].value)
    },
    //现居城市切换
    teamconfirm(e) {
      this.ruleForm.hometeam = e[0].value
    },
    statusChange(index){
      this.ruleForm.status = this.option.status[index].text
    },
    sesameChange(index) {
      this.ruleForm.sesame = this.option.sesame[index].text
    },
    microcreditChange(index) {
      this.ruleForm.microcredit = this.option.microcredit[index].text
    },
    creditChange(index) {
      this.ruleForm.credit = this.option.credit[index].text
    },
    tobaccoChange(index) {
      this.ruleForm.tobacco = this.option.tobacco[index].text
    },
    enterpriseChange(index) {
      this.ruleForm.enterprise = this.option.enterprise[index].text
    },
    ticketChange(index) {
      this.ruleForm.ticket = this.option.ticket[index].text
    },
    socialChange(index) {
      this.ruleForm.social = this.option.social[index].text
    },
    matrimonyChange(index) {
      this.ruleForm.matrimony = this.option.matrimony[index].text
    },
    knowingChange(index) {
      this.ruleForm.knowing = this.option.knowing[index].text
    },
    hiresChange(index) {
      this.ruleForm.hires = this.option.hires[index].text
    },
    providentChange(index) {
      this.ruleForm.provident = this.option.provident[index].text
    },
    housesChange(index) {
      this.ruleForm.houses = this.option.houses[index].text
    },
    housetypeChange(index) {
      this.ruleForm.housetype = this.option.housetype[index].text
    },
    houpaymentChange(index) {
      this.ruleForm.houpayment = this.option.houpayment[index].text
    },
    houmortgageChange(index) {
      this.ruleForm.houmortgage = this.option.houmortgage[index].text
    },
    carChange(index) {
      this.ruleForm.car = this.option.car[index].text
    },
    carpaymentChange(index) {
      this.ruleForm.carpayment = this.option.carpayment[index].text
    },
    policyChange(index) {
      this.ruleForm.policy = this.option.policy[index].text
    },
    creditipChange(index) {
      this.ruleForm.creditip = this.option.creditip[index].text
    },
    lawsuitsChange(index) {
      this.ruleForm.lawsuits = this.option.lawsuits[index].text
    },
    recordChange(index) {
      this.ruleForm.record = this.option.record[index].text
    },
    hobbiesChange(index) {
      this.ruleForm.hobbies = this.option.hobbies[index].text
    },
    conrelat1Change(index) {
      this.ruleForm.conrelat1 = this.option.conrelat1[index].text
    },
    conrelat2Change(index) {
      this.ruleForm.conrelat2 = this.option.conrelat2[index].text
    },
    conrelat3Change(index) {
      this.ruleForm.conrelat3 = this.option.conrelat3[index].text
    },
    conrelat4Change(index) {
      this.ruleForm.conrelat4 = this.option.conrelat4[index].text
    }
  }
}
</script>

<style lang='scss' scoped>
.footer {
  width: 70%;
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  text-align: center;
  font-weight: 600;
  color: #fff;
  position: fixed;
  bottom: 10px;
  left: 15%;
  z-index: 2;
  box-shadow: 0 20upx 40upx -16upx #909399;
  box-shadow: 1px 2px 5px #909399;
  background: linear-gradient(to right, #46e3c4, #3cc8c9, #46e3c4);
}
::v-deep .u-input__right-icon__item {
  margin-left: -13px;
}
.content {
  padding: 10px 14px;
  margin-bottom: 50px;
}
</style>
