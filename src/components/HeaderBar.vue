<template>
	<el-breadcrumb>
		<el-breadcrumb-item>首页</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
export default {
    name: 'header-bar',
    computed: {
        route() {
            console.log(this.$route)
            return ''
        }
    }
};
</script>

<style scoped></style>
