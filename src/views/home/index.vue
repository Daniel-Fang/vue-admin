<template>
	<el-container class="home">
		<el-aside :class="{collapse: collapse}">
			<AsideBar
				:routes="routes"
				:collapse="collapse"
				class="aside-bar"
			></AsideBar>
		</el-aside>
		<el-container class="right">
			<el-header>
				<HeaderBar @change="changeCollapse"></HeaderBar>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import AsideBar from '@/components/AsideBar.vue';
import HeaderBar from '@/components/HeaderBar.vue';

export default {
	name: 'home',
	components: {
		AsideBar,
		HeaderBar
	},
	data() {
		return {
			collapse: false
		};
	},
	computed: {
		routes() {
			return this.$store.state.routes;
		}
	},
	methods: {
		changeCollapse() {
			this.collapse = !this.collapse;
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
  .el-aside {
    width: 225px !important;
  }
  .right {
    margin: 20px 10px;
  }
	.collapse {
		width: 60px !important;
	}
}
</style>
