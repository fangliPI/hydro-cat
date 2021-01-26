<template>
	<div>
		<h3 style="text-align: center;">
			xx公司xx号水泵水轮机状态评估汇总表
		</h3>
		<table class="my-table">
			<tr>
				<td rowspan="4">设备资料</td>
				<td>运行编号</td>
				<td>{{eval_data_basic.operation_id}}</td>
				<td>额定出力</td>
				<td>{{eval_data_basic.force_out}}</td>
				<td>额定入力</td>
				<td>{{eval_data_basic.force_in}}</td>
			</tr>
			<tr>
				<td>额定水头</td>
				<td>{{eval_data_basic.rated_head}}</td>
				<td>额定流量</td>
				<td>{{eval_data_basic.flow}}</td>
				<td>额定转速</td>
				<td>{{eval_data_basic.rpm}}</td>
			</tr>
			<tr>
				<td>生产厂商</td>
				<td>{{eval_data_basic.manufacturer}}</td>
				<td>出厂编号</td>
				<td>{{eval_data_basic.serial_num}}</td>
				<td>型式</td>
				<td>{{eval_data_basic.type}}</td>

			</tr>
			<tr>
				<td>安装厂商</td>
				<td>{{eval_data_basic.installer}}</td>
				<td>投运日期</td>
				<td>{{date_convert(eval_data_basic.date_on)}}</td>
				<td>上次检修日期</td>
				<td>{{date_convert(eval_data_basic.date_inspection)}}</td>
			</tr>
			<tr>
				<td colspan="2">上次状态评价结果</td>
				<td colspan="2">{{eval_result}}</td>
				<td colspan="2">上次状态评价时间</td>
				<td>{{date_convert(eval_data_basic.createdAt)}}</td>
			</tr>
		</table>
		<table class="my-table">
			<tr>
				<td colspan="11">部件评价结果：</td>
			</tr>
			<tr>
				<td colspan="2">评价指标</td>
				<td v-for="item in eval_data_details" :key="item._id" style="text-align: center;">{{item.name}}</td>
			</tr>
			<tr>
				<td>扣分情况</td>
				<td>单项最大扣分值</td>
				<td v-for="item in eval_data_details" :key="item._id" :style="ColorStyle(item.score)">{{item.score}}</td>
			</tr>
			<tr>
				<td colspan="2">状态定级</td>
				<td v-for="item in eval_data_details" :key="item._id" :style="ColorStyle(item.score)">{{which_condition(item.score)}}</td>
			</tr>
			<tr>
				<td colspan="2">评价时间</td>
				<td v-for="item in eval_data_details" :key="item._id" style="text-align: center;">{{date_convert(item.createdAt)}}</td>
			</tr>
			<tr>
				<td colspan="11" :style="bgColorStyle(eval_data_basic.eval_score)">
					水泵水轮机整体状态评价结果: {{'\t' + eval_result}}
				</td>
			</tr>
		</table>

		<template v-for="comp in eval_data_details">

			<table class="my-table" :key="comp._id" v-if="comp.handle_suggestion == '请输入'">
				<tr>
					<td rowspan="2" style="width: 120px;">{{comp.name}}</td>
					<td style="width: 120px;">扣分状态量及状态描述</td>
					<td>
						<ul v-if="comp.score <= 30">
							状态正常
						</ul>
						<ul v-else>
							<template v-for="sub_component in comp.sub_component_list">
								<ul :key="sub_component._id" v-if="sub_component.score > 30">
									<li>
										{{sub_component.name}}
										<ul v-for="item in sub_component.items" :key="item._id">
											<li v-if="item.weighted_score > 30" style="white-space:pre-wrap">
												{{item.num + '\t' + item.name + '\t' + item.condition}}
											</li>
										</ul>
									</li>
								</ul>
							</template>
						</ul>
					</td>
				</tr>
				<tr>
					<td>处理建议</td>
					<td>
						<el-input type="textarea" :rows="1" placeholder="Please input" v-model="comp.handle_suggestion">
						</el-input>
					</td>
				</tr>
			</table>
		</template>
		<table class="my-table">
			<tr>
				<td style="width: 240px;">评价人：</td>
				<td>
					<el-input type="text" v-model="eval_data_basic.rated_by"></el-input>
				</td>
				<td style="width: 240px;">审核：</td>
				<td>
					<el-input type="text" v-model="eval_data_basic.verified_by"></el-input>
				</td>
			</tr>
		</table>
		<br />
		<el-button @click="submit">提交</el-button>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: "page_result",
		data() {
			return {
				eval_result: ""
			}
		},
		created() {
			if (this.eval_data_basic.eval_score < 40) {
				this.eval_result = "正常状态";
			} else if (this.eval_data_basic.eval_score < 60) {
				this.eval_result = "注意状态";
			} else if (this.eval_data_basic.eval_score < 80) {
				this.eval_result = "异常状态";
			} else {
				this.eval_result = "严重状态";
			}
		},
		computed: {
			...mapState(["eval_data_basic", "eval_data_details", "uploaded"])
		},
		methods: {
			...mapActions(["postData"]),
			date_convert: function (UTCstring) {
				return new Date(UTCstring);
			},
			which_condition: function (score) {
				var which_condition = "";
				if (score < 40) {
					which_condition = "正常状态";
				} else if (score < 60) {
					which_condition = "注意状态";
				} else if (score < 80) {
					which_condition = "异常状态";
				} else {
					which_condition = "严重状态";
				}
				return which_condition;
			},
			ColorStyle: function (score) {
				if (score < 40) {
					return {
						color: '#67C23A',
						'text-align': 'center'
					}
				} else if (score < 60) {
					return {
						color: '#E6A23C',
						'text-align': 'center'
					}
				} else if (score < 80) {
					return {
						color: '#F56C6C',
						'text-align': 'center'
					}
				} else {
					return {
						color: '#BE0202',
						'text-align': 'center'
					}
				}
			},
			bgColorStyle: function (score) {
				if (score < 40) {
					return {
						color: '#FFFFFF',
						'background-color': '#67C23A',
						'white-space': 'pre-wrap'
					}
				} else if (score < 60) {
					return {
						color: '#FFFFFF',
						'background-color': '#E6A23C',
						'white-space': 'pre-wrap'
					}
				} else if (score < 80) {
					return {
						color: '#FFFFFF',
						'background-color': '#F56C6C',
						'white-space': 'pre-wrap'
					}
				} else {
					return {
						color: '#FFFFFF',
						'background-color': '#BE0202',
						'white-space': 'pre-wrap'
					}
				}
			},
			submit() {
				this.$confirm('确定保存此次评估结果，并上传评估数据？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					/* post data to DB and logout*/
					var eval_data = {
						basic_info: {},
						details: []
					};
					eval_data.basic_info = this.eval_data_basic;
					eval_data.details = this.eval_data_details;
					this.postData(eval_data).then(() => {
						if(this.uploaded) {
							this.$message({
								type: 'success',
								message: '上传成功'
							});
							localStorage.removeItem("jwt");
							this.$router.push({
								name: "page_login"
							});
						}
						else {
							this.$message({
								type: 'error',
								message: '上传失败'
							});
						}	
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			}
		}
	}
</script>

<style>
	.my-table {
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		flex: 1;
		width: 100%;
		max-width: 100%;
		font-size: 14px;
		color: #606266;
		border: 1px solid #EBEEF5
	}

	.my-table td {
		padding: 9px 7px;
		min-width: 0;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		text-overflow: ellipsis;
		vertical-align: middle;
		position: relative;
		text-align: left;
		border-left: 1px solid #EBEEF5;
		border-right: 1px solid #EBEEF5;
		border-top: 1px solid #EBEEF5;
		border-bottom: 1px solid #EBEEF5;
	}
</style>
