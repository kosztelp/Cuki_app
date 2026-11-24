# Az eredeti szívet ölelő cica (boldog_sziv_olel.png) körvonalainak kinyerése:
# test sziluett (farok nélkül), bal kéz (mancs) és farok.
import cv2, numpy as np, json
im = cv2.imread('/home/claude/feldolg/ki/boldog_sziv_olel.png', cv2.IMREAD_UNCHANGED)
a = im[:, :, 3] > 128
rgb = im[:, :, :3][:, :, ::-1].astype(int)
lum = rgb @ [0.299, 0.587, 0.114]
ink = (lum < 110) & a
VAST = 20  # az eredeti körvonal vastagsága px-ben

def kontur(maszk, eps=1.6, simit=3):
    m = maszk.astype(np.uint8) * 255
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    c = max(cs, key=cv2.contourArea)[:, 0, :].astype(float)
    if simit:
        k = np.ones(simit) / simit
        c = np.stack([np.convolve(np.r_[c[-simit:, i], c[:, i], c[:simit, i]], k, 'same')[simit:-simit] for i in (0, 1)], 1)
    c = cv2.approxPolyDP(c.astype(np.float32).reshape(-1, 1, 2), eps, True)[:, 0, :]
    return [[round(float(x), 1), round(float(y), 1)] for x, y in c]

ker = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (VAST + 1, VAST + 1))
# test: farok levágva, lyukak kitöltve, a vonal közepére erodálva
test = a.copy(); test[335:450, 402:] = False
test = cv2.morphologyEx(test.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
test = cv2.erode(test, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (VAST // 2 * 2 + 1,) * 2)) > 0
# a jobb oldalon kilógó könyök miatt a jobb felet a bal fél tükörképéből rakjuk össze
KOZEP = 228
sym = np.zeros_like(test)
sym[:, :KOZEP] = test[:, :KOZEP]
sym[:, KOZEP:2 * KOZEP] = test[:, :KOZEP][:, ::-1]
test = sym
# farok
farok = np.zeros_like(a); farok[335:450, 395:] = a[335:450, 395:]
farok = cv2.erode(farok.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (VAST // 2 * 2 + 1,) * 2)) > 0
# bal mancs: a tinta a dobozon belül
mancs = np.zeros_like(a); mancs[245:358, 72:158] = ink[245:358, 72:158]
mancs = cv2.morphologyEx(mancs.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8)) > 0
out = {"test": kontur(test), "farok": kontur(farok), "mancs": kontur(mancs, eps=1.2, simit=0), "meret": [im.shape[1], im.shape[0]]}
json.dump(out, open('alak.json', 'w'))
print({k: len(v) for k, v in out.items()})
