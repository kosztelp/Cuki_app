(() => {
    'use strict';

    const B = window.BEALLITASOK || {};

    // ======================= KÉPEK ÉS SZÖVEGEK =======================
    const szomoruKepek = ["szomoru_shy1.png", "szomoru_shy2.png", "szomoru_konnyes.png"];
    const alvoKepek = ["szomoru_takaro.png", "alvo_parna.png"];
    const boldogKepek = [
        "boldog_sziv_mogott.png", "boldog_sziv_tart.png", "boldog_puszi.png",
        "boldog_oleles2.png", "boldog_oleles1.png", "boldog_sziv_olel.png",
        "boldog_virag_par.png", "boldog_virag.png", "boldog_puszi_kuld.png"
    ];
    // Különleges alkalmak képei
    const K = {
        hal: "boldog_hal.png",
        gombolyag: "boldog_gombolyag.png",
        level: "boldog_level.png",
        reggel: "reggel_integet.png",
        unnep: "unnep_parti.png",
        karacsony: "karacsony_ajandek.png"
    };

    // Mikulássapka helye képenként: x, y = a sapka karimájának közepe (a kép %-ában),
    // w = sapka szélessége (a kép szélességének %-ában), r = dőlés fokban.
    const SAPKA = {
        "boldog_oleles1.png":     { x: 30, y: 13, w: 40, r: -12 },
        "boldog_oleles2.png":     { x: 47, y: 16, w: 30, r: -5 },
        "boldog_puszi.png":       { x: 27, y: 18, w: 38, r: -8 },
        "boldog_sziv_mogott.png": { x: 29, y: 16, w: 30, r: -10 },
        "boldog_sziv_olel.png":   { x: 47, y: 14, w: 50, r: -6 },
        "boldog_sziv_tart.png":   { x: 74, y: 63, w: 26, r: 12 },
        "boldog_virag.png":       { x: 29, y: 19, w: 40, r: -8 },
        "boldog_virag_par.png":   { x: 81, y: 28, w: 24, r: -6 },
        "szomoru_shy1.png":       { x: 50, y: 21, w: 48, r: -5 },
        "szomoru_shy2.png":       { x: 37, y: 13, w: 45, r: -8 },
        "szomoru_takaro.png":     { x: 52, y: 41, w: 28, r: -5 },
        "alvo_parna.png":         { x: 49, y: 33, w: 36, r: -6 },
        "boldog_gombolyag.png":   { x: 43, y: 11, w: 47, r: -6 },
        "boldog_hal.png":         { x: 43, y: 12, w: 47, r: -6 },
        "boldog_level.png":       { x: 43, y: 12, w: 47, r: -6 },
        "boldog_puszi_kuld.png":  { x: 42, y: 18, w: 45, r: -6 },
        "karacsony_ajandek.png":  { x: 43, y: 12, w: 47, r: -6 },
        "reggel_integet.png":     { x: 50, y: 28, w: 38, r: -6 },
        "szomoru_konnyes.png":    { x: 43, y: 12, w: 47, r: -6 }
        // az unnep_parti.png-n partisapka van, oda nem kell mikulássapka
    };

    // {nev} helyére véletlenszerűen az egyik becenév kerül (beallitasok.js)
    const SZ = {
        szomoru: ["szeress 🥺", "szeress pls 👉👈", "szeress, {nev} 🥺❤️", "Szeretetre vágyom... 🥺", "Hiányzik a simi, {nev}... 🥺"],
        ehes: ["éhes 🥺", "éhes 🐟🥺", "éhes... 👉👈", "{nev}, éhes 🥺🐟"],
        eepy: ["eepy 😴", "eepy... 💤", "nagyon eepy 🥱", "eepy, jó éjt, {nev} 💤"],
        eepyzek: ["eepyzek... 💤", "eepyzek, pszt 😴", "eepyzek egy kicsit, {nev} 💤", "eepy... 💤"],
        eepyVoltam: ["eepy voltam 🥱", "eepy voltam, de már itt vagyok! 😊", "eepy voltam... szia, {nev}! 🥱❤️"],
        szeretethiany: ["szeress 🥺", "szeress pls 👉👈", "{nev}, nyomd meg a szívecskét 🥺", "szeretethiányom van 🥺💔"],
        szeretetSziv: ["Köszi a szeretetet! 💖", "Szeretlek, {nev}! 🫶", "Ez kellett! 🥰"],
        boldog: ["Szeretlek, {nev}! 🥰", "Juhúú, ez az! 💖", "Jippii 🥰", "Köszii! Miau! ✨", "Ez nagyon jóóó! 😻", "Te vagy a kedvencem, {nev}! 💕"],
        karacsonyBoldog: ["Boldog karácsonyt, {nev}! 🎄❤️", "Hó-hó-hóóó! 🎅", "Te vagy a legszebb ajándékom, {nev}! 🎁"],
        reggel: ["Jó reggelt, {nev}! ☀️", "Jó reggelt, {nev}! Szép napot! 🌞", "Ásít... jó reggelt, {nev}! 🥱☀️"],
        este: ["Szép estét, {nev}! 🌙", "Esti simi jöhet, {nev}? 🌙💕"],
        alszik: ["Pszt... alszom 💤", "eepy... 💤", "Zzz... 😴", "Pszt, a cica alszik 🌙"],
        ebredes: ["Mmm... még 5 perc 😴", "Jó, jó, ébren vagyok... 🥱", "eepy... de simogathatsz 🥹"],
        simiSzomoru: ["Ooo, ez jóóó... 😊", "Még, még! 🥹", "Már majdnem... ⚡"],
        simiBoldog: ["Rrrrrr... 💕", "Úgy szeretem, ha simogatsz! 🥰", "Még kérek simit! 😇", "Dorombolok! 😻"],
        bokes: ["Húzd rajtam az ujjad, úgy simogass! 👆", "Ne bökj, simogass! 🐾", "Hihi, csikis! De simogatni kell 👆"],
        etetes: ["Nyam-nyam! 🐟", "Már nem vagyok éhes! 😋", "Köszi a halat, {nev}! 🐟💖"],
        tele: ["Már nem vagyok éhes! 🐟", "Most nem fér több belém 😅", "Majd később, jó? 🐟"],
        jatek: ["Elkapom! 🧶", "Hihi, megvan! 😹", "Még egyszer! 🧶✨"],
        jatszani: ["játszunk? 🧶🥺", "unatkozom... 🧶", "{nev}, játszol velem? 🥺🧶", "gombolyag? 👉👈"],
        tele3: ["Minden szívecske tele! 💖💖💖", "Teli szívvel szeretlek, {nev}! 💖", "Három szív, egy boldog cica! 😻"],
        szeretet: ["Én is szeretlek, {nev}! ❤️", "Szeretet-roham! ❤️🔥", "Ez kellett! Szeretlek! 💖"],
        elsoSimi: "Simogass meg: húzd rajtam az ujjad! 👆"
    };

    // ======================= TESZT KAPCSOLÓK (URL) =======================
    // pl. index.html?napszak=ejjel  |  ?karacsony=1  |  ?evfordulo=1
    const URLP = new URLSearchParams(location.search);

    // ======================= ÁLLAPOT =======================
    const KULCS = "kekcica.allapot.v2";
    const ORA = 3600 * 1000;
    let A = betolt();
    ["utolsoEtetes", "utolsoSzeretetSziv", "utolsoJatek", "utolsoEbredes"].forEach((m) => { if (!A[m]) A[m] = Date.now(); });

    function betolt() {
        try { return Object.assign(alapAllapot(), JSON.parse(localStorage.getItem(KULCS) || "{}")); }
        catch (e) { return alapAllapot(); }
    }
    function alapAllapot() {
        return {
            boldog: false,
            utolsoSzeretet: 0,
            utolsoLatogatas: 0,
            elsoNap: null,
            cetliNyitva: null,
            kezdoDatum: null,
            hang: true,
            altatva: 0,
            utolsoEtetes: 0,
            utolsoSzeretetSziv: 0,
            utolsoEbredes: 0,
            altatvaHossz: 0,
            utolsoJatek: 0,
            simiOsszes: 0,
            unnepeltNap: null
        };
    }
    function ment() {
        try { localStorage.setItem(KULCS, JSON.stringify(A)); } catch (e) { /* tele / tiltva */ }
    }

    // ======================= SEGÉDEK =======================
    const $ = (id) => document.getElementById(id);
    const randomElem = (t) => t[Math.floor(Math.random() * t.length)];
    const most = () => Date.now();

    function datumKulcs(d = new Date()) {
        const p = (n) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    }
    function kulcsbolDatum(k) {
        const [e, h, n] = k.split("-").map(Number);
        return new Date(e, h - 1, n);
    }
    // Naptári napok különbsége (óraátállítás-biztos)
    function napKulonbseg(a, b) {
        const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.round((ub - ua) / 86400000);
    }

    function napszak() {
        const kenyszer = URLP.get("napszak");
        if (["reggel", "nappal", "este", "ejjel"].includes(kenyszer)) return kenyszer;
        const o = new Date().getHours();
        if (o >= 5 && o < 10) return "reggel";
        if (o >= 10 && o < 18) return "nappal";
        if (o >= 18 && o < 22) return "este";
        return "ejjel";
    }

    function karacsonyVan() {
        if (URLP.get("karacsony") === "1") return true;
        return new Date().getMonth() === 11; // december
    }

    function kezdoDatum() {
        const k = A.kezdoDatum || B.kezdoDatum;
        return k && /^\d{4}-\d{2}-\d{2}$/.test(k) ? k : null;
    }

    // ======================= DOM =======================
    const cicaBox = $("cicaBox");
    const cicaImage = $("cicaImage");
    const kepKeret = $("kepKeret");
    const sapka = $("sapka");
    const ugro = $("ugro");
    const statusText = $("statusText");

    // ======================= HANG (Web Audio, fájlok nélkül) =======================
    const Hang = {
        ctx: null,
        dorombolas: null,
        dorombolasStop: null,

        indit() {
            if (!A.hang) return null;
            if (!this.ctx) {
                const AC = window.AudioContext || window.webkitAudioContext;
                if (!AC) return null;
                this.ctx = new AC();
            }
            if (this.ctx.state === "suspended") this.ctx.resume();
            return this.ctx;
        },

        miau() {
            const c = this.indit(); if (!c) return;
            const t = c.currentTime;
            const o = c.createOscillator();
            const f = c.createBiquadFilter();
            const g = c.createGain();
            o.type = "sawtooth";
            const alap = 560 + Math.random() * 120;
            o.frequency.setValueAtTime(alap, t);
            o.frequency.linearRampToValueAtTime(alap * 1.45, t + 0.12);
            o.frequency.linearRampToValueAtTime(alap * 0.8, t + 0.42);
            f.type = "bandpass"; f.frequency.value = 1400; f.Q.value = 1.6;
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(0.22, t + 0.04);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.46);
            o.connect(f); f.connect(g); g.connect(c.destination);
            o.start(t); o.stop(t + 0.5);
        },

        nyam() {
            const c = this.indit(); if (!c) return;
            [0, 0.16].forEach((k) => {
                const t = c.currentTime + k;
                const o = c.createOscillator(); const g = c.createGain();
                o.type = "triangle";
                o.frequency.setValueAtTime(420, t);
                o.frequency.exponentialRampToValueAtTime(260, t + 0.1);
                g.gain.setValueAtTime(0.0001, t);
                g.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
                g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
                o.connect(g); g.connect(c.destination);
                o.start(t); o.stop(t + 0.14);
            });
        },

        pattan() {
            const c = this.indit(); if (!c) return;
            const t = c.currentTime;
            const o = c.createOscillator(); const g = c.createGain();
            o.type = "sine";
            o.frequency.setValueAtTime(300, t);
            o.frequency.exponentialRampToValueAtTime(900, t + 0.08);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
            o.connect(g); g.connect(c.destination);
            o.start(t); o.stop(t + 0.14);
        },

        // Dorombolás: szűrt zaj, ~25 Hz-es "lüktetéssel"
        dorombol() {
            const c = this.indit(); if (!c) return;
            clearTimeout(this.dorombolasStop);
            this.dorombolasStop = setTimeout(() => this.dorombolasVege(), 450);
            if (this.dorombolas) return;

            const hossz = c.sampleRate * 1;
            const buf = c.createBuffer(1, hossz, c.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < hossz; i++) d[i] = Math.random() * 2 - 1;
            const zaj = c.createBufferSource(); zaj.buffer = buf; zaj.loop = true;

            const szuro = c.createBiquadFilter(); szuro.type = "lowpass"; szuro.frequency.value = 380;
            const lukteto = c.createGain(); lukteto.gain.value = 0.5;
            const lfo = c.createOscillator(); lfo.frequency.value = 24;
            const lfoGain = c.createGain(); lfoGain.gain.value = 0.5;
            const fo = c.createGain(); fo.gain.value = 0.0001;

            lfo.connect(lfoGain); lfoGain.connect(lukteto.gain);
            zaj.connect(szuro); szuro.connect(lukteto); lukteto.connect(fo); fo.connect(c.destination);
            zaj.start(); lfo.start();
            fo.gain.setValueAtTime(0.0001, c.currentTime);
            fo.gain.exponentialRampToValueAtTime(0.5, c.currentTime + 0.15);
            this.dorombolas = { zaj, lfo, fo };
        },

        dorombolasVege() {
            const d = this.dorombolas; if (!d || !this.ctx) return;
            this.dorombolas = null;
            const t = this.ctx.currentTime;
            d.fo.gain.cancelScheduledValues(t);
            d.fo.gain.setValueAtTime(d.fo.gain.value, t);
            d.fo.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
            d.zaj.stop(t + 0.35); d.lfo.stop(t + 0.35);
        }
    };

    function rezges(ms) {
        if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) { /* nem támogatott */ } }
    }

    // ======================= MATRICÁK (IndexedDB) =======================
    const Matricak = {
        db: null,
        lista: [],

        nyit() {
            if (this.db) return Promise.resolve(this.db);
            return new Promise((res, rej) => {
                if (!window.indexedDB) return rej(new Error("nincs IndexedDB"));
                const r = indexedDB.open("kekcica", 1);
                r.onupgradeneeded = () => r.result.createObjectStore("matricak", { keyPath: "id" });
                r.onsuccess = () => { this.db = r.result; res(this.db); };
                r.onerror = () => rej(r.error);
            });
        },
        async tx(mod, fn) {
            const db = await this.nyit();
            return new Promise((res, rej) => {
                const t = db.transaction("matricak", mod);
                const eredmeny = fn(t.objectStore("matricak"));
                t.oncomplete = () => res(eredmeny && eredmeny.result);
                t.onerror = () => rej(t.error);
            });
        },
        async betolt() {
            try {
                const osszes = await this.tx("readonly", (s) => s.getAll());
                this.lista = (osszes || []).sort((a, b) => a.id - b.id);
            } catch (e) { this.lista = []; }
            return this.lista;
        },
        async hozzaad(dataUrl) {
            const m = { id: Date.now() + Math.random(), dataUrl };
            await this.tx("readwrite", (s) => s.put(m));
            this.lista.push(m);
        },
        async torol(id) {
            await this.tx("readwrite", (s) => s.delete(id));
            this.lista = this.lista.filter((m) => m.id !== id);
        }
    };

    // ======================= KÉP MEGJELENÍTÉS =======================
    const KEP_MERET = 150;
    let aktualisKep = "";

    function kepBeallit(src) {
        aktualisKep = src;
        cicaImage.onload = () => {
            const w = cicaImage.naturalWidth, h = cicaImage.naturalHeight;
            if (!w || !h) return;
            const s = Math.min(KEP_MERET / w, KEP_MERET / h);
            cicaImage.style.width = Math.round(w * s) + "px";
            cicaImage.style.height = Math.round(h * s) + "px";
            sapkaIgazit();
        };
        cicaImage.src = src;
    }

    function sapkaIgazit() {
        const nev = aktualisKep.startsWith("data:") ? null : aktualisKep.split("/").pop();
        const p = nev && SAPKA[nev];
        if (!p) { sapka.classList.remove("van"); return; }
        const w = parseFloat(cicaImage.style.width) || KEP_MERET;
        sapka.style.width = (w * p.w / 100) + "px";
        sapka.style.left = p.x + "%";
        sapka.style.top = p.y + "%";
        sapka.style.transform = `translate(-47%, -79%) rotate(${p.r}deg)`;
        sapka.classList.add("van");
    }

    function boldogKepLista() {
        const extra = karacsonyVan() ? [K.karacsony, K.karacsony] : [];
        return boldogKepek.concat(extra, Matricak.lista.map((m) => m.dataUrl));
    }

    function ujBoldogKep() {
        const lista = boldogKepLista();
        let uj = randomElem(lista);
        if (uj === aktualisKep && lista.length > 1) uj = randomElem(lista.filter((k) => k !== aktualisKep));
        return uj;
    }

    // A régi szöveget teljesen kicseréljük (nem áttűnéssel), mert iPhone-on
    // az áttűnés miatt a régi és új szöveg egymásra rajzolódott.
    let utolsoSzoveg = "";
    function mond(szoveg) {
        if (szoveg === utolsoSzoveg) return;
        utolsoSzoveg = szoveg;
        const span = document.createElement("span");
        span.textContent = nevvel(szoveg);
        statusText.replaceChildren(span);
    }

    function nevvel(sz) {
        const nevek = (B.becenevek && B.becenevek.length) ? B.becenevek : ["Cuki"];
        return sz.replace(/\{nev\}/g, () => randomElem(nevek));
    }

    function ugrasAnimacio() {
        ugro.classList.remove("pop");
        void ugro.offsetWidth; // újraindítja az animációt
        ugro.classList.add("pop");
    }

    function boldogSzoveg() {
        if (karacsonyVan() && Math.random() < 0.4) return randomElem(SZ.karacsonyBoldog);
        return randomElem(SZ.boldog);
    }

    // ======================= HANGULAT =======================
    const ALTATAS_HOSSZ = 8 * ORA;
    const EBREN_ORA = (B.alvas && B.alvas.ebrenOra) || 10;           // ennyi óra ébrenlét után elalszik magától
    const MAGATOL_ALVAS_ORA = (B.alvas && B.alvas.alvasOra) || 1;    // és ennyi ideig alszik
    function altatvaVan() {
        return !!A.altatva && most() - A.altatva < (A.altatvaHossz || ALTATAS_HOSSZ);
    }
    // Alvás-ciklus: 10 óra ébrenlét után magától elalszik 1 órára (akkor is, ha közben nincs nyitva az app).
    // Visszaad: { most: épp most aludt el / alszik, aludt: közben aludt és már felébredt }
    function alvasCiklus() {
        const ki = { most: false, aludt: false };
        if (alszik()) return ki;
        const EB = EBREN_ORA * ORA, AL = MAGATOL_ALVAS_ORA * ORA, t = most();
        let kezd = (A.utolsoEbredes || t) + EB;
        while (kezd + AL <= t) {           // ezt az alvást már végigaludta, amíg nem néztük
            A.utolsoEbredes = kezd + AL;
            kezd = A.utolsoEbredes + EB;
            ki.aludt = true;
        }
        if (t >= kezd) {                   // épp alszik
            A.boldog = false;
            A.altatva = kezd;
            A.altatvaHossz = AL;
            ki.most = true;
        }
        ment();
        return ki;
    }
    function magatolElalszik() {
        const c = alvasCiklus();
        if (c.most) szomoruraValt(randomElem(SZ.eepyzek), randomElem(alvoKepek));
        return c.most;
    }
    // Lejárt az alvás (vagy felébresztették)
    function felebred(mikor) {
        A.altatva = 0;
        A.altatvaHossz = 0;
        A.utolsoEbredes = mikor || most();
        ment();
    }
    function alszik() {
        return !A.boldog && (napszak() === "ejjel" || altatvaVan());
    }
    // ======================= ÉLETCSÍK (3 szív) =======================
    // Minden szív egy igény: éhség 🐟, alvás 😴, játék 🧶.
    // Ha egy igény régóta nincs kielégítve, az a szív kiürül.
    const IG = Object.assign({ ehes: 5, szeretet: 4, jatek: 4 }, B.igenyekOraban || {});
    const IGENYEK = [
        { kulcs: "ehes", mezo: "utolsoEtetes", ikon: "🐟", ora: IG.ehes },
        { kulcs: "szeretet", mezo: "utolsoSzeretetSziv", ikon: "🫶", ora: IG.szeretet },
        { kulcs: "jatek", mezo: "utolsoJatek", ikon: "🧶", ora: IG.jatek }
    ];
    function igenyHianyzik(ig) {
        return most() - (A[ig.mezo] || 0) > ig.ora * ORA;
    }
    function hianyzoIgenyek() {
        return IGENYEK.filter(igenyHianyzik);
    }
    function ehes() {
        return igenyHianyzik(IGENYEK[0]);
    }
    function igenySzoveg(ig) {
        return randomElem(ig.kulcs === "ehes" ? SZ.ehes : ig.kulcs === "szeretet" ? SZ.szeretethiany : SZ.jatszani);
    }
    function szomoruSzoveg() {
        if (alszik()) return randomElem(altatvaVan() ? SZ.eepyzek : SZ.alszik);
        const h = hianyzoIgenyek();
        if (h.length && Math.random() < 0.7) return igenySzoveg(randomElem(h));
        return randomElem(SZ.szomoru);
    }

    let elozoTeli = null;
    function eletFrissit(unnepelhet) {
        const sor = $("eletcsik");
        if (!sor) return;
        let teli = 0;
        IGENYEK.forEach((ig, i) => {
            const el = sor.children[i];
            const ok = !igenyHianyzik(ig);
            if (ok) teli++;
            const volt = el.classList.contains("ures");
            el.classList.toggle("ures", !ok);
            if (volt && ok) { el.classList.remove("feltolt"); void el.offsetWidth; el.classList.add("feltolt"); }
        });
        if (unnepelhet && elozoTeli !== null && elozoTeli < 3 && teli === 3) {
            setTimeout(() => {
                konfetti(45);
                Hang.miau();
                mond(randomElem(SZ.tele3));
            }, 900);
        }
        elozoTeli = teli;
    }

    function igenyTeljesul(mezo) {
        A[mezo] = most();
        ment();
        eletFrissit(true);
    }

    function szomoruraValt(szoveg, kep) {
        A.boldog = false;
        simiLepesek = 0;
        ment();
        kepBeallit(kep || (alszik() ? randomElem(alvoKepek) : randomElem(szomoruKepek)));
        mond(szoveg || szomoruSzoveg());
        alvasFrissit();
    }

    function boldograValt(szoveg, kep) {
        if (alszik() || A.altatva) {
            felebred();
            if (!szoveg) szoveg = randomElem(SZ.eepyVoltam);
        }
        A.boldog = true;
        A.utolsoSzeretet = most();
        A.utolsoLatogatas = most();
        simiLepesek = 0;
        ment();
        kepBeallit(kep || ujBoldogKep());
        mond(szoveg || boldogSzoveg());
        alvasFrissit();
    }

    function szeretetFrissit() {
        A.utolsoSzeretet = most();
        A.utolsoLatogatas = most();
        ment();
    }

    // Megnyitáskor / visszatéréskor: mennyi idő telt el, milyen kedvében van?
    function ertekel(elsoBetoltes) {
        napszakAlkalmaz();
        const t = most();
        const elteltLatogatas = A.utolsoLatogatas ? t - A.utolsoLatogatas : 0;

        if (A.boldog && t - A.utolsoSzeretet > ORA) A.boldog = false;

        let szoveg = null, kep = null;
        let ebredtSzoveg = null;
        if (A.altatva && !altatvaVan()) {
            felebred(A.altatva + (A.altatvaHossz || ALTATAS_HOSSZ));
            ebredtSzoveg = randomElem(SZ.eepyVoltam);
        }
        const ciklus = alvasCiklus();
        if (ciklus.aludt && !ciklus.most) ebredtSzoveg = randomElem(SZ.eepyVoltam);
        const nsz = napszak();

        if (elsoBetoltes) {
            const unnep = unnepEllenoriz();
            if (unnep) szoveg = unnep;
        }
        if (!szoveg && A.simiOsszes === 0) szoveg = SZ.elsoSimi;
        if (!szoveg && ebredtSzoveg && !alszik()) szoveg = ebredtSzoveg;
        if (!szoveg && !A.boldog) {
            if (alszik()) szoveg = null;
            else if (nsz === "reggel" && elteltLatogatas > 3 * ORA) { szoveg = randomElem(SZ.reggel); kep = K.reggel; }
            else if (elteltLatogatas > 3 * ORA) szoveg = hianyzasSzoveg(elteltLatogatas);
            else if (elsoBetoltes && nsz === "reggel") { szoveg = randomElem(SZ.reggel); kep = K.reggel; }
            else if (elsoBetoltes && nsz === "este") szoveg = randomElem(SZ.este);
        }
        if (!szoveg && A.boldog && elteltLatogatas > 3 * ORA) szoveg = "Visszajöttél! 🥰";

        if (alszik() && napszak() === "ejjel") A.utolsoEbredes = t;  // éjjel alszik, az is pihenés
        A.utolsoLatogatas = t;
        ment();

        if (ciklus.most && !szoveg) szoveg = randomElem(SZ.eepyzek);

        if (A.boldog) {
            if (elsoBetoltes || !aktualisKep) kepBeallit(ujBoldogKep());
            mond(szoveg || boldogSzoveg());
            alvasFrissit();
        } else {
            szomoruraValt(szoveg, kep);
        }
        cetliJelzes();
        egyuttFrissit();
        eletFrissit(false);
    }

    function hianyzasSzoveg(ms) {
        const ora = Math.floor(ms / ORA);
        if (ora < 24) return `Hiányoztál! ${ora} órája nem jöttél 🥺`;
        const nap = Math.floor(ora / 24);
        return `Hiányoztál! ${nap} napja nem jöttél 🥺💔`;
    }

    // Percenként: lejárt-e az 1 óra, változott-e a napszak?
    let utolsoNapszak = null;
    setInterval(() => {
        if (document.hidden) return;
        const nsz = napszak();
        if (A.boldog && most() - A.utolsoSzeretet > ORA) {
            szomoruraValt();
        } else if (A.altatva && !altatvaVan()) {
            felebred();
            if (!A.boldog) szomoruraValt(randomElem(SZ.eepyVoltam), randomElem(szomoruKepek));
        } else if (magatolElalszik()) {
            /* elaludt */
        } else if (nsz !== utolsoNapszak) {
            napszakAlkalmaz();
            if (!A.boldog) szomoruraValt();
        }
        if (alszik() && napszak() === "ejjel") { A.utolsoEbredes = most(); ment(); }
        cetliJelzes();
        egyuttFrissit();
        eletFrissit(false);
    }, 60 * 1000);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            A.utolsoLatogatas = most();
            ment();
            Hang.dorombolasVege();
        } else {
            ertekel(false);
        }
    });

    // ======================= NAPSZAK + ÉJSZAKA =======================
    function napszakAlkalmaz() {
        const nsz = napszak();
        utolsoNapszak = nsz;
        document.body.classList.remove("napszak-reggel", "napszak-nappal", "napszak-este", "napszak-ejjel");
        document.body.classList.add("napszak-" + nsz);
        document.body.classList.toggle("karacsony", karacsonyVan());
        const szinek = { reggel: "#fff3e6", nappal: "#eef4fb", este: "#b9a6ec", ejjel: "#121a31" };
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", szinek[nsz]);
    }

    let zzzIdozito = null;
    function alvasFrissit() {
        const kell = alszik();
        if (kell && !zzzIdozito) {
            zzzIdozito = setInterval(() => {
                if (document.hidden) return;
                const z = document.createElement("div");
                z.className = "zzz";
                z.textContent = Math.random() < 0.5 ? "z" : "Z";
                z.style.fontSize = (12 + Math.random() * 10) + "px";
                z.style.left = "58%";
                z.style.top = "38%";
                cicaBox.appendChild(z);
                setTimeout(() => z.remove(), 2400);
            }, 1100);
        } else if (!kell && zzzIdozito) {
            clearInterval(zzzIdozito);
            zzzIdozito = null;
        }
    }

    function csillagokLetrehoz() {
        const r = $("csillagok");
        for (let i = 0; i < 28; i++) {
            const s = document.createElement("div");
            s.className = "csillag";
            s.textContent = Math.random() < 0.3 ? "✦" : "·";
            s.style.left = Math.random() * 100 + "%";
            s.style.top = Math.random() * 100 + "%";
            s.style.fontSize = (s.textContent === "·" ? 22 : 9 + Math.random() * 8) + "px";
            s.style.setProperty("--t", (2 + Math.random() * 3) + "s");
            s.style.setProperty("--d", (-Math.random() * 4) + "s");
            r.appendChild(s);
        }
    }

    function hoesesLetrehoz() {
        const r = $("hoeses");
        for (let i = 0; i < 34; i++) {
            const h = document.createElement("div");
            h.className = "hopehely";
            h.textContent = Math.random() < 0.4 ? "❄" : "•";
            h.style.left = Math.random() * 100 + "%";
            h.style.fontSize = (6 + Math.random() * 12) + "px";
            h.style.opacity = 0.5 + Math.random() * 0.5;
            h.style.setProperty("--t", (6 + Math.random() * 8) + "s");
            h.style.setProperty("--d", (-Math.random() * 14) + "s");
            h.style.setProperty("--x", ((Math.random() - 0.5) * 120) + "px");
            r.appendChild(h);
        }
    }

    // ======================= EFFEKTEK =======================
    function szivecske(x, y, kicsi, jel) {
        const h = document.createElement("div");
        h.className = "floating-heart" + (kicsi ? " kicsi" : "");
        h.textContent = jel || (Math.random() < 0.8 ? "❤️" : "💕");
        h.style.setProperty("--x", ((Math.random() - 0.5) * 80) + "px");
        h.style.left = (x == null ? 50 : x) + (x == null ? "%" : "px");
        h.style.top = (y == null ? 40 : y) + (y == null ? "%" : "px");
        cicaBox.appendChild(h);
        setTimeout(() => h.remove(), 900);
    }

    function morzsak(x, y, jelek) {
        for (let i = 0; i < 7; i++) {
            const m = document.createElement("div");
            m.className = "morzsa";
            m.textContent = randomElem(jelek);
            m.style.left = x + "px";
            m.style.top = y + "px";
            const sz = Math.random() * Math.PI * 2;
            m.style.setProperty("--x", Math.cos(sz) * 40 + "px");
            m.style.setProperty("--y", Math.sin(sz) * 40 + "px");
            cicaBox.appendChild(m);
            setTimeout(() => m.remove(), 700);
        }
    }

    function konfetti(darab = 90) {
        const r = $("konfetti");
        const szinek = ["#ff4a7a", "#ffb3c7", "#4a90e2", "#a8cfff", "#ffd166", "#b48cf2", "#7ad7a8"];
        for (let i = 0; i < darab; i++) {
            const k = document.createElement("div");
            k.className = "konfetti";
            k.style.left = Math.random() * 100 + "%";
            k.style.background = randomElem(szinek);
            k.style.setProperty("--x", ((Math.random() - 0.5) * 200) + "px");
            k.style.setProperty("--r", (360 + Math.random() * 720) * (Math.random() < 0.5 ? -1 : 1) + "deg");
            k.style.setProperty("--t", (2 + Math.random() * 1.6) + "s");
            k.style.setProperty("--d", (Math.random() * 0.6) + "s");
            if (Math.random() < 0.3) { k.style.borderRadius = "50%"; k.style.width = k.style.height = "9px"; }
            r.appendChild(k);
            setTimeout(() => k.remove(), 4400);
        }
    }

    // ======================= SIMOGATÁS (húzás) =======================
    const SIMI_TAV = 70;       // ennyi px húzás = 1 simi
    const SIMI_BOLDOG = 6;     // ennyi simi kell, hogy boldog legyen
    let simiLepesek = 0;
    let lenyomva = false, mozgott = 0, tav = 0, elozo = null, utolsoMondas = 0;

    cicaBox.addEventListener("pointerdown", (e) => {
        lenyomva = true; mozgott = 0; tav = 0;
        elozo = { x: e.clientX, y: e.clientY };
        try { cicaBox.setPointerCapture(e.pointerId); } catch (_) { /* régi böngésző */ }
        Hang.indit();
    });

    cicaBox.addEventListener("pointermove", (e) => {
        if (!lenyomva || !elozo) return;
        const d = Math.hypot(e.clientX - elozo.x, e.clientY - elozo.y);
        elozo = { x: e.clientX, y: e.clientY };
        mozgott += d; tav += d;
        if (tav >= SIMI_TAV) {
            tav = 0;
            const r = cicaBox.getBoundingClientRect();
            simiLepes(e.clientX - r.left, e.clientY - r.top);
        }
    });

    function felenged() {
        if (!lenyomva) return;
        lenyomva = false;
        if (mozgott < 12) bokes();
        elozo = null;
    }
    cicaBox.addEventListener("pointerup", felenged);
    cicaBox.addEventListener("pointercancel", () => { lenyomva = false; elozo = null; });

    function simiLepes(x, y) {
        simiLepesek++;
        A.simiOsszes++;
        szivecske(x, y, true, Math.random() < 0.5 ? "💕" : "✨");
        Hang.dorombol();
        rezges(8);

        const t = most();
        if (!A.boldog) {
            if (alszik() && simiLepesek <= 2) {
                mond(randomElem(SZ.ebredes));
            } else if (simiLepesek >= SIMI_BOLDOG) {
                ugrasAnimacio();
                for (let i = 0; i < 4; i++) setTimeout(() => szivecske(), i * 90);
                Hang.miau();
                boldograValt();
                return;
            } else if (t - utolsoMondas > 700) {
                utolsoMondas = t;
                const i = Math.min(SZ.simiSzomoru.length - 1, Math.floor(simiLepesek / 2));
                mond(SZ.simiSzomoru[i]);
            }
        } else {
            szeretetFrissit();
            if (simiLepesek >= 10) {
                simiLepesek = 0;
                ugrasAnimacio();
                for (let i = 0; i < 3; i++) setTimeout(() => szivecske(), i * 90);
                Hang.miau();
                boldograValt("Átváltozááás! " + boldogSzoveg());
                return;
            }
            if (t - utolsoMondas > 1400) {
                utolsoMondas = t;
                mond(randomElem(SZ.simiBoldog));
            }
        }
        ment();
    }

    function bokes() {
        ugrasAnimacio();
        Hang.pattan();
        if (alszik()) { mond(randomElem(SZ.ebredes)); return; }
        mond(randomElem(SZ.bokes));
    }

    // ======================= GOMBOK =======================
    $("heartBtn").addEventListener("click", () => {
        ugrasAnimacio();
        for (let i = 0; i < 5; i++) setTimeout(() => szivecske(), i * 100);
        Hang.miau();
        rezges(20);
        if (karacsonyVan() && Math.random() < 0.5) boldograValt("Karácsonyi szeretet-roham! 🎄❤️", K.karacsony);
        else boldograValt(randomElem(SZ.szeretet));
    });

    // Alvás gomb: a cica elalszik (eepy), simogatással lehet felébreszteni
    $("sadBtn").addEventListener("click", () => {
        ugrasAnimacio();
        A.boldog = false;
        A.altatva = most();
        A.altatvaHossz = ALTATAS_HOSSZ;
        szomoruraValt(randomElem(SZ.eepy), randomElem(alvoKepek));
    });

    // Etetés
    const ETETES_SZUNET = 20 * 60 * 1000;
    $("halBtn").addEventListener("click", (e) => {
        const gomb = e.currentTarget;
        if (most() - A.utolsoEtetes < ETETES_SZUNET) {
            ugrasAnimacio();
            mond(randomElem(SZ.tele));
            return;
        }
        gomb.disabled = true;
        const g = gomb.getBoundingClientRect();
        const c = kepKeret.getBoundingClientRect();
        const hal = document.createElement("div");
        hal.className = "repulo";
        hal.textContent = "🐟";
        hal.style.left = (g.left + g.width / 2 - 18) + "px";
        hal.style.top = (g.top + g.height / 2 - 18) + "px";
        document.body.appendChild(hal);
        requestAnimationFrame(() => requestAnimationFrame(() => {
            const dx = (c.left + c.width / 2) - (g.left + g.width / 2);
            const dy = (c.top + c.height / 2) - (g.top + g.height / 2);
            hal.style.transform = `translate(${dx}px, ${dy}px) rotate(-25deg) scale(0.7)`;
            hal.style.opacity = "0";
        }));
        setTimeout(() => {
            hal.remove();
            const r = cicaBox.getBoundingClientRect();
            morzsak(c.left + c.width / 2 - r.left, c.top + c.height / 2 - r.top, ["✨", "💛", "·"]);
            ugrasAnimacio();
            Hang.nyam();
            rezges(15);
            boldograValt(randomElem(SZ.etetes), K.hal);
            igenyTeljesul("utolsoEtetes");
            gomb.disabled = false;
        }, 650);
    });

    // Játék
    $("jatekBtn").addEventListener("click", (e) => {
        const gomb = e.currentTarget;
        gomb.disabled = true;
        const g = document.createElement("div");
        g.className = "gombolyag";
        g.textContent = "🧶";
        cicaBox.appendChild(g);
        mond(SZ.jatek[0]);
        [300, 750, 1200].forEach((t) => setTimeout(() => { ugrasAnimacio(); Hang.pattan(); }, t));
        setTimeout(() => {
            g.remove();
            for (let i = 0; i < 3; i++) setTimeout(() => szivecske(), i * 90);
            Hang.miau();
            boldograValt(randomElem(SZ.jatek.slice(1)), K.gombolyag);
            igenyTeljesul("utolsoJatek");
            gomb.disabled = false;
        }, 1500);
    });

    // Életcsík: koppintásra elmondja, mi kell neki
    Array.from($("eletcsik").children).forEach((el, i) => {
        el.addEventListener("click", () => {
            const ig = IGENYEK[i];
            ugrasAnimacio();
            if (ig.kulcs === "szeretet") {
                // a szeretet-szívet a szívre koppintás tölti fel
                for (let k = 0; k < 4; k++) setTimeout(() => szivecske(), k * 90);
                Hang.miau();
                rezges(15);
                boldograValt(alszik() ? null : randomElem(SZ.szeretetSziv));
                igenyTeljesul(ig.mezo);
                return;
            }
            if (igenyHianyzik(ig)) mond(igenySzoveg(ig));
            else mond({ ehes: "Tele a pocim! 🐟💖", jatek: "Már játszottunk! 🧶💖" }[ig.kulcs]);
        });
    });

    // Hang be/ki
    function hangGombFrissit() { $("hangGomb").textContent = A.hang ? "🔊 Hang" : "🔇 Néma"; }
    $("hangGomb").addEventListener("click", () => {
        A.hang = !A.hang;
        if (!A.hang) Hang.dorombolasVege();
        ment();
        hangGombFrissit();
        if (A.hang) Hang.miau();
    });

    // ======================= LAPOK (felugrók) =======================
    function lapNyit(id) { $(id).hidden = false; }
    function lapZar(id) { $(id).hidden = true; }
    document.querySelectorAll(".lap-hatter").forEach((h) => {
        h.addEventListener("click", (e) => {
            if (e.target === h || e.target.closest("[data-bezar]")) h.hidden = true;
        });
    });

    // ======================= NAPI CETLI =======================
    function maiCetliIndex() {
        const lista = B.cetlik || [];
        if (!lista.length) return -1;
        if (!A.elsoNap) { A.elsoNap = datumKulcs(); ment(); }
        const n = Math.max(0, napKulonbseg(kulcsbolDatum(A.elsoNap), new Date()));
        return n % lista.length;
    }

    function cetliJelzes() {
        $("cetliGomb").classList.toggle("uj", A.cetliNyitva !== datumKulcs());
    }

    $("cetliGomb").addEventListener("click", () => {
        const i = maiCetliIndex();
        const lista = B.cetlik || [];
        const sajat = sajatUnnep(maNap());
        $("cetliSzoveg").textContent = sajat ? sajat.cetli : (i >= 0 ? nevvel(lista[i]) : "Ma nincs cetli... de attól még szeretlek! ❤️");
        $("cetliSzam").textContent = i >= 0 ? `#${i + 1}` : "";
        const mar = A.cetliNyitva === datumKulcs();
        $("boritek").hidden = mar;
        $("boritek").classList.remove("nyilik");
        $("level").hidden = !mar;
        lapNyit("cetliLap");
    });

    $("boritek").addEventListener("click", () => {
        const b = $("boritek");
        if (b.classList.contains("nyilik")) return;
        b.classList.add("nyilik");
        Hang.pattan();
        rezges(15);
        setTimeout(() => {
            b.hidden = true;
            $("level").hidden = false;
            A.cetliNyitva = datumKulcs();
            ment();
            cetliJelzes();
            konfetti(30);
            boldograValt("Tetszett a cetli? 💌", K.level);
        }, 420);
    });

    // ======================= EGYÜTT X NAPJA + ÉVFORDULÓ =======================
    function egyuttNapok() {
        const k = kezdoDatum();
        if (!k) return null;
        return napKulonbseg(kulcsbolDatum(k), new Date());
    }

    function egyuttFrissit() {
        const n = egyuttNapok();
        const pill = $("egyuttPill");
        if (n == null) pill.textContent = "💞 Mióta vagytok együtt?";
        else if (n < 0) pill.textContent = "💞 Hamarosan kezdődik! ✨";
        else pill.textContent = `${karacsonyVan() ? "🎄" : "💞"} Együtt ${n.toLocaleString("hu-HU")} napja`;
    }

    // Visszaadja az ünnepi szöveget, ha ma ünnep van (és első alkalommal konfettit is dob)
    // Mai nap (teszteléshez: ?ma=2027-06-24)
    function maNap() {
        const m = URLP.get("ma");
        return m && /^\d{4}-\d{2}-\d{2}$/.test(m) ? kulcsbolDatum(m) : new Date();
    }
    function hhnn(d) {
        return String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    }
    // Anna saját napjai (beallitasok.js): szülinap, névnap
    function sajatUnnep(ma) {
        const nev = B.nev || "";
        if (B.szuletesnap && hhnn(ma) === B.szuletesnap) {
            return { szoveg: `Boldog születésnapot, ${nev}! 🎂❤️`, cetli: `Boldog születésnapot, ${nev}! 🎂 Ma minden rólad szól. Nagyon-nagyon szeretlek! ❤️`, nagy: true };
        }
        if (B.nevnap && hhnn(ma) === B.nevnap) {
            return { szoveg: `Boldog névnapot, ${nev}! 🌷❤️`, cetli: `Boldog névnapot, ${nev}! 🌷 Ma te vagy a legszebb virág. Szeretlek! ❤️`, nagy: true };
        }
        return null;
    }

    function unnepEllenoriz(kenyszeritve) {
        const ma = maNap();
        let szoveg = null, nagy = false;
        const k = kezdoDatum();
        const sajat = sajatUnnep(ma);

        if (k) {
            const kezd = kulcsbolDatum(k);
            const n = napKulonbseg(kezd, ma);
            const evek = ma.getFullYear() - kezd.getFullYear();
            const honapok = evek * 12 + (ma.getMonth() - kezd.getMonth());
            if (n > 0 && ma.getMonth() === kezd.getMonth() && ma.getDate() === kezd.getDate()) {
                szoveg = `Boldog ${evek}. évfordulót! 🎉💖`; nagy = true;
            } else if (n > 0 && n % 100 === 0) {
                szoveg = `Ma van a ${n}. napunk! 🎉`; nagy = true;
            } else if (n > 0 && honapok > 0 && ma.getDate() === kezd.getDate()) {
                szoveg = `Boldog hónapfordulót! 💕 (${honapok}. hónap)`;
            }
        }
        // szülinap / névnap: elöl, és ha aznap más ünnep is van, mindkettő
        if (sajat) {
            szoveg = szoveg ? `${sajat.szoveg} ${szoveg}` : sajat.szoveg;
            nagy = true;
        }
        if (!szoveg && ma.getMonth() === 11 && ma.getDate() >= 24 && ma.getDate() <= 26) {
            szoveg = "Boldog karácsonyt! 🎄❤️"; nagy = true;
        }
        if (URLP.get("evfordulo") === "1" && !szoveg) { szoveg = "Boldog 1. évfordulót! 🎉💖"; nagy = true; }

        if (!szoveg) return null;
        const maKulcs = datumKulcs();
        if (kenyszeritve || A.unnepeltNap !== maKulcs) {
            A.unnepeltNap = maKulcs;
            ment();
            setTimeout(() => {
                konfetti(nagy ? 120 : 50);
                boldograValt(szoveg, K.unnep);
                Hang.miau();
            }, 500);
        }
        return szoveg;
    }

    $("egyuttPill").addEventListener("click", () => {
        if (!kezdoDatum()) { beallitasNyit(); return; }
        const unnep = unnepEllenoriz(true);
        const n = egyuttNapok();
        ugrasAnimacio();
        if (!unnep) {
            mond(n >= 0 ? `Már ${n.toLocaleString("hu-HU")} napja szeretjük egymást! 💞` : "Hamarosan! ✨");
            for (let i = 0; i < 3; i++) setTimeout(() => szivecske(), i * 100);
        } else {
            mond(unnep);
            kepBeallit(K.unnep);
        }
    });

    // ======================= BEÁLLÍTÁSOK =======================
    function beallitasNyit() {
        $("datumInput").value = kezdoDatum() || "";
        reszletFrissit();
        lapNyit("beallitasLap");
    }
    function reszletFrissit() {
        const v = $("datumInput").value;
        if (!v) { $("egyuttReszlet").textContent = "Add meg a napot, amikor összejöttetek. 💕"; return; }
        const n = napKulonbseg(kulcsbolDatum(v), new Date());
        $("egyuttReszlet").textContent = n >= 0 ? `Ez ${n.toLocaleString("hu-HU")} nap. 🥹` : "Ez még a jövőben van. 🤔";
    }
    $("datumInput").addEventListener("input", reszletFrissit);
    $("beallitasGomb").addEventListener("click", beallitasNyit);
    $("beallitasMentes").addEventListener("click", () => {
        A.kezdoDatum = $("datumInput").value || null;
        A.unnepeltNap = null;
        ment();
        egyuttFrissit();
        lapZar("beallitasLap");
        if (kezdoDatum()) {
            ugrasAnimacio();
            mond("Elmentettem! 💞");
            for (let i = 0; i < 3; i++) setTimeout(() => szivecske(), i * 100);
        }
    });

    // ======================= MATRICA FELTÖLTÉS =======================
    const MATRICA_MAX = 40;

    function matricaUzenet(sz) { $("matricaUzenet").textContent = sz; }

    function matricaRacsRajzol() {
        const r = $("matricaRacs");
        r.innerHTML = "";
        Matricak.lista.forEach((m) => {
            const d = document.createElement("div");
            d.className = "matrica";
            const img = document.createElement("img");
            img.src = m.dataUrl; img.alt = "Matrica";
            const t = document.createElement("button");
            t.type = "button"; t.textContent = "✕"; t.setAttribute("aria-label", "Törlés");
            t.addEventListener("click", async () => {
                await Matricak.torol(m.id);
                if (aktualisKep === m.dataUrl) kepBeallit(A.boldog ? ujBoldogKep() : randomElem(szomoruKepek));
                matricaRacsRajzol();
                matricaUzenet("Törölve. 🗑️");
            });
            d.append(img, t);
            r.appendChild(d);
        });
    }

    $("matricaGomb").addEventListener("click", async () => {
        await Matricak.betolt();
        matricaRacsRajzol();
        matricaUzenet("");
        lapNyit("matricaLap");
    });

    function kepBetolt(blob) {
        return new Promise((res, rej) => {
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => { URL.revokeObjectURL(url); res(img); };
            img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("nem olvasható kép")); };
            img.src = url;
        });
    }

    // Ha a képnek nincs átlátszó része, de egyszínű a háttere: kivágjuk (flood fill a szélekről)
    function hatterKivag(ctx, w, h) {
        const adat = ctx.getImageData(0, 0, w, h);
        const p = adat.data;
        let atlatszo = 0;
        for (let i = 3; i < p.length; i += 4) if (p[i] < 200) atlatszo++;
        if (atlatszo > w * h * 0.03) return false; // már átlátszó (pl. Apple-matrica)

        const sarkok = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]].map(([x, y]) => {
            const i = (y * w + x) * 4; return [p[i], p[i + 1], p[i + 2]];
        });
        const atl = [0, 1, 2].map((c) => sarkok.reduce((s, k) => s + k[c], 0) / 4);
        const tav = (i) => Math.abs(p[i] - atl[0]) + Math.abs(p[i + 1] - atl[1]) + Math.abs(p[i + 2] - atl[2]);
        const TUR = 60;
        if (sarkok.some((k) => Math.abs(k[0] - atl[0]) + Math.abs(k[1] - atl[1]) + Math.abs(k[2] - atl[2]) > TUR)) return false;

        const latott = new Uint8Array(w * h);
        const verem = [];
        for (let x = 0; x < w; x++) { verem.push(x, (h - 1) * w + x); }
        for (let y = 0; y < h; y++) { verem.push(y * w, y * w + w - 1); }
        while (verem.length) {
            const k = verem.pop();
            if (latott[k]) continue;
            latott[k] = 1;
            const i = k * 4;
            if (tav(i) > TUR) continue;
            p[i + 3] = 0;
            const x = k % w, y = (k / w) | 0;
            if (x > 0) verem.push(k - 1);
            if (x < w - 1) verem.push(k + 1);
            if (y > 0) verem.push(k - w);
            if (y < h - 1) verem.push(k + w);
        }
        ctx.putImageData(adat, 0, 0);
        return true;
    }

    function levag(vaszon) {
        const ctx = vaszon.getContext("2d");
        const { width: w, height: h } = vaszon;
        const p = ctx.getImageData(0, 0, w, h).data;
        let x0 = w, y0 = h, x1 = -1, y1 = -1;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
            if (p[(y * w + x) * 4 + 3] > 12) {
                if (x < x0) x0 = x; if (x > x1) x1 = x;
                if (y < y0) y0 = y; if (y > y1) y1 = y;
            }
        }
        if (x1 < 0) return null;
        const pad = 4;
        x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
        x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad);
        const uj = document.createElement("canvas");
        uj.width = x1 - x0 + 1; uj.height = y1 - y0 + 1;
        uj.getContext("2d").drawImage(vaszon, x0, y0, uj.width, uj.height, 0, 0, uj.width, uj.height);
        return uj;
    }

    async function matricaFeldolgoz(blob) {
        const img = await kepBetolt(blob);
        const MAX = 400;
        const s = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * s));
        const h = Math.max(1, Math.round(img.naturalHeight * s));
        const v = document.createElement("canvas");
        v.width = w; v.height = h;
        const ctx = v.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const kivagva = hatterKivag(ctx, w, h);
        const kesz = levag(v) || v;
        return { dataUrl: kesz.toDataURL("image/png"), kivagva };
    }

    async function matricakHozzaad(blobok) {
        blobok = blobok.filter((b) => b && b.type && b.type.startsWith("image/"));
        if (!blobok.length) { matricaUzenet("Nem találtam képet. 🤔"); return; }
        let db = 0, kivagott = 0;
        matricaUzenet("Dolgozom rajta... ✂️");
        for (const b of blobok) {
            if (Matricak.lista.length >= MATRICA_MAX) { matricaUzenet(`Legfeljebb ${MATRICA_MAX} matrica fér el. 🙈`); break; }
            try {
                const r = await matricaFeldolgoz(b);
                await Matricak.hozzaad(r.dataUrl);
                db++; if (r.kivagva) kivagott++;
            } catch (e) { /* egy rossz kép ne állítsa meg a többit */ }
        }
        matricaRacsRajzol();
        if (db) {
            matricaUzenet(`Kész! ${db} új matrica 🎉` + (kivagott ? " (hátteret kivágtam ✂️)" : ""));
            konfetti(25);
        } else if (Matricak.lista.length < MATRICA_MAX) {
            matricaUzenet("Ezt a képet nem sikerült beolvasni. 😿");
        }
    }

    $("matricaInput").addEventListener("change", async (e) => {
        const fajlok = Array.from(e.target.files || []);
        e.target.value = "";
        await matricakHozzaad(fajlok);
    });

    $("beillesztGomb").addEventListener("click", async () => {
        if (!navigator.clipboard || !navigator.clipboard.read) {
            matricaUzenet("Ez a böngésző nem engedi a beillesztést. Használd a ➕ gombot! 🙏");
            return;
        }
        try {
            const elemek = await navigator.clipboard.read();
            const blobok = [];
            for (const el of elemek) {
                const tipus = el.types.find((t) => t.startsWith("image/"));
                if (tipus) blobok.push(await el.getType(tipus));
            }
            if (!blobok.length) { matricaUzenet("A vágólapon nincs kép. Előbb másolj ki egyet! 📋"); return; }
            await matricakHozzaad(blobok);
        } catch (err) {
            matricaUzenet("Nem sikerült beilleszteni. Próbáld a ➕ gombbal! 🙏");
        }
    });

    // Asztali gépen: Ctrl/Cmd+V is működik, ha nyitva van a matrica-lap
    document.addEventListener("paste", (e) => {
        if ($("matricaLap").hidden) return;
        const fajlok = Array.from((e.clipboardData && e.clipboardData.files) || []);
        if (fajlok.length) { e.preventDefault(); matricakHozzaad(fajlok); }
    });

    // ======================= INDÍTÁS =======================
    function elotolt() {
        boldogKepek.concat(szomoruKepek, alvoKepek, Object.values(K)).forEach((k) => { const i = new Image(); i.src = k; });
    }

    async function indit() {
        elotolt();
        csillagokLetrehoz();
        hoesesLetrehoz();
        hangGombFrissit();
        await Matricak.betolt();
        ertekel(true);

        if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
            navigator.serviceWorker.register("sw.js").catch(() => { /* offline mód nélkül is megy */ });
        }
    }

    // Csak teszteléshez (?teszt=1)
    if (URLP.get("teszt") === "1") window.__kekcica = { kepBeallit };

    indit();
})();
