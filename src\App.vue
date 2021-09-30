<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// 拨打电话按钮触发
		uni.onTabBarMidButtonTap(()=>{
			var a = document.createElement('a');
			a.setAttribute('href', 'tel:4001109939');
			document.body.appendChild(a);
			a.click();
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import './common/css/common.css';
@import './common/css/release.css';

/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
