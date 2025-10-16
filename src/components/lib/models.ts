import { ConsonantObj, VowelObj, SpecialVowelObj, MarkObj, NumberOnesObj, UniqueObj, NumberTensObj} from "./mapping";
export type VowelList = keyof typeof VowelObj;
export type SpecialVowelList = keyof typeof SpecialVowelObj;
export type ConsonantList = keyof typeof ConsonantObj;
export type UniqueList = keyof typeof UniqueObj;
export type MarkList = keyof typeof MarkObj;
export type NumberOnesList = keyof typeof NumberOnesObj;
export type NumberTensList = keyof typeof NumberTensObj;

export function isVowelIn(v: string): v is VowelList {
    return Object.keys(VowelObj).includes(v);
}
export function isSpecialVowelIn(v: string): v is SpecialVowelList {
    return Object.keys(SpecialVowelObj).includes(v);
}
export function isConsonantIn(v: string): v is ConsonantList {
    console.log([v,Object.keys(ConsonantObj).includes(v),v,Object.keys(ConsonantObj)]);
    return Object.keys(ConsonantObj).includes(v);
}
export function isUniqueIn(v: string): v is UniqueList {
    return Object.keys(UniqueObj).includes(v);
}
export function isMarkIn(v: string): v is MarkList {
    return Object.keys(MarkObj).includes(v);
}
export function isNumberIn(v: string): v is NumberOnesList {
    return Object.keys(NumberOnesObj).includes(v);
}

export type GlyphKind = 'Vowel'|'SpecialVowel'|'Consonant'|'Unique'|'Mark'|'Number'

export type VowelIn = { kind:'Vowel', value:VowelList}
export type SpecialVowelIn = { kind:'SpecialVowel', value:SpecialVowelList}
export type ConsonantIn = { kind:'Consonant', value:ConsonantList}
export type UniqueIn = { kind:'Unique', value:UniqueList}
export type MarkIn = { kind:'Mark', value:MarkList}
export type NumberIn = { kind:'Number', value:NumberOnesList}
export type GlyphIn = VowelIn|SpecialVowelIn|ConsonantIn|UniqueIn|MarkIn|NumberIn

export type VowelOut = {kind:'Vowel', value:typeof VowelObj[VowelList]}
export type SpecialVowelOut = {kind:'SpecialVowel', value:typeof SpecialVowelObj[SpecialVowelList]}
export type ConsonantOut ={kind:'Consonant', value:typeof ConsonantObj[ConsonantList]}
export type UniqueOut = {kind:'Unique', value:typeof UniqueObj[UniqueList]}
export type MarkOut = {kind:'Mark', value:typeof MarkObj[MarkList]}
export type NumberOnesOut =  {kind:'Number', value:typeof NumberOnesObj[NumberOnesList]}
export type NumberTensOut =  {kind:'Number', value:typeof NumberTensObj[NumberTensList]}
export type GlyphOut = VowelOut|SpecialVowelOut|ConsonantOut|UniqueOut|MarkOut|NumberOnesOut

export type Phoneme = {kind:'Phoneme', idC:ConsonantOut, idV:VowelOut};
export type UniquePhoneme = {kind:'Unique', id:UniqueOut|SpecialVowelOut};
export type ConversionNumber = {kind:'Number', idTens?:NumberTensOut, idOnes:NumberOnesOut};

export type Token = Phoneme|UniquePhoneme|ConversionNumber|MarkOut
export type DisplayToken = {Glyph :Token, row : number, column:number};

export type InputConversion = 'ou'|'ui'|'ae'|'ch'|'sh'|'nn'