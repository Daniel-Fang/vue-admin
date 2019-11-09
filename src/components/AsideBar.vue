<template>
	<el-menu router>
		<el-submenu v-for="(route, index1) in routes" :key="index1" index="1">
			<!-- <template v-if="route.meta.asidebar"> -->
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>{{ route.name }}</span>
				</template>
				<template v-if="route.children">
					<el-menu-item index="1-1" v-for="(child, index2) in route.children" :key="index2" :route="child.path">{{ child.name }}</el-menu-item>
				</template>
			<!-- </template> -->
		</el-submenu>
	</el-menu>
</template>

<script>
export default {
	name: 'aside-bar',
	props: {
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

<style scoped></style>
