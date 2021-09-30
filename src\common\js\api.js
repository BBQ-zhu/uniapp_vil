//api接口统一管理文件
module.exports = {
  checkToken:'checkToken', //校验token是否有效
  //代办中心
  createAgent: 'agents/createAgent',
  deleteAgent: 'agents/deleteAgent',
  updateAgent: 'agents/updateAgent',
  findAgent: 'agents/findAgent',
  //上传员工头像
  userImgUrl: 'api/uploads/userImg', //假上传
  uploadImg: 'uploads/uploadImg',
  delateImg: 'uploads/delateImg',
  //上传创业学堂视频
  uploadVideoImg: 'api/uploads/uploadVideoImg',
  delateVideoImg: 'uploads/delateVideoImg',
  uploadVideo: 'api/uploads/uploadVideo',
  findVideo: 'uploads/findVideo',
  delateVideo: 'uploads/delateVideo',
  //上传轮播图
  findScrollImg: 'uploads/findScrollImg',
  // delateScrollImg: 'uploads/delateScrollImg',
  // uploadScrollImg: 'api/uploads/uploadScrollImg',
  //上传招聘信息
  uploadRecruiting: 'uploads/uploadRecruiting',
  findRecruiting: 'uploads/findRecruiting',
  delateRecruiting: 'uploads/delateRecruiting',
  updataRecruiting: 'uploads/updataRecruiting',
  //上传产品
  uploadProductImg: 'api/uploads/uploadProductImg',
  delProductImg: 'uploads/delProductImg',
  uploadProduct: 'uploads/uploadProduct',
  findProduct: 'uploads/findProduct',
  delateProduct: 'uploads/delateProduct',
  updataProduct: 'uploads/updataProduct',
  createProductClass: 'uploads/createProductClass', //创建产品分类
  findProductClass: 'uploads/findProductClass', //查询产品分类
  delProductClass: 'uploads/delProductClass', //删除产品分类
  uploadIconlImg: 'api/uploads/uploadIconlImg', //上传分类图标
  delIconlImg: 'uploads/delIconlImg', //上传分类图标
  //上传新闻信息
  findNews: 'informations/findNews',
  createNews: 'informations/createNews',
  updateNews: 'informations/updateNews',
  deleteNews: 'informations/deleteNews',
  //vip用户管理
  getCodeVipuser: 'vipuser/getCodeVipuser', //获取验证码
  checkCodeVipuser: 'vipuser/checkCodeVipuser', //检查验证码
  loginVipuser: 'vipuser/loginVipuser', //vip登录
  findVipuser: 'vipuser/findVipuser', //查找vip用户
  deleteVipuser: 'vipuser/deleteVipuser',
  updateVipuser: 'vipuser/updateVipuser',
  createVipuser: 'vipuser/createVipuser',
  //员工管理
  loginUser: 'user/loginUser',
  getSvg: 'user/getSvg',
  findUser: 'user/findUser',
  deleteUser: 'user/deleteUser',
  updateUser: 'user/updateUser',
  createUser: 'user/createUser',
  updatePassword: 'user/updatePassword',
  //权限管理
  findNavMenus: 'roles/findNavMenus',
  addRole: 'roles/addRole',
  delRole: 'roles/delRole',
  updateRole: 'roles/updateRole',
  findRole: 'roles/findRole',
  findOneRole: 'roles/findOneRole',
  addTeam: 'roles/addTeam',
  delTeam: 'roles/delTeam',
  findTeam: 'roles/findTeam',
  //客户资料
  findCustomer: 'customer/findCustomer',
  createCustomer: 'customer/createCustomer',
  updateCustomer: 'customer/updateCustomer',
  deleteCustomer: 'customer/deleteCustomer',
  //企业资料
  createEnterprise: 'customer/createEnterprise',
  deleteEnterprise: 'customer/deleteEnterprise',
  updateEnterprise: 'customer/updateEnterprise',
  findEnterprise: 'customer/findEnterprise',
  //咨询客户-综合服务
  createIntegrate: 'service/createIntegrate',
  deleteIntegrate: 'service/deleteIntegrate',
  updateIntegrate: 'service/updateIntegrate',
  findIntegrate: 'service/findIntegrate',
  //合同管理
  uploadPhoneContractImg: 'api/contract/uploadPhoneContractImg', //手机上传合同图片
  uploadContractImg: 'api/contract/uploadContractImg', //后台上传合同图片
  delContractImg: 'contract/delContractImg', //删除合同图片
  findContract: 'contract/findContract', //查询合同列表
  findOneContract: 'contract/findOneContract', //查询单个合同
  uploadContract: 'contract/uploadContract', //上传合同列表
  delateContract: 'contract/delateContract', //删除合同行
  updataContract: 'contract/updataContract', //更新合同


}
