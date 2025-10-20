import type { NumberOnesOut, NumberTensOut } from "./models";

export const VowelObj = {
  'a': 'GlyphA',
  'i': 'GlyphI',
  'u': 'GlyphU',
  'e': 'GlyphE',
  'o': 'GlyphO',
} as const;

export const SpecialVowelObj = {
  'ö': 'GlyphumlautO',
  'ü': 'GlyphumlautU',
  'ä': 'GlyphumlautA',
} as const;

export const ConsonantObj = {
  'b': 'GlyphB',
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
  'y': 'GlyphY',  
  'z': 'GlyphZ',
  '-': 'Glyphzeroconsonant'
} as const;

export  const MarkObj  = {
  ',': 'Glyphcomma',
  '?': 'Glyphquestion',
  '~': 'Glyphlongdash',
  '/n': 'EndOfLine'
} as const;

export const NumberOnesObj = {
  '0': 'Num0',
  '1': 'Num1',
  '2': 'Num2',
  '3': 'Num3',
  '4': 'Num4',
  '5': 'Num5',
  '6': 'Num6',
  '7': 'Num7',
  '8': 'Num8',
  '9': 'Num9',
} as const;

export const NumberTensObj = {
  '10': 'Num10',
  '20': 'Num20',
  '30': 'Num30',
  '40': 'Num40',
  '50': 'Num50',
  '60': 'Num60',
  '70': 'Num70',
  '80': 'Num80',
  '90': 'Num90',
} as const;

export const UniqueObj = {
  'ŋ': 'GlyphN:'
} as const;

export const conversionvaluelist: Record<string,string> = {
  'ou': 'ö',
  'ui': 'ü',
  'ae': 'ä',
  'ch': 'ç',
  'sh': 'ş',
  'nn': 'ŋ',
}

export const ConversionNumberList: Record<Exclude<NumberOnesOut["value"],'Num0'>, NumberTensOut["value"]> = {
'Num1':'Num10',
'Num2':'Num20',
'Num3':'Num30',
'Num4':'Num40',
'Num5':'Num50',
'Num6':'Num60',
'Num7':'Num70',
'Num8':'Num80',
'Num9':'Num90',
}