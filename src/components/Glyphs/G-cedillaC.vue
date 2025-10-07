<template>
    <g :transform=transformStyle>
        <path d="M 0 10 h 40 m -20 0 l -18 12 l 18 28"></path>
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