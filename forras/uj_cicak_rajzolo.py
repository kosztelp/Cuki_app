# Új Kék Cica képek az eredeti stílusában: vastag, kicsit remegő fekete vonal, pasztell kék test.
import os
OUT = os.path.dirname(os.path.abspath(__file__)) + "/svg"
os.makedirs(OUT, exist_ok=True)
KEK = "#b4d6fb"; ROZSA = "#fbe1ee"; PIR = "#f9b9d3"; FEK = "#141214"
SW = 6.5

def svg(belso, vb="0 0 200 200"):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">
<defs><filter id="r" x="-5%" y="-5%" width="110%" height="110%">
<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/>
<feDisplacementMap in="SourceGraphic" scale="3.2"/></filter></defs>
<g filter="url(#r)" stroke="{FEK}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round">
{belso}
</g></svg>'''

def test(x=0, y=0, s=1, szin=KEK, fark=True):
    """Szemből ülő cica teste fülekkel; (x,y) eltolás, s skála."""
    t = f'<g transform="translate({x} {y}) scale({s})">'
    if fark:
        t += f'<path d="M160 156 Q186 154 182 132 Q194 120 184 108 Q170 102 164 118 Q170 134 160 140" fill="{szin}"/>'
    t += (f'<path d="M40 84 L46 48 Q49 42 54 46 L78 64 Q100 59 122 64 L146 46 Q151 42 154 48 L160 84 '
          f'Q172 120 166 160 Q164 174 148 174 L52 174 Q36 174 34 160 Q28 120 40 84 Z" fill="{szin}"/>'
          f'<path d="M74 174 L74 164 M126 174 L126 164" fill="none"/>')
    return t + '</g>'

def arc(x=0, y=0, s=1, szem="pont", pir=True, szaj="w"):
    t = f'<g transform="translate({x - 10} {y + 4}) scale({s * 1.1})">'
    if pir:
        t += f'<ellipse cx="70" cy="106" rx="11" ry="6" fill="{PIR}" stroke="none" opacity=".9"/><ellipse cx="130" cy="106" rx="11" ry="6" fill="{PIR}" stroke="none" opacity=".9"/>'
    if szem == "pont":
        t += f'<circle cx="80" cy="94" r="3.6" fill="{FEK}"/><circle cx="120" cy="94" r="3.6" fill="{FEK}"/>'
    elif szem == "csukott":
        t += '<path d="M72 95 Q80 101 88 95 M112 95 Q120 101 128 95" fill="none" stroke-width="4.5"/>'
    elif szem == "boldog":
        t += '<path d="M72 98 Q80 88 88 98 M112 98 Q120 88 128 98" fill="none" stroke-width="4.5"/>'
    elif szem == "konnyes":
        t += f'<circle cx="80" cy="94" r="4" fill="{FEK}"/><circle cx="120" cy="94" r="4" fill="{FEK}"/>'
        t += '<path d="M84 101 Q80 112 84 116 Q88 112 84 101 Z" fill="#8fc3ff" stroke-width="2.5"/>'
    t += f'<path d="M96 101 Q100 98 104 101 Q102 105 100 105 Q98 105 96 101 Z" fill="{FEK}" stroke-width="2.5"/>'
    if szaj == "w":
        t += '<path d="M92 109 Q96 113 100 109 Q104 113 108 109" fill="none" stroke-width="3.5"/>'
    elif szaj == "nyitott":
        t += '<path d="M93 109 Q100 122 107 109 Z" fill="#ff8fae" stroke-width="3.5"/>'
    elif szaj == "szomoru":
        t += '<path d="M93 114 Q100 108 107 114" fill="none" stroke-width="3.5"/>'
    return t + '</g>'

def mancs(x, y, r=13):
    return (f'<ellipse cx="{x}" cy="{y}" rx="{r}" ry="{r*0.85}" fill="{KEK}"/>'
            f'<path d="M{x-r*0.35} {y+r*0.5} L{x-r*0.35} {y+r*0.15} M{x+r*0.35} {y+r*0.5} L{x+r*0.35} {y+r*0.15}" fill="none" stroke-width="2.5"/>')

def kar(d, w=22):
    return (f'<path d="{d}" fill="none" stroke-width="{w}"/>'
            f'<path d="{d}" fill="none" stroke="{KEK}" stroke-width="{w - 2*SW + 1}"/>')

kepek = {}

# 1) Halat eszik
kepek["boldog_hal"] = svg(
    test() + arc(szem="boldog", szaj="nyitott") +
    f'<path d="M50 140 Q80 118 116 132 L144 114 L140 156 L116 142 Q80 162 50 140 Z" fill="#ffb86b"/>'
    f'<circle cx="64" cy="136" r="3" fill="{FEK}"/><path d="M84 128 Q90 138 84 148 M98 128 Q104 138 98 148" fill="none" stroke-width="3"/>' +
    mancs(54, 148) + mancs(146, 140)
)

# 2) Gombolyaggal játszik
kepek["boldog_gombolyag"] = svg(
    test(x=-14) + arc(x=-14, szem="boldog", szaj="w") +
    '<circle cx="150" cy="150" r="26" fill="#d7b8ff"/>'
    '<path d="M128 140 Q150 128 172 142 M126 154 Q150 140 175 156 M134 168 Q152 152 170 170 M148 124 Q140 150 152 176" fill="none" stroke-width="3.5"/>'
    '<path d="M176 150 Q192 160 186 180 Q182 192 194 196" fill="none" stroke-width="3.5"/>' +
    mancs(128, 132, 12)
)

# 3) Alszik a párnán
kepek["alvo_parna"] = svg(
    f'<path d="M12 150 Q10 120 40 118 L160 118 Q190 120 188 150 Q190 180 160 182 L40 182 Q10 180 12 150 Z" fill="{ROZSA}"/>'
    f'<path d="M40 150 L160 150" fill="none" stroke="{PIR}" stroke-width="3"/>' +
    f'<path d="M36 140 Q30 96 60 92 L66 62 L86 82 Q100 78 114 82 L134 62 L140 92 Q172 96 166 140 Q160 156 100 156 Q42 156 36 140 Z" fill="{KEK}"/>'
    f'<path d="M150 140 Q176 136 172 116 Q168 104 158 112" fill="{KEK}"/>' +
    '<ellipse cx="74" cy="124" rx="10" ry="5" fill="#f9b9d3" stroke="none"/><ellipse cx="126" cy="124" rx="10" ry="5" fill="#f9b9d3" stroke="none"/>'
    '<path d="M76 114 Q84 120 92 114 M108 114 Q116 120 124 114" fill="none" stroke-width="4.5"/>'
    f'<path d="M96 122 Q100 119 104 122 Q102 126 100 126 Q98 126 96 122 Z" fill="{FEK}" stroke-width="2.5"/>'
    f'<text x="150" y="60" font-family="Arial Rounded MT Bold, Arial" font-weight="900" font-size="26" fill="#8a7fd1" stroke="none">z</text>'
    f'<text x="166" y="38" font-family="Arial Rounded MT Bold, Arial" font-weight="900" font-size="34" fill="#8a7fd1" stroke="none">Z</text>'
)

# 4) Jó reggelt: integet, mögötte nap
kepek["reggel_integet"] = svg(
    '<circle cx="30" cy="30" r="18" fill="#ffd86b"/>'
    '<path d="M30 2 L30 7 M30 53 L30 58 M2 30 L7 30 M53 30 L58 30 M10 10 L14 14 M46 46 L50 50 M50 10 L46 14 M10 50 L14 46" fill="none" stroke-width="4"/>' +
    test() + arc(szem="pont", szaj="nyitott") +
    kar("M152 116 Q172 96 168 70") + mancs(168, 64, 13) +
    '<path d="M184 54 Q190 62 186 70 M188 42 Q198 52 194 64" fill="none" stroke-width="3"/>' +
    mancs(56, 146)
)

# 5) Levelet / cetlit tart
kepek["boldog_level"] = svg(
    test() + arc(szem="pont", szaj="w") +
    '<g transform="translate(0 10) rotate(-6 100 140)"><rect x="66" y="118" width="68" height="46" rx="5" fill="#fffaf0"/>'
    '<path d="M66 122 L100 144 L134 122" fill="none" stroke-width="4"/>'
    '<path d="M100 138 Q93 131 97 127 Q100 125 100 129 Q100 125 103 127 Q107 131 100 138 Z" fill="#ff5c8a" stroke-width="2.5"/></g>' +
    mancs(60, 152) + mancs(140, 146)
)

# 6) Ünnepel: partisapka, konfetti
konf = "".join(f'<rect x="{x}" y="{y}" width="8" height="5" rx="1.5" fill="{c}" stroke="none" transform="rotate({r} {x} {y})"/>'
               for x, y, c, r in [(20,40,"#ff7aa2",20),(30,90,"#7ec8ff",-30),(176,96,"#ffd166",40),(186,60,"#b48cf2",-10),
                                  (16,140,"#7ad7a8",15),(182,140,"#ff7aa2",-25),(40,20,"#ffd166",-40),(160,14,"#7ec8ff",30)])
kepek["unnep_parti"] = svg(
    konf + test() + arc(szem="boldog", szaj="nyitott") +
    '<path d="M82 64 L100 14 L118 64 Z" fill="#ffd166"/>'
    '<path d="M88 46 L112 46 M93 31 L107 31" fill="none" stroke="#ff7aa2" stroke-width="4"/>'
    '<circle cx="100" cy="13" r="7" fill="#ff7aa2"/>' +
    kar("M46 118 Q26 100 28 76") + mancs(28, 70, 12) +
    kar("M154 118 Q174 100 172 76") + mancs(172, 70, 12)
)

# 7) Karácsonyi ajándék
kepek["karacsony_ajandek"] = svg(
    test() + arc(szem="boldog", szaj="w") +
    '<rect x="68" y="116" width="64" height="52" rx="4" fill="#ff6b81"/>'
    '<path d="M100 116 L100 168 M68 136 L132 136" fill="none" stroke="#fff3b0" stroke-width="7"/>'
    '<rect x="68" y="116" width="64" height="52" rx="4" fill="none"/>'
    '<path d="M100 116 Q84 98 80 110 Q80 118 100 116 Q116 98 120 110 Q120 118 100 116 Z" fill="#fff3b0" stroke-width="4"/>' +
    mancs(62, 142) + mancs(138, 142)
)

# 8) Szomorú, könnyes
kepek["szomoru_konnyes"] = svg(
    test() + arc(szem="konnyes", szaj="szomoru") +
    mancs(80, 156, 12) + mancs(120, 156, 12)
)

# 9) Szívecskés puszit küld
kepek["boldog_puszi_kuld"] = svg(
    test() + arc(szem="csukott", szaj="w") +
    '<path d="M95 111 Q100 116 105 111" fill="none" stroke-width="3"/>' +
    kar("M150 128 Q166 112 158 94") + mancs(158, 90, 12) +
    '<path d="M170 70 Q158 58 164 52 Q170 48 172 56 Q174 48 180 52 Q186 58 172 70 Z" fill="#ff5c8a" stroke-width="3"/>'
    '<path d="M186 40 Q178 32 182 28 Q186 26 187 31 Q188 26 192 28 Q196 32 187 40 Z" fill="#ff8fb0" stroke-width="2.5"/>' +
    mancs(56, 146)
)

for nev, s in kepek.items():
    open(f"{OUT}/{nev}.svg", "w").write(s)
print(list(kepek))
