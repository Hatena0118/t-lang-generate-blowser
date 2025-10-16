export const VowelObj = {
  'a': 'GlyphA',
  'i': 'GlyphI',
  'u': 'GlyphU',
  'e': 'GlyphE',
  'o': 'GlyphO',
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
} as const;

export const NumberObj = {
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

  'ö': 'GlyphumlautO',
  'ü': 'GlyphumlautU',
  'ä': 'GlyphumlautA',
  'ŋ': 'GlyphN:'

} as const;

export const conversionvaluelist: Record<string,string> = {
  'ou': 'ö',
  'ui': 'ü',
  'ae': 'ä',
  'ch': 'ç',
  'sh': 'ş',
  'nn': 'ŋ'
}