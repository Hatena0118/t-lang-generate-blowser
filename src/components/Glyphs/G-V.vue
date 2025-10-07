<template>
    <g :transform=transformStyle>
        <path d="M 0 10 h 40 m -20 0 v 40"></path>
        <path d="M 0 10 m 20 32 l -18 -13 m 18 0 l -18 -13"></path>
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