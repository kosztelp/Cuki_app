# 💙 Kék Cica

Egy kis kék cica a telefon kezdőképernyőjén, aki szeretetre vágyik.

## Mit tud?

- 👆 **Simogatás:** az ujjadat húzd végig a cicán. Közben dorombol, és ha eleget simogatod, boldog lesz.
- ❤️ **Szeretet**, 😴 **altatás** (eepy, simogatással ébred), 🐟 **etetés** (20 percenként; 5 óra után „éhes”), 🧶 **játék a gombolyaggal**.
- 💖 **Életcsík (3 szív):** 🐟 éhség (etetés tölti fel), 👆 szeretet (a szívecskére kell koppintani), 🧶 játék (gombolyag). Ha mindhárom tele, a cica ünnepel. Az időket a `beallitasok.js`-ben lehet állítani.
- 😴 **Alvás:** 10 óra ébrenlét után a cica magától elalszik 1 órára („eepyzek”), utána „eepy voltam”. Az alvás gombbal kézzel is el lehet altatni.
- 🎂 **Anna napjai:** születésnap (06.24) és névnap (07.26) – ünneplés, konfetti és külön cetli.
- ⏰ **Emlékszik:** egy óra simogatás nélkül elszomorodik. Ha sokáig nem jössz, megmondja, hogy hiányoztál.
- 💌 **Napi cetli:** minden nap egy új titkos üzenet nyílik ki.
- 💞 **Együtt X napja:** évfordulón, hónapfordulón és minden 100. napon konfetti jár.
- 🌙 **Napszakok:** reggel köszön, este csillagok jönnek elő, éjjel a cica alszik (Zzz).
- 🎄 **Karácsonyi mód** decemberben: hóesés és mikulássapka.
- 🖼️ **Saját matricák:** fotóból vagy kimásolt Apple-matricából. Ha a kép háttere egyszínű, azt is kivágja.
- 📴 Internet nélkül is működik.

## Képek

- Az eredeti 11 kép 6x nagyobb felbontású lett, éles körvonallal és átlátszó háttérrel (`forras/kep_elesito.py`).
- 9 új kép készült ugyanebben a stílusban (`forras/uj_cicak_rajzolo.py`): halat eszik, gombolyaggal játszik, párnán alszik, reggel integet, cetlit hoz, partizik, ajándékot ad (decemberben), könnyes, puszit küld.

## Testreszabás

Mindent a **`beallitasok.js`** fájlban találsz:

- `kezdoDatum`: mióta vagytok együtt, pl. `"2024-02-14"`. Az appban is beállítható (⚙️).
- `becenevek`: Cuki, Hehi, Szívem – a cica ezekkel szólítja meg.
- `cetlik`: a napi reggeli üzenetek listája. Írd át őket a saját szavaidra!

## Telepítés iPhone-ra

1. Nyisd meg az oldalt Safariban (pl. GitHub Pages linkről).
2. Megosztás → **Főképernyőhöz adás**.

## Teszteléshez

Az URL végére írva kipróbálhatod a különböző módokat:

- `?napszak=reggel` (vagy `nappal`, `este`, `ejjel`)
- `?karacsony=1`
- `?evfordulo=1`
- `?ma=2027-06-24` (egy adott nap ünnepeinek kipróbálása)

Ha új verziót töltesz fel, a `sw.js` fájlban emeld meg a `VERZIO` számot, hogy a telefon biztosan frissüljön.
