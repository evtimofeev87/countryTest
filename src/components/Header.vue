<script setup>
import {RouterLink} from "vue-router";
import Search from "@/components/icons/Search.vue";
</script>

<template>
<header>
    <nav>
        <RouterLink to="/" class="logo">IP-PN.COM</RouterLink>
        <el-input v-model="input" style="width: 460px; height: 48px" placeholder="95.213.138.174" >
            <template #prefix>
                <Search/>
            </template>
        </el-input>
        <div class="right">
            <RouterLink to="/about" class="nav-item">Documentation</RouterLink>
            <RouterLink to="/about" class="nav-item">Contacts</RouterLink>
            <RouterLink to="/about" class="nav-item bold">Log in</RouterLink>
        </div>
    </nav>
</header>
</template>

<style scoped>
header {
    width: 100vw;
    height: 100px;
    background: #F2F0F0;
    padding: 26px 100px;
}

nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

nav > .right {
    display: flex;
    align-items: center;
}

.logo {
    font-family: Poppins;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    text-align: left;
    color: #0E2E3B;
    display: block;
    width: 228px;
}

.nav-item {
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: #494949;
    display: block;
    margin-left: 32px;
}

.nav-item.bold {
    font-weight: 600;
    color: #0E2E3B;
}
</style>
