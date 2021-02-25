<template>
	<div>
		<Nav></Nav>
		<div class="ProductList">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Nav from '../components/Nav/index.vue'
	export default{
		name:"Layout",
		data() {
			return {
				
			}
		},
		components:{
			Nav
		}
	}
</script>

<style scoped>
	.ProductList{
		padding: 0 200px;
	}
</style>
