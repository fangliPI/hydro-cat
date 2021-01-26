<template>
	<div>
		<h3 style="text-align: center;">
			抽水蓄能电站水泵水轮机状态评估系统
		</h3>
		<div v-if="errorFromServer" class="el-message-box__wrapper">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span>Warning</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn"><i class="el-message-box__close el-icon-close"></i></button>
				</div>
				<div class="el-message-box__content">
					<div class="el-message-box__container">
						<div class="el-message-box__message">
							<p>读取历史数据失败！</p>
						</div>
					</div>
				</div>
				<div class="el-message-box__btns">
					<button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="getData">
						<span>重新读取</span>
					</button>
				</div>
			</div>
		</div>

		<div v-else>
			<div style="margin: 30px 0;"></div>
			<el-form ref="form" :model="eval_data_basic" :inline="true" label-width="80px" label-position="left">
				<el-form-item label="运行编号">
					<el-input v-model="eval_data_basic.operation_id" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="出厂编号">
					<el-input v-model="eval_data_basic.serial_num" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="型式">
					<el-input v-model="eval_data_basic.type" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="额定出力">
					<el-input v-model="eval_data_basic.force_out" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="额定入力">
					<el-input v-model="eval_data_basic.force_in" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="额定水头">
					<el-input v-model="eval_data_basic.rated_head" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="额定流量">
					<el-input v-model="eval_data_basic.flow" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="额定转速">
					<el-input v-model="eval_data_basic.rpm" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="生产厂商">
					<el-input v-model="eval_data_basic.manufacturer" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="安装厂商">
					<el-input v-model="eval_data_basic.installer" :disabled="true"></el-input>
				</el-form-item>
				<br />
				<el-form-item label="投运日期" label-width="140px">
					<el-date-picker type="date" placeholder="选择日期" v-model="eval_data_basic.date_on" value-format="yyyy-MM-dd" style="width: 100%;"
					 :disabled="true"></el-date-picker>
				</el-form-item>
				<el-form-item label="上次检修日期" label-width="140px">
					<el-date-picker type="date" placeholder="选择日期" v-model="eval_data_basic.date_inspection" value-format="yyyy-MM-dd"
					 style="width: 100%;" :disabled="true"></el-date-picker>
				</el-form-item>
				<br />
				<el-form-item label="上次状态评价日期" label-width="140px">
					<el-date-picker type="date" placeholder="选择日期" v-model="eval_data_basic.createdAt" value-format="yyyy-MM-dd" style="width: 100%;"
					 :disabled="true"></el-date-picker>
				</el-form-item>
				<el-form-item label="上次状态评价结果" label-width="140px">
					<el-select v-model="eval_result" placeholder="请选择" :disabled="true">
						<el-option label="正常状态" value="1"></el-option>
						<el-option label="注意状态" value="2"></el-option>
						<el-option label="异常状态" value="3"></el-option>
						<el-option label="严重状态" value="4"></el-option>
					</el-select>
				</el-form-item>
				<br />
				<el-form-item label="请选择要评估的部件" label-width="140px">
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">整体评估</el-checkbox>
					<el-checkbox-group v-model="checked_components" @change="handleCheckedChange">
						<el-checkbox v-for="comp in main_component_options" :label="comp" :key="comp">{{comp}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<br />
				<el-form-item>
					<el-button @click="StartEvaluate">开始评估</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: "page_enter",
		data() {
			return {
				main_component_options: ["尾水管", "蜗壳座环", "导水机构", "转轮", "主轴及连接螺栓", "水导轴承", "主轴密封", "伸缩节", "自动化元件"],
				checkAll: false,
				checked_components: [],
				isIndeterminate: true,
				eval_result: ""
			}
		},
		created() {
			console.log("page_enter is created!");

			if (this.eval_data_basic.eval_score < 40) {
				this.eval_result = "1";
			} else if (this.eval_data_basic.eval_score < 60) {
				this.eval_result = "2";
			} else if (this.eval_data_basic.eval_score < 80) {
				this.eval_result = "3";
			} else {
				this.eval_result = "4";
			}

			if (sessionStorage.getItem('checked')) {
				this.checked_components = JSON.parse(sessionStorage.getItem('checked'));
				console.log("checked is" + this.checked_components);
			}
		},
		computed: {
			...mapState(["errorFromServer", "eval_data_basic"])
		},
		methods: {
			...mapActions(["getData"]),
			handleCheckAllChange(val) {
				this.checked_components = val ? this.main_component_options : [];
				this.isIndeterminate = false;

			},
			handleCheckedChange(value) {
				//console.log(value);
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.main_component_options.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.main_component_options.length;

			},
			StartEvaluate() {
				sessionStorage.setItem('checked', JSON.stringify(this.checked_components));
				this.$router.push({
					name: "page_evaluate",
					params: {
						checked_comps: JSON.stringify(this.checked_components)
					}
				});
			}
		}
	}
</script>

<style>
</style>
