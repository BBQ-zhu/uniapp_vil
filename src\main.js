import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import commonJS from "@/common/js/common";
import {get,post} from "@/common/js/http";
// import {inGet,inPost} from "@/common/js/inHttp";
import api from "@/common/js/api";

// import request from "@/common/js/request";
// Vue.prototype.$http = request   // this.$http.axios(url,'post',data) 封装的uni.request

Vue.prototype.$URL = 'http://localhost:3030'
Vue.prototype.$commonJS = commonJS
Vue.prototype.$axios = {get,post} //封装的axios
// Vue.prototype.$inAxios = {inGet,inPost} //封装的内部axios
Vue.prototype.$api = api
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

