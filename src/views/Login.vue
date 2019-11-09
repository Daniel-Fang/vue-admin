<template>
    <el-form class="form">
        <h1 class="title">Login</h1>
        <el-input type="text" placeholder="username" class="username" v-model="userInfo.username" prefix-icon="el-icon-user" autofocus></el-input>
        <el-input type="password" placeholder="password" class="password" v-model="userInfo.password" prefix-icon="el-icon-lock" show-password></el-input>
        <el-button type="primary" class="submit" @click="login">Login</el-button>
    </el-form>
</template>

<script>

export default {
    name: 'login',
    data() {
        return {
            userInfo: {
                username: 'fang',
                password: '123456'
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', this.userInfo).then((res) => {
                this.$router.push('/');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    width: 25%;
    margin: 100px auto;
    text-align: center;
    .username {
        margin-bottom: 10px;
    }
    .password {
        margin-bottom: 10px;
    }
    .submit {
        width: 100%;
    }
}
</style>
