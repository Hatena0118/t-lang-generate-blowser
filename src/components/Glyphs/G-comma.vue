<template>
    <g :transform=transformStyle>
        <path d="M 0 10 h 40"></path>
        <circle cx="20" cy="25" r="2" fill="black" ></circle>
        <circle cx="20" cy="45" r="2" fill="black" ></circle>
    </g>
</template>
<script setup lang="ts">
import { computed } from 'vue';

let prop = defineProps<{shiftX:number}>()
let transformStyle = computed(()=>
{
    return "translate("+(prop.shiftX * 40) + ")"
})
</script>