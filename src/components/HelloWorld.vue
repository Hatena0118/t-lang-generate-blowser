<template>
  <v-app>
    <v-container class="pa-6">
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Input</v-card-title>
            <v-card-text>
              <v-textarea
                v-model="input"
                label="input alphabets (without c,w and x)"
                rows="6"
                auto-grow
              />
              <v-switch v-model="showGrid" label="show grid" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>output</v-card-title>
            <v-card-text>
              <!-- 表示エリア -->
              <div class="preview">
                <svg>
                  <g v-for="(item, idx) in converted" :key="idx" viewBox="0 0 60 60" class="glyph" style="fill:none;stroke:#000000;stroke-width:3;">
                    <component v-if="item.type === 'glyph'":is="Glyphs[item.id as keyof typeof Glyphs]":shift="item.colomn"/>
                    <component v-if="item.type === 'number'":is="Glyphs[item.id as keyof typeof Glyphs]":shift="item.colomn"/>
                  </g>
                </svg>
                </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as Glyphs from "./Glyphs"
import { id } from 'vuetify/locale'

const input = ref('')
const showGrid = ref(false)


const mapping :Record<string, string|null> = {
  // Vowels
  'a': null,
  'i': 'GlyphI',
  'u': 'GlyphU',
  'e': 'GlyphE',
  'o': 'GlyphO',
  'ö': 'GlyphumlautO',
  'ü': 'GlyphumlautU',
  'ä': 'GlyphumlautA',

  // Consonants
  'b': 'GlyphB',
  'c': null,
  'ç': 'GlyphcedillaC',
  'd': 'GlyphD',
  'f': 'GlyphF',
  'g': 'GlyphG',
  'h': 'GlyphH',
  'j': 'GlyphJ',
  'k': 'GlyphK',
  'l': 'GlyphL',
  'm': 'GlyphM',
  'n': 'GlyphN',
  'p': 'GlyphP',
  'q': 'GlyphQ',
  'r': 'GlyphR',
  's': 'GlyphS',
  'ş': 'GlyphcedillaS',
  't': 'GlyphT',
  'v': 'GlyphV',
  'w': null,
  'x': null,
  'y': 'GlyphY',  
  'z': 'GlyphZ',
  '-': 'Glyphzeroconsonant',

  // number
  '0': null,
  '1': 'Num1',
  '2': 'Num2',
  '3': 'Num3',
  '4': 'Num4',
  '5': 'Num5',
  '6': 'Num6',
  '7': 'Num7',
  '8': 'Num8',
  '9': 'Num9',
  '10': 'Num10',
  '20': 'Num20',
  '30': 'Num30',
  '40': 'Num40',
  '50': 'Num50',
  '60': 'Num60',
  '70': 'Num70',
  '80': 'Num80',
  '90': 'Num90',
}

const conversionvaluelist: Record<string,string> = {
  'ou': 'ö',
  'ui': 'ü',
  'ae': 'ä',
  'ch': 'ç',
  'sh': 'ş'
}

type GlyphItem =
  | { type: "space" , colomn: number}
  | { type: "number", id: string , colomn: number}
  | { type: "glyph", id: string , colomn: number}


function numberToTokenIds(num :number, shift :number): GlyphItem[]
{
  const ret:GlyphItem[] = [];
  let nums = String(num)
  let i = 0, v, sliced :string;

  while(i < nums.length)
  {
    if (i + 2 <= nums.length) {
      sliced = nums.slice(i, i + 2);
      v = parseInt(sliced)
      ret.push({type: "number",id: "Num" + String(Math.floor(v/10)*10),colomn: shift + i});
      ret.push({type: "number",id: "Num" + String(v%10),colomn: shift + i});
      i += 2;
    } else {
      ret.push({type: "number",id: "Num" + nums.slice(i),colomn: shift + i});
      break;
    }
  }
  return ret;

}

function tokenizeToGlyphs(text:string): GlyphItem[]
{
  const vowels = new Set(["GlyphI", "GlyphU", "GlyphE", "GlyphO"]);
  let retarray: GlyphItem[] = []; 
  const Normalizedstr = text.normalize('NFC').toLowerCase().replace(new RegExp(Object.keys(conversionvaluelist).join("|"), "g"), match => conversionvaluelist[match]!);

  let shift = 0;
  for(let c:number = 0; c < Normalizedstr.length;c++)
  {
    if(/\d/.test(Normalizedstr[c]!.toString()))
    {
      let i = c;
      while(i < Normalizedstr.length && /\d/.test(Normalizedstr[i]!.toString()))i++;
      retarray = retarray!.concat(numberToTokenIds(parseInt(Normalizedstr.slice(c,i)), c));
      c = i;
      continue;
    }
    else
    {
      const mapped= mapping[Normalizedstr[c]!];
      if (mapped) {
        if(vowels.has(mapped)){shift = shift - 1; }
        retarray.push({ type: "glyph", id: mapped, colomn: shift});
      } else if (Normalizedstr[c] === ' ') {
        retarray.push({type:"space",colomn: shift});
      } else {
        shift = shift - 1;
      }
    }
    shift++;
  }
  return retarray
}

const converted = computed(() => {
  return tokenizeToGlyphs(input.value)
})

</script>
<style>
.preview {
  display:flex;
  flex-direction: row;
  flex-wrap:wrap;
  gap:0px;
  align-items:start;
}
.glyph {
  border: 1px dashed transparent;
}
</style>