// Offline mód: a Kék Cica internet nélkül is működik.
// Ha új verziót töltesz fel, emeld meg a VERZIO számot.
const VERZIO = "kekcica-v4";
const FAJLOK = [
    "./", "index.html", "style.css", "app.js", "beallitasok.js", "manifest.json",
    "apple-touch-icon.png", "ikon-192.png", "ikon-512.png",
    "boldog_oleles1.png", "boldog_oleles2.png", "boldog_puszi.png", "boldog_sziv_mogott.png",
    "boldog_sziv_olel.png", "boldog_sziv_tart.png", "boldog_virag.png", "boldog_virag_par.png",
    "szomoru_shy1.png", "szomoru_shy2.png", "szomoru_takaro.png", "szomoru_konnyes.png",
    "alvo_parna.png", "boldog_gombolyag.png", "boldog_hal.png", "boldog_level.png", "boldog_puszi_kuld.png",
    "karacsony_ajandek.png", "reggel_integet.png", "unnep_parti.png"
];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(VERZIO).then((c) => c.addAll(FAJLOK)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys()
            .then((kulcsok) => Promise.all(kulcsok.filter((k) => k !== VERZIO).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// Előbb a hálózat (hogy a frissítések megérkezzenek), ha nincs net, a mentett példány.
self.addEventListener("fetch", (e) => {
    if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
    e.respondWith(
        fetch(e.request)
            .then((valasz) => {
                const masolat = valasz.clone();
                caches.open(VERZIO).then((c) => c.put(e.request, masolat));
                return valasz;
            })
            .catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
});
