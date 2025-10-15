<template>
    <g :transform=transformStyle>
        <path d="M 0 10 h 40 m -30 0 v 40 m 10 -40 v 40"></path>
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