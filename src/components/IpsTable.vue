<script setup>
import Copy from "@/components/icons/Copy.vue";
import Basket from "@/components/icons/Basket.vue";
import Status from "@/components/Status.vue";
import { ElNotification } from 'element-plus'
import {computed, ref} from "vue";
import { useRouter } from "vue-router";

import "/node_modules/flag-icons/css/flag-icons.min.css";

const props = defineProps({
    data: Array
});

const emit = defineEmits([
    'delete-selected',
    'sort'
])

const copy = (text) => {
    navigator.clipboard.writeText(text).then(
        () => {
            ElNotification({
                message: 'ip успешно скопировано',
                type: 'success',
            })
        },
    );
}

const selectedIdsSet = ref(new Set())
const oneSelectedRowUid = computed(() => {
    if (selectedIdsSet.value.size !== 1) {
        return null
    }
    return Array.from(selectedIdsSet.value)[0]
})
const selectionChange = (selectedRows) => {
    selectedIdsSet.value = new Set(selectedRows.map(row => row.uid))
}

const deleteSelected = () => {
    emit('delete-selected', selectedIdsSet.value)
}

const sortingMode = ref(null)
const sortingOptions = [
    {
        value: 'AZ',
        label: 'A-Z',
    },
    {
        value: 'ZA',
        label: 'Z-A',
    }
]
const sort = (val) => {
    emit('sort', val);
}

const router = useRouter();
const goToInfo = (ip) => {
    router.push({name: 'info', params: {ip}})
}
</script>

<template>
    <el-table :data="props.data" height="336" style="width: 100%" border @selection-change="selectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column>
            <template #header>
                <div style="display: flex; justify-content: space-between; align-items: center" >
                    <div>IP</div>
                    <el-button size="small" style="display: inline-block" v-if="selectedIdsSet.size > 1" @click="deleteSelected">Удалить выбранные</el-button>
                </div>
            </template>
            <template #default="scope">
                <div style="display: flex; justify-content: space-between; align-items: center" >
                    <div>
                        <span :class="[`fi fi-${scope.row.countryCode.toLowerCase()}`]"></span>
                        <span class="ip" @click="goToInfo(scope.row.ip)">{{ scope.row.ip }}</span>
                    </div>

                    <div style="margin-left: auto">
                        <Copy class="icon copy-icon" style="margin-left: 8px"  @click="copy(scope.row.ip)"/>
                        <Basket
                            class="icon"
                            v-if="oneSelectedRowUid === scope.row.uid"
                            style="margin-left: 8px"
                            @click="deleteSelected"
                        />
                    </div>

                </div>
            </template>
        </el-table-column>
        <el-table-column>
            <template #header>
                <div style="display: flex; justify-content: space-between; align-items: center" >
                    <span>Country</span>
                    <div>
                        <el-select
                            v-model="sortingMode"
                            placeholder="Сортировка"
                            size="small"
                            style="width: 120px"
                            @change="sort"
                        >
                            <el-option
                                v-for="item in sortingOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </div>
                </div>
            </template>
            <template #default="scope">
                <span>{{scope.row.country}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="city" label="City/Town" />
        <el-table-column :width="48" class-name="status-column">
            <template #default="scope">
                <Status :status="scope.row.status"/>
            </template>
        </el-table-column>
    </el-table>
</template>

<style>
.icon {
    cursor: pointer;
}

.el-table__cell .copy-icon {
    display: none;
}

.el-table__cell:hover .copy-icon {
    display: inline;
}

.status-column{
    padding: 0 !important;
}

.ip {
    margin-left: 8px;
    cursor: pointer
}

.ip:hover {
    color: cornflowerblue;
}
</style>
