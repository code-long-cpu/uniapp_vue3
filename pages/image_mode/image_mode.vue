<template>
	<view class="mode">
		<view class="title">image的五种model形式：scaleToFill，aspectFit，aspectFill，widthFix，heightFix</view>
		<view>不设置宽高，iamge默认尺寸是撑满320px*240px的图框，图片变形</view>
		<image src="../../static/arch.jpg" mode=""></image>
		<view>①scaleToFill(变形撑满图框)：不设置宽高，scaleToFill填满是320px*240px的图框，图片变形</view>
		<image src="../../static/arch.jpg" mode="scaleToFill" class=""></image>
		<view>②scaleToFill(变形撑满图框)：设置宽高200*200px图框，scaleToFill撑满是200*200px，图片变形</view>
		<image src="../../static/arch.jpg" mode="scaleToFill" class="scaleToFill"></image>
		<view>③aspectFit(比例不变宽度撑满图框)：设置宽高200*200px图框，aspectFit宽度撑满是200*200px，图片比例不变</view>
		<image src="../../static/arch.jpg" mode="aspectFit" class="aspectFit"></image>
		<view>④aspectFill(比例不变高度撑满图框，会裁剪)：设置宽高200*200px图框，aspectFill高度撑满200*200px，多余宽度裁剪掉，图片比例不变，用的最多</view>
		<image src="../../static/arch.jpg" mode="aspectFill" class="aspectFill"></image>
		<view>⑤widthFix(比例不变宽度撑满图框，高度自动延伸)：设置宽高200*200px图框，widthFix宽度撑满200*200px，高度自动缩放，图片比例不变，图框高度失效</view>
		<image src="../../static/arch.jpg" mode="widthFix" class="widthFix"></image>
		<view>⑥heightFix(比例不变高度撑满图框，宽度自动缩放)：设置宽高200*200px图框，heightFix高度撑满200*200px，宽度自动缩放，图片比例不变，图框宽度失效</view>
		<image src="../../static/arch.jpg" mode="heightFix" class="heightFix"></image>
		
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.title{
	font-size:20px;
	font-weight: 500;
}
image{
	border:solid 1px black;
}
view{
	margin-top:20px;
}
.scaleToFill,.aspectFit,.aspectFill,.widthFix,.heightFix{
	width:200px;
	height:200px;
	border:solid 1px black;
}


</style>
