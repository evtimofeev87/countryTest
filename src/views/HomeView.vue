<script setup>
import { ref } from 'vue'
import { useIpsStore } from '@/stores/ips.js'
import { useRouter } from "vue-router";

const ipsString = ref('');

const store = useIpsStore()
const router = useRouter();
const send = () => {
    const ips = ipsString.value.trim().split((/\n| /)).map(ip => ip.trim());
    store.loadIpsData(ips)
    router.push({name: 'results'})
}
</script>

<template>
    <div>
        <el-input
            class="text-area"
            v-model="ipsString"
            :rows="5"
            type="textarea"
            placeholder="Введите IP адреса"
            resize="none"
        />

        <el-button class="send-button" @click="send">Отправить</el-button>
    </div>
</template>

<style scoped>

.text-area {
    width: 620px;
    display: block;
}

.send-button {
    margin-top: 20px;
}
</style>
