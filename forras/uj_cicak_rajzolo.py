# Új Kék Cica képek az eredeti szívet ölelő cica valódi körvonalára építve.
import json, os, math
A = json.load(open(os.path.dirname(os.path.abspath(__file__)) + '/alak.json'))
OUT = os.path.dirname(os.path.abspath(__file__)) + '/svg'
KEK = "#b4d6fb"; ROZSA = "#fde3ee"; PIR = "#f7a9c8"; FEK = "#1c1a1e"
V = 20  # vonalvastagság (mint az eredetin)

def ut(pontok, zart=True):
    return "M" + " L".join(f"{x} {y}" for x, y in pontok) + (" Z" if zart else "")

def tukor(pontok, cx=225):
    return [[2 * cx - x, y] for x, y in pontok]

def eltol(pontok, dx=0, dy=0, sy=1, y0=0):
    return [[x + dx, y0 + (y - y0) * sy + dy] for x, y in pontok]

TEST = A["test"]; FAROK = A["farok"]; MANCS = A["mancs"]

def vonal(d, fill="none", w=V):
    return f'<path d="{d}" fill="{fill}" stroke="{FEK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"/>'

ALJ = 410  # ettől lefelé kézzel rajzolt lábak jönnek

def sima_oldal(lanc, oldalak):
    """Ahol a kar felfelé áll, ott a test oldalán nincs mancs-dudor: az oldalt kisimítjuk."""
    Y0, X0, X1 = 220, 63, 52  # a dudor kezdete és az oldal x-e fent / lent (bal oldalon)
    ki = []
    for x, y in lanc:
        for o in oldalak:
            bal = o == "bal"
            if (x < 228) == bal and Y0 <= y <= ALJ:
                t = (y - Y0) / (ALJ - Y0)
                xb = X0 + (X1 - X0) * (t ** 0.8)
                x = round(xb if bal else 456 - xb, 1)
        ki.append([x, y])
    return ki

def test_ut(sy=1, dy=0, sima=()):
    """Az eredeti körvonal (fej, fülek, oldalak) + kézzel rajzolt cicalábak alul."""
    P = TEST
    lent = [p[1] >= ALJ for p in P]
    # forgassuk úgy, hogy a lánc egy "fent" ponttal kezdődjön, ami "lent" után jön
    k = next(i for i in range(len(P)) if lent[i - 1] and not lent[i])
    P2 = P[k:] + P[:k]; L2 = lent[k:] + lent[:k]
    lanc = []
    for p, l in zip(P2, L2):
        if l: break
        lanc.append(p)
    if lanc[0][0] > lanc[-1][0]:
        lanc = lanc[::-1]
    if sima:
        lanc = sima_oldal(lanc, sima)
    (xl, yl), (xr, yr) = lanc[0], lanc[-1]
    K = 228; yb = ALJ + 70; tw = 36
    d = "M" + " L".join(f"{x} {y}" for x, y in lanc)
    # jobb láb külső íve
    d += f" Q{xr + 6} {yb - 30} {xr - 8} {yb - 4}"
    x = xr - 8
    for i in range(3):  # három ujj (lefelé domborodó ívek)
        d += f" Q{x - tw / 2} {yb + 34} {x - tw} {yb}"
        x -= tw
    # ív a két láb között
    belso_j = x; belso_b = 2 * K - x
    d += f" Q{belso_j - 4} {yb - 34} {K} {yb - 38} Q{belso_b + 4} {yb - 34} {belso_b} {yb}"
    x = belso_b
    for i in range(3):
        d += f" Q{x - tw / 2} {yb + 34} {x - tw} {yb}"
        x -= tw
    d += f" Q{xl - 6} {yb - 30} {xl} {yl} Z"
    if sy != 1 or dy:
        import re
        szamok = d.replace("M", " M ").replace("L", " L ").replace("Q", " Q ").replace("Z", " Z ").split()
        ki, xy = [], 0
        for t in szamok:
            if t in "MLQZ":
                ki.append(t); xy = 0; continue
            v = float(t)
            ki.append(f"{round(v, 1) if xy % 2 == 0 else round(v * sy + dy, 1)}"); xy += 1
        d = " ".join(ki)
    return d

def test(farok=True, sima=()):
    t = ''
    if farok:
        t += vonal(ut(FAROK), KEK)
    t += vonal(test_ut(sima=sima), KEK)
    return t

def pir(nagy=False):
    if nagy:
        return f'<ellipse cx="225" cy="185" rx="120" ry="24" fill="{PIR}" opacity=".75" filter="url(#b)"/>'
    return (f'<ellipse cx="118" cy="195" rx="34" ry="15" fill="{PIR}" opacity=".85" filter="url(#b)"/>'
            f'<ellipse cx="334" cy="195" rx="34" ry="15" fill="{PIR}" opacity=".85" filter="url(#b)"/>')

def orr(x=228, y=172):
    return (f'<path d="M{x-17} {y-6} Q{x-12} {y-14} {x} {y-12} Q{x+14} {y-14} {x+17} {y-4} '
            f'Q{x+16} {y+8} {x+4} {y+11} Q{x-10} {y+12} {x-16} {y+4} Z" fill="{FEK}"/>')

def szemek(fajta="pont"):
    L, R, Y = 160, 292, 160
    if fajta == "pont":
        return f'<circle cx="{L}" cy="{Y}" r="11" fill="{FEK}"/><circle cx="{R}" cy="{Y}" r="11" fill="{FEK}"/>'
    if fajta == "boldog":
        return szemek("pont")
        return vonal(f"M{L-17} {Y+7} Q{L} {Y-12} {L+17} {Y+7} M{R-17} {Y+7} Q{R} {Y-12} {R+17} {Y+7}", w=10)
    if fajta == "csukott":
        return vonal(f"M{L-17} {Y-2} Q{L} {Y+12} {L+17} {Y-2} M{R-17} {Y-2} Q{R} {Y+12} {R+17} {Y-2}", w=10)
    if fajta == "konnyes":
        return (f'<circle cx="{L}" cy="{Y}" r="11" fill="{FEK}"/><circle cx="{R}" cy="{Y}" r="11" fill="{FEK}"/>'
                f'<path d="M{L+4} {Y+22} Q{L-8} {Y+46} {L+4} {Y+54} Q{L+16} {Y+46} {L+4} {Y+22} Z" fill="#9fd0ff" stroke="{FEK}" stroke-width="6"/>')

def arc(szem="pont", nagy_pir=False):
    return pir(nagy_pir) + szemek(szem) + orr()

def mancs(x, y, irany=1, h=84, w=68):
    """Az eredeti C alakú mancs: felső vonal ki, oldalt két kis ujjdudor, alul vissza a testhez."""
    s = irany
    d = (f"M{x} {y} L{x + s*(w-22)} {y-2} Q{x + s*(w-2)} {y} {x + s*w} {y + h*0.24} "
         f"Q{x + s*(w-16)} {y + h*0.33} {x + s*(w-4)} {y + h*0.42} "
         f"Q{x + s*(w-16)} {y + h*0.52} {x + s*(w-2)} {y + h*0.62} "
         f"Q{x + s*(w+4)} {y + h*0.95} {x + s*(w-34)} {y + h} L{x - s*6} {y + h + 1}")
    return f'<path d="{d} Z" fill="{KEK}"/>' + vonal(d, w=V + 2)

# az eredeti mancsok helye (szívet ölelő kép): bal 78,262 – jobb 372,262
def mancs_bal(dx=0, dy=0):
    return mancs(78 + dx, 262 + dy, 1)

def mancs_jobb(dx=0, dy=0):
    return mancs(372 + dx, 262 + dy, -1)

def kar_fel(vall, vege, oldal=1):
    """Felemelt kar a test mögül: vastag kék cső fekete kontúrral, kerek mancs a végén."""
    (x0, y0), (x1, y1) = vall, vege
    cx, cy = (x0 + x1) / 2 + 50 * oldal, (y0 + y1) / 2 + 30
    d = f"M{x0} {y0} Q{cx} {cy} {x1} {y1}"
    return (f'<path d="{d}" fill="none" stroke="{FEK}" stroke-width="{70 + 2*V}" stroke-linecap="round"/>'
            f'<path d="{d}" fill="none" stroke="{KEK}" stroke-width="70" stroke-linecap="round"/>'
            + vonal(f"M{x1 - 12 * oldal} {y1 - 18} L{x1 - 10 * oldal} {y1 - 4} M{x1 + 6 * oldal} {y1 - 20} L{x1 + 6 * oldal} {y1 - 6}", w=7))

def svg(belso):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="-70 -90 600 640">
<defs><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter></defs>
{belso}
</svg>'''

kepek = {}

hal = (f'<path d="M128 302 Q178 254 256 284 L310 250 Q320 246 318 258 L312 302 L318 346 Q320 358 310 354 L256 320 Q178 350 128 302 Z" '
       f'fill="#ffb86b" stroke="{FEK}" stroke-width="16" stroke-linejoin="round"/>'
       f'<circle cx="160" cy="296" r="9" fill="{FEK}"/>' + vonal("M200 280 Q212 302 200 324", w=9) + vonal("M226 282 Q238 302 226 322", w=9))
kepek["boldog_hal"] = svg(test() + arc("boldog") + hal + mancs_bal(0, 2) + mancs_jobb(0, 2))

level = (f'<g transform="rotate(-5 225 320)"><rect x="118" y="250" width="214" height="146" rx="14" fill="#fffaf0" stroke="{FEK}" stroke-width="{V}"/>'
         + vonal("M122 262 L225 330 L328 262", w=14) +
         f'<path d="M225 318 Q200 294 212 280 Q225 272 225 290 Q225 272 238 280 Q250 294 225 318 Z" fill="#ff5c8a" stroke="{FEK}" stroke-width="8"/></g>')
kepek["boldog_level"] = svg(test() + arc("pont") + level + mancs_bal(0, 10) + mancs_jobb(0, 10))

ajandek = (f'<rect x="125" y="250" width="200" height="170" rx="12" fill="#ff6b81" stroke="{FEK}" stroke-width="{V}"/>'
           f'<path d="M225 252 L225 418 M127 322 L323 322" stroke="#fff3b0" stroke-width="24"/>'
           f'<rect x="125" y="250" width="200" height="170" rx="12" fill="none" stroke="{FEK}" stroke-width="{V}"/>'
           f'<path d="M225 252 Q170 196 160 236 Q160 262 225 252 Q280 196 290 236 Q290 262 225 252 Z" fill="#fff3b0" stroke="{FEK}" stroke-width="12" stroke-linejoin="round"/>')
kepek["karacsony_ajandek"] = svg(test() + arc("pont") + ajandek + mancs_bal(0, 20) + mancs_jobb(0, 20))

gomb = (f'<circle cx="250" cy="420" r="80" fill="#d7b8ff" stroke="{FEK}" stroke-width="{V}"/>'
        + vonal("M180 395 Q250 350 320 400 M176 440 Q250 390 328 446 M200 482 Q256 430 306 486 M246 342 Q214 420 258 498", w=9)
        + vonal("M328 440 Q400 470 392 520 Q388 548 430 556", w=9))
kepek["boldog_gombolyag"] = svg(test(farok=True) + arc("boldog") + gomb + mancs_bal(0, 0) + mancs(380, 352, -1))

kepek["szomoru_konnyes"] = svg(test() + arc("konnyes", nagy_pir=True) + mancs(120, 250, 1, h=70, w=60) + mancs(330, 250, -1, h=70, w=60))

nap = (f'<circle cx="-5" cy="-20" r="48" fill="#ffd86b" stroke="{FEK}" stroke-width="14"/>'
       + vonal("M-5 -90 L-5 -78 M-5 38 L-5 50 M-75 -20 L-63 -20 M53 -20 L65 -20 M-55 -70 L-46 -61 M36 21 L45 30 M45 -70 L36 -61 M-55 30 L-46 21", w=10))
kepek["reggel_integet"] = svg(nap + kar_fel((350, 300), (455, 95), 1) + test(sima=("jobb",)) + arc("pont") + mancs_bal() +
                              vonal("M480 60 Q500 84 486 108 M496 30 Q526 66 508 104", w=8))

konf = "".join(f'<rect x="{x}" y="{y}" width="24" height="15" rx="4" fill="{c}" transform="rotate({r} {x} {y})"/>'
               for x, y, c, r in [(-40, 90, "#ff7aa2", 20), (-30, 260, "#7ec8ff", -30), (480, 300, "#ffd166", 40), (500, 140, "#b48cf2", -10),
                                  (-50, 420, "#7ad7a8", 15), (490, 440, "#ff7aa2", -25), (40, -60, "#ffd166", -40), (420, -70, "#7ec8ff", 30)])
sapka = (f'<path d="M180 72 L232 -70 L280 66 Z" fill="#ffd166" stroke="{FEK}" stroke-width="{V}" stroke-linejoin="round"/>'
         f'<path d="M198 22 L262 22 M212 -20 L250 -20" stroke="#ff7aa2" stroke-width="12" stroke-linecap="round"/>'
         f'<circle cx="232" cy="-74" r="20" fill="#ff7aa2" stroke="{FEK}" stroke-width="12"/>')
kepek["unnep_parti"] = svg(konf + kar_fel((100, 300), (-15, 95), -1) + kar_fel((350, 300), (465, 95), 1) + test(farok=False, sima=("bal", "jobb")) + arc("boldog") + sapka)

szivek = (f'<path d="M470 120 Q430 84 450 64 Q470 52 476 78 Q484 52 504 62 Q522 84 470 120 Z" fill="#ff5c8a" stroke="{FEK}" stroke-width="10" stroke-linejoin="round"/>'
          f'<path d="M430 30 Q410 12 420 2 Q430 -4 433 9 Q437 -4 447 1 Q456 12 430 30 Z" fill="#ff8fb0" stroke="{FEK}" stroke-width="8" stroke-linejoin="round"/>')
kepek["boldog_puszi_kuld"] = svg(kar_fel((350, 300), (430, 135), 1) + test(sima=("jobb",)) + arc("pont") + mancs_bal() + szivek)

# Párnán alvó: az eredeti test laposra nyomva ("cipó" póz)
parna = (f'<path d="M-40 400 Q-46 320 40 316 L410 316 Q496 320 490 400 Q496 480 410 486 L40 486 Q-46 480 -40 400 Z" fill="{ROZSA}" stroke="{FEK}" stroke-width="{V}"/>'
         f'<path d="M10 400 L440 400" stroke="{PIR}" stroke-width="8" stroke-linecap="round"/>')
lapos = vonal(ut(eltol(FAROK, 0, 60, sy=0.62)), KEK) + vonal(test_ut(0.62, 60), KEK)
alvo_arc = (f'<g transform="translate(0 70) scale(1 .9)">' + pir() + szemek("csukott") + orr() + '</g>')
zzz = ('<text x="420" y="60" font-family="Arial Rounded MT Bold, Arial" font-weight="900" font-size="70" fill="#8a7fd1">z</text>'
       '<text x="470" y="-10" font-family="Arial Rounded MT Bold, Arial" font-weight="900" font-size="96" fill="#8a7fd1">Z</text>')
kepek["alvo_parna"] = svg(parna + lapos + alvo_arc + zzz)

for nev, s in kepek.items():
    open(f"{OUT}/{nev}.svg", "w").write(s)
print(len(kepek))
