<template>
    <g :transform=transformStyle>
        <path d="M 5 10 h 35"></path>
        <path d="M 35 15 l -25 25 m 0 -25 l 25 25 m 2.5 -12.5 h -30 m 15 -14 v 30"></path>
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