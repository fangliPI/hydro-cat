<template>
	<div>
		<h3 style="text-align: center;">
			抽水蓄能电站水泵水轮机状态评估系统
		</h3>
		<el-tabs v-model="activeTab" @tab-click="handleTabClick" type="border-card">
			<el-tab-pane v-for="comp in checked_comps" v-bind:key="comp.name" :label="comp.name" :name="comp.name">
				<sub_component v-bind:sub_component_list="comp.sub_component_list"></sub_component>
			</el-tab-pane>
		</el-tabs>
		<div style="margin: 30px 0;"></div>
		<el-button @click="submit">生成报告</el-button>
	</div>
</template>

<script>
	import sub_component from './sub_component.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: "page_evaluate",
		components: {
			sub_component
		},
		data() {
			return {
				activeTab: '',
				checked_components: [],
				checked_comps: []
			}
		},
		created() {
			console.log("page_evaluate is created");
			/* data initialization */
			this.checked_components = JSON.parse(this.$route.params.checked_comps);
			this.activeTab = this.checked_components[0];
			for (var i = 0; i < this.checked_components.length; i++) {
				for (var k = 0; k < this.eval_data_details.length; k++) {
					if (this.checked_components[i] == this.eval_data_details[k].name) {
						this.eval_data_details[k].handle_suggestion = "请输入";
						this.checked_comps.push(this.eval_data_details[k]);
					}
				}
			}
		},
		computed: {
			...mapState(["eval_data_basic", "eval_data_details"])
		},
		methods: {
			...mapActions(["updateBasic", "updateDetails"]),

			handleTabClick(tab, event) {
				console.log(tab, event);
			},
			
			submit() {
				/* calculate sub_component score of the updated components */
				var score_temp = 0;
				this.checked_comps.forEach((item_component) => {
					item_component.sub_component_list.forEach((item_sub_component) => {
						item_sub_component.items.forEach((item) => {
							if (item.weighted_score > score_temp) {
								score_temp = item.weighted_score;
							}
							if (item.score < item.score_lower_than) {
								item.condition = item.rating_description[0].description;
							} else if (item.score <= item.score_higher_than) {
								item.condition = item.rating_description[1].description;
							} else {
								item.condition = item.rating_description[2].description;
							}
						})
						item_sub_component.score = score_temp;
						score_temp = 0;
					})
				})

				/* calculate component score of the updated components */
				this.checked_comps.forEach((item_component) => {
					item_component.sub_component_list.forEach((item_sub_component) => {
						if (item_sub_component.score > score_temp) {
							score_temp = item_sub_component.score;
						}
					})
					item_component.score = score_temp;
					score_temp = 0;
				})

				/* update component evaluation time */
				var time = new Date();
				this.checked_comps.forEach((item_component) => {
					item_component.createdAt = time;
				})

				/* merge and generate new eval_data_details */
				var new_details = this.eval_data_details;
				new_details.forEach(new_item_component => {
					this.checked_comps.forEach(i => {
						if (new_item_component.name == i.name) {
							new_item_component.score = i.score;
							new_item_component.sub_component_list = i.sub_component_list;
						}
					})
				})
				this.updateDetails(new_details);
				//console.log(new_details);

				/* merge and generate new eval_data_basic */
				var equipment_score = 0;
				var new_basic = this.eval_data_basic;
				new_details.forEach((item_component) => {
					if (item_component.score > equipment_score) {
						equipment_score = item_component.score;
					}
				})
				new_basic.eval_score = equipment_score;
				this.updateBasic(new_basic);
				//console.log(new_basic);

				this.$confirm('确定提交？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//go to page_result
					this.$router.push({
						name: "page_result"
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
</style>
