<template>
	<view class = 'box' @click="change">
		{{num}}
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	const num = ref(1)
	const change = ()=>{
		num.value++
	}
</script>

<style lang="scss">
	.box {
		width:200px;
		height:200px;
		background:orange;
		font-size:50px;
	}
</style>
