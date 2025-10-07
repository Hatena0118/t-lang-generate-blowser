<template>
    <g :transform=transformStyle>
        <path d="M 0 10 h 40 m -38 0 l 18 20 v 20"></path>
        <circle cx="20" cy="30" r="13"></circle>
        <path d="M 0 50 h 40"></path>
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