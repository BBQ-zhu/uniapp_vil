<template>
	<view>
		<view class="copyRightBox">
			<view class="font" ref='sy' v-for="(item,index) in 36" :key='index'>
				铸力
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {};
		},
		// props: {
		// 	//载入的标签数据
		// 	sytext: String
		// },
		mounted() {}
	}
</script>
<style>
	.copyRightBox {
		overflow: hidden;
		width: 100%;
		height: calc(100vh);
		pointer-events: none;
		position: fixed;
		top: -100upx;
		left:0;
		z-index: 1;
	}
	.font {
		float: left;
		transform: rotate(-30deg);
		margin-bottom: 150upx;
		margin-left: 100upx;
		font-size: 30upx;
		color: rgba(100, 0, 0, 0.1);
	}
</style>
