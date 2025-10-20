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
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>output</v-card-title>
            <v-card-text>
              <div class="preview">
                <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 382 172"preserveAspectRatio="xMinYMin meet"style="fill:none;stroke:#000000;stroke-width:3; width:100%; height:194px;">
                  <CallGlyphs v-for="(token, index) in converted" :key="index" :token="token"/>
                </svg>
                </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4" rounded="xl" elevation="3">
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6">
                <div>
                  <h3>explanation</h3>
                  <p>
                    This page provides a function that converts  my original language(hereinafter, ”T-lang”) from Latin characters.
                    However, T-lang does not natively use Latin characters, so I recommend using the image for reference when inputting text.
                  </p>
                  <h4>input explanation</h4>
                  <p>
                    This writing system is an abugida, possessing several characteristics, but the most distinctive is that all letters have a horizontal line drawn above them, and letters written like the Devanagari “shiroreka” are written connected. As a rule, when only consonant letters are written, the inherent vowel A is implicitly assumed. When the vowel differs from A, an appropriate diacritic indicating the substitute vowel sound is added.
                    In cases where a syllable consists solely of a vowel, a “zero consonant” (represented by “-”) is used in writing. Under these grammatical rules, all vowels are entered as marks attached to the preceding consonant.
                    The numerical notation system has two primary characteristics. First, when writing numbers, the horizontal line at the top of the characters is cut off to make the digits more clearly visible. Second, the system employs a method that enables counting up to 99 within a single character space.
                    Although this language uses a decimal (base-10) system, when expressing two-digit numbers, an additional notation corresponding to the tens place (10-90) is written in relation to the horizontal stroke on top of the character to represent the second digit.
                    The above outlines the basic notation rules of T-lang. Since this converter operates in accordance with these conventions, please take care with both pronunciation and input procedures.
                  </p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <img src="/src/T-Lang-without-guideLine.png" alt="sample image" style="width:100%;border-radius:16px;">
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { parseInput, Tokenize } from './lib/parser'
import { DrawGlyphs } from './lib/drawing'
import CallGlyphs from './Glyphs/CallGlyphs.vue'

const input = ref('')
const converted = computed(() => {
  try{
    return DrawGlyphs(Tokenize(parseInput(input.value)));
  } 
  catch(e){
    console.error(e);
    return [];
  }
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