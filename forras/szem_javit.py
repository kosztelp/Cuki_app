import numpy as np, cv2
from PIL import Image
S = 6
orig = cv2.cvtColor(cv2.imread('szomoru_takaro.png'), cv2.COLOR_BGR2RGB)
new = np.array(Image.open('ki/szomoru_takaro.png').convert('RGBA')).astype(np.float32)
# bicubic nagyítás a szem környékéről az eredeti képből
big = cv2.resize(orig, None, fx=S, fy=S, interpolation=cv2.INTER_CUBIC).astype(np.float32)
# kontraszt kicsit emelve, hogy a szem ne legyen ködös
big = np.clip((big - 128) * 1.12 + 128, 0, 255)
H, W = new.shape[:2]
yy, xx = np.mgrid[0:H, 0:W]
mask = np.zeros((H, W), np.float32)
for cx, cy, r in [(35.6, 34.0, 4.9), (49.6, 34.0, 4.9), (41.9, 36.6, 2.6)]:  # szemek és orr (px)
    d = np.hypot(xx - cx * S, yy - cy * S)
    mask = np.maximum(mask, np.clip((r * S - d) / (1.2 * S), 0, 1))
mask = mask[..., None]
new[..., :3] = new[..., :3] * (1 - mask) + big * mask
new[..., 3] = np.maximum(new[..., 3], mask[..., 0] * 255)
Image.fromarray(np.clip(new, 0, 255).astype(np.uint8)).save('ki/szomoru_takaro.png')
