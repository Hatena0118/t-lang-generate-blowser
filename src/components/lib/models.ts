import { ConsonantObj, VowelObj , MarkObj, NumberObj} from "./mapping";
export type VowelList = keyof typeof VowelObj;
export type ConsonantList = keyof typeof ConsonantObj;
export type MarkList = keyof typeof MarkObj;
export type NumberList = keyof typeof NumberObj;

export function isVowelIn(v: string): v is VowelList {
    return v in Object.keys(VowelObj);
}
export function isConsonantIn(v: string): v is ConsonantList {
    return v in Object.keys(ConsonantObj);
}
export function isMarkIn(v: string): v is MarkList {
    return v in Object.keys(MarkObj);
}
export function isNumberIn(v: string): v is NumberList {
    return v in Object.keys(NumberObj);
}

export function isVowelOut(v: string): v is typeof VowelObj[VowelList] {
    return v in Object.values(VowelObj);
}
export function isConsonantOut(v: string): v is typeof ConsonantObj[ConsonantList] {
    return v in Object.values(ConsonantObj);
}
export function isMarkOut(v: string): v is typeof MarkObj[MarkList] {
    return v in Object.values(MarkObj);
}
export function isNumberOut(v: string): v is typeof NumberObj[NumberList] {
    return v in Object.values(NumberObj);
}

export type GlyphKind = 'Vowel'|'Consonant'|'Mark'|'Number'

export type VowelIn = { kind:'Vowel', value:VowelList}
export type ConsonantIn = { kind:'Consonant', value:ConsonantList}
export type MarkIn = { kind:'Mark', value:MarkList}
export type NumberIn = { kind:'Number', value:NumberList}
export type GlyphIn = VowelIn|ConsonantIn|MarkIn|NumberIn

export type VowelOut = {kind:'Vowel', value:typeof VowelObj[VowelList]}
export type ConsonantOut ={kind:'Consonant', value:typeof ConsonantObj[ConsonantList]}
export type MarkOut = {kind:'Mark', value:typeof MarkObj[MarkList]}
export type NumberOut =  {kind:'Number', value:typeof NumberObj[NumberList]}
export type GlyphOut = VowelOut|ConsonantOut|MarkOut|NumberOut

export type Phoneme = {kind:'Phoneme', idC:ConsonantOut, idV:VowelOut};
export type ConversionNumber = {kind:'Number', idTens:NumberOut, idOnes:NumberOut};

export type Token = Phoneme|ConversionNumber|MarkOut
export type DisplayToken = {Glyph :Token, row : number, column:number};

export type InputConversion = 'ou'|'ui'|'ae'|'ch'|'sh'