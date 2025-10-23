import type { DisplayToken, Token } from "./models";

export function DrawGlyphs(tokens: Token[], containerWidth: number, glyphWidth = 60, gap = 6) :DisplayToken[] {
    let shiftx = 0, shifty = 0;
    let ret : DisplayToken[] = [];

    const slotWidth = glyphWidth + gap;
    const columnsPerRow = Math.max(1, Math.floor(Math.max(0, containerWidth) / slotWidth));
    console.log(containerWidth)
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (shiftx >= columnsPerRow) { shifty += 1; shiftx = 0; }
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
                if(token?.value === 'Space'){
                    shiftx += 1;
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