"""Build the selected identity as outlined SVGs; do not distribute font files."""
from pathlib import Path
from fontTools.ttLib import TTCollection
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent
DEST = ROOT.parents[2] / 'public' / 'brand'
FONTS = TTCollection('/System/Library/Fonts/Supplemental/Bodoni 72.ttc').fonts


def lettering(text, face, x, baseline, width, height):
    font = FONTS[face]
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    advance = 0
    paths = []
    bounds = BoundsPen(glyphs)
    glyphs[cmap[ord('S')]].draw(bounds)
    cap_height = bounds.bounds[3]
    for char in text:
        glyph_name = cmap[ord(char)]
        pen = SVGPathPen(glyphs)
        glyphs[glyph_name].draw(pen)
        paths.append(f'<path transform="translate({advance} 0)" d="{pen.getCommands()}"/>')
        advance += font['hmtx'][glyph_name][0]
    return f'<g transform="translate({x} {baseline}) scale({width / advance:.6f} {-height / cap_height:.6f})">' + ''.join(paths) + '</g>'


def symbol(ink, accent):
    # Four rows of noise interrupted by a deliberate, continuous signal.
    dots = []
    for row in range(4):
        for col in range(4):
            radius = [5.4, 5.0, 5.3, 5.1][(row + col) % 4]
            dots.append(f'<circle cx="{12 + col * 26}" cy="{12 + row * 26}" r="{radius}"/>')
    return f'<g fill="{ink}">' + ''.join(dots) + f'</g><path d="M4 51 H98" stroke="{accent}" stroke-width="5.5" stroke-linecap="round"/>'


def svg(viewbox, contents):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img"><title>Signal to Noise</title>{contents}</svg>\n'


DEST.mkdir(parents=True, exist_ok=True)
for suffix, ink, accent in [('', '#0b0b0b', '#ff6b35'), ('-mono', '#0b0b0b', '#0b0b0b'), ('-knockout', '#fafaf7', '#fafaf7')]:
    mark = svg('0 0 450 196',
        f'<g transform="translate(8 47)">{symbol(ink, accent)}</g>'
        f'<g fill="{ink}">' + lettering('SIGNAL', 2, 140, 90, 300, 82)
        + lettering('to', 1, 140, 181, 50, 57)
        + lettering('NOISE', 2, 198, 181, 242, 82) + '</g>')
    file_name = f'signal-to-noise-wordmark{suffix}.svg'
    (ROOT / file_name).write_text(mark)
    (DEST / file_name).write_text(mark)

# A dedicated simplified micro drawing keeps the symbol readable at 16px.
micro = '<g fill="currentColor">' + ''.join(
    f'<circle cx="{x}" cy="{y}" r="1.05"/>' for y in [2, 5.5, 10.5, 14] for x in [2, 6, 10, 14]
) + '</g><path d="M1 8 H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
(ROOT / 'signal-to-noise-symbol.svg').write_text(svg('0 0 16 16', micro))
(DEST / 'signal-to-noise-symbol.svg').write_text(svg('0 0 16 16', micro))
