<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		name: 'App',
		data: () => ({}),
		methods: {
			...mapActions(["getData"])
		},
		created: function () {
			console.log("created");
			// 在页面加载时，如果sessionStorage里有信息->读取
			if (sessionStorage.getItem('store')) {
				this.$store.replaceState(
					Object.assign({},
						this.$store.state,
						JSON.parse(sessionStorage.getItem('store'))
					)
				)
			} else { //如果sessionStorage里为空->从新获取信息
				this.getData();
			}
			// 在页面刷新时将vuex里的信息保存到sessionStorage里
			// beforeunload事件在页面刷新时先触发
			window.addEventListener('beforeunload', () => {
				sessionStorage.setItem('store', JSON.stringify(this.$store.state));
			})
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
