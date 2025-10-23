import { type Token, type GlyphOut, type GlyphIn, isVowelIn, isConsonantIn, isMarkIn, isNumberIn, isUniqueIn, isSpecialVowelIn, } from "./models";
import { ConsonantObj, conversionvaluelist, MarkObj, NumberOnesObj, VowelObj, UniqueObj, ConversionNumberList, SpecialVowelObj } from "./mapping";

export function ToGlyphIn(v: string): GlyphIn {
    if (isVowelIn(v)) {
        return { kind: 'Vowel', value: v };
    }
    else if (isSpecialVowelIn(v)) {
        return { kind: 'SpecialVowel', value: v };
    }
    else if (isConsonantIn(v)) {
        return { kind: 'Consonant', value: v };
    }
    else if (isUniqueIn(v)) {
        return { kind: 'Unique', value: v };
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
    const preprocessed = input.replace(/\/n/g, '\n');
    const Normalizedinp = preprocessed.normalize('NFC').toLowerCase().replace(new RegExp(Object.keys(conversionvaluelist).join("|"), "g"), match => conversionvaluelist[match]!);
    let glyphIns: GlyphIn[] = [];
    for (let i = 0; i < Normalizedinp.length; i++) {
        const ch = Normalizedinp[i];
        if (ch === '\r' && Normalizedinp[i + 1] === '\n') {
            glyphIns.push({ kind: 'Mark', value: '/n' });
            i++;
            continue;
        }
        // LF
        else if (ch === '\n') {
            glyphIns.push({ kind: 'Mark', value: '/n' });
            continue;
        }
        const g = ToGlyphIn(ch!);
        if (g instanceof Error) {throw g;}
        glyphIns.push(g);
    }

    let ret: GlyphOut[] = glyphIns.map(v => {
        switch (v.kind) {
            case 'Vowel': return { kind: 'Vowel', value: VowelObj[v.value] };
            case 'SpecialVowel': return { kind: 'SpecialVowel', value: SpecialVowelObj[v.value] };
            case 'Consonant': return { kind: 'Consonant', value: ConsonantObj[v.value] };
            case 'Unique': return { kind: 'Unique', value: UniqueObj[v.value] };
            case 'Mark': return { kind: 'Mark', value: MarkObj[v.value] };
            case 'Number': return { kind: 'Number', value: NumberOnesObj[v.value] };
        }
    });
    return ret;
}
export function Tokenize(glyphouts: GlyphOut[]): Token[] {
    let ret: Token[] = [];
    for (let i = 0; i < glyphouts.length; i++) {
        const glyphfirst = glyphouts[i];
        const glyphsecond = glyphouts[i + 1];
        switch (glyphfirst!.kind) {
            case 'Consonant':
                if (glyphsecond?.kind === 'Vowel') {
                    const GlyphToken: Token = { kind: 'Phoneme', idC: glyphfirst!, idV: glyphsecond };
                    ret.push(GlyphToken);
                    i++;
                    break;
                }
                else if (glyphsecond?.kind === 'SpecialVowel') {
                    const GlyphToken: Token = { kind: 'Phoneme', idC: glyphfirst!, idV: { kind: 'Vowel', value: 'GlyphA' } };
                    ret.push(GlyphToken);
                    i++;
                    const UniqueToken: Token = { kind: 'Unique', id: glyphsecond! };
                    ret.push(UniqueToken);
                    break;
                }
            case 'Vowel':
                const GlyphToken: Token = { kind: 'Phoneme', idC: { kind: 'Consonant', value: 'Glyphzeroconsonant' }, idV: glyphfirst! as any };
                ret.push(GlyphToken);
                break;
            case 'SpecialVowel':
                const GlyphTokenSp: Token = { kind: 'Unique', id: glyphfirst! };
                ret.push(GlyphTokenSp);
                break;
            case 'Unique':
                const UniqueToken: Token = { kind: 'Unique', id: glyphfirst! };
                ret.push(UniqueToken);
                break;
            case 'Mark':
                if (glyphfirst?.value === 'EndOfLine') {
                    ret.push({ kind: 'Mark', value: 'EndOfLine' });
                    break;
                }
                ret.push(glyphfirst!);
                break;
            case 'Number':
                if (glyphsecond?.kind === 'Number' && glyphfirst!.value !== 'Num0') {
                    const GlyphToken: Token = { kind: 'Number', idTens: { kind: 'Number', value: ConversionNumberList[glyphfirst!.value] }, idOnes: glyphsecond };
                    ret.push(GlyphToken);
                    i++;
                    break;
                }
                else {
                    const GlyphToken: Token = { kind: 'Number', idOnes: glyphfirst! };
                    ret.push(GlyphToken);
                    break;
                }

        }
    }
    return ret;
}