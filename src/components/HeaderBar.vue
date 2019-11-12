<template>
	<el-row>
		<el-col :span="1">
			<div style="font-size: 24px;" @click="changeCollapse">
				<i class="el-icon-open"></i>
			</div>
		</el-col>
		<el-col :span="21">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item
					v-for="(route, index) in fullPath"
					:key="index"
				>
					{{ route }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<el-col :span="1">
			<el-dropdown>
				<div style="font-size: 24px;">
					<i class="el-icon-setting"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>中文</el-dropdown-item>
					<el-dropdown-item>english</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-col>
		<el-col :span="1">
			<el-dropdown>
				<el-avatar :src="circleUrl" size="small"></el-avatar>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>Profile</el-dropdown-item>
					<el-dropdown-item divided>Logout</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: 'header-bar',
	data() {
		return {
			circleUrl:
				'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
		};
	},
	computed: {
		fullPath() {
			const fullPath = this.$route.fullPath.split('\/').slice(1);
			return fullPath;
		}
	},
	methods: {
		changeCollapse() {
			this.$emit('change');
		}
	}
};
</script>

<style scoped></style>
