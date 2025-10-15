<template>
    <g :transform=transformStyle>
        <path d="M 5 10 h 35 m 0 -5 h -35 v 10 m 5 0 v -10"></path>
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