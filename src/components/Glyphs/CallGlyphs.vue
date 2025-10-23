<template>
    <component v-for="token of componentName" :is="token.c" :shift-x="token.x" :shift-y="token.y"/>
</template>
<script setup lang="ts">
import { computed, type Component, type ComputedRef } from 'vue';
import * as Glyphs from ".";
import type { ConsonantOut, DisplayToken, GlyphOut, MarkOut, NumberOnesOut, VowelOut, UniqueOut, NumberTensOut, SpecialVowelOut} from '../lib/models';


let prop = defineProps<{token :DisplayToken}>()
const VowelconversionTable : Record<Exclude<VowelOut["value"], 'GlyphA'>, Component> = {
    'GlyphI': Glyphs.GlyphI,
    'GlyphU': Glyphs.GlyphU,
    'GlyphE': Glyphs.GlyphE,
    'GlyphO': Glyphs.GlyphO,
}

const SpecialVowelconversionTable : Record<SpecialVowelOut["value"], Component> = {
    'GlyphumlautA': Glyphs.GlyphumlautA,
    'GlyphumlautO': Glyphs.GlyphumlautO,
    'GlyphumlautU': Glyphs.GlyphumlautU,
}

const ConsonantConversionTable : Record<ConsonantOut["value"],Component>= {
    'GlyphB': Glyphs.GlyphB,
    'GlyphcedillaC': Glyphs.GlyphcedillaC,
    'GlyphD': Glyphs.GlyphD,
    'GlyphF': Glyphs.GlyphF,
    'GlyphG': Glyphs.GlyphG,
    'GlyphH': Glyphs.GlyphH,
    'GlyphJ': Glyphs.GlyphJ,
    'GlyphK': Glyphs.GlyphK,
    'GlyphL': Glyphs.GlyphL,
    'GlyphM': Glyphs.GlyphM,
    'GlyphN': Glyphs.GlyphN,
    'GlyphP': Glyphs.GlyphP,
    'GlyphQ': Glyphs.GlyphQ,
    'GlyphR': Glyphs.GlyphR,
    'GlyphS': Glyphs.GlyphS,
    'GlyphcedillaS': Glyphs.GlyphcedillaS,
    'GlyphT': Glyphs.GlyphT,
    'GlyphV': Glyphs.GlyphV,
    'GlyphY': Glyphs.GlyphY,
    'GlyphZ': Glyphs.GlyphZ,
    'Glyphzeroconsonant': Glyphs.Glyphzeroconsonant,
}
const MarkConversionTable : Record<Exclude<MarkOut["value"],'EndOfLine'|'Space'>,Component>= {
    'Glyphcomma': Glyphs.Glyphcomma,
    'Glyphquestion': Glyphs.Glyphquestion,
    'Glyphlongdash': Glyphs.Glyphlongdash,
}
const NumberOnesConversionTable : Record<NumberOnesOut["value"],Component>= {
    'Num0': Glyphs.Num0,
    'Num1': Glyphs.Num1,
    'Num2': Glyphs.Num2,
    'Num3': Glyphs.Num3,
    'Num4': Glyphs.Num4,
    'Num5': Glyphs.Num5,
    'Num6': Glyphs.Num6,
    'Num7': Glyphs.Num7,
    'Num8': Glyphs.Num8,
    'Num9': Glyphs.Num9,
}
const NumberTensConversionTable : Record<NumberTensOut["value"],Component>= {
    'Num10': Glyphs.Num10,
    'Num20': Glyphs.Num20,
    'Num30': Glyphs.Num30,
    'Num40': Glyphs.Num40,
    'Num50': Glyphs.Num50,
    'Num60': Glyphs.Num60,
    'Num70': Glyphs.Num70,
    'Num80': Glyphs.Num80,
    'Num90': Glyphs.Num90,
}

const UniqueConversionTable : Record<UniqueOut["value"],Component>= {
    'GlyphN:': Glyphs.GlyphN
}

const ConversionTable : Record<Exclude<GlyphOut["value"], 'GlyphA'| 'EndOfLine'|'Space'>, Component> = {
    ...VowelconversionTable,
    ...SpecialVowelconversionTable,
    ...ConsonantConversionTable,
    ...MarkConversionTable,
    ...NumberOnesConversionTable,
    ...NumberTensConversionTable,
    ...UniqueConversionTable,
}

let toComponent = (token : DisplayToken) : Component[]=>{
    switch(token.Glyph.kind){
        case "Phoneme":return [ConsonantConversionTable[token.Glyph.idC.value], VowelconversionTable[token.Glyph.idV.value as Exclude<VowelOut["value"], 'GlyphA'>]]
        case "Unique":
            if(token.Glyph.id.kind==='SpecialVowel'){
            return [SpecialVowelconversionTable[token.Glyph.id.value as SpecialVowelOut["value"]]];}
            else{return [UniqueConversionTable[token.Glyph.id.value]];}
        case "Number": 
            if(token.Glyph.idTens){return [NumberTensConversionTable[token.Glyph.idTens.value],NumberOnesConversionTable[token.Glyph.idOnes.value]]}
            else{return [NumberOnesConversionTable[token.Glyph.idOnes.value]]}
        case "Mark": return [MarkConversionTable[token.Glyph.value as Exclude<MarkOut["value"],'EndOfLine'|'Space'>]]
    }
}

interface GlyphWithPosition{
    c:Component,
    x:number,
    y:number,
}
let componentName :ComputedRef<GlyphWithPosition[]> = computed(()=>{
    return toComponent(prop.token).map<GlyphWithPosition>(c=>({c:c,x:prop.token.column,y:prop.token.row}))
})

</script>