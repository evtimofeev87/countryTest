import { defineStore } from 'pinia'
import { ref } from "vue";
import { uid } from 'uid';
import { ElNotification } from 'element-plus';

export const useIpsStore = defineStore('ips', () => {
    const ipsData = ref([])

    const loadIpsData = (ips) => {
        ipsData.value = [];
        ips.forEach(ip => {
            const _uid = uid();
            ipsData.value.push({
                query: ip,
                uid: _uid,
                status: 'loading'
            })
            fetch(`http://ip-api.com/json/${ip}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(1)
                    if (data.status === 'success') {
                        console.log(2)
                        ipsData.value = ipsData.value.map((item) => {
                            if (item.uid === _uid) {
                                return {
                                    ...item,
                                    ...data,
                                    status: 'success'
                                }
                            }
                            return item
                        })
                    } else {
                        console.log(3)
                        ipsData.value = ipsData.value.map((item) => {
                            if (item.uid === _uid) {
                                return {
                                    ...item,
                                    status: 'fail'
                                }
                            }
                            return item
                        })
                    }
                })
                .catch((e) => {
                    ElNotification({
                        message: e.message,
                        type: 'error',
                    })
                })
        })
    }

    return { ipsData, loadIpsData }
})
