<template>
	<el-menu background-color="#545c64" text-color="#fff" active-text-color="#409EFF" unique-opened class="i-meun" :collapse="collapse" router>
		<div v-for="(routeItem, index1) in routes" :key="index1">
			<el-submenu :index="index1+''" v-if="routeItem.children">
				<template slot="title">
					<i :class="routeItem.meta.icon"></i>
					<span style="margin-left:  30px">{{ routeItem.name }}</span>
				</template>
				<el-menu-item :index="index1+'-'+index2" v-for="(child, index2) in routeItem.children" :key="index2" :route="{name: child.name}">{{ child.name }}</el-menu-item>
			</el-submenu>
		</div>
	</el-menu>
</template>

<script>
export default {
	name: 'aside-bar',
	props: {
		collapse: {
			type: Boolean,
			default: false
		},
		routes: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	created() {
		console.log(this.routes);
	}
};
</script>

<style lang="scss" scoped>
.i-meun {
	height: 100vh;
}
</style>
