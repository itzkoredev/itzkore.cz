export type Locale = "cs" | "en";

// SEO metadata for all pages
export const seoMetadata = {
  cs: {
    site: {
      name: "itzKORE",
      title: "itzKORE | Music Producer, Sound Engineer & Developer",
      description: "Profesionální hudební produkce zaměřená na trap a drill, mix & mastering služby, vývoj her a webových aplikací. Temné atmosférické beaty a moderní zvukové inženýrství.",
      keywords: ["trap producer", "drill producer", "mix master", "sound engineer", "beat maker", "music production", "game developer", "web developer", "Czech producer", "dark trap"],
      author: "itzKORE",
      ogImage: "/og-image.png",
    },
    home: {
      title: "itzKORE | Music Producer, Sound Engineer & Developer",
      description: "Profesionální hudební produkce, mix & master služby, vývoj her a aplikací. Specializace na trap a drill beaty s temnou atmosférou.",
    },
    music: {
      title: "Music | Hudební produkce, beaty, mix & master",
      description: "Profesionální trap a drill beaty, mix & mastering služby pro umělce. Tvrdý low-end, čitelný střed, ostré haty. Portfolio obsahuje spolupráce s českými i zahraničními rappery.",
      keywords: ["trap beaty", "drill beaty", "free beats", "beat prodej", "mix master trap", "mastering drill", "808 bass", "dark trap", "atmospheric beats"],
    },
    beats: {
      title: "Beats | Trap & Drill instrumentály na prodej",
      description: "Přes 20 originálních trap a drill beatů na prodej. Temné atmosférické instrumentály s tvrdým low-endem. Poslechněte si náhledy a stáhněte beaty pro vaše projekty.",
      keywords: ["trap beat prodej", "drill beat", "instrumental na prodej", "type beat", "dark trap beat", "808 beat", "Czech producer beats"],
    },
    portfolio: {
      title: "Portfolio | Moje hudební tvorba a kolaborace",
      description: "Přehled mých nejlepších tracků a kolaborací s umělci jako Anžello, Yzomandias, Peter Pann. Spotify playlist s profesionálně produkovanými tracky.",
      keywords: ["music portfolio", "trap productions", "Czech rap beats", "artist collaborations", "Spotify tracks"],
    },
    mixMaster: {
      title: "Mix & Master | Profesionální zvukové služby pro trap a drill",
      description: "Nabízím mix a mastering služby specializované na trap a drill. Single mix, stem mastering nebo kompletní projekt. Moderní zvuk pro streaming platformy.",
      keywords: ["mix mastering trap", "drill mastering", "audio engineer", "stem mastering", "vocal mixing", "808 mixing", "Czech mixing engineer"],
    },
    games: {
      title: "Hry",
      blurb: "Hráč od malička. Pracoval jsem v SPM (vlastní firma Bohemia Interactive), kde jsem načerpal spoustu inspirace. CyberSurvivor je můj osobní projekt aktuálně ve vývoji.",
      cardTitle: "CyberSurvivor",
      cardBlurb: "Akční survival hra (work in progress).",
      preview: "CyberSurvivor – náhled",
      experience: "Hobby level vývojář – ale makám na tom!",
    },
    apps: {
      title: "Aplikace | Web development a utiliy projekty",
      description: "Vývoj webových aplikací a nástrojů. Volby 2025 - interaktivní volební kalkulačka. CrossIt - pokročilý textový editor (ve vývoji).",
      keywords: ["web developer", "React developer", "Next.js", "volební kalkulačka", "web aplikace", "Czech web dev"],
    },
    ai: {
      title: "AI & Development | Umělá inteligence a backend vývoj",
      description: "Specializace na AI integraci, backend development s Node.js/Python, databázové systémy a cloudové architektury. Moderní technologický stack.",
      keywords: ["AI developer", "backend developer", "Node.js", "Python", "PostgreSQL", "cloud architecture", "API development"],
    },
    contact: {
      title: "Kontakt | Spolupráce na hudebních a vývojových projektech",
      description: "Máte dotaz nebo chcete spolupracovat na hudebním projektu, aplikaci nebo hře? Kontaktujte mě pro konzultaci a cenovou nabídku.",
    },
    about: {
      title: "O mně | Producent, zvukař a developer z Česka",
      description: "Jsem itzKORE - producent, zvukový inženýr a vývojář se zaměřením na trap a drill hudbu. Zkušenosti z hudebního i herního průmyslu.",
    },
  },
  en: {
    site: {
      name: "itzKORE",
      title: "itzKORE | Music Producer, Sound Engineer & Developer",
      description: "Professional music production focused on trap and drill, mix & mastering services, game and web development. Dark atmospheric beats and modern sound engineering.",
      keywords: ["trap producer", "drill producer", "mix master", "sound engineer", "beat maker", "music production", "game developer", "web developer", "dark trap", "808 beats"],
      author: "itzKORE",
      ogImage: "/og-image.png",
    },
    home: {
      title: "itzKORE | Music Producer, Sound Engineer & Developer",
      description: "Professional music production, mix & master services, game and app development. Specializing in dark atmospheric trap and drill beats.",
    },
    music: {
      title: "Music | Music production, beats, mix & master",
      description: "Professional trap and drill beats, mix & mastering services for artists. Hard low-end, clear mids, sharp hats. Portfolio includes collaborations with Czech and international rappers.",
      keywords: ["trap beats", "drill beats", "free beats", "beat sales", "mix master trap", "mastering drill", "808 bass", "dark trap", "atmospheric beats"],
    },
    beats: {
      title: "Beats | Trap & Drill instrumentals for sale",
      description: "Over 20 original trap and drill beats for sale. Dark atmospheric instrumentals with hard-hitting 808s. Listen to previews and download beats for your projects.",
      keywords: ["trap beat sale", "drill beat", "instrumental sale", "type beat", "dark trap beat", "808 beat", "producer beats"],
    },
    portfolio: {
      title: "Portfolio | My music work and collaborations",
      description: "Overview of my best tracks and artist collaborations including Anžello, Yzomandias, Peter Pann. Spotify playlist with professionally produced tracks.",
      keywords: ["music portfolio", "trap productions", "rap beats", "artist collaborations", "Spotify tracks"],
    },
    mixMaster: {
      title: "Mix & Master | Professional audio services for trap and drill",
      description: "Offering mix and mastering services specialized in trap and drill. Single mix, stem mastering or full project. Modern sound for streaming platforms.",
      keywords: ["mix mastering trap", "drill mastering", "audio engineer", "stem mastering", "vocal mixing", "808 mixing", "mixing engineer"],
    },
    games: {
      title: "Games | Game development and gaming projects",
      description: "CyberSurvivor - my current game project. Experience from gaming industry (SPM, Bohemia Interactive). Developing survival action and indie games.",
      keywords: ["game developer", "CyberSurvivor", "indie game", "survival game", "Bohemia Interactive", "game dev"],
    },
    apps: {
      title: "Apps | Web development and utility projects",
      description: "Web application and tool development. Elections 2025 - interactive election calculator. CrossIt - advanced text editor (in development).",
      keywords: ["web developer", "React developer", "Next.js", "election calculator", "web apps", "web dev"],
    },
    ai: {
      title: "AI & Development | Artificial intelligence and backend development",
      description: "Specializing in AI integration, backend development with Node.js/Python, database systems and cloud architectures. Modern technology stack.",
      keywords: ["AI developer", "backend developer", "Node.js", "Python", "PostgreSQL", "cloud architecture", "API development"],
    },
    contact: {
      title: "Contact | Collaboration on music and development projects",
      description: "Have a question or want to collaborate on a music project, app or game? Contact me for consultation and pricing.",
    },
    about: {
      title: "About me | Producer, sound engineer and developer from Czech Republic",
      description: "I am itzKORE - producer, sound engineer and developer focused on trap and drill music. Experience from music and gaming industry.",
    },
  },
};

export const dictionaries: Record<Locale, Record<string, any>> = {
  cs: {
    nav: {
      home: "Domů",
      music: "Music",
      games: "Hry",
      apps: "Aplikace",
      ai: "AI",
      contact: "Kontakt",
    },
    hero: {
      welcome: "VÍTEJ V itzKORE OS [CYBERNETIC INTERFACE v0.1.1]",
      systemStatus: "STAV SYSTÉMU",
      channels: "Web & Desktop Development",
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
        "Temný trap. Drill.",
        "Mix & master.",
        "Tvrdý low-end. Čitelný střed. Ostré haty.",
      ],
      body:
        "Jsem itzKORE – producent a zvukový inženýr, specializuji se na temné atmosférické tracky. Převážně dělám žánry trap a drill. Tvořím hudbu, která udržuje posluchače v nejistotě a zároveň dává prostor slovům. V beatech hledám rovnováhu mezi tlakem a dýcháním: tvrdý low-end, který nese, čitelný střed, který mluví, a bicí ostré jako California Reaper. Mix a master pro mě nejsou jen technika – je to proces, při kterém skládám jednotlivé díly do ostrého produktu. Když pracuji s vokály, nechávám je dýchat, ale nepouštím groove; když aranžuji, vyřezávám místo pro každý detail, aby mohl zaznít přesně tam, kde má. Dělám muziku, která drží hlavu vzpřímenou i ve tmě. Když si pustíš play, chci, aby tě první vteřiny posadily do sedla a poslední nechaly chvíli zůstat v tichu – s doznívající ozvěnou a pocitem, že někde v dálce stále čeká temnota.",
    },
    games: {
      title: "Hry",
      blurb: "Hry jsou mojí vášní od dětství. Pracoval jsem ve společnosti SPM (vlastněné Bohemia Interactive), kde jsem získal cenné zkušenosti. CyberSurvivor je můj osobní projekt, který je momentálně ve vývoji.",
      cardTitle: "CyberSurvivor",
      cardBlurb: "Akční survival hra (projekt ve vývoji).",
      preview: "CyberSurvivor – náhled",
      experience: "Hobby level developer – ale pracuji na tom tvrdě!",
    },
    gamesIntro: {
      title: "Hry",
      subtitle: "Vytváření immersivních interaktivních zážitků a strhující hratelnosti",
      cta: "Prozkoumat Hry",
      features: {
        genre: {
          title: "2D & 3D",
          desc: "Rozmanité herní žánry"
        },
        independent: {
          title: "Nezávislé",
          desc: "Tvůrčí svoboda"
        },
        engaging: {
          title: "Strhující",
          desc: "Působivé mechaniky"
        }
      }
    },
    musicIntro: {
      title: "Hudba",
      subtitle: "Produkce profesionálních beatů, mixing, mastering & sound design",
      cta: "Poslechnout si",
      heading: "Hudební Produkce",
      description: "Vítejte v mé hudební produkci. Tvořím originální beaty, produkuji tracky a nabízím profesionální mixing & mastering služby. Od trapu po drill, vdechuji život vašemu soundu s vášní a precizností.",
      browseBeats: "Procházet Beaty",
      viewPortfolio: "Zobrazit Portfolio",
      whatIOffer: "Co Nabízím",
      beatProduction: {
        title: "Produkce Beatů",
        description: "Originální instrumentály a beaty pro vaše projekty. Každý beat je vytvořen s důrazem na detail a moderní produkční techniky.",
        cta: "Prozkoumat Beaty"
      },
      mixMaster: {
        title: "Mix & Master",
        description: "Profesionální mixing a mastering služby, které zvuk vašich tracků dostanou na úroveň rádia. Specializuji se na drill, trap a hip-hop.",
        cta: "Zjistit Více"
      },
      backButton: "← Zpět na Music Hub",
      features: {
        original: {
          title: "Originální Produkce",
          description: "Tvořím unikátní beaty a melodie od nuly"
        },
        versatile: {
          title: "Žánrová Versatilita",
          description: "Od trapu přes drill až po hip-hop a elektroniku"
        },
        quality: {
          title: "Profesionální Kvalita",
          description: "Zvukový design a mixing studiové kvality"
        },
        turnaround: {
          title: "Rychlé Dodání",
          description: "Efektivní workflow bez kompromisů v kvalitě"
        },
        production: {
          title: "Produkce",
          desc: "Originální Beaty & Tracky"
        },
        mixing: {
          title: "Mixing",
          desc: "Profesionální Kvalita"
        },
        mastering: {
          title: "Mastering",
          desc: "Radio-Ready Sound"
        }
      }
    },
    musicDetail: {
      header: "Prozkoumej Mou Hudbu",
      subheader: "Ponořte se do různých aspektů mé hudební produkce",
      categories: {
        intro: {
          title: "Intro",
          description: "Vítejte v mé hudební produkci"
        },
        beats: {
          title: "Beaty",
          description: "Originální beaty a instrumentály"
        },
        portfolio: {
          title: "Portfolio",
          description: "Ukázka mé nejlepší práce"
        },
        mixmaster: {
          title: "Mix & Master",
          description: "Profesionální mixing a mastering služby"
        }
      }
    },
    cybersurvivor: {
      featured: "FEATURED PROJEKT",
      tagline: "Cyberpunk-themed survival hra kombinující roguelike prvky s intenzivním wave-based soubojem.",
      playDemo: "Hrát Demo",
      viewCode: "Zobrazit Kód",
      keyFeatures: "Klíčové Vlastnosti",
      features: {
        roguelike: {
          title: "Roguelike Mechaniky",
          description: "Procedurálně generované levely s unikátními průchody pokaždé"
        },
        combat: {
          title: "Rychlé Souboje",
          description: "Intenzivní akce s vlnami stále obtížnějších nepřátel"
        },
        upgrades: {
          title: "Vylepšení & Schopnosti",
          description: "Odemkni mocné dovednosti a upgrady během postupu"
        },
        theme: {
          title: "Cyberpunk Téma",
          description: "Pohlcující neonový dystopický svět ve stylu pixel artu"
        }
      },
      about: {
        title: "O Hře",
        p1: "CyberSurvivor je akční roguelike hra zasazená do dystopického cyberpunkového světa. Hráči musí přežít proti nekonečným vlnám nepřátel, sbírat vylepšení a odemykat nové schopnosti.",
        p2: "Každé hraní nabízí unikátní zážitek díky procedurálnímu generování a náhodným kombinacím vylepšení. Hra kombinuje retro pixel art estetiku s moderními částicovými efekty a plynulou hratelností.",
        p3: "Projekt je ve vývoji jako hobby projekt – práce pokračuje! Zaměřuji se na pokročilé 2D game development techniky včetně efektivního systému spawnu nepřátel, správy upgradů a optimalizace výkonu.",
        p3_polished: "Jde o hobby level projekt, ale pracuji na něm s plným nasazením a učím se moderní 2D vývoj.",
      },
      techStack: ["2D Game Dev", "Pixel Art", "Procedurální Generování", "Roguelike Mechaniky", "Částicové Systémy"],
      backToGames: "Zpět na Hry",
    },
    apps: {
      title: "Aplikace",
      subtitle: "Webové aplikace a nástroje, které jsem vytvořil",
      statusLive: "🟢 Live",
      statusDev: "🔨 Ve vývoji",
      volby2025: {
        title: "Volby 2025 - Kalkulačka",
        description: "Interaktivní volební kalkulačka pro parlamentní volby 2025. Vyplň své politické postoje a zjisti, která strana ti sedí nejlépe.",
      },
      crossit: {
        title: "CrossIt - Generátor křižovek",
        description: "AI-powered generátor křížovek s vlastními slovy a definicemi. Vytvoř si vlastní křížovky pro školu, zábavu nebo trénink paměti.",
      }
    },
    aiPage: {
      hero: {
        title: "AI Vývoj & Konzultace",
        subtitle: "Specializuji se na RAG systémy, AI agenty, chatboty a kompletní full-stack projekty s umělou inteligencí",
        ctaPrimary: "Začít projekt",
        ctaSecondary: "Zobrazit služby"
      },
      services: {
        title: "Co nabízím",
        subtitle: "Kompletní AI řešení s přímou podporou ode mě"
      },
      techStack: {
        title: "Technologie",
        subtitle: "Moderní nástroje a frameworky pro AI development"
      },
      cta: {
        title: "Připraveni začít?",
        subtitle: "Kontaktujte mě pro konzultaci vašeho AI projektu",
        button: "Kontaktovat"
      }
    },
    contact: {
      title: "Kontakt",
      blurb: "Máte projekt? Pojďme společně přivést vaše nápady k životu",
      form: {
        name: "Jméno",
        namePlaceholder: "Jan Novák",
        email: "Email",
        emailPlaceholder: "jan@priklad.cz",
        subject: "Předmět",
        subjectPlaceholder: "Dotaz na projekt",
        message: "Zpráva",
        messagePlaceholder: "Popište mi váš projekt...",
        submit: "Odeslat zprávu",
        sending: "Odesílám...",
        success: "✓ Zpráva odeslána!",
        error: "Chyba. Zkusit znovu?"
      },
      direct: {
        title: "Přímý kontakt",
        email: "E-mail"
      },
      social: {
        title: "Sledujte mě"
      },
      availability: {
        title: "Aktuálně dostupný",
        text: "Otevřený pro freelance projekty a spolupráce. Pojďme vytvořit něco úžasného!"
      }
    },
    about: {
      title: "O mně",
      blurb: "Jsem vášnivý vývojář, tvůrce her a hudební producent. Spojuji technologie s kreativitou a vytvářím unikátní digitální zážitky. Od webových aplikací přes indie hry až po hudební produkci - miluji oživovat nápady napříč různými médii.",
      skills: {
        web: "Web Development",
        game: "Game Development", 
        music: "Music Production"
      },
      achievements: {
        projects: { label: "50+ Projektů", desc: "Úspěšně Dodáno" },
        clients: { label: "30+ Klientů", desc: "Spokojených Zákazníků" },
        experience: { label: "5+ Let", desc: "Zkušeností" },
        satisfaction: { label: "100%", desc: "Míra Spokojenosti" }
      },
      timeline: {
        2020: { title: "Začal Freelancing", desc: "Začátek cesty ve web developmentu" },
        2021: { title: "Game Development", desc: "Prozkoumání Godot a Unity enginů" },
        2022: { title: "Hudební Produkce", desc: "Začal produkovat beaty a tracky" },
        2023: { title: "Full Stack", desc: "Zvládnutí moderních web technologií" },
        2024: { title: "Značka itzKORE", desc: "Založení profesionálního portfolia" }
      }
    },
    beats: {
      player: "Přehrávač",
      pickPrompt: "Vyberte beat ze seznamu níže.",
      listTitle: "Seznam beatů",
      genre: "Žánr",
      mood: "Nálada",
      all: "Vše",
      active: "Aktivní",
      select: "Vybrat",
      none: "Žádné beaty nejsou k dispozici.",
      clearFilters: "Zrušit filtry",
      errors: {
        noConfig: "Supabase není nakonfigurován. Nastavte NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        noData: "Nebyla načtena žádná data z tabulky 'beats'. Pokud tabulka obsahuje záznamy, povolte RLS policy pro SELECT (např. 'Public read' USING (true)) pro anonymní roli.",
        generic: "Chyba při načítání dat ze Supabase.",
      },
    },
    mix: {
      title: "Mix & Master — Drill / Trap",
      cta: "Poptat mix / master",
      work: "Moje práce",
      sections: {
        single: {
          title: "Single Mix",
          blurb: "Mix + Master ze stereo exportu (beat + vokály).",
          bullets: [
            "De-ess, komprese, saturace, čistota",
            "808/kick balance, sidechain",
            "Streaming loudness",
          ],
          price: "Cena od 90€",
        },
        stem: {
          title: "Stem Master",
          blurb: "Mastering z několika stemů (808, kick, drum bus, melodie, vokály…)",
          bullets: [
            "Detailní kontrola low-end / sub",
            "Clip/Limit řetězec pro moderní punch",
            "Kontrola kvality na různých systémech",
          ],
          price: "Cena od 40€",
        },
        full: {
          title: "Full Project",
          blurb: "Kompletní mix projektu (track-out beat + vokály).",
          bullets: [
            "Gain staging a balance od základů",
            "Kreativní FX pro ad-libs / atmosféru",
            "Export radio/Instagram/clean verzí",
          ],
          price: "Cena od 120€",
        },
      },
      how: {
        title: "Jak to probíhá?",
        steps: [
          "Pošlete 1–2 reference (tracky, které vám zvukově vyhovují).",
          "Exportujte WAV 24bit (44.1/48 kHz). U track-outu pojmenujte stopy.",
          "Pošlete odkaz ke stažení (Drive/Dropbox). Přidejte BPM a tóninu 808, pokud je známá.",
          "Do 24–72 hodin zasílám náhled, následně 1–2 kola připomínek.",
        ],
        delivery: "Dodání: WAV + MP3, volitelně instrumentál/clean verze. Metadata/ISRC na vyžádání.",
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      music: "Music",
      games: "Games",
      apps: "Apps",
      ai: "AI & Dev",
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
      blurb: "I've been a gamer for as long as I can remember. Worked at SPM (owned by Bohemia Interactive), where I gained a lot of inspiration. CyberSurvivor is my personal project currently in development.",
      cardTitle: "CyberSurvivor",
      cardBlurb: "Action survival game (work in progress).",
      preview: "CyberSurvivor – preview",
      experience: "Hobby level developer – but working hard on it!",
    },
    gamesIntro: {
      title: "Games",
      subtitle: "Creating immersive interactive experiences and engaging gameplay",
      cta: "Explore Games",
      features: {
        genre: {
          title: "2D & 3D",
          desc: "Diverse Game Genres"
        },
        independent: {
          title: "Independent",
          desc: "Creative Freedom"
        },
        engaging: {
          title: "Engaging",
          desc: "Compelling Mechanics"
        }
      }
    },
    musicIntro: {
      title: "Music",
      subtitle: "Producing professional beats, mixing, mastering & sound design",
      cta: "Listen Now",
      heading: "Music Production",
      description: "Welcome to my music production journey. I create original beats, produce tracks, and offer professional mixing & mastering services. From trap to drill, I bring your sound to life with passion and precision.",
      browseBeats: "Browse Beats",
      viewPortfolio: "View Portfolio",
      whatIOffer: "What I Offer",
      beatProduction: {
        title: "Beat Production",
        description: "Original instrumentals and beats for your projects. Each beat is crafted with attention to detail and modern production techniques.",
        cta: "Explore Beats"
      },
      mixMaster: {
        title: "Mix & Master",
        description: "Professional mixing and mastering services to make your tracks sound radio-ready. Specialized in drill, trap, and hip-hop.",
        cta: "Learn More"
      },
      backButton: "← Back to Music Hub",
      features: {
        original: {
          title: "Original Production",
          description: "Crafting unique beats and melodies from scratch"
        },
        versatile: {
          title: "Genre Versatile",
          description: "From trap to drill, hip-hop to electronic"
        },
        quality: {
          title: "Professional Quality",
          description: "Studio-grade sound design and mixing"
        },
        turnaround: {
          title: "Quick Turnaround",
          description: "Efficient workflow without compromising quality"
        },
        production: {
          title: "Production",
          desc: "Original Beats & Tracks"
        },
        mixing: {
          title: "Mixing",
          desc: "Professional Quality"
        },
        mastering: {
          title: "Mastering",
          desc: "Radio-Ready Sound"
        }
      }
    },
    musicDetail: {
      header: "Explore My Music",
      subheader: "Dive into different aspects of my music production work",
      categories: {
        intro: {
          title: "Intro",
          description: "Welcome to my music production journey"
        },
        beats: {
          title: "Beats",
          description: "Original beats and instrumentals"
        },
        portfolio: {
          title: "Portfolio",
          description: "Showcase of my best work"
        },
        mixmaster: {
          title: "Mix & Master",
          description: "Professional mixing and mastering services"
        }
      }
    },
    apps: {
      title: "Apps",
      subtitle: "Web applications and tools I've created",
      statusLive: "🟢 Live",
      statusDev: "🔨 In Development",
      volby2025: {
        title: "Elections 2025 - Calculator",
        description: "Interactive election calculator for 2025 parliamentary elections. Fill in your political views and find which party suits you best.",
      },
      crossit: {
        title: "CrossIt - Crossword Generator",
        description: "AI-powered crossword generator with custom words and definitions. Create your own crosswords for school, fun or memory training.",
      }
    },
    aiPage: {
      hero: {
        title: "AI Development & Consulting",
        subtitle: "Specializing in RAG systems, AI agents, chatbots, and complete full-stack projects with artificial intelligence",
        ctaPrimary: "Start Project",
        ctaSecondary: "View Services"
      },
      services: {
        title: "What I Offer",
        subtitle: "Complete AI solutions with direct support from me"
      },
      techStack: {
        title: "Tech Stack",
        subtitle: "Modern tools and frameworks for AI development"
      },
      cta: {
        title: "Ready to Start?",
        subtitle: "Contact me for a consultation on your AI project",
        button: "Get in Touch"
      }
    },
    contact: {
      title: "Get In Touch",
      blurb: "Have a project in mind? Let's work together to bring your ideas to life",
      form: {
        name: "Name",
        namePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "john@example.com",
        subject: "Subject",
        subjectPlaceholder: "Project Inquiry",
        message: "Message",
        messagePlaceholder: "Tell me about your project...",
        submit: "Send Message",
        sending: "Sending...",
        success: "✓ Message Sent!",
        error: "Failed. Try again?"
      },
      direct: {
        title: "Direct Contact",
        email: "Email"
      },
      social: {
        title: "Connect With Me"
      },
      availability: {
        title: "Currently Available",
        text: "Open for freelance projects and collaborations. Let's create something amazing together!"
      }
    },
    about: {
      title: "About me",
      blurb: "I'm a passionate developer, game creator, and music producer. I blend technology with creativity to build unique digital experiences. From web applications to indie games and music production, I love bringing ideas to life across multiple mediums.",
      skills: {
        web: "Web Development",
        game: "Game Development",
        music: "Music Production"
      },
      achievements: {
        projects: { label: "50+ Projects", desc: "Successfully Delivered" },
        clients: { label: "30+ Clients", desc: "Happy Customers" },
        experience: { label: "5+ Years", desc: "Experience" },
        satisfaction: { label: "100%", desc: "Satisfaction Rate" }
      },
      timeline: {
        2020: { title: "Started Freelancing", desc: "Began journey in web development" },
        2021: { title: "Game Development", desc: "Explored Godot and Unity engines" },
        2022: { title: "Music Production", desc: "Started producing beats and tracks" },
        2023: { title: "Full Stack", desc: "Mastered modern web technologies" },
        2024: { title: "itzKORE Brand", desc: "Established professional portfolio" }
      }
    },
    cybersurvivor: {
      featured: "FEATURED PROJECT",
      tagline: "A cyberpunk-themed survivor game combining roguelike elements with intense wave-based combat.",
      playDemo: "Play Demo",
      viewCode: "View Code",
      keyFeatures: "Key Features",
      features: {
        roguelike: {
          title: "Roguelike Mechanics",
          description: "Procedurally generated levels with unique runs every time"
        },
        combat: {
          title: "Fast-Paced Combat",
          description: "Intense action with waves of increasingly difficult enemies"
        },
        upgrades: {
          title: "Upgrades & Abilities",
          description: "Unlock powerful skills and upgrades as you progress"
        },
        theme: {
          title: "Cyberpunk Theme",
          description: "Immersive neon-lit dystopian world with pixel art style"
        }
      },
      about: {
        title: "About the Game",
        p1: "CyberSurvivor is an action roguelike game set in a dystopian cyberpunk world. Players must survive against endless waves of enemies, collect upgrades, and unlock new abilities.",
        p2: "Each playthrough offers a unique experience thanks to procedural generation and random upgrade combinations. The game combines retro pixel art aesthetics with modern particle effects and smooth gameplay.",
        p3: "Project is in development as a hobby project – work continues! I'm focusing on advanced 2D game development techniques including efficient enemy spawn systems, upgrade management, and performance optimization.",
        p3_polished: "This is a hobby level project, but I'm working on it with full commitment and learning modern 2D development.",
      },
      techStack: ["2D Game Dev", "Pixel Art", "Procedural Generation", "Roguelike Mechanics", "Particle Systems"],
      backToGames: "Back to Games",
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
      cta: "Request Mix / Master",
      work: "My Work",
      sections: {
        single: {
          title: "Single Mix",
          blurb: "Mix + Master from stereo export (beat + vocals).",
          bullets: [
            "De-ess, compression, saturation, clarity",
            "808/kick balance, sidechain",
            "Streaming loudness optimization",
          ],
          price: "Price from €90",
        },
        stem: {
          title: "Stem Master",
          blurb: "Mastering from multiple stems (808, kick, drum bus, melody, vocals…)",
          bullets: [
            "Detailed low-end / sub control",
            "Clip/Limit chain for modern punch",
            "Quality control on different systems",
          ],
          price: "Price from €40",
        },
        full: {
          title: "Full Project",
          blurb: "Complete project mix (track-out beat + vocals).",
          bullets: [
            "Gain staging and balance from scratch",
            "Creative FX for ad-libs / atmosphere",
            "Export radio/Instagram/clean versions",
          ],
          price: "Price from €120",
        },
      },
      how: {
        title: "How It Works",
        steps: [
          "Send 1–2 references (tracks with the sound you prefer).",
          "Export 24-bit WAV (44.1/48 kHz). For track-outs, label your tracks clearly.",
          "Send download link (Google Drive/Dropbox). Include BPM and 808 key if known.",
          "Preview within 24–72 hours, followed by 1–2 rounds of revisions.",
        ],
        delivery: "Delivery: WAV + MP3, optionally instrumental/clean versions. Metadata/ISRC upon request.",
      },
    },
  },
};
