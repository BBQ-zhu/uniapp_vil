<template>
	<view>
		<view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left"><image :src="res.url" mode="aspectFill"></image></view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.name }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<view class="num">{{ res.likeNum }}</view>
						<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
					</view>
				</view>
				<view class="content">{{ res.contentText }}</view>
				<view class="reply-box">
					<view class="item" v-for="(item) in res.replyList" :key="item.index">
						<view class="username">{{ item.name }}</view>
						<view class="text">{{ item.contentStr }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.allReply }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<view class="bottom">
					{{ res.date }}
					<view class="reply">回复</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			commentList: []
		};
	},
	mounted() {
		this.getComment();
	},
	methods: {
		// 跳转到全部回复
		toAllReply() {
		},
		// 点赞
		getLike(index) {
			this.commentList[index].isLike = !this.commentList[index].isLike;
			if (this.commentList[index].isLike == true) {
				this.commentList[index].likeNum++;
			} else {
				this.commentList[index].likeNum--;
			}
		},
		// 评论列表
		getComment() {
			this.commentList = [
				{
					id: 1,
					name: '135****0896',
					date: '12-25 18:58',
					contentText: "服务态度一流，专业顾问一对一服务，不用我操一点心",
					url: '',
					allReply: 12,
					likeNum: 33,
					isLike: false,
					replyList: [
						{
							name: '187****9938',
							contentStr: '确实阔以，资料清单一目了然，效率高，我一天就办理完了'
						},
						{
							name: '137****1709',
							contentStr: '大团队，值得信赖，十分满意'
						}
					]
				},
				{
					id: 2,
					name: '184****1937',
					date: '01-25 13:58',
					contentText: '办理的代理记账，我提供一下基本资料就可以了，其他全程托管，不费心，价格还便宜',
					allReply: 0,
					likeNum: 11,
					isLike: false,
					url: '',
				},
				{
					id: 3,
					name: '152****5960',
					date: '03-25 13:58',
					contentText: '我办的银行贷款，自己去半天过不了审核，交给他们处理太省事了，当天办理，当天放款，赞！',
					allReply: 0,
					likeNum: 21,
					isLike: false,
					allReply: 2,
					url: '../../../static/logo.png',
					replyList: [
						{
							name: '183****9836',
							contentStr: '我差不多，办的抵押贷款，服务超赞，效率贼高，推荐一波。'
						},
						{
							name: '181****7214',
							contentStr: '我的信用贷还在办理中，自己办太麻烦了，跑几趟资料都有问题，还是这公司处理的好'
						}
					]
				},
				{
					id: 4,
					name: '134****4638',
					date: '06-20 13:58',
					contentText: '阔以，IT服务团队很强大，帮我司开发的软件做的很漂亮，点个赞',
					url: '',
					allReply: 0,
					likeNum: 150,
					isLike: false
				}
			];
		}
	}
};
</script>

<style lang="scss" scoped>
.comment {
	display: flex;
	padding: 30rpx 0;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				color: #5677fc;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: #5677fc;
				.num {
					color: #5677fc;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}
		}
	}
}
</style>
