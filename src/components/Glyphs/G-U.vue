<template>
    <g :transform=transformStyle>
        <path d="M 30 10 v 7 c 0,5 6,5 6,-1"></path>
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