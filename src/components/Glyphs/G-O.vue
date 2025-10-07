<template>
    <g :transform=transformStyle>
        <circle cx="40" cy="45" r="3" fill="transparent"></circle>
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