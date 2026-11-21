import cv2, numpy as np, glob, os, sys
from scipy import ndimage as ndi
SRC, DST = sys.argv[1], sys.argv[2]
S = 6          # végső nagyítás
SS = 2         # szuper-mintavétel az élsimításhoz
INK = np.array([34, 30, 36], np.float32)  # körvonal színe (RGB)

def smooth_mask(m, scale, sigma=0.7, thr=0.5):
    m = cv2.GaussianBlur(m.astype(np.float32), (0, 0), sigma)
    big = cv2.resize(m, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    big = cv2.GaussianBlur(big, (0, 0), scale * 0.2)
    return (big > thr).astype(np.float32)

for f in sorted(glob.glob(os.path.join(SRC, '*.png'))):
    bgra = cv2.imread(f, cv2.IMREAD_UNCHANGED)
    rgb = cv2.cvtColor(bgra[:, :, :3], cv2.COLOR_BGR2RGB).astype(np.float32)
    h, w = rgb.shape[:2]
    # 2 px fehér keret, hogy a szélen lévő dolgok se vágódjanak
    P = 3
    rgb = cv2.copyMakeBorder(rgb, P, P, P, P, cv2.BORDER_CONSTANT, value=(255, 255, 255))
    lum = rgb @ np.array([0.299, 0.587, 0.114], np.float32)
    sat = rgb.max(2) - rgb.min(2)

    # 1) körvonal (tinta)
    ink = np.clip((175 - lum) / 85, 0, 1) * np.clip(1 - (sat - 55) / 50, 0, 1)
    # 2) háttér: szinte tiszta fehér, a szélhez kapcsolódik
    white = (rgb.min(2) > 236) & (sat < 14)
    lab, _ = ndi.label(white)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(border))
    fg = (~bg).astype(np.float32)

    # 3) kitöltés: a tinta és háttér helyét kitöltjük a szomszéd színekkel, majd simán nagyítunk
    hole = ((ink > 0.25) | bg).astype(np.uint8)
    hole = cv2.dilate(hole, np.ones((2, 2), np.uint8))
    fill8 = np.clip(rgb, 0, 255).astype(np.uint8)
    fill8 = cv2.inpaint(fill8, hole, 3, cv2.INPAINT_TELEA)
    fill8 = cv2.bilateralFilter(fill8, 5, 25, 3)
    T = S * SS
    fill = cv2.resize(fill8, None, fx=T, fy=T, interpolation=cv2.INTER_CUBIC).astype(np.float32)
    fill = cv2.GaussianBlur(fill, (0, 0), T * 0.35)

    ink_b = smooth_mask(ink, T, sigma=0.38, thr=float(os.environ.get("THR", "0.5")))
    kz = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (int(T*0.9)|1, int(T*0.9)|1))
    ink_b = cv2.morphologyEx(ink_b, cv2.MORPH_CLOSE, kz)
    fg_b = np.maximum(smooth_mask(fg, T), ink_b)
    if os.path.basename(f) in os.environ.get("RING", "").split(","):
        fg_b = smooth_mask(fg, T, sigma=1.3)
        kr = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (int(T*1.2)|1, int(T*1.2)|1))
        kin = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (int(T*4.5)|1, int(T*4.5)|1))
        ink_b = np.maximum(ink_b * cv2.erode(fg_b, kin), fg_b - cv2.erode(fg_b, kr))
    # belső fehér részek (szem csillogás) maradjanak fehérek: a fill-ben ott a fehér benne van, ha nem bg

    out = fill * (1 - ink_b[..., None]) + INK * ink_b[..., None]
    rgba = np.dstack([out, fg_b * 255])
    rgba = cv2.resize(rgba, None, fx=1 / SS, fy=1 / SS, interpolation=cv2.INTER_AREA)
    # alfa szerint "előszorzott" szélek tisztítása
    a = rgba[..., 3:4] / 255
    rgba = np.clip(rgba, 0, 255).astype(np.uint8)
    # levágjuk a keretet
    c = P * S
    rgba = rgba[c:-c, c:-c]
    cv2.imwrite(os.path.join(DST, os.path.basename(f)), cv2.cvtColor(rgba, cv2.COLOR_RGBA2BGRA))
    print(os.path.basename(f), w, h, '->', rgba.shape[1], rgba.shape[0])
