<script setup>
import Success from "@/components/icons/Success.vue";
import Fail from "@/components/icons/Fail.vue";
import Loading from "@/components/icons/Loading.vue";
import {computed} from "vue";

const props = defineProps({
    status: String
})

const currentComponent = computed(() => {
    switch (props.status) {
        case 'loading':
            return Loading
        case 'success':
            return Success
        case 'fail':
        default:
            return Fail
    }
})

const currentTooltip = computed(() => {
    switch (props.status) {
        case 'loading':
            return 'В процессе'
        case 'success':
            return 'Успешно'
        case 'fail':
        default:
            return 'Не успешно'
    }
})

const currentBackgroundColor = computed(() => {
    switch (props.status) {
        case 'loading':
            return '#F8F3E8'
        case 'success':
            return '#E9F8E8'
        case 'fail':
        default:
            return '#F8E8E8'
    }
})
</script>

<template>
<el-tooltip
    class="box-item"
    effect="light"
    :content="currentTooltip"
    placement="top"
>
    <div class="wrapper">

        <component :is="currentComponent"></component>

    </div>
</el-tooltip>
</template>

<style scoped>
.wrapper {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 -10px;
}

.wrapper:hover {
    background: v-bind(currentBackgroundColor);
}
</style>
