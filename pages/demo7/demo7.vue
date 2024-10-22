<template>
	<view class="out">
		<h4>价格表</h4>
		<checkbox-group @change="itemchanges">
			<view class='item' v-for="item in list" :key="item.id">
				<checkbox :value="item.id" :checked="item.checked"></checkbox>
				<text>物品:{{item.name}}</text>
				<text>价格:{{item.price}}元</text>
			</view>
		</checkbox-group>
		<!-- {{checkedlist}} -->
		<view class="price">
		<text>商品数量:{{totalNumber}}件</text>
		<text>总价:{{totalPrice}}元</text>
		</view>
	</view>
	<view>
		<p>⚠️因为checkbox无法使用v-model,所以使用forEach()和includes将数据源与操作进行双向绑定,之后才能用filter筛选出勾选的项目，进行价格累加</p>
		<p>⚠️字符串都是真值，‘false’是true，false才是false</p>
		☑️勾选的项目数组：{{checkedlist}}
		<br>
		☑️用forEach和includes改变list数据源：{{list}}
		<br>
		☑️用filter筛选出的勾选项：{{newlist}}
		<br>
		☑️用reduce勾选项进行价格累加：{{sum}}元
	</view>
	<text>\n</text>
	<view>
		<navigator url="../index/index">跳转回主页</navigator>
	</view>
</template>

<script setup>
	uni.showToast({
		title:"操作成功"
	})
	import {computed, ref} from 'vue'
	// 字符串都是真值，‘false’是true，false才是false
	const list = ref([
		{id:'1',name:'🎩帽子',price:1500,checked:false},
		{id:'2',name:'👕上衣',price:1000,checked:true},
		{id:'3',name:'👖裤子',price:2000,checked:false},
		{id:'4',name:'👞鞋子',price:3000,checked:false}
	])
	const test = ref([])
	const checkedlist= ref([])
	const itemchanges=(e)=>{
		// console.log(e.detail.value)
		checkedlist.value=e.detail.value
		// 因为checkbox无法使用v-model,所以使用forEach()和includes将数据源与操作进行双向绑定,之后才能用filter筛选出勾选的项目，进行价格累加
		list.value.forEach(item=>{
			item.checked = checkedlist.value.includes(item.id)
		})
	}
	const totalNumber = computed(()=>checkedlist.value.length)
	
	const totalPrice = computed(()=>{
		return list.value.filter(item=>item.checked).reduce((sum,item)=>sum+item.price,0)
		})
	const newlist =computed(()=>{
		return list.value.filter(item=>item.checked)
		})
	const functionlist = ()=>{
		return list.value.filter(item=>item.checked)
	}
	const sum = computed(()=>{
		return newlist.value.reduce((sum,item)=>sum+item.price,0)
	})
</script>

<style lang="scss" scoped>
	$borderColor:#b3c0c7;
	.out{
		border:solid 1px $borderColor;
		border-radius: 10px;
		width:280px;
		padding: 5px;
		margin:10px auto;
		h4{
			color:$borderColor;
			text-align: center;
		}
		.item,.price {
			display: flex;
			justify-content: space-between;
			border-bottom:solid 1px $borderColor;
			padding: 5px;
			margin:2px 0;
		}
		.item:first-child{
			border-top:solid 1px $borderColor;
			margin-top:10px;
		}
		
		.price{
			border:0
		}
	}

</style>
