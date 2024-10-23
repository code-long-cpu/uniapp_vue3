<template>
	<view class="container">
		<view class="layout">
			<view class="box" v-for="(item,index) in pets" :key="item._id" @click ="preview(index)">
				<view class="pic">
					<image lazy-load :src="item.url" mode="widthFix"></image>
				</view>
				<view class="text">{{item.content}}</view>
				<view class="author">———— {{item.author}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {onReachBottom,onPullDownRefresh} from '@dcloudio/uni-app'
	const pets = ref([])
	
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
			 	// url:"https://api.thecatapi.com/v1/images/search?limit=1",
			 	method:'GET',
			 	data:{
			 		size:5,	
			 		// limit:10,	
			 	},
			 	header:{
			 		"access-key":"369395"
			 	}
			 })
			 if(res.data.errCode===0){
				 // pets.value = res.data.data
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
				 title:'请求有误',
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
	
</script>

<style lang="scss" scoped>
.container{
	.layout{
		padding:50rpx;
		// border:solid 1px black;
		.box{
			margin-bottom:60rpx;
			box-shadow:0 10rpx 30rpx rgba(0,0,0,0.08);
			// border:solid 1px black;
			border-radius: 15rpx;
			overflow:hidden;
			.pic{
				// border:solid 1px orange;
				overflow:hidden;
				image{
					width:100%;
					// border:solid 1px red;
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
}
  

</style>
