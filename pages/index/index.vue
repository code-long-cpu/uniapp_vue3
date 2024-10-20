<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">xielong</text>
		</view>
	</view>
	<br>
	<scroll-view class="box" scroll-x hover-stay-time='0'>
		<view class="box_1" hover-class="boxColor">box_1</view>
		<view class="box_1">box_1</view>
		<view class="box_1">box_2</view>
		<view class="box_1">box_3</view>
		<view class="box_1">box_4</view>
		<view class="box_1">box_5</view>
		<view class="box_1">box_6</view>
		<view class="box_1">box_7</view>
		<view class="box_1">box_8</view>
		<view class="box_1">box_9</view>
	</scroll-view>

	<text selectable>谢龙小程序</text> 
	<hr>
	<view>{{a}}</view>
	<hr>
	<view>{{b}}</view>
	<view>
		<image src=""></image>
	</view>
	
	<view>
		<button type="primary" :loading="false">按钮</button>
		<button type="primary" loading="true">按钮</button>
		</view>
</template>

<script setup>
	import {ref} from 'vue'
	const a = 6 ;
	let b = ref(8);
	// setInterval(()=>{
	// 	b.value++;
	// 	console.log(b.value)
	// },1000)
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.logo {
			height: 200rpx;
			width: 200rpx;
			margin-top: 200rpx;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 50rpx;
		}
		.text-area {
			display: flex;
			justify-content: center;
			.title {
				font-size: 36rpx;
				color: #8f8f94;
			}
		}
		
	}
	.box{
		border:solid 1px black;
		white-space:nowrap;
		width:80%;
		margin:auto;
		.box_1{
			width:100rpx;
			height:100rpx;
			border:solid 1rpx black;
			display:inline-block;
			margin:10rpx;
			background-color:pink;
		}
		.boxColor{
			background-color:yellow;
		}
	}
	
</style>
