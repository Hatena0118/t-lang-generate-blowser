import {type Token, type ConsonantIn, type VowelIn, type MarkIn, type ConsonantOut, type VowelOut, type NumberIn, type NumberOnesOut, type GlyphOut, type GlyphIn, isVowelIn, isConsonantIn, isMarkIn, isNumberIn, isUniqueIn} from "./models";
import { ConsonantObj, conversionvaluelist, MarkObj, NumberOnesObj, VowelObj, UniqueObj, ConversionNumberList} from "./mapping";

export function ToGlyphIn(v: string): GlyphIn {
    if (isVowelIn(v)) {
        return { kind: 'Vowel', value: v };
    }
    else if (isConsonantIn(v)) {
        return { kind: 'Consonant', value: v };
    }
    else if (isUniqueIn(v)) {
        return { kind:'Unique', value:v };
    }
    else if (isMarkIn(v)) {
        return { kind: 'Mark', value: v };
    }
    else if (isNumberIn(v)) {
        return { kind: 'Number', value: v };
    }
    return new Error("Invalid input" + v) as never;
}

export function parseInput(input: string): GlyphOut[] {
    const Normalizedinp = input.normalize('NFC').toLowerCase().replace(new RegExp(Object.keys(conversionvaluelist).join("|"), "g"), match => conversionvaluelist[match]!);

    let glyphIns = Normalizedinp.split('').map(
        v => {var g = ToGlyphIn(v); {if (g instanceof Error) { throw g; } return g; }});

    let ret: GlyphOut[] = glyphIns.map(v=>{
        switch(v.kind) {
            case 'Vowel': return {kind:'Vowel' ,value:VowelObj[v.value]};
            case 'Consonant': return {kind:'Consonant' ,value:ConsonantObj[v.value]};
            case 'Unique': return {kind:'Unique' ,value:UniqueObj[v.value]};
            case 'Mark': return {kind:'Mark' ,value:MarkObj[v.value]};
            case 'Number': return {kind:'Number' ,value:NumberOnesObj[v.value]};
        }});
    return ret;
}
export function Tokenize(glyphouts: GlyphOut[]): Token[] {
    let ret: Token[] = [];
    for (let i = 0; i < glyphouts.length; i++) {
        const glyphfirst = glyphouts[i];
        const glyphsecond = glyphouts[i+1];
        switch(glyphfirst!.kind)
        {
            case 'Consonant':
                if(glyphsecond?.kind==='Vowel'){
                    const GlyphToken :Token = {kind:'Phoneme', idC: glyphfirst! ,idV: glyphsecond };
                    ret.push(GlyphToken);
                    break;
                }
                throw new Error("Invalid input: Consonant must be followed by Vowel");
            case 'Unique':
                const UniqueToken :Token = {kind:'Unique', id: glyphfirst! };
                ret.push(UniqueToken);
                break;
            case 'Mark':
                ret.push(glyphfirst!);
                break;
            case 'Number':
                if(glyphsecond?.kind==='Number' && glyphfirst!.value !=='Num0'){
                    const GlyphToken :Token = {kind:'Number', idTens: {kind:'Number' ,value:ConversionNumberList[glyphfirst!.value]} ,idOnes: glyphsecond};
                    ret.push(GlyphToken);
                    i++;
                    break;
                }
                else{
                    const GlyphToken :Token = {kind:'Number', idOnes: glyphfirst!};
                    ret.push(GlyphToken);
                    break;
                }
                
        }
    }
    return ret;
}