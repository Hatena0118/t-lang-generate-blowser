import type { DisplayToken, Token } from "./models";

export function DrawGlyphs(tokens: Token[]) :DisplayToken[] {
    let shiftx = 0, shifty = 0;
    let ret : DisplayToken[] = [];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if(i>0 && i%9 == 0){shifty +=1; shiftx = 0;}
        switch (token!.kind) {
            case 'Phoneme':
                const Glyph : DisplayToken= { Glyph: token!, row: shifty, column: shiftx };
                ret.push(Glyph);
                shiftx += 1;
                break;
            case 'Unique':
                const GlyphUni : DisplayToken= { Glyph: token!, row: shifty, column: shiftx };  
                ret.push(GlyphUni);
                shiftx += 1;
                break;
            case 'Number':
                const GlyphNum : DisplayToken= { Glyph: token!, row: shifty, column: shiftx };
                ret.push(GlyphNum);
                shiftx += 1;
                break;
            case 'Mark':
                if(token?.value === 'EndOfLine'){
                    shifty += 1;
                    shiftx = 0;
                    break;
                }
                if(token?.value === 'Glyphlongdash'){
                    shiftx-=1;
                    const GlyphMark : DisplayToken= { Glyph: token!, row: shifty, column: shiftx };
                    ret.push(GlyphMark);
                    shiftx += 1;
                    break;
                }
                const GlyphMark : DisplayToken= { Glyph: token!, row: shifty, column: shiftx };
                ret.push(GlyphMark);
                shiftx += 1;
                break;
        }
    }
    return ret;
}