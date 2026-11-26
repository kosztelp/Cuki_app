// =====================================================================
//  KÉK CICA – BEÁLLÍTÁSOK
//  Ezt a fájlt nyugodtan írd át: itt van a dátum, a becenevek és a napi cetlik.
// =====================================================================

window.BEALLITASOK = {
    // Mióta vagytok együtt? Formátum: "ÉÉÉÉ-HH-NN"
    kezdoDatum: "2025-04-26",

    // Anna napjai (a cica ezen a néven köszönt) (HH-NN): ezeken a napokon a cica ünnepel, és külön cetli jár.
    nev: "Cuki",
    szuletesnap: "06-24",
    nevnap: "07-26",

    // Egyszeri üzenetek (csak ezeken a konkrét napokon, csak egyszer – jövőre már nem).
    // Ezeken a napokon ez az üzenet jelenik meg a cetliben és a köszöntőben, a többi nem.
    // Formátum: datum "ÉÉÉÉ-HH-NN"
    egyszeri: [
        { datum: "2026-11-27", szoveg: "Sok sikert a vizsgához, {nev}! 🍀", cetli: "Sok sikert a vizsgához, {nev}! 🍀 Hiszek benned, és szurkolok neked! Szeretlek! ❤️" },
        { datum: "2026-12-10", szoveg: "Sok sikert a vizsgához, {nev}! 🍀", cetli: "Sok sikert a vizsgához, {nev}! 🍀 Hiszek benned, és szurkolok neked! Szeretlek! ❤️" },
        { datum: "2026-12-15", szoveg: "Sok sikert a vizsgához, {nev}! 🍀", cetli: "Sok sikert a vizsgához, {nev}! 🍀 Hiszek benned, és szurkolok neked! Szeretlek! ❤️" }
    ],

    // Életcsík (3 szív): ennyi óra után ürül ki egy-egy szív.
    //  ehes: etetés tölti fel · szeretet: a szívecskére koppintás tölti fel · jatek: a gombolyag tölti fel
    igenyekOraban: { ehes: 5, szeretet: 4, jatek: 4 },

    // Alvás: ennyi óra ébrenlét után a cica magától elalszik (eepyzek), és ennyi óráig alszik.
    alvas: { ebrenOra: 10, alvasOra: 1 },

    // Becenevek: a cica ezek közül választ, amikor megszólítja (a szövegekben {nev}).
    becenevek: ["Cuki", "Hehi", "Szívem"],

    // Napi titkos cetlik (reggeli jókívánságok). Minden nap a következő nyílik ki, sorban.
    // Ha a végére ér, elölről kezdi. Írhatsz bele {nev}-et is, akkor véletlen becenév kerül oda.
    cetlik: [
        "Jó reggelt, Cuki! Legyen ma egy nagyon szép napod! ☀️",
        "Jó reggelt, Szívem! Ma minden sikerülni fog, hiszek benned. ❤️",
        "Szép napot, Hehi! Ne felejts el ma sokat mosolyogni. 😊",
        "Jó reggelt! Valaki már most nagyon gondol rád. 💌",
        "Sok sikert a mai naphoz, Cuki! Ügyes leszel. 💪",
        "Jó reggelt, Szívem! Igyál elég vizet, és vigyázz magadra. 💧",
        "Legyen ma minden pont olyan, amilyennek szeretnéd, Hehi! ✨",
        "Jó reggelt! Remélem, jól aludtál, és szépeket álmodtál. 🌙",
        "Szép napot, Cuki! Minden nap egy kicsit jobban szeretlek. 💖",
        "Jó reggelt, Szívem! Ma is gyönyörű vagy. 🌷",
        "Ha ma valami nehéz lesz, gondolj arra, hogy valaki mindig melletted áll. 🫶",
        "Jó reggelt, Hehi! Ma jár neked egy nagy ölelés. 🤗",
        "Legyen ma egy nyugodt, kedves napod, Cuki! 🍀",
        "Jó reggelt! A mai nap szuperereje: a mosolyod. ⚡",
        "Szép napot, Szívem! Nagyon büszke vagyok rád. ✨",
        "Jó reggelt, Cuki! Ma csak jó dolgok történjenek veled. 🌈",
        "Nem kell ma tökéletesnek lenned, Hehi. Így vagy a legjobb. ❤️",
        "Jó reggelt! Este valaki már nagyon vár rád. 🏡",
        "Szép napot, Szívem! Nevess ma sokat. 😹",
        "Jó reggelt, Cuki! Ma is te vagy a kedvenc emberem. 💕",
        "Legyen ma sok apró öröm a napodban, Hehi! 🌼",
        "Jó reggelt, Szívem! Ne felejts el ma rendesen enni. 🥐",
        "Szép napot! Okos vagy, ügyes vagy, és nagyon szeretlek. 💌",
        "Jó reggelt, Cuki! Ma is szurkolok neked. 📣",
        "Kívánok neked egy könnyű, vidám napot, Hehi! 🎈",
        "Jó reggelt, Szívem! Hoztam neked egy virágot a mai napra. 🌷",
        "Szép napot, Cuki! Ma te vagy a főszereplő. 🎀",
        "Jó reggelt! Remélem, ma valami nagyon jó dolog történik veled. 🍀",
        "Legyen ma sok erőd és sok türelmed, Szívem! 💪",
        "Jó reggelt, Hehi! A kis lépések is számítanak. Ügyes vagy. 🐾",
        "Szép napot, Cuki! Ma is sokat fogok rád gondolni. 💞",
        "Jó reggelt, Szívem! Ma megérdemelsz egy finom kávét. ☕",
        "Legyen ma minden könnyebb, mint gondolnád, Hehi! ✨",
        "Jó reggelt, Cuki! Ma ne hajtsd túl magad, a pihenés is fontos. 🌿",
        "Szép napot, Szívem! Szerencsés vagyok, hogy vagy nekem. 💖",
        "Jó reggelt! Kívánom, hogy ma sokat nevess és keveset aggódj. 😊",
        "Jó reggelt, Hehi! Ma is ragyogni fogsz. 🌟",
        "Szép napot, Cuki! Már alig várom, hogy újra lássalak. 🥹",
        "Jó reggelt, Szívem! Küldök egy nagy puszit a napod elejére. 😘",
        "Szép napot, Hehi! Holnap is jövök egy cetlivel. Szeretlek! ❤️"
    ]
};
