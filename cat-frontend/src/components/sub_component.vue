<template>
	<el-tabs v-model="activeSubTab" @tab-click="handleSubTabClick" type="card">
		<el-tab-pane v-for="pumpSubComponent in sub_component_list" v-bind:key="pumpSubComponent.name"
		:label="pumpSubComponent.name" :name="pumpSubComponent.name" style="height:350px;overflow-y:auto;overflow-x:hidden;">
			<el-table :data="pumpSubComponent.items" border style="width: 100%; margin-top: 20px">
				<el-table-column prop="num" label="序号" width="120">
				</el-table-column>
				<el-table-column prop="name" label="状态量组别" width="120">
				</el-table-column>
				<el-table-column label="状态量劣化程度说明" show-overflow-tooltip>
					<template slot-scope="scope">
						<div style="font-size: 12px; white-space:pre-wrap">
							{{scope.row.rating_description[0].score + '\t' + scope.row.rating_description[0].description}}<br />
							{{scope.row.rating_description[1].score + '\t' + scope.row.rating_description[1].description}}<br />
							{{scope.row.rating_description[2].score + '\t' + scope.row.rating_description[2].description}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="基本扣分值" width="150">
					<template slot-scope="item">
						<el-select v-model="item.row.score" v-on:change="compute_item_weighted_score(item)" placeholder="请评分">
							<el-option v-for="option in score_options" :key="option.score" :label="option.score" :value="option.score"></el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="weighted_score" label="加权扣分值" width="120"></el-table-column>
			</el-table>
			<br />
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		name: "sub_component",
		props: ["sub_component_list"],
		data() {
			return {
				activeSubTab: "",
				score_options: [{
						"score": 1
					},
					{
						"score": 2
					},
					{
						"score": 3
					},
					{
						"score": 4
					},
					{
						"score": 5
					},
					{
						"score": 6
					},
					{
						"score": 7
					},
					{
						"score": 8
					},
					{
						"score": 9
					},
					{
						"score": 10
					}
				]
			}
		},
		created() {
			this.activeSubTab = this.sub_component_list[0].name;
		},
		methods: {
			handleSubTabClick(tab, event) {
				console.log(tab, event);
			},
			compute_item_weighted_score(item) {
				item.row.weighted_score = item.row.score * item.row.weight;
				if(item.row.score < item.row.score_lower_than) {
					item.row.condition = item.row.rating_description[0].description;
				}
				else if (item.row.score <= item.row.score_higher_than) {
					item.row.condition = item.row.rating_description[1].description;
				}
				else {
					item.row.condition = item.row.rating_description[2].description;
				}
				if(item.row.condition == "/") {
					this.$alert('该分数不可取，请重新选择', '警告', {
						confirmButtonText: 'OK',
					});
				}
			}
		}
	}
</script>

<style>
</style>
