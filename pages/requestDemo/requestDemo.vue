<template>
	<view class="container">
		<view class="menu">
			  <uni-segmented-control :current="current" :values="value" @clickItem="onClickItem" styleType="button" activeColor="#1ce5e0"></uni-segmented-control>
		</view>
		<view class="layout">
			<view class="box" v-for="(item,index) in pets" :key="item._id" @click ="preview(index)">
				<view class="pic">
					<image lazy-load :src="item.url" mode="widthFix"></image>
					<view class="message">
						<view class="up">
							<text>{{item.source}}</text>
							<text>{{item.type}}</text>
						</view>
						<view class="bellow">
							<text>第 {{index+1}} 张</text>
							<!-- <view>{{index}}</view> -->
						</view>
					</view>
				</view>
				<view class="text">{{item.content}}</view>
				<view class="author">———— {{item.author}}</view>
			</view>
		</view>
		<view class="float">
			<view class="item" @click="reFresh">
				<uni-icons type="refreshempty" size="30" color="#888"></uni-icons>
			</view>
			<view class="item" @click="backTop">
				<uni-icons type="arrow-up" size="30" color="#888"></uni-icons>
			</view>
		</view>
		<view class="loadMore">
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import {computed, ref} from 'vue'
	import {onReachBottom,onPullDownRefresh} from '@dcloudio/uni-app'
	const pets = ref([])
	const current=ref(0)
	// 全部狗猫分类数据源
	const classify = [{key:'all',value:'全部'},{key:'dog',value:'狗狗'},{key:'cat',value:'猫猫'}]
	const value = computed(()=>{return classify.map(item=>item.value)}) //['全部', '狗狗', '猫猫']
	
	// 展开运算符
	let arr1 = [1,2,3]
	let arr2 = [4,5,6]
	console.log([...arr1,...arr2])
	
	// 发起图片请求
	 const request=async()=>{
		 // uni.showLoading({
		 // 	title:"图片加载中…"
		 // })
		 uni.showNavigationBarLoading()
		 try{
			 const res = await uni.request({
			 	url:"https://tea.qingnian8.com/tools/petShow",
			 	// url:"https://tea.qingnian8.com/tools/taoShow",
			 	// url:"https://api.thecatapi.com/v1/images/search?limit=1",
			 	method:'GET',
			 	data:{
			 		size:5,	
			 		// limit:10,	
					type:classify[current.value].key
			 	},
				
			 	header:{
			 		"access-key":"369395"
			 	}
			 })
			 if(res.data.errCode===0){
				 // pets.value = res.data.data
				 // console.log(res.data.data)
				 // 展开运算符,追加新数据给旧数据
				 pets.value = [...pets.value,...res.data.data]
			 }else{
				 uni.showToast({
					 title:res.data.errMsg,
					 icon:'none',
					 duration:3000
				 })
				}
		 }catch(error){
			 console.log(error)
			 uni.showToast({
				 title:error.errMsg,
				 icon:'none',
				 duration:3000
			 })
		 }
		 // uni.hideLoading()
		 uni.hideNavigationBarLoading()
		 uni.stopPullDownRefresh()
		
	}
	request()
	
	// 获取网络数据后才能提取url组成数组，是request是异步操作，页面加载完后后才执行渲染，所以此处无值
	// const urls = pets.value.map(item=>item.url)
	// console.log(urls)
	
	// 点击图片进行预览
	const preview =(index)=>{
		// （点击click出发的事情是页面已经加载完毕，数据已经请求回来了。）
		const urls = pets.value.map(item=>item.url)
		uni.previewImage({
			current:index,
			urls
		})
	}
	
	// 触底加载更多
	onReachBottom(()=>{
		console.log("到底部了")
		request()
	})
	
	// 下拉刷新
	onPullDownRefresh(()=>{
		console.log("刷新了")
		pets.value = [] //清空旧数据
		request()
	})
	
	// 点击刷新
	const reFresh = ()=>{
		console.log("刷新")
		uni.startPullDownRefresh()
	}
	
	// 回到顶部
	const backTop=()=>{
		console.log("回到顶部")
		uni.pageScrollTo({
			scrollTop:0,
			duration:100
		})
	}
	
	// 分段器
	const onClickItem=(e)=>{
		// console.log(e.currentIndex)
		// e参数可传不到request中
		current.value=e.currentIndex
		// console.log(classify[current.value].key)
		pets.value=[]
		request()
	}
	
	
</script>

<style lang="scss" scoped>
.container{
	.menu{
		padding:50rpx;
	}
	.layout{
		padding:0 50rpx;
		// border:solid 1px black;
		.box{					
			margin-bottom:60rpx;
			box-shadow:0 10rpx 30rpx rgba(0,0,0,0.3);
			// border:solid 1px black;
			border-radius: 15rpx;
			overflow:hidden;
			.pic{
				// border:solid 1px orange;
				position:relative;
				// overflow:hidden;
				image{
					width:100%;
					// border:solid 1px red;
				}
				.message{
					padding:40rpx;
					font-size: 40rpx;
					color:white;
					// border:solid 1px red;
					position:absolute;
					top:0rpx;
					width:100%;
					height:100%;
					display:flex;
					flex-direction: column;
					justify-content: space-between;
					.up,.bellow{
						display:flex;
						justify-content: space-between;
						text{
							text-shadow: 0.1em 0.1em #333
						}
					}
					
				}
			}
			.text{
				padding:20rpx;
				color:#333;
				// border:solid 1px black;
				font-size: 36rpx;
			}
			.author{
				padding:0 20rpx 20rpx ;
				font-size: 30rpx;
				// border:solid 1px black;
				text-align: right;
				color:#888;
				
			}
			
		}
	}
	.float{
		position:fixed;
		right:50rpx;
		bottom:10rpx;
		padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
		// border:solid 1px black;
		.item{
			width:100rpx;
			height:100rpx;
			background-color: white;
			border-radius: 50%;
			display: flex; 
			justify-content: center;
			align-items: center;
			margin-bottom:10rpx;
		}
	}
	.loadMore{
		padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
	}
}
  

</style>
