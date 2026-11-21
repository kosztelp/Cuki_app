# Új Kék Cica képek – az eredeti matricák stílusához igazítva:
# tömzsi test, rövid széles fülek, oldalsó szőrpamacsok, pötty szemek, fekete orr, nincs száj,
# ívelt vonalas kezek, kis ujjvonalak a lábon, kerek farok, enyhén remegő vonal.
import os
OUT = os.path.dirname(os.path.abspath(__file__)) + "/svg"
KEK = "#b4d6fb"; ROZSA = "#fde3ee"; PIR = "#f7a9c8"; FEK = "#111"
SW = 5.6

def svg(retegek):
    t = ''
    for durva, tart in retegek:
        if durva:
            t += f'<g filter="url(#r)" stroke="{FEK}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round">{tart}</g>'
        else:
            t += f'<g filter="url(#b)">{tart}</g>'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs>
<filter id="r" x="-10%" y="-10%" width="120%" height="120%">
<feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="3"/>
<feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>
<filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter>
</defs>{t}</svg>'''

def test(fark="jobb"):
    t = ''
    if fark == "jobb":
        t += f'<path d="M156 146 Q170 132 182 140 Q192 150 184 162 Q174 172 158 164" fill="{KEK}"/>'
    elif fark == "bal":
        t += f'<path d="M44 146 Q30 132 18 140 Q8 150 16 162 Q26 172 42 164" fill="{KEK}"/>'
    t += (f'<path d="M42 78 Q44 60 52 46 Q55 41 60 44 L80 58 Q100 54 120 58 L140 44 Q145 41 148 46 '
          f'Q156 60 158 78 Q160 92 161 120 Q163 150 163 170 Q164 178 156 178 L140 178 Q136 178 134 172 '
          f'Q132 167 124 167 L76 167 Q68 167 66 172 Q64 178 60 178 L44 178 Q36 178 37 170 '
          f'Q37 150 39 120 Q40 92 42 78 Z" fill="{KEK}"/>')
    # oldalsó szőrpamacsok
    t += (f'<path d="M41 86 Q32 86 34 92 Q30 98 38 102 Q34 106 40 109" fill="{KEK}" stroke-width="4.2"/>'
          f'<path d="M159 86 Q168 86 166 92 Q170 98 162 102 Q166 106 160 109" fill="{KEK}" stroke-width="4.2"/>')
    # ujjvonalak a lábakon
    t += ('<path d="M48 178 L48 171 M56 178 L56 171 M144 178 L144 171 M152 178 L152 171" fill="none" stroke-width="3.4"/>')
    return t

def pir(nagy=False):
    if nagy:
        return f'<ellipse cx="100" cy="102" rx="46" ry="10" fill="{PIR}" opacity=".75"/>'
    return (f'<ellipse cx="64" cy="106" rx="10" ry="6" fill="{PIR}" opacity=".8"/>'
            f'<ellipse cx="136" cy="106" rx="10" ry="6" fill="{PIR}" opacity=".8"/>')

def arc(szem="pont"):
    t = ''
    if szem == "pont":
        t += f'<circle cx="72" cy="96" r="3.4" fill="{FEK}" stroke-width="1"/><circle cx="128" cy="96" r="3.4" fill="{FEK}" stroke-width="1"/>'
    elif szem == "csukott":
        t += '<path d="M64 96 Q72 101 80 96 M120 96 Q128 101 136 96" fill="none" stroke-width="3.8"/>'
    elif szem == "boldog":
        t += '<path d="M64 99 Q72 91 80 99 M120 99 Q128 91 136 99" fill="none" stroke-width="3.8"/>'
    elif szem == "konnyes":
        t += f'<circle cx="72" cy="96" r="3.6" fill="{FEK}" stroke-width="1"/><circle cx="128" cy="96" r="3.6" fill="{FEK}" stroke-width="1"/>'
        t += '<path d="M73 103 Q68 113 72 117 Q77 113 73 103 Z" fill="#9fd0ff" stroke-width="2.4"/>'
    t += f'<path d="M93 100 Q100 96 107 100 Q105 107 100 107 Q95 107 93 100 Z" fill="{FEK}" stroke-width="2"/>'
    return t

def kez(x, y, tukor=False, fogas=True):
    """Ívelt, kék kitöltésű kéz az eredeti matricák mintájára, kis ujjvonalakkal."""
    s = -1 if tukor else 1
    d = (f'M{x} {y} Q{x + s*18} {y - 8} {x + s*26} {y + 2} Q{x + s*30} {y + 10} {x + s*22} {y + 14} '
         f'Q{x + s*12} {y + 16} {x} {y + 12}')
    t = f'<path d="{d}" fill="{KEK}"/>'
    if fogas:
        t += (f'<path d="M{x + s*24} {y + 4} L{x + s*18} {y + 6} M{x + s*24} {y + 10} L{x + s*18} {y + 10}" '
              f'fill="none" stroke-width="2.8"/>')
    return t

def kar_fel(x, y, tukor=False):
    """Felemelt kar (integet / ünnepel)."""
    s = -1 if tukor else 1
    return (f'<path d="M{x} {y} Q{x + s*16} {y - 18} {x + s*14} {y - 40} Q{x + s*13} {y - 52} {x + s*24} {y - 52} '
            f'Q{x + s*34} {y - 50} {x + s*30} {y - 36} Q{x + s*30} {y - 12} {x + s*10} {y + 14}" fill="{KEK}"/>'
            f'<path d="M{x + s*18} {y - 50} L{x + s*20} {y - 44} M{x + s*26} {y - 50} L{x + s*25} {y - 44}" fill="none" stroke-width="2.6"/>')

kepek = {}

# 1) Halat eszik
kepek["boldog_hal"] = svg([
    (True, test()), (False, pir()), (True, arc("boldog") +
     f'<path d="M54 132 Q80 112 112 126 L134 110 L132 150 L112 136 Q80 152 54 132 Z" fill="#ffb86b"/>'
     f'<circle cx="68" cy="128" r="2.8" fill="{FEK}" stroke-width="1"/><path d="M88 122 Q93 130 88 138" fill="none" stroke-width="2.8"/>' +
     kez(40, 124) + kez(160, 120, tukor=True))
])

# 2) Gombolyaggal játszik
kepek["boldog_gombolyag"] = svg([
    (True, test(fark="bal")), (False, pir()), (True, arc("boldog") +
     '<circle cx="132" cy="148" r="24" fill="#d7b8ff"/>'
     '<path d="M112 140 Q132 128 152 142 M110 154 Q132 140 156 156 M118 166 Q134 152 150 170 M130 124 Q122 150 134 172" fill="none" stroke-width="3"/>'
     '<path d="M154 156 Q172 164 170 182 Q168 192 182 194" fill="none" stroke-width="3"/>' +
     kez(160, 128, tukor=True) + kez(40, 130))
])

# 3) Párnán alszik (oldalt fekvő, összegömbölyödött)
kepek["alvo_parna"] = svg([
    (True, f'<path d="M10 152 Q8 122 38 120 L162 120 Q192 122 190 152 Q192 182 162 184 L38 184 Q8 182 10 152 Z" fill="{ROZSA}"/>'
           f'<path d="M30 152 L170 152" fill="none" stroke="{PIR}" stroke-width="2.5"/>'
           f'<path d="M34 146 Q30 104 52 98 L60 72 Q62 68 66 72 L82 88 Q100 84 118 88 L134 72 Q138 68 140 72 L148 98 '
           f'Q174 106 168 146 Q164 160 100 160 Q38 160 34 146 Z" fill="{KEK}"/>'
           f'<path d="M150 150 Q178 148 176 128 Q174 116 162 120 Q168 136 148 140" fill="{KEK}"/>'
           '<path d="M38 112 L28 110 L35 117 L27 121 L37 124" fill="none" stroke-width="3.8"/>'),
    (False, '<ellipse cx="70" cy="128" rx="9" ry="5" fill="#f7a9c8" opacity=".8"/><ellipse cx="130" cy="128" rx="9" ry="5" fill="#f7a9c8" opacity=".8"/>'),
    (True, '<path d="M66 118 Q74 123 82 118 M118 118 Q126 123 134 118" fill="none" stroke-width="3.8"/>'
           f'<path d="M94 122 Q100 119 106 122 Q104 128 100 128 Q96 128 94 122 Z" fill="{FEK}" stroke-width="2"/>'
           ''),
    (False, ''),
    (True, '<text x="150" y="62" font-family="Arial Rounded MT Bold, Arial" font-weight="900" font-size="24" fill="#8a7fd1" stroke="none">z</text>'
           '<text x="166" y="40" font-family="Arial Rounded MT Bold, Arial" font-weight="900" font-size="32" fill="#8a7fd1" stroke="none">Z</text>')
])

# 4) Jó reggelt: integet, mellette a nap
kepek["reggel_integet"] = svg([
    (True, '<circle cx="28" cy="30" r="17" fill="#ffd86b"/>'
           '<path d="M28 4 L28 9 M28 51 L28 56 M2 30 L7 30 M49 30 L54 30 M10 12 L14 16 M42 44 L46 48 M46 12 L42 16 M10 48 L14 44" fill="none" stroke-width="3.4"/>' +
           test()), (False, pir()),
    (True, arc("pont") + kar_fel(150, 112) + kez(40, 126) +
           '<path d="M188 52 Q194 60 190 68 M192 40 Q200 50 196 62" fill="none" stroke-width="2.8"/>')
])

# 5) Cetlit / levelet hoz
kepek["boldog_level"] = svg([
    (True, test()), (False, pir()), (True, arc("pont") +
     '<g transform="rotate(-5 100 146)"><rect x="64" y="124" width="72" height="48" rx="5" fill="#fffaf0"/>'
     '<path d="M64 128 L100 150 L136 128" fill="none" stroke-width="3.6"/>'
     '<path d="M100 145 Q93 138 97 134 Q100 132 100 136 Q100 132 103 134 Q107 138 100 145 Z" fill="#ff5c8a" stroke-width="2.2"/></g>' +
     kez(42, 132) + kez(158, 128, tukor=True))
])

# 6) Ünnepel partisapkában, konfettivel
konf = "".join(f'<rect x="{x}" y="{y}" width="8" height="5" rx="1.5" fill="{c}" stroke="none" transform="rotate({r} {x} {y})"/>'
               for x, y, c, r in [(14,60,"#ff7aa2",20),(24,110,"#7ec8ff",-30),(182,110,"#ffd166",40),(188,70,"#b48cf2",-10),
                                  (12,150,"#7ad7a8",15),(186,150,"#ff7aa2",-25),(40,24,"#ffd166",-40),(162,20,"#7ec8ff",30)])
kepek["unnep_parti"] = svg([
    (True, konf + test(fark=None)), (False, pir()),
    (True, arc("boldog") +
     '<path d="M82 56 L100 8 L118 56 Z" fill="#ffd166"/>'
     '<path d="M88 40 L112 40 M93 26 L107 26" fill="none" stroke="#ff7aa2" stroke-width="3.6"/>'
     '<circle cx="100" cy="8" r="6.5" fill="#ff7aa2"/>' +
     kar_fel(150, 118) + kar_fel(50, 118, tukor=True))
])

# 7) Karácsonyi ajándékot ad
kepek["karacsony_ajandek"] = svg([
    (True, test()), (False, pir()), (True, arc("pont") +
     '<rect x="66" y="120" width="68" height="52" rx="4" fill="#ff6b81"/>'
     '<path d="M100 120 L100 172 M66 142 L134 142" fill="none" stroke="#fff3b0" stroke-width="7"/>'
     '<rect x="66" y="120" width="68" height="52" rx="4" fill="none"/>'
     '<path d="M100 120 Q84 102 80 114 Q80 122 100 120 Q116 102 120 114 Q120 122 100 120 Z" fill="#fff3b0" stroke-width="3.6"/>' +
     kez(42, 132) + kez(158, 132, tukor=True))
])

# 8) Szomorú, könnyes (kezét összetéve, mint a félénk eredeti)
kepek["szomoru_konnyes"] = svg([
    (True, test()), (False, pir(nagy=True)), (True, arc("konnyes") +
     kez(56, 132) + kez(144, 132, tukor=True))
])

# 9) Puszit küld
kepek["boldog_puszi_kuld"] = svg([
    (True, test()), (False, pir()), (True, arc("csukott") +
     kar_fel(150, 116) + kez(40, 128) +
     '<path d="M182 72 Q170 60 176 54 Q182 50 184 58 Q186 50 192 54 Q198 60 184 72 Z" fill="#ff5c8a" stroke-width="2.6"/>'
     '<path d="M170 40 Q163 33 167 29 Q171 27 172 32 Q173 27 177 29 Q181 33 172 40 Z" fill="#ff8fb0" stroke-width="2.2"/>')
])

for nev, s in kepek.items():
    open(f"{OUT}/{nev}.svg", "w").write(s)
print(len(kepek), "kép")
