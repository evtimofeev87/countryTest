<script setup>
import IpsTable from "@/components/IpsTable.vue";
import Search from "@/components/icons/Search.vue";
import { useIpsStore } from "@/stores/ips.js";
import { computed, ref } from "vue";
import { debounce } from "@/utils/common.js";

const store = useIpsStore();

const searchString = ref('')
const debouncedSearchString = ref('')

const tableData = computed(() => {
    return store.ipsData.map((dataItem) => ({
        ip: dataItem.query,
        uid: dataItem.uid,
        status: dataItem.status,
        country: dataItem.country || '',
        city: dataItem.city || '',
        countryCode: dataItem.countryCode || '',
    }));
})

const filteredData = computed(() => {
    if (!debouncedSearchString.value) return tableData.value
    return tableData.value.filter(dataItem => {
        const ds = debouncedSearchString.value;
        return dataItem.ip.includes(ds) || dataItem.country.includes(ds) || dataItem.city.includes(ds)
    })
})

const search = (searchString) => debouncedSearchString.value = searchString;
const debouncedSearch = debounce(search,500)

const deleteSelected = (selectedIdsSet) => {
    store.ipsData = store.ipsData.filter( item => {
        return !selectedIdsSet.has(item.uid)
    })
}

const sort = (sortingMode) => {
    store.ipsData.sort((a,b) => {
        const mode = sortingMode === 'AZ' ? 1 : -1;
        if (a.country > b.country) {
            return mode
        }
        if (a.country < b.country) {
            return -mode
        }
        return 0;
    })
}
</script>

<template>
    <div>
        <el-input
            v-model="searchString"
            class="search-input"
            placeholder="Поиск по таблице..."
            @input="debouncedSearch"
        >
            <template #prefix>
                <Search/>
            </template>
        </el-input>
        <IpsTable
            :data="filteredData"
            class="table"
            @delete-selected="deleteSelected"
            @sort="sort"
        />
    </div>
</template>

<style scoped>
.search-input {
    width: 620px;
}

.table {
    margin-top: 20px;
}
</style>
