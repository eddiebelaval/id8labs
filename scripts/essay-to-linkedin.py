#!/usr/bin/env python3
"""essay-to-linkedin.py - turn a lab essay into a LinkedIn-ready paste.

LinkedIn's article editor accepts pasted rich text (bold, italic, H2 headers,
blockquotes, links, lists) but strips all custom CSS. So the repeatable pattern
is: convert the essay MDX to CLEAN SEMANTIC HTML (no styling), open it, select
all, copy, paste into the LinkedIn article body. Formatting carries; nothing to
hand-format.

Adds a canonical backlink to id8labs.app so the lab stays the source of record
(no duplicate-content penalty), and writes a .txt twin for a short LinkedIn post.

Usage:
  python3 scripts/essay-to-linkedin.py <slug>      # one essay (filename without .mdx)
  python3 scripts/essay-to-linkedin.py all         # every essay
Output: linkedin-exports/<slug>.html  and  linkedin-exports/<slug>.post.txt
"""
import os, re, sys, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ESSAYS = os.path.join(ROOT, "content", "essays")
OUT = os.path.join(ROOT, "linkedin-exports")
SITE = "https://id8labs.app/writing"


def parse_frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        return {}, text
    fm, body = {}, m.group(2)
    for line in m.group(1).splitlines():
        km = re.match(r'^(\w+):\s*(.*)$', line)
        if km:
            v = km.group(2).strip().strip('"')
            fm[km.group(1)] = v
    return fm, body


def inline(s):
    """Inline markdown -> HTML, escaping first so raw < > & are safe."""
    s = html.escape(s)
    # links [t](u) before emphasis
    s = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'<a href="\2">\1</a>', s)
    s = re.sub(r'\*\*([^*]+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)', r'<em>\1</em>', s)
    return s


def body_to_html(body):
    lines = body.split("\n")
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1; continue
        if re.match(r'^\s*---\s*$', line):      # section rule: drop (H2s carry structure)
            i += 1; continue
        h = re.match(r'^(#{1,3})\s+(.*)$', line)
        if h:
            lvl = min(max(len(h.group(1)), 2), 3)   # ## -> h2, ### -> h3; h1 reserved for the title
            out.append(f"<h{lvl}>{inline(h.group(2).strip())}</h{lvl}>")
            i += 1; continue
        if line.lstrip().startswith(">"):        # blockquote (possibly multi-paragraph)
            buf = []
            while i < len(lines) and lines[i].lstrip().startswith(">"):
                buf.append(re.sub(r'^\s*>\s?', '', lines[i]))
                i += 1
            paras = re.split(r'\n\s*\n', "\n".join(buf).strip())
            inner = "".join(f"<p>{inline(p.strip())}</p>" for p in paras if p.strip())
            out.append(f"<blockquote>{inner}</blockquote>")
            continue
        # paragraph: gather until blank line
        buf = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r'^\s*(#{1,3}\s|>|---\s*$)', lines[i]):
            buf.append(lines[i]); i += 1
        out.append(f"<p>{inline(' '.join(x.strip() for x in buf))}</p>")
    return "\n".join(out)


def plain(body):
    """Strip markdown to plain text for a short LinkedIn post twin."""
    t = re.sub(r'^\s*---\s*$', '', body, flags=re.M)
    t = re.sub(r'^#{1,3}\s+', '', t, flags=re.M)
    t = re.sub(r'\*\*([^*]+?)\*\*', r'\1', t)
    t = re.sub(r'(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)', r'\1', t)
    t = re.sub(r'^\s*>\s?', '', t, flags=re.M)
    t = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'\1', t)
    return re.sub(r'\n{3,}', '\n\n', t).strip()


def convert(slug):
    path = os.path.join(ESSAYS, slug + ".mdx")
    with open(path, encoding="utf-8") as f:
        fm, body = parse_frontmatter(f.read())
    title = fm.get("title", slug)
    subtitle = fm.get("subtitle", "")
    canon = f"{SITE}/{slug}"
    body_html = body_to_html(body)

    doc = (
        "<!doctype html><meta charset='utf-8'>"
        f"<title>LinkedIn: {html.escape(title)}</title>"
        # minimal readable styling for the browser; LinkedIn ignores it on paste
        "<style>body{font:18px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;max-width:680px;margin:40px auto;padding:0 20px;color:#1a1a1a}"
        "h1{font-size:30px;line-height:1.2}h2{font-size:22px;margin-top:1.6em}blockquote{border-left:3px solid #ccc;margin:1em 0;padding-left:16px;color:#444;font-style:italic}"
        "a{color:#0a66c2}.hint{background:#fff8e1;border:1px solid #ffe08a;border-radius:8px;padding:10px 14px;font-size:14px;margin-bottom:24px}</style>"
        "<div class='hint'>Select all (Cmd-A), copy, paste into LinkedIn's article body. "
        f"Set the LinkedIn headline to: <b>{html.escape(title)}</b>. This hint box is fine to leave in the copy; delete its line in LinkedIn.</div>"
        f"<h1>{html.escape(title)}</h1>"
        + (f"<p><em>{inline(subtitle)}</em></p>" if subtitle else "")
        + body_html
        + f"<p><em>Originally published at <a href='{canon}'>{canon}</a></em></p>"
    )

    os.makedirs(OUT, exist_ok=True)
    hp = os.path.join(OUT, slug + ".html")
    with open(hp, "w", encoding="utf-8") as f:
        f.write(doc)
    tp = os.path.join(OUT, slug + ".post.txt")
    with open(tp, "w", encoding="utf-8") as f:
        f.write(f"{title}\n\n{plain(body)}\n\nRead the full essay: {canon}\n")
    return hp, tp


def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    arg = sys.argv[1]
    slugs = ([f[:-4] for f in sorted(os.listdir(ESSAYS)) if f.endswith(".mdx")]
             if arg == "all" else [arg])
    for s in slugs:
        try:
            hp, tp = convert(s)
            print(f"  {s}: {os.path.relpath(hp, ROOT)}  +  {os.path.relpath(tp, ROOT)}")
        except FileNotFoundError:
            print(f"  {s}: NOT FOUND (no content/essays/{s}.mdx)")


if __name__ == "__main__":
    main()
