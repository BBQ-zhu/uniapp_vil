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
        <!-- 基本情况1 -->
        <view>
          <view class="listShow flexBetween" @click="listShow1 = !listShow1">
            <view>基本情况</view>
            <u-icon v-if="listShow1" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow1" class="flexCenter bgColorfff">
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
            <u-form-item
              v-if="ruleForm.matrimony == '已婚' || ruleForm.matrimony == '离异' || ruleForm.matrimony == '丧偶'"
              label="子女姓名:"
              prop="children"
            >
              <u-input v-model="ruleForm.children" placeholder="请输入子女姓名"></u-input>
            </u-form-item>
            <u-form-item v-if="ruleForm.matrimony == '已婚'" label="配偶是否知晓:" prop="knowing">
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
              <view
                @click="isShow = true"
                style="min-width: 155px"
              >{{ ruleForm.address[0] }}-{{ ruleForm.address[1] }}</view>
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
          </view>
        </view>
        <!-- 收入情况2 -->
        <view>
          <view class="listShow flexBetween" @click="listShow2 = !listShow2">
            <view>收入情况</view>
            <u-icon v-if="listShow2" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow2" class="flexCenter bgColorfff">
            <u-form-item label="职业类型:" prop="hires">
              <u-input
                type="select"
                :select-open="option.hiresShow"
                v-model="ruleForm.hires"
                placeholder="请选择职业类型"
                @click="option.hiresShow = true"
              ></u-input>
              <u-action-sheet @click="hiresChange" v-model="option.hiresShow" :list="option.hires"></u-action-sheet>
            </u-form-item>
            <view
              v-show="ruleForm.hires && (ruleForm.hires == '企业主' || ruleForm.hires == '上班族' || ruleForm.hires == '个体户' || ruleForm.hires == '公务员')"
            >
              <u-form-item label="单位名称:" prop="unit">
                <u-input v-model="ruleForm.unit" placeholder="请输入单位名称"></u-input>
              </u-form-item>
              <u-form-item label="单位地址:" prop="unitadress">
                <u-input v-model="ruleForm.unitadress" placeholder="请输入单位地址"></u-input>
              </u-form-item>
              <u-form-item label="工作职级:" prop="unitposition">
                <u-input v-model="ruleForm.unitposition" placeholder="请输入工作职级"></u-input>
              </u-form-item>
              <u-form-item
                :label="(ruleForm.hires == '企业主' || ruleForm.hires == '个体户')?'负责人电话:':'单位电话:'"
                prop="unitphone"
              >
                <u-input v-model="ruleForm.unitphone" placeholder="请输入电话号码"></u-input>
              </u-form-item>
              <u-form-item
                v-if="ruleForm.hires != '企业主' && ruleForm.hires != '个体户'"
                label="入职时间(月):"
                prop="entrytime"
              >
                <u-input v-model="ruleForm.entrytime" placeholder="请输入时间(月)"></u-input>
              </u-form-item>
            </view>
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
            <u-form-item
              v-show="ruleForm.social && ruleForm.social !='无社保'"
              label="社保年限(月):"
              prop="socialyear"
            >
              <u-input v-model="ruleForm.socialyear" placeholder="请输入社保缴纳年限(月)"></u-input>
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
            <view v-show="ruleForm.provident && ruleForm.provident !='无公积金'">
              <u-form-item label="公积金年限(月):" prop="proyears">
                <u-input v-model="ruleForm.proyears" placeholder="请输入公积金缴纳年限(月)"></u-input>
              </u-form-item>
              <u-form-item label="公积金基数:" prop="probase">
                <u-input v-model="ruleForm.probase" placeholder="请输入公积金基数"></u-input>
              </u-form-item>
            </view>
          </view>
        </view>
        <!-- 房屋情况3 -->
        <view>
          <view class="listShow flexBetween" @click="listShow3 = !listShow3">
            <view>房屋情况</view>
            <u-icon v-if="listShow3" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow3" class="flexCenter bgColorfff">
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
            <view v-if="ruleForm.houses && ruleForm.houses =='是'">
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
              <u-form-item label="小区名称:" prop="housesname">
                <u-input v-model="ruleForm.housesname" placeholder="请输入小区名称"></u-input>
              </u-form-item>
              <u-form-item label="坐落位置:" prop="houaddress">
                <u-input v-model="ruleForm.houaddress" placeholder="请输入坐落位置"></u-input>
              </u-form-item>
              <u-form-item label="购买时间:" prop="housetime">
                <u-input v-model="ruleForm.housetime" placeholder="请输入购买时间"></u-input>
              </u-form-item>
              <u-form-item label="产权面积:" prop="housearea">
                <u-input v-model="ruleForm.housearea" placeholder="请输入产权面积"></u-input>
              </u-form-item>

              <u-form-item label="房屋状态:" prop="houpayment">
                <u-input
                  type="select"
                  :select-open="option.houpaymentShow"
                  v-model="ruleForm.houpayment"
                  placeholder="请选择房屋状态"
                  @click="option.houpaymentShow = true"
                ></u-input>
                <u-action-sheet
                  @click="houpaymentChange"
                  v-model="option.houpaymentShow"
                  :list="option.houpayment"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item
                v-if="ruleForm.houpayment && ruleForm.houpayment!='全款'"
                label="欠款金额:"
                prop="houamount"
              >
                <u-input v-model="ruleForm.houamount" placeholder="请输入欠款金额"></u-input>
              </u-form-item>
            </view>
          </view>
        </view>
        <!-- 车辆情况4 -->
        <view>
          <view class="listShow flexBetween" @click="listShow4 = !listShow4">
            <view>车辆情况</view>
            <u-icon v-if="listShow4" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow4" class="flexCenter bgColorfff">
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
            <view v-if="ruleForm.car && ruleForm.car == '是'">
              <u-form-item label="车辆品牌:" prop="carbrand">
                <u-input v-model="ruleForm.carbrand" placeholder="请输入车辆品牌"></u-input>
              </u-form-item>
              <u-form-item label="购车年限:" prop="caryear">
                <u-input v-model="ruleForm.caryear" placeholder="请输入购车年限"></u-input>
              </u-form-item>
              <u-form-item label="现评估价格:" prop="carprice">
                <u-input v-model="ruleForm.carprice" placeholder="请输入现评估价格"></u-input>
              </u-form-item>
              <u-form-item label="车辆状态:" prop="carpayment">
                <u-input
                  type="select"
                  :select-open="option.carpaymentShow"
                  v-model="ruleForm.carpayment"
                  placeholder="请选择车辆状态"
                  @click="option.carpaymentShow = true"
                ></u-input>
                <u-action-sheet
                  @click="carpaymentChange"
                  v-model="option.carpaymentShow"
                  :list="option.carpayment"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item
                v-if="ruleForm.carpayment && ruleForm.carpayment!='全款'"
                label="欠款金额:"
                prop="carema"
              >
                <u-input v-model="ruleForm.carema" placeholder="请输入欠款金额"></u-input>
              </u-form-item>
            </view>
          </view>
        </view>
        <!-- 商保情况5 -->
        <view>
          <view class="listShow flexBetween" @click="listShow5 = !listShow5">
            <view>商保情况</view>
            <u-icon v-if="listShow5" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow5" class="flexCenter bgColorfff">
            <u-form-item label="是否有商保:" prop="policy">
              <u-input
                type="select"
                :select-open="option.policyShow"
                v-model="ruleForm.policy"
                placeholder="请选择是否有商保"
                @click="option.policyShow = true"
              ></u-input>
              <u-action-sheet
                @click="policyChange"
                v-model="option.policyShow"
                :list="option.policy"
              ></u-action-sheet>
            </u-form-item>
            <view v-if="ruleForm.policy && ruleForm.policy=='是'">
              <u-form-item label="投保公司名称:" prop="policyname">
                <u-input v-model="ruleForm.policyname" placeholder="请输入投保公司名称"></u-input>
              </u-form-item>
              <u-form-item label="投保时间:" prop="policyear">
                <u-input
                  type="select"
                  :select-open="option.policyearShow"
                  v-model="ruleForm.policyear"
                  placeholder="请选择投保时间"
                  @click="option.policyearShow = true"
                ></u-input>
                <u-action-sheet
                  @click="policyearChange"
                  v-model="option.policyearShow"
                  :list="option.policyear"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="缴费方式:" prop="paymentmethod">
                <u-input
                  type="select"
                  :select-open="option.paymentmethodShow"
                  v-model="ruleForm.paymentmethod"
                  placeholder="请选择缴费方式"
                  @click="option.paymentmethodShow = true"
                ></u-input>
                <u-action-sheet
                  @click="paymentmethodChange"
                  v-model="option.paymentmethodShow"
                  :list="option.paymentmethod"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="缴费金额:" prop="policypre">
                <u-input v-model="ruleForm.policypre" placeholder="请输入缴费金额"></u-input>
              </u-form-item>
            </view>
          </view>
        </view>
        <!-- 企业情况6 -->
        <view v-if="ruleForm.hires && (ruleForm.hires == '企业主' || ruleForm.hires == '个体户')">
          <view class="listShow flexBetween" @click="listShow6 = !listShow6">
            <view>企业情况</view>
            <u-icon v-if="listShow6" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow6" class="flexCenter bgColorfff">
            <u-form-item label="法人/股东:" prop="identity">
              <u-input
                type="select"
                :select-open="option.identityShow"
                v-model="ruleForm.identity"
                placeholder="请选择"
                @click="option.identityShow = true"
              ></u-input>
              <u-action-sheet
                @click="identityChange"
                v-model="option.identityShow"
                :list="option.identity"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="企业成立时间:" prop="establishment">
              <u-input
                type="select"
                :select-open="option.establishmentShow"
                v-model="ruleForm.establishment"
                placeholder="请选择"
                @click="option.establishmentShow = true"
              ></u-input>
              <u-action-sheet
                @click="establishmentChange"
                v-model="option.establishmentShow"
                :list="option.establishment"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="年开票金额:" prop="invoicing">
              <u-input
                type="select"
                :select-open="option.invoicingShow"
                v-model="ruleForm.invoicing"
                placeholder="请选择"
                @click="option.invoicingShow = true"
              ></u-input>
              <u-action-sheet
                @click="invoicingChange"
                v-model="option.invoicingShow"
                :list="option.invoicing"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="开票记录:" prop="taxrecord">
              <u-input
                type="select"
                :select-open="option.taxrecordShow"
                v-model="ruleForm.taxrecord"
                placeholder="请选择"
                @click="option.taxrecordShow = true"
              ></u-input>
              <u-action-sheet
                @click="taxrecordChange"
                v-model="option.taxrecordShow"
                :list="option.taxrecord"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="纳税等级:" prop="grade">
              <u-input
                type="select"
                :select-open="option.gradeShow"
                v-model="ruleForm.grade"
                placeholder="请选择"
                @click="option.gradeShow = true"
              ></u-input>
              <u-action-sheet @click="gradeChange" v-model="option.gradeShow" :list="option.grade"></u-action-sheet>
            </u-form-item>
            <u-form-item label="年纳税金额:" prop="paying">
              <u-input
                type="select"
                :select-open="option.payingShow"
                v-model="ruleForm.paying"
                placeholder="请选择"
                @click="option.payingShow = true"
              ></u-input>
              <u-action-sheet
                @click="payingChange"
                v-model="option.payingShow"
                :list="option.paying"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item :label="ruleForm.identity == '法人' ? '法人变更:':'股东变更:'" prop="enterprise">
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
            <u-form-item :label="ruleForm.identity == '法人' ? '法人占股:':'股东占股:'" prop="ticket">
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
          </view>
        </view>
        <!-- 烟草证情况7 -->
        <view>
          <view class="listShow flexBetween" @click="listShow7 = !listShow7">
            <view>烟草证情况</view>
            <u-icon v-if="listShow7" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow7" class="flexCenter bgColorfff">
            <u-form-item label="是否有烟草证:" prop="tobacco">
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
            <view v-if="ruleForm.tobacco == '是'">
              <u-form-item label="办证时间:" prop="tobaccotime">
                <u-input
                  type="select"
                  :select-open="option.tobaccotimeShow"
                  v-model="ruleForm.tobaccotime"
                  placeholder="请选择"
                  @click="option.tobaccotimeShow = true"
                ></u-input>
                <u-action-sheet
                  @click="tobaccotimeChange"
                  v-model="option.tobaccotimeShow"
                  :list="option.tobaccotime"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="月开烟量:" prop="volumesmoke">
                <u-input
                  type="select"
                  :select-open="option.volumesmokeShow"
                  v-model="ruleForm.volumesmoke"
                  placeholder="请选择"
                  @click="option.volumesmokeShow = true"
                ></u-input>
                <u-action-sheet
                  @click="volumesmokeChange"
                  v-model="option.volumesmokeShow"
                  :list="option.volumesmoke"
                ></u-action-sheet>
              </u-form-item>
              <u-form-item label="烟草证等级:" prop="tobaccorank">
                <u-input
                  type="select"
                  :select-open="option.tobaccorankShow"
                  v-model="ruleForm.tobaccorank"
                  placeholder="请选择"
                  @click="option.tobaccorankShow = true"
                ></u-input>
                <u-action-sheet
                  @click="tobaccorankChange"
                  v-model="option.tobaccorankShow"
                  :list="option.tobaccorank"
                ></u-action-sheet>
              </u-form-item>
            </view>
          </view>
        </view>
        <!-- 数据情况8 -->
        <view>
          <view class="listShow flexBetween" @click="listShow8 = !listShow8">
            <view>数据情况</view>
            <u-icon v-if="listShow8" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow8" class="flexCenter bgColorfff">
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
            <u-form-item label="是否有信用卡:" prop="credit">
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
            <u-form-item label="是否白户:" prop="creditip">
              <u-input
                type="select"
                :select-open="option.creditipShow"
                v-model="ruleForm.creditip"
                placeholder="请选择是否白户"
                @click="option.creditipShow = true"
              ></u-input>
              <u-action-sheet
                @click="creditipChange"
                v-model="option.creditipShow"
                :list="option.creditip"
              ></u-action-sheet>
            </u-form-item>
            <u-form-item label="是否执行:" prop="lawsuits">
              <u-input
                type="select"
                :select-open="option.lawsuitsShow"
                v-model="ruleForm.lawsuits"
                placeholder="请选择是否执行"
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
            <u-form-item label="征信等级:" prop="hobbies">
              <u-input
                type="select"
                :select-open="option.hobbiesShow"
                v-model="ruleForm.hobbies"
                placeholder="请选择征信等级"
                @click="option.hobbiesShow = true"
              ></u-input>
              <u-action-sheet
                @click="hobbiesChange"
                v-model="option.hobbiesShow"
                :list="option.hobbies"
              ></u-action-sheet>
            </u-form-item>
          </view>
        </view>
        <!-- 紧急联系人9 -->
        <view>
          <view class="listShow flexBetween" @click="listShow9 = !listShow9">
            <view>紧急联系人</view>
            <u-icon v-if="listShow9" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow9" class="flexCenter bgColorfff">
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
          </view>
        </view>
        <!-- 审核情况10 -->
        <view>
          <view class="listShow flexBetween" @click="listShow10 = !listShow10">
            <view>审核情况</view>
            <u-icon v-if="listShow10" name="arrow-up" :size="30" color="#11BBB8"></u-icon>
            <u-icon v-else name="arrow-down" :size="30" color="#11BBB8"></u-icon>
          </view>
          <view v-if="listShow10" class="flexCenter bgColorfff">
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
              <u-input
                v-model="ruleForm.manager1"
                @focus="findUser('manager1', ruleForm.manager1)"
                placeholder="请输入客户经理工号"
              ></u-input>
            </u-form-item>
            <u-form-item v-if="ruleForm.manager2" label="金融客服:" prop="manager2">
              <u-input
                disabled
                v-model="ruleForm.manager2"
                @focus="findUser('manager2', ruleForm.manager2)"
                placeholder="请输入金融客服工号"
              ></u-input>
            </u-form-item>
            <u-form-item v-if="ruleForm.manager3" label="代办客服:" prop="manager3">
              <u-input
                disabled
                v-model="ruleForm.manager3"
                @focus="findUser('manager3', ruleForm.manager3)"
                placeholder="请输入代办客服工号"
              ></u-input>
            </u-form-item>
            <u-form-item label="审核状态:" prop="status">
              <u-input disabled v-model="ruleForm.status" placeholder="审核状态"></u-input>
              <!-- <u-input
                type="select"
                :select-open="option.statusShow"
                v-model="ruleForm.status"
                placeholder="请选择审核状态"
                @click="option.statusShow = true"
                disabled
              ></u-input>
              <u-action-sheet
                @click="statusChange"
                v-model="option.statusShow"
                :list="option.status"
              ></u-action-sheet>-->
            </u-form-item>
            <view
              v-if="ruleForm.feedback"
              class="mt10 flexBetween mb10"
              style="width:85%;margin-left:8.5%;font-size:15px;"
            >
              <view style="width:35%">反馈消息:</view>
              <view style="width:65%">{{ruleForm.feedback}}</view>
            </view>
          </view>
        </view>
      </u-form>
    </view>
    <userList :UserCheck="UserCheck" @cellChange="cellChange"></userList>
    <view v-if="only != 'true'" class="footerBox flexCenter">
      <u-button
        v-if="ruleForm.status =='草稿'"
        hover-class="none"
        type="primary"
        class="footer yellowBtn"
        @click="submit('save')"
      >保存草稿</u-button>
      <!-- 草稿、待审核、审核中、驳回、拒绝、通过、审核结束 -->
      <u-button
        v-if="ruleForm.status =='草稿' || ruleForm.status =='驳回'"
        hover-class="none"
        type="primary"
        class="footer"
        @click="submit('submit')"
      >提交申请</u-button>
    </view>
  </view>
</template>

<script>
import fixedInfo from '../../common/js/fixedInfo.js'
export default {
  data() {
    return {
      listShow1: false,
      listShow2: false,
      listShow3: false,
      listShow4: false,
      listShow5: false,
      listShow6: false,
      listShow7: false,
      listShow8: false,
      listShow9: false,
      listShow10: false,
      teamList: [],
      UserCheck: {
        //当前选择的输入框信息
        userShow: false,
        name: '',
        value: ''
      },
      userShow: false, //用户列表选择显示
      isNew: true, //是否是新增
      teamisShow: false, //团队选择
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
        address: ['四川省', '绵阳市'], //现居城市
        addressdetail: '', //详细地址
        hires: '', //职业类型
        unit: '', //工作单位名称
        unitposition: '', //工作岗位
        unitadress: '', //单位地址
        unitphone: '', //单位电话
        entrytime: '', //入职时间
        revenue: '', //月收入
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
        paymentmethod: '', //缴费方式
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
        hometeam: '', //归属团队
        manager1: '', //客户经理
        manager2: '', //金融客服
        manager3: '', //代办客服
        status: '草稿', //审核状态
        remarks: '', //备注信息
        time: '', //创建时间
        sesame: '', //芝麻分
        microcredit: '', //微粒贷
        credit: '', //信用卡
        invoicing: '', //年开票金额
        paying: '', //年缴税金额
        enterprise: '', //法人/股东变更
        ticket: '', //法人/股东占股
        identity: '', //法人/股东
        establishment: '', //企业成立时间
        taxrecord: '', //开票记录
        grade: '', //纳税等级
        tobacco: '', //是否有烟草证
        tobaccotime: '', //烟草证办证时间
        volumesmoke: '', //烟草证月开烟量
        tobaccorank: '', //烟草证等级
        feedback: '', //审批反馈
        productList: [], //匹配产品列表
        recomMony: 0 //匹配产品最高可贷金额
      },
      fixedInfo: fixedInfo, //选项配置
      option: {
        // 年开票额
        invoicingShow: false,
        invoicing: [
          {
            text: '小于50万'
          },
          {
            text: '50万~100万'
          },
          {
            text: '100万~200万'
          },
          {
            text: '大于200万'
          }
        ],
        // 开票记录
        taxrecordShow: false,
        taxrecord: [
          {
            text: '小于6个月'
          },
          {
            text: '6个月~12个月'
          },
          {
            text: '大于12个月'
          }
        ],
        // 纳税等级
        gradeShow: false,
        grade: [
          {
            text: 'A级'
          },
          {
            text: 'B级'
          },
          {
            text: 'C级'
          },
          {
            text: 'D级'
          },
          {
            text: 'M级'
          }
        ],
        // 年纳税金额
        payingShow: false,
        paying: [
          {
            text: '小于20万'
          },
          {
            text: '20万~50万'
          },
          {
            text: '大于50万'
          }
        ],
        // 法人/股东
        identityShow: false,
        identity: [
          {
            text: '法人'
          },
          {
            text: '股东'
          }
        ],
        // 企业成立时间
        establishmentShow: false,
        establishment: [
          {
            text: '小于3个月'
          },
          {
            text: '3个月~6个月'
          },
          {
            text: '6个月~1年'
          },
          {
            text: '1年~2年'
          },
          {
            text: '大于两年'
          }
        ],
        //法人/股东变更
        enterpriseShow: false,
        enterprise: [
          {
            text: '小于1年'
          },
          {
            text: '大于1年'
          }
        ],
        //法人/股东占股
        ticketShow: false,
        ticket: [
          {
            text: '小于10%'
          },
          {
            text: '大于10%'
          }
        ],
        // 办证时间
        tobaccotimeShow: false,
        tobaccotime: [
          {
            text: '小于1年'
          },
          {
            text: '大于1年'
          }
        ],
        // 月开烟量
        volumesmokeShow: false,
        volumesmoke: [
          {
            text: '小于5千元'
          },
          {
            text: '5千元~8千元'
          },
          {
            text: '大于8千元'
          }
        ],
        //烟草证等级
        tobaccorankShow: false,
        tobaccorank: [
          {
            text: '小于7档'
          },
          {
            text: '7档~10档'
          },
          {
            text: '大于10档'
          }
        ],
        paymentmethodShow: false,
        paymentmethod: [
          {
            text: '年缴'
          },
          {
            text: '月缴'
          }
        ],
        policyearShow: false,
        policyear: [
          {
            text: '半年以上'
          },
          {
            text: '一年以上'
          },
          {
            text: '两年以上'
          }
        ],
        statusShow: false,
        status: [
          {
            text: '草稿'
          },
          {
            text: '待审核'
          },
          {
            text: '驳回'
          },
          {
            text: '通过'
          }
        ],
        sesameShow: false,
        sesame: [
          {
            text: '无芝麻分'
          },
          {
            text: '小于600分'
          },
          {
            text: '600分~700分'
          },
          {
            text: '大于700分'
          }
        ],
        microcreditShow: false,
        microcredit: [
          {
            text: '无微粒贷'
          },
          {
            text: '小于1千'
          },
          {
            text: '1千~2千'
          },
          {
            text: '2千~5千'
          },
          {
            text: '5千~1万'
          },
          {
            text: '大于1万'
          }
        ],
        creditShow: false,
        credit: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        tobaccoShow: false,
        tobacco: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        enterpriseShow: false,
        enterprise: [
          {
            text: '小于1年'
          },
          {
            text: '大于1年'
          }
        ],
        ticketShow: false,
        ticket: [
          {
            text: '小于10%'
          },
          {
            text: '大于10%'
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
            text: '企业主'
          },
          {
            text: '个体户'
          },
          {
            text: '公务员'
          },
          {
            text: '上班族'
          },
          {
            text: '自由职业'
          },
          {
            text: '无固定职业'
          }
        ],
        providentShow: false,
        provident: [
          {
            text: '无公积金'
          },
          {
            text: '未满6个月'
          },
          {
            text: '6个月以上'
          }
        ],
        housesShow: false,
        houses: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        housetypeShow: false,
        housetype: [
          {
            text: '商品房'
          },
          {
            text: '商铺'
          },
          {
            text: '公寓'
          },
          {
            text: '安置房'
          },
          {
            text: '自建房'
          }
        ],
        houpaymentShow: false,
        houpayment: [
          {
            text: '全款'
          },
          {
            text: '按揭'
          },
          {
            text: '抵押'
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
            text: '是'
          },
          {
            text: '否'
          }
        ],
        carpaymentShow: false,
        carpayment: [
          {
            text: '全款'
          },
          {
            text: '按揭'
          },
          {
            text: '抵押'
          }
        ],
        policyShow: false,
        policy: [
          {
            text: '是'
          },
          {
            text: '否'
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
            text: '是'
          },
          {
            text: '否'
          }
        ],
        recordShow: false,
        record: [
          {
            text: '是'
          },
          {
            text: '否'
          }
        ],
        hobbiesShow: false,
        hobbies: [
          {
            text: 'A级'
          },
          {
            text: 'B级'
          },
          {
            text: 'C级'
          },
          {
            text: 'D级'
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
  watch: {
    ruleForm: {
      handler(old, news) {
        // 判断一些字段是否填写，置空一些选项
        if (!this.ruleForm.houses || this.ruleForm.houses == '否') {
          this.ruleForm.housesname = '' //小区名称
          this.ruleForm.houaddress = '' //小区位置
          this.ruleForm.housetime = '' //房屋购买时间
          this.ruleForm.housearea = '' //房屋面积
          this.ruleForm.housetype = '' //房屋类型：商品房、自建房
          this.ruleForm.houpayment = '' //全款还是按揭
          this.ruleForm.houmortgage = '' //是否已抵押
          this.ruleForm.houamount = '' //抵押贷款金额
        }
        if (!this.ruleForm.car || this.ruleForm.car == '否') {
          this.ruleForm.carbrand = '' //车辆品牌
          this.ruleForm.caryear = '' //车辆购买时间
          this.ruleForm.carprice = '' //车辆评估价
          this.ruleForm.carpayment = '' //车辆全款还是按揭
          this.ruleForm.carema = '' //按揭剩余本金
        }
        if (!this.ruleForm.policy || this.ruleForm.policy == '否') {
          this.ruleForm.policyname = '' //投保公司名称
          this.ruleForm.policyear = '' //已投保年限
          this.ruleForm.policypre = '' //缴费金额
          this.ruleForm.paymentmethod = '' //缴费方式
        }
        if (!this.ruleForm.tobacco || this.ruleForm.tobacco == '否') {
          this.ruleForm.tobacco = '' //是否有烟草证
          this.ruleForm.tobaccotime = '' //烟草证办证时间
          this.ruleForm.volumesmoke = '' //烟草证月开烟量
          this.ruleForm.tobaccorank = '' //烟草证等级
        }
        if (
          !this.ruleForm.hires ||
