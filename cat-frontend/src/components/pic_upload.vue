<template>
	<div>
		<el-upload action="http://localhost:3000/api/v1/upload" name="upload" ref="upload" :on-remove="handleRemove"
		 :on-success="handleSuccess">
			<el-button slot="trigger" size="small">选取文件</el-button>
		</el-upload>
	</div>
</template>

<script>
	const API_BASE = 'http://localhost:3000'
	export default {
		name: "pic_upload",
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				images: []
			}
		},
		methods: {
			handleRemove(file, fileList) {
				for (var i = 0; i < this.images.length; i++) {
					if (this.images[i].url.includes(file.response.img)) {
						this.images.splice(i, 1);
					}
				}
				console.log("after-remove", this.images);
				this.$emit('update-images', this.images);
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleSuccess(response, file, fileList) {
				var image = {
					name: "",
					url: ""
				};
				image.name = file.name;
				image.url = API_BASE + file.response.img;
				this.images.push(image);
				console.log("after-success", this.images);
				this.$emit('update-images', this.images);
			}
		}
	}
</script>

<style>
</style>
