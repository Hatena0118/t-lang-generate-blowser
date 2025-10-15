<template>
    <g :transform=transformStyle>
        <circle cx="35" cy="4" r="2" fill="black" ></circle>
    </g>
</template>
<script setup lang="ts">
import { computed } from 'vue';

let prop = defineProps<{shiftX:number,shiftY:number}>()
let transformStyle = computed(()=>
{
    return `translate(${(prop.shiftX * 40)} ${(prop.shiftY * 50)})`
})
</script>