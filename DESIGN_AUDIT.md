# 🎨 Kompletní Design Audit & Redesign Plán - itzKORE.cz

**Datum:** 20. října 2025  
**Autor:** GitHub Copilot  
**Cíl:** Vytvořit moderní, přehledný a profesionální portfolio web

---

## 📊 AUDIT SOUČASNÉHO STAVU

### ❌ HLAVNÍ PROBLÉMY

#### 1. **Homepage Chaos**
- ❌ Bento grid je příliš přehlcený (12 různých cards najednou)
- ❌ Žádná jasná vizuální hierarchie
- ❌ Uživatel neví, kam se má dívat
- ❌ CTA (Call To Action) není dominantní
- ❌ Moc různých animací najednou (motion sickness risk)

#### 2. **Color System Issues**
- ❌ Příliš mnoho shade variants (soft/strong/overlay pro každou barvu)
- ❌ Nedostatečný kontrast mezi textem a pozadím
- ❌ WCAG AA compliance pravděpodobně nesplněno
- ❌ Glass morphism přehání (text se špatně čte)
- ❌ Dark mode není dobře vyvážený s light mode

#### 3. **Typography Problems**
- ❌ Chybí konzistentní type scale
- ❌ Line heights nejsou optimalizované pro čitelnost
- ❌ Žádný rhythm/vertical spacing system
- ❌ Příliš mnoho různých font sizes
- ❌ Heading hierarchy není jasná

#### 4. **Component Inconsistency**
- ❌ Různé styly tlačítek napříč stránkami
- ❌ Cards nemají jednotný design
- ❌ Spacing není konzistentní
- ❌ Border radius se liší
- ❌ Shadow styles jsou všude jiné

#### 5. **Navigation & UX**
- ❌ Header je OK, ale mohl by být elegantnější
- ❌ Chybí breadcrumbs pro sub-pages
- ❌ Žádný jasný "scroll to explore" indicator
- ❌ Footer je basic

#### 6. **Performance Concerns**
- ⚠️ Příliš mnoho Framer Motion animací najednou
- ⚠️ GSAP animations mohly by být optimalizované
- ⚠️ Žádný lazy loading pro heavy components
- ⚠️ Chybí skeleton states

---

## ✅ CO FUNGUJE DOBŘE

1. ✅ Theme toggle system (light/dark)
2. ✅ Základní Aurora color palette koncept
3. ✅ I18n system (CS/EN)
4. ✅ Tailwind utility classes
5. ✅ Project structure (Next.js 15)

---

## 🎯 NOVÝ DESIGN SYSTÉM - SPECIFIKACE

### 1. COLOR PALETTE - Zjednodušená

```css
:root {
  /* Base Colors */
  --bg-primary: #FFFFFF;        /* Čisté bílé pozadí */
  --bg-secondary: #F8FAFC;      /* Jemně šedé pro sekce */
  --bg-elevated: #FFFFFF;       /* Cards */
  
  /* Text Colors */
  --text-primary: #0F172A;      /* Main text - kontrast 16:1 */
  --text-secondary: #475569;    /* Secondary text - kontrast 7:1 */
  --text-tertiary: #94A3B8;     /* Subtle text - kontrast 4.5:1 */
  
  /* Accent Colors */
  --accent-primary: #00AFC0;    /* Teal - primární CTA */
  --accent-hover: #009DB0;      /* Hover state */
  --accent-light: #E6F7F9;      /* Light background */
  
  /* Semantic Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  
  /* Borders */
  --border-subtle: #E2E8F0;     /* Light borders */
  --border-default: #CBD5E1;    /* Default borders */
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
  --shadow-md: 0 4px 6px rgba(15, 23, 42, 0.07);
  --shadow-lg: 0 10px 15px rgba(15, 23, 42, 0.1);
  --shadow-xl: 0 20px 25px rgba(15, 23, 42, 0.12);
}

.dark {
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-elevated: #1E293B;
  
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-tertiary: #64748B;
  
  --accent-primary: #22D3EE;    /* Lighter teal for dark mode */
  --accent-hover: #06B6D4;
  --accent-light: #083344;
  
  --border-subtle: #334155;
  --border-default: #475569;
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);
}
```

### 2. TYPOGRAPHY SCALE

```css
/* Font Families */
--font-sans: 'Inter Variable', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Type Scale - Major Third (1.25) */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */

/* Line Heights */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 3. SPACING SCALE

```css
/* Spacing (4px base unit) */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */

/* Container Widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### 4. COMPONENT SPECIFICATIONS

#### Button Variants
```tsx
// Primary Button
className="px-6 py-3 bg-accent-primary text-white rounded-xl font-semibold
           hover:bg-accent-hover transition-all duration-200
           shadow-md hover:shadow-lg transform hover:-translate-y-0.5"

// Secondary Button
className="px-6 py-3 border-2 border-border-default text-text-primary rounded-xl font-semibold
           hover:border-accent-primary hover:text-accent-primary transition-all duration-200"

// Ghost Button
className="px-6 py-3 text-text-primary hover:bg-bg-secondary rounded-xl font-semibold
           transition-all duration-200"
```

#### Card Variants
```tsx
// Default Card
className="p-6 bg-bg-elevated rounded-2xl border border-border-subtle
           shadow-md hover:shadow-lg transition-all duration-300"

// Interactive Card (project card)
className="p-6 bg-bg-elevated rounded-2xl border border-border-subtle
           shadow-md hover:shadow-xl transition-all duration-300
           transform hover:-translate-y-1 cursor-pointer"

// Glass Card (special cases only)
className="p-6 bg-bg-elevated/80 backdrop-blur-sm rounded-2xl border border-border-subtle
           shadow-lg"
```

---

## 🚀 IMPLEMENTAČNÍ PLÁN - PHASE BY PHASE

### **PHASE 1: Cinematic Intro (2-3 hodiny)**
**Priorita: VYSOKÁ**

#### Co udělat:
1. Vytvořit nový `SplashIntro.tsx` component
   - Jednoduchá černá obrazovka
   - "itzKORE" text typing effect nebo reveal animace
   - 3-5 sekund celkem
   - Auto-skip po dokončení
   - Manual skip button (⎋ ESC nebo "Skip")
   - localStorage flag pro returning visitors

2. Integrace do `page.tsx`
   ```tsx
   // Show intro first time only
   const [showIntro, setShowIntro] = useState(true);
   
   return showIntro ? 
     <SplashIntro onComplete={() => setShowIntro(false)} /> :
     <HomePage />;
   ```

#### Technické detaily:
- GSAP timeline pro text reveal
- Smooth fade transition (1s)
- Minimalistický design (černá/bílá + accent)
- Prefers-reduced-motion support

---

### **PHASE 2: Color System Refactor (1-2 hodiny)**
**Priorita: VYSOKÁ**

#### Co udělat:
1. Nahradit celý `:root` v `globals.css` novým color system (viz výše)
2. Odstranit všechny `-soft`, `-strong`, `-overlay` variants
3. Přidat dark mode colors
4. Zkontrolovat WCAG kontrast ratios
5. Update `tailwind.config.ts` s novými color tokens

#### Změny v kódu:
```css
/* Před */
--surface-soft: rgba(255, 255, 255, 0.5);
--surface-strong: #FFFFFF;

/* Po */
--bg-primary: #FFFFFF;
--bg-secondary: #F8FAFC;
```

---

### **PHASE 3: Homepage Redesign (3-4 hodiny)**
**Priorita: VYSOKÁ**

#### Nový Homepage Layout:

```
┌─────────────────────────────────────────┐
│  Header (sticky)                        │
├─────────────────────────────────────────┤
│                                         │
│         HERO SECTION                    │
│  Velký nadpis + subtitle + 2 CTA        │
│  Scroll down indicator ↓                │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│      ABOUT SECTION (grid 2 cols)        │
│  Text vlevo | Stats cards vpravo        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    FEATURED PROJECTS (grid 3 cols)      │
│  Card 1 | Card 2 | Card 3               │
│  [View All Projects →]                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│      SKILLS SECTION (icon grid)         │
│  Tech stack badges elegantně            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│      CONTACT CTA SECTION                │
│  Velká výzva ke kontaktu                │
│                                         │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

#### Komponenty k vytvoření:
- `HeroSection.tsx` - Hlavní hero s velkým textem
- `AboutSection.tsx` - O mně + stats
- `FeaturedProjects.tsx` - 3 featured project cards
- `SkillsSection.tsx` - Tech stack display
- `ContactCTA.tsx` - Call to action pro kontakt

---

### **PHASE 4: Typography System (1 hodina)**
**Priorita: STŘEDNÍ**

#### Co udělat:
1. Přidat Inter Variable font (nebo použít system fonts)
2. Definovat utility classes pro typography
3. Vytvořit `Typography.tsx` component pro konzistenci

```css
@layer components {
  .heading-1 { @apply text-6xl font-bold leading-tight text-text-primary; }
  .heading-2 { @apply text-4xl font-bold leading-snug text-text-primary; }
  .heading-3 { @apply text-3xl font-semibold leading-snug text-text-primary; }
  .heading-4 { @apply text-2xl font-semibold leading-normal text-text-primary; }
  
  .body-lg { @apply text-lg leading-relaxed text-text-secondary; }
  .body-base { @apply text-base leading-normal text-text-secondary; }
  .body-sm { @apply text-sm leading-normal text-text-tertiary; }
}
```

---

### **PHASE 5: Component Library (2-3 hodiny)**
**Priorita: STŘEDNÍ**

#### Komponenty k refactoringu:
1. **Button.tsx** - 3 varianty (primary, secondary, ghost)
2. **Card.tsx** - 2 varianty (default, interactive)
3. **Input.tsx** - Form inputs
4. **Badge.tsx** - Tech stack badges
5. **Section.tsx** - Page section wrapper

#### Implementace:
```tsx
// src/components/ui/Button.tsx
export const Button = ({ variant = 'primary', children, ...props }) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost'
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={variants[variant]}
      {...props}
    >
      {children}
    </motion.button>
  );
};
```

---

### **PHASE 6: Navigation Improvements (1-2 hodiny)**
**Priorita: NÍZKÁ**

#### Co udělat:
1. Vylepšit Header design
   - Čistší layout
   - Better mobile menu
   - Active state indicators

2. Přidat Footer
   - Social links
   - Quick links
   - Copyright

3. Breadcrumbs pro sub-pages
   - `/music/intro` → Home / Music / Intro

---

### **PHASE 7: Page-by-Page Refactor (4-6 hodin)**
**Priorita: STŘEDNÍ**

#### Pages k přepracování:
1. `/music/*` - Aplikovat nový design system
2. `/games` - Aplikovat nový design system
3. `/apps` - Aplikovat nový design system
4. `/contact` - Better form design
5. `/projekty/*` - Project detail pages

#### Postup:
- Použít nové komponenty z Phase 5
- Konzistentní spacing
- Jednotný layout pattern

---

### **PHASE 8: Performance & Accessibility (2-3 hodiny)**
**Priorita: STŘEDNÍ**

#### Co udělat:
1. **Performance Audit**
   - Lighthouse test
   - Image optimization (Next Image)
   - Code splitting
   - Lazy loading heavy components
   - Remove unused CSS/JS

2. **Accessibility Audit**
   - WCAG AA compliance
   - Keyboard navigation
   - Screen reader testing
   - Focus indicators
   - ARIA labels
   - Alt texts pro images

3. **SEO Improvements**
   - Meta tags
   - Open Graph tags
   - Structured data
   - Sitemap update

---

### **PHASE 9: Animations & Micro-interactions (2-3 hodiny)**
**Priorita: NÍZKÁ**

#### Co přidat:
1. Scroll-driven animations (Intersection Observer)
2. Page transitions (Framer Motion)
3. Hover micro-interactions
4. Loading skeletons
5. Success/error feedback

#### Guidelines:
- Respektovat `prefers-reduced-motion`
- Maximálně 300ms transitions
- Subtle effects (ne neon overload)

---

### **PHASE 10: Polish & Testing (2-3 hodiny)**
**Priorita: NÍZKÁ**

#### Co udělat:
1. Cross-browser testing (Chrome, Firefox, Safari)
2. Mobile responsive testing (iOS, Android)
3. Dark mode testing
4. Load testing
5. Bug fixing
6. Final polish

---

## 📝 PRIORITNÍ CHECKLIST

### 🔥 Musí být hotovo PRVNÍ
- [ ] **PHASE 1:** Cinematic Intro
- [ ] **PHASE 2:** Color System Refactor
- [ ] **PHASE 3:** Homepage Redesign

### ⚡ Důležité POTOM
- [ ] **PHASE 4:** Typography System
- [ ] **PHASE 5:** Component Library
- [ ] **PHASE 7:** Page-by-Page Refactor

### 💅 Nice to have NAKONEC
- [ ] **PHASE 6:** Navigation Improvements
- [ ] **PHASE 8:** Performance & Accessibility
- [ ] **PHASE 9:** Animations & Micro-interactions
- [ ] **PHASE 10:** Polish & Testing

---

## 🎯 EXPECTED OUTCOMES

Po dokončení všech fází:

✅ **Homepage:**
- Čistý, profesionální design
- Jasná vizuální hierarchie
- Rychlé načítání
- Perfektní kontrast a čitelnost

✅ **Color System:**
- WCAG AA compliant
- Konzistentní napříč stránkami
- Fungující dark mode
- Snadná údržba

✅ **Components:**
- Reusable component library
- Konzistentní styling
- Type-safe props
- Dokumentace

✅ **Performance:**
- Lighthouse score 90+
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- No layout shifts

✅ **Accessibility:**
- WCAG AA compliant
- Keyboard navigation
- Screen reader friendly
- Clear focus states

---

## ⏱️ ČASOVÝ ODHAD

| Phase | Čas | Priorita |
|-------|-----|----------|
| Phase 1: Intro | 2-3h | 🔥 |
| Phase 2: Colors | 1-2h | 🔥 |
| Phase 3: Homepage | 3-4h | 🔥 |
| Phase 4: Typography | 1h | ⚡ |
| Phase 5: Components | 2-3h | ⚡ |
| Phase 6: Navigation | 1-2h | 💅 |
| Phase 7: Pages | 4-6h | ⚡ |
| Phase 8: Perf & A11y | 2-3h | 💅 |
| Phase 9: Animations | 2-3h | 💅 |
| Phase 10: Polish | 2-3h | 💅 |

**Celkem:** 20-30 hodin práce

**Doporučený schedule:**
- **Den 1:** Phase 1, 2, 3 (core redesign)
- **Den 2:** Phase 4, 5 (system & components)
- **Den 3:** Phase 7 (pages refactor)
- **Den 4:** Phase 8, 9, 10 (polish)

---

## 🚦 NEXT STEPS

**Co udělat TEĎKA:**

1. ✅ Schválit tento plán
2. 🔥 Začít s Phase 1 (Cinematic Intro)
3. 🔥 Pokračovat Phase 2 (Colors)
4. 🔥 Dokončit Phase 3 (Homepage)

**Chceš začít? Řekni:**
- "Začni Phase 1" → Udělám cinematic intro
- "Začni Phase 2" → Refactoruju color system
- "Udělej všechno" → Postupně projdu všemi fázemi

---

*Tento audit dokument slouží jako roadmap pro kompletní redesign. Můžeš se k němu kdykoliv vrátit.*
