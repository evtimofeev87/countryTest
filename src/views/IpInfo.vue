<script setup>
import { useIpsStore } from "@/stores/ips.js";
import {ref} from "vue";

const props = defineProps({
    ip: String
})

const store = useIpsStore();

const ipDataItem = ref(store.ipsData.find( item => item.query === props.ip) || {});
</script>

<template>
    <div>
        <p class="property"><span class="property-name">as: </span> {{ ipDataItem.as }}</p>
        <p class="property"><span class="property-name">city: </span>{{ ipDataItem.city }}</p>
        <p class="property"><span class="property-name">country: </span> {{ ipDataItem.country }}</p>
        <p class="property"><span class="property-name">countryCode: </span> {{ ipDataItem.countryCode }}</p>
        <p class="property"><span class="property-name">isp: </span> {{ ipDataItem.isp }}</p>
        <p class="property"><span class="property-name">lat: </span> {{ ipDataItem.lat }}</p>
        <p class="property"><span class="property-name">lon: </span> {{ ipDataItem.lon }}</p>
        <p class="property"><span class="property-name">org: </span> {{ ipDataItem.org }}</p>
        <p class="property"><span class="property-name">query: </span> {{ ipDataItem.query }}</p>
        <p class="property"><span class="property-name">region: </span> {{ ipDataItem.region }}</p>
        <p class="property"><span class="property-name">regionName: </span> {{ ipDataItem.regionName }}</p>
        <p class="property"><span class="property-name">status: </span> {{ ipDataItem.status }}</p>
        <p class="property"><span class="property-name">timezone: </span> {{ ipDataItem.timezone }}</p>
        <p class="property"><span class="property-name">zip: </span> {{ ipDataItem.zip }}</p>
    </div>
</template>

<style scoped>
.property{
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #494949;
}

.property-name {
    font-weight: 600;
}
</style>
