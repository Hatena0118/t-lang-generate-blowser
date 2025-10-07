<template>
    <g :transform=transformStyle>
        <path d="M 10 15 l -5 -5 h 35 m 0 -5 h -35"></path>
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