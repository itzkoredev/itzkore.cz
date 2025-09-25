export type Locale = "cs" | "en";

export const dictionaries: Record<Locale, Record<string, any>> = {
  cs: {
    nav: {
      home: "Domů",
      music: "Music",
      games: "Hry",
      apps: "Aplikace",
      contact: "Kontakt",
    },
    hero: {
  welcome: "VÍTEJ V itzKORE OS [CYBERNETIC INTERFACE v0.1.1]",
      systemStatus: "STAV SYSTÉMU",
      channels: "KANÁLY",
  coordinates: "COORDINATES",
    },
    tabs: {
      intro: "Intro",
      beats: "Beats",
      mixMaster: "Mix / Master",
      myWork: "My Work",
    },
    intro: {
      lines: [
        "Temnej trap. Drill.",
        "Mix & master.",
        "Tvrdý low‑end. Čitelnej střed. Ostrý haty.",
      ],
      body:
        "Jsem itzKORE – producent a zvukový inženýr, specializuju se na temný atmo tracky. Převážně dělám žánry trap a drill. Dělám hudbu, která drží člověka v nejistotě při poslechu a zároveň dává prostor slovům. V beatech hledám rovnováhu mezi tlakem a dýcháním: tvrdý low‑end, co nese, čitelnej střed, co mluví, a drumy štiplavý jak California Reaper. Mix a master pro mě nejsou jen technika – Je to proces, při kterém skládam jednotlivé díly do ostrého produktu. Když pracuju s vokály, nechávám je dýchat, ale nepustím groove; když aranžuju, vyřezávám místo pro každý detail, aby mohl zaznít přesně tam, kde má. Dělám muziku, co drží hlavu vzpřímenou i ve tmě. Když si pustíš play, chci, aby tě první vteřiny posadily do sedla a poslední nechaly chvíli zůstat v tichu – s doznívající ozvěnou a pocitem, že někde v dálce stále čeká temnota.",
    },
    games: {
      title: "Hry",
      blurb: "Minihry a webové experimenty. CyberSurvivor je dostupný online.",
      cardTitle: "CyberSurvivor",
      cardBlurb: "Akční survival hra (externí odkaz).",
      preview: "CyberSurvivor – náhled",
    },
    apps: {
      title: "Aplikace",
      blurb: "Utility, webové nástroje a experimenty.",
      coming: "Demo app (brzy)",
      volby2025: {
        title: "Volby 2025 - Kalkulačka",
        description: "Volební kalkulačka a informační web pro volby 2025",
        link: "Navštívit volby2025"
      }
    },
    contact: {
      title: "Kontakt",
      blurb: "Napiš mi. Doplníme e‑mail a odkazy na sítě.",
      email: "E‑mail",
      socials: "Sociální sítě",
      tbd: "[doplnit]",
    },
    about: {
      title: "O mně",
      blurb: "Krátké info o mně. Upravit později.",
    },
    beats: {
  player: "Player",
      pickPrompt: "Vyber beat ze seznamu níže.",
  listTitle: "Beats",
      genre: "Žánr",
      mood: "Mood",
      all: "Vše",
      active: "Aktivní",
      select: "Vybrat",
      none: "Žádné beaty v Supabase.",
      clearFilters: "Zrušit filtry",
      errors: {
        noConfig: "Supabase není nakonfigurován. Zadej NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        noData: "Nebyla načtena žádná data z 'beats'. Pokud v konzoli Supabase tabulka obsahuje záznamy, povol RLS policy pro SELECT (např. 'Public read' USING (true)) pro anon roli.",
        generic: "Chyba při načítání ze Supabase.",
      },
    },
    mix: {
      title: "Mix & Master — Drill / Trap",
      cta: "Poptat mix / master",
      work: "My Work",
      sections: {
        single: {
          title: "Single Mix",
          blurb: "Mix + Master ze stereo exportu (beat + vokály).",
          bullets: [
            "De‑ess, comp, saturation, clarity",
            "808/kick balance, sidechain",
            "Streaming loudness",
          ],
          price: "Cena od — podle náročnosti (dohodou).",
        },
        stem: {
          title: "Stem Master",
          blurb: "Mastering z několika stemů (808, kick, drum bus, melody, vox…)",
          bullets: [
            "Detailní kontrola low‑end / sub",
            "Clip/Limit chain pro moderní punch",
            "QC na různých systémech",
          ],
          price: "Cena od — podle počtu stemů.",
        },
        full: {
          title: "Full Project",
          blurb: "Kompletní mix projektu (track‑out beat + vokály).",
          bullets: [
            "Gain staging a balanc od nuly",
            "Creative FX pro ad‑libs / atmos",
            "Export radio/insta/clean verze",
          ],
          price: "Cena od — dle rozsahu a počtu stop.",
        },
      },
      how: {
        title: "Jak to probíhá?",
        steps: [
          "Pošli 1–2 reference (tracky, které tě zvukem baví).",
          "Exportuj WAV 24bit (44.1/48k). U track‑outu pojmenuj stopy.",
          "Pošli odkaz ke stažení (Drive/Dropbox). Přidej BPM a tóninu 808, pokud víš.",
          "Do 24–72 h posílám preview, následně 1–2 kola připomínek.",
        ],
        delivery: "Dodání: WAV + MP3, volitelně instrumentál/clean. Metadata/ISRC na přání.",
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      music: "Music",
      games: "Games",
      apps: "Apps",
      contact: "Contact",
    },
    hero: {
  welcome: "WELCOME TO itzKORE OS [CYBERNETIC INTERFACE v0.1.1]",
      systemStatus: "SYSTEM STATUS",
      channels: "CHANNELS",
      coordinates: "COORDINATES",
    },
    tabs: {
      intro: "Intro",
      beats: "Beats",
      mixMaster: "Mix / Master",
      myWork: "My Work",
    },
    intro: {
      lines: [
        "Dark trap. Drill.",
        "Mix & master.",
        "Hard low‑end. Clear mids. Sharp hats.",
      ],
      body:
  "I am itzKORE — a producer and sound engineer, specializing in dark atmospheric tracks. I mostly make trap and drill. I make music that keeps the listener on edge while giving words space. In beats I look for a balance between pressure and breath: a hard low‑end that carries, a clear midrange that speaks, and drums as biting as a California Reaper. Mix and master aren’t just technique to me — it’s the process where I assemble the pieces into a razor‑sharp result. When I work with vocals, I let them breathe, but I don’t let go of the groove; when I arrange, I carve room for every detail so it can land exactly where it should. I make music that keeps your head up even in the dark. When you press play, I want the first seconds to put you in the saddle and the last to leave you sitting with the echo fading — with the feeling that somewhere in the distance, darkness is still waiting.",
    },
    games: {
      title: "Games",
      blurb: "Mini-games and web experiments. CyberSurvivor is available online.",
      cardTitle: "CyberSurvivor",
      cardBlurb: "Action survival game (external link).",
      preview: "CyberSurvivor – preview",
    },
    apps: {
      title: "Apps",
      blurb: "Utilities, web tools, and experiments.",
      coming: "Demo app (soon)",
      volby2025: {
        title: "Elections 2025 - Calculator",
        description: "Election calculator and info website for 2025 elections",
        link: "Visit volby2025"
      }
    },
    contact: {
      title: "Contact",
      blurb: "Write me. Email and socials to be added.",
      email: "E‑mail",
      socials: "Socials",
      tbd: "[to add]",
    },
    about: {
      title: "About me",
      blurb: "Short bio. To be updated.",
    },
    beats: {
      player: "Player",
      pickPrompt: "Pick a beat from the list below.",
      listTitle: "Beats list",
      genre: "Genre",
      mood: "Mood",
      all: "All",
      active: "Active",
      select: "Select",
      none: "No beats in Supabase.",
      clearFilters: "Clear filters",
      errors: {
        noConfig: "Supabase is not configured. Provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        noData: "No data loaded from 'beats'. If the table has rows, enable a SELECT RLS policy (e.g., 'Public read' USING (true)) for anon role.",
        generic: "Error loading from Supabase.",
      },
    },
    mix: {
      title: "Mix & Master — Drill / Trap",
      cta: "Request mix / master",
      work: "My Work",
      sections: {
        single: {
          title: "Single Mix",
          blurb: "Mix + Master from a stereo export (beat + vocals).",
          bullets: [
            "De‑ess, comp, saturation, clarity",
            "808/kick balance, sidechain",
            "Streaming loudness",
          ],
          price: "From — depends on complexity (by agreement).",
        },
        stem: {
          title: "Stem Master",
          blurb: "Mastering from a few stems (808, kick, drum bus, melody, vox…)",
          bullets: [
            "Detailed low‑end / sub control",
            "Clip/Limit chain for modern punch",
            "QC across systems",
          ],
          price: "From — depends on number of stems.",
        },
        full: {
          title: "Full Project",
          blurb: "Full project mix (track‑out beat + vocals).",
          bullets: [
            "Gain staging and balance from scratch",
            "Creative FX for ad‑libs / atmos",
            "Export radio/insta/clean versions",
          ],
          price: "From — depends on scope and tracks.",
        },
      },
      how: {
        title: "How it works",
        steps: [
          "Send 1–2 references (tracks you like the sound of).",
          "Export WAV 24bit (44.1/48k). Name tracks for track‑out.",
          "Send a download link (Drive/Dropbox). Add BPM and 808 key if known.",
          "Preview within 24–72 h, then 1–2 rounds of notes.",
        ],
        delivery: "Delivery: WAV + MP3; optional instrumental/clean. Metadata/ISRC on request.",
      },
    },
  },
};
