<template>
    <g :transform=transformStyle>
        <path d="M 10 15 l -5 -5 h 35"></path>
        <!--<path d="M 5 10 l 5 5"></path>-->
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