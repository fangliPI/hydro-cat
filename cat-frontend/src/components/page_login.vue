<template>
	<div>
		<h3 style="text-align: center;">
			抽水蓄能电站水泵水轮机状态评估系统
		</h3>
		<div style="margin: 30px 0;"></div>
		<el-form :model="userForm" status-icon ref="userForm" label-width="100px">
			<el-form-item label="用户名">
				<el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="userForm.name"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="userForm.password" show-password></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="loginUser()">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import axios from 'axios'
	const API_BASE = 'http://localhost:3000/api/v1'
	export default {
		name: 'page_login',
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				userForm: {
					name: '',
					password: ''
				}
			};
		},
		methods: {
			async loginUser() {
				try {
					let response = await axios.post(`${API_BASE}/user_login`, this.userForm);
					let token = response.data.token;
					localStorage.setItem("jwt", token);
					if (token) {
						this.$message({
							type: 'success',
							message: '登陆成功'
						});
						this.$router.push({
							name: "page_enter"
						});
					}
				} catch (err) {
					this.$message({
						type: 'error',
						message: '登陆失败'
					});
					console.log(err.response);
				}
			}
		}
	}
</script>

<style>
</style>
