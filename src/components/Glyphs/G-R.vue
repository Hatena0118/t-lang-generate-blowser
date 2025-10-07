<template>
    <g :transform=transformStyle>
        <path d="M0 10 h 40"></path>
        <path d="M 0 10 m 8 10 h 18 v 15 h -18 v -15"></path>
    </g>
</template>
<script setup lang="ts">
import { computed } from 'vue';

let prop = defineProps<{shift:number}>()
let transformStyle = computed(()=>
{
    return "translate("+(prop.shift * 40) + ")"
})
</script>