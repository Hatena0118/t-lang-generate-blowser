<template>
    <g :transform=transformStyle>
        <path d="M 0 10 h 40 m -20 0 v 40"></path>
        <path d="M 20 20 c -9,0 -15,5 -15,15 c 0,5 3.5,12 15,13.5"></path>
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