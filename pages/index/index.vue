<template lang="wxml">
	<view class="content" :style="{'height':height,'overflow':'hidden'}">
		<!-- 搜索区 -->
		<search @send="send" />

		<!-- 轮播图 -->
		<swiper 
			class="banner"
			autoplay 
			circular 
			indicator-dots 
			indicator-color="rgba(255,255,255,.3)" 
			indicator-active-color="rgba(255,255,255,.7)"	
		 >

			<swiper-item v-for="item in bannerData" :key="item.goods_id">
				<navigator :url="item.navigator_url">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>


		<!-- 导航区 -->
		<view class="nav">
			<navigator :url="item.navigator_url" class="item" v-for="(item,index) in categoryData" :key="index">
				<image :src="item.image_src"></image>
			</navigator>
		</view>

		<!-- 楼层 -->
		<view class="floors">


			<view class="floor" v-for="(item,index) in floorsData" :key="index">
				<!-- 标题 -->
				<view class="header">
					<image :src="item.floor_title.image_src"></image>
				</view>

				<view class="imgs">
					<navigator :url="e.navigator_url" v-for="(e,i) in item.product_list" :key="i">
						<image :src="e.image_src"></image>
					</navigator>
				</view>

			</view>

		</view>
		
		<view class="goTop icon-top" @tap="hGoTop" v-if="!isShow"></view>
		
	</view>
</template>


<script>
	// 1.导入
	import search from "@/components/search.vue";
	export default {
		data() {
			return {
				// 默认值：不应该限制高度，auto
				height:"auto",
				// banner数据
				bannerData:[],
				// 分类数据
				categoryData:[],
				// 楼层图数据
				floorsData:[],
				isShow: true
			}
		},
		// 2.注册
		components:{
			// 组件名：变量名
			search
		},
		methods: {
			send(e){

				// 解决高度问题：
				// 3.拿到数据怎么办？
				//    3.1 vue语法数据（初始化）绑定 ；高度是auto,设置溢出隐藏无效
				//    3.2 设置初始化数据
				this.height = e;
			},
			// 获取banner图片
			async getBanner () {
				const message = await this.$request ({
					url:'/api/public/v1/home/swiperdata'
				})
				this.bannerData = message
			},
			// 获取首页分类数据
			async getCategory () {
				const res = await this.$request ({
					url:'/api/public/v1/home/catitems'
				}) 
				// 更新数据项
			this.categoryData = res
			},
			// 获取楼层图数据
			async getFloors () {
				const res = await this.$request({
					url:'/api/public/v1/home/floordata'
				})
				this.floorsData = res
			},
			// 点击按钮回到顶部
			hGoTop () {
				uni.pageScrollTo({scrollTop:0})
			}
		},
		// 页面加载时
		onLoad () {
			// 获取banner
			this.getBanner () 
			// 获取分类
			this.getCategory ()
			// 获取楼层图数据
			this.getFloors ()
		},
		// 下拉刷新时 
		async onPullDownRefresh (e) {
			
			// 获取banner
			await this.getBanner () 
			// 获取分类
			await this.getCategory ()
			// 获取楼层图数据
			await this.getFloors ()
		
			uni.stopPullDownRefresh()
		},
		// 界面滚动
		onPageScroll (e) {
			if(e.scrollTop>200) {
				this.isShow = false
			}else {this.isShow = true}
		}
	}
</script>



<style lang="less">

  .goTop {
		position: fixed;
		bottom: 65rpx;
		right: 30rpx;
		background-color: rgba(255,255,255,.8);

		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		line-height: 100rpx;
		text-align: center;
		font-size: 48rpx;
		color: #666;
		&:hover {
			cursor:pointer
		}
	}

	// 轮播图
	.banner {
		height: 340rpx;
		image {
			width: 750rpx;
			height: 340rpx;
		}
	}


	// nav 
	.nav {
		display: flex;
		.item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			image {
				width: 128rpx;
				height: 140rpx;
				margin: 30rpx 0;
			}
		}
	}


	// 楼层
	.floors {
		// 公共楼层
		.floor {
			.header {
				box-sizing: border-box;
				padding-top: 20rpx;
				padding-left: 16rpx;
				background-color: #f4f4f4;
				image {
					height: 60rpx;
					width: 100%;
				}
			}
			.imgs {
				box-sizing: border-box;
				padding: 20rpx 12rpx;
				overflow: hidden;
				navigator {
					float: left;
					margin-right: 10rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				navigator:nth-child(1) {
					width: 232rpx;
					height: 386rpx;
				}
				navigator:nth-child(2),
				navigator:nth-child(5) {
					width: 273rpx;
					height: 188rpx;
				}
				navigator:nth-child(3),
				navigator:nth-child(4) {
					width: 203rpx;
					height: 188rpx;
				}
				// 3 5 margin-right不要10
				navigator:nth-child(3),
				navigator:nth-child(5) {
					margin-right: 0;
				}
				// 2 3 margin-bottom 10
				navigator:nth-child(2),
				navigator:nth-child(3) {
					margin-bottom: 10rpx;
				}

			}
		}
		// 第一楼层：如何css获取到？注意：less 权重问题，嵌套结构是否一致？
		.floor:nth-child(1) {
			.imgs {
				// 1
				navigator:nth-child(1) {
					width: 232rpx;
					height: 386rpx;
				}
				// 2 3 4 5 都是一个大小 ； n 从0开始
				navigator:nth-child(n+2) {
					width: 236rpx;
					height: 188rpx;
				}

			}
		}

	}

</style>






