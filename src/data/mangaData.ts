import { MangaChapter, OrderRequest } from '../types';

export const MANGA_INFO = {
  title: 'XPLORATION OF POWERS',
  japaneseTitle: '力の探求',
  japaneseRomaji: 'Chikara no Tankyū',
  tagline: 'Exploration / Quest for Power',
  synopsis:
    'When an enigmatic portal materialized without warning in the school grounds, a group of ordinary students stepped into the uncharted rift. Traversing the threshold awakened strange and unique powers within them: the feral ferocity of the Tiger, the blinding velocity of Light, the spatial tears of the Portal, the volatile atmospheric grasp of Gas, and the miraculous ability to summon living reality from drawn Art. But behind their awakening lies an ancient history—a catastrophic world shaped by bitter historical riots between the Fruit-Awakened Civilization and the Blade Masters of the Swordsman Civilization. By an inviolable law of their world, any fruit user who tries to master a blade or blend the two forces watches the steel violently shatter and break. And deep within the student group, a dangerous secret is kept: two among them are destined to receive swords. In the shadows of both ancient civilizations, faint whispers murmur of an ancient slumbering dragon waiting beneath the crust. To uncover what happens next and witness the collision of steel and power, click Read below and start Chapter 01.',
  projectStatus: 'Original Student Project',
  disclaimer: 'An original student-made manga project. All content created for school publication.',
  authorPlaceholder: '[Student Creator / Artist Name]',
  schoolPlaceholder: '[School / Manga Club / Grade / Section]',
};

export interface AwakenedPower {
  id: string;
  name: string;
  japanese: string;
  kanji: string;
  category: string;
  tagline: string;
  description: string;
  colorTone: string;
}

export const AWAKENED_POWERS: AwakenedPower[] = [
  {
    id: 'tiger',
    name: 'Tiger',
    japanese: '虎の力 (Tora no Chikara)',
    kanji: '虎',
    category: 'Beast / Primal',
    tagline: 'Apex Predator Ferocity & Feral Senses',
    description:
      'Unleashes untamed physical ferocity, hyper-reactive predator reflexes, and explosive kinetic claw strikes that crush barriers.',
    colorTone: 'Feral Might',
  },
  {
    id: 'light',
    name: 'Light',
    japanese: '光の力 (Hikari no Chikara)',
    kanji: '光',
    category: 'Radiance / Energy',
    tagline: 'Blinding Velocity & Luminescent Piercing Rays',
    description:
      'Manipulates ambient photons to accelerate to blinding speeds, create radiant flash shields, and loose piercing beam strikes.',
    colorTone: 'Absolute Radiance',
  },
  {
    id: 'portal',
    name: 'Portal',
    japanese: '門の力 (Mon no Chikara)',
    kanji: '門',
    category: 'Spatial / Rift',
    tagline: 'Dimensional Tear & Spatial Relocation',
    description:
      'Folds local space to open instant transit doorways, bend projectile trajectories, and banish attacks across rift thresholds.',
    colorTone: 'Dimensional Void',
  },
  {
    id: 'gas',
    name: 'Gas',
    japanese: '気の力 (Ki no Chikara)',
    kanji: '気',
    category: 'Atmospheric / Vapor',
    tagline: 'Vapor Manipulation & Pressure Dispersion',
    description:
      'Generates and controls invisible vapor, toxic haze, and explosive pressurized mist while allowing the user to disperse harmlessly through air.',
    colorTone: 'Volatile Mist',
  },
  {
    id: 'art',
    name: 'Art',
    japanese: '画の力 (Ga no Chikara)',
    kanji: '画',
    category: 'Creation / Materialization',
    tagline: 'Tangible Ink & Illustration Summoning',
    description:
      'Draws illustrations that peel directly off parchment, imbuing sketches with physical mass, functional weaponry, and living constructs.',
    colorTone: 'Living Canvas',
  },
];

export interface WorldLore {
  title: string;
  subtitle: string;
  civilizationClash: {
    title: string;
    description: string;
    fruitCivilization: {
      name: string;
      japanese: string;
      concept: string;
    };
    swordsmanCivilization: {
      name: string;
      japanese: string;
      concept: string;
    };
  };
  forbiddenFusionRule: {
    ruleName: string;
    japanese: string;
    lorePercent: string;
    description: string;
    consequence: string;
  };
  classifiedSecret: {
    badge: string;
    title: string;
    japanese: string;
    description: string;
  };
  dragonWhisper: {
    title: string;
    japanese: string;
    hint: string;
  };
}

export const WORLD_LORE: WorldLore = {
  title: 'THE ANCIENT WORLD LORE',
  subtitle: 'The 60% Chronicle: The Split Civilizations & The Shattered Steel',
  civilizationClash: {
    title: 'The Great Riots: Fruit Bearers vs. Swordsmen',
    description:
      'Long before the portal opened in modern school halls, ancient history was carved by brutal riots and irreconcilable wars between two dominant civilizations that divided the earth.',
    fruitCivilization: {
      name: 'The Fruit-Eater Civilization',
      japanese: '果実の民 (Kajitsu no Tami)',
      concept:
        'Lineages who gained supernatural transformations and elemental mastery by consuming mysterious anomalous fruits born of ancient rifts.',
    },
    swordsmanCivilization: {
      name: 'The Swordsman Civilization',
      japanese: '剣士の民 (Kenshi no Tami)',
      concept:
        'Purists who rejected supernatural consumption, cultivating unbending martial discipline, steel-forging mastery, and lethal blade arts.',
    },
  },
  forbiddenFusionRule: {
    ruleName: 'The Incompatibility Law (The Shattered Blade)',
    japanese: '壊刃の掟 (Kaijin no Okite)',
    lorePercent: '60% Ancient Lore Foundation',
    description:
      'The forces of the fruit and the sword refuse to coexist. If any fruit user attempts to master a sword or mix the mystical energy of their fruit with cold steel, the blade violently fractures and shatters into brittle dust. True mastery demands choosing one absolute path.',
    consequence: 'No fusion is possible: any fruit-infused blade will instantly explode into shards.',
  },
  classifiedSecret: {
    badge: 'CLASSIFIED // GROUP INTEL',
    title: 'The Secret of the Twin Blades',
    japanese: '二振りの剣 (Futafuri no Ken)',
    description:
      'Unknown to most of the classroom, not everyone who stepped through the portal received fruit powers. Secretly, two members within the group are destined to receive legendary swords—setting them on an inevitable, dangerous collision course with their fruit-wielding peers.',
  },
  dragonWhisper: {
    title: 'Faint Dragon Whisper',
    japanese: '古龍の気配 (Koryū no Kehai)',
    hint: '...Deep beneath the tectonic scars where neither fruit nor blade can reach, an ancient colossus breathes. A single slit-pupil eye opens in the subterranean dark...',
  },
};

// Generates an authentic black and white student manga SVG placeholder page
export function generatePlaceholderPageSvg(
  pageNumber: number,
  totalPages: number,
  chapterTitle: string,
  variant: number = 0
): string {
  // Variations of classic manga panel layouts (2-panel, 3-panel dynamic, 4-koma style, splash)
  const variants = [
    // Variant 0: Dramatic 3-panel vertical layout with screentone
    `
    <rect x="24" y="24" width="372" height="150" fill="#ffffff" stroke="#111111" stroke-width="2.5" />
    <text x="36" y="50" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="bold" fill="#666666">PANEL 01 // ESTABLISHING SCENE</text>
    <text x="36" y="75" font-family="'Shippori Mincho', serif" font-size="18" fill="#111111">静寂な放課後の教室 —</text>
    <text x="36" y="98" font-family="'Space Grotesk', sans-serif" font-size="12" fill="#444444">[Original artwork placeholder: Classroom courtyard]</text>
    <line x1="24" y1="174" x2="396" y2="174" stroke="#111111" stroke-width="2" />
    
    <!-- Middle Split Panels -->
    <rect x="24" y="190" width="176" height="200" fill="#f8f8f8" stroke="#111111" stroke-width="2.5" />
    <text x="36" y="215" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#666666">PANEL 02: AWAKENING</text>
    <path d="M 50 320 L 170 230" stroke="#111111" stroke-width="1.5" stroke-dasharray="3,3" />
    <text x="36" y="345" font-family="'Shippori Mincho', serif" font-size="24" font-weight="bold" fill="#222222">ザッ…</text>
    
    <rect x="220" y="190" width="176" height="200" fill="#ffffff" stroke="#111111" stroke-width="2.5" />
    <text x="232" y="215" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#666666">PANEL 03: REACTION</text>
    <circle cx="308" cy="285" r="45" fill="none" stroke="#222222" stroke-width="1.5" />
    <text x="280" y="290" font-family="'Shippori Mincho', serif" font-size="14" fill="#333333">「これは…？」</text>
    
    <!-- Bottom Action Panel -->
    <rect x="24" y="406" width="372" height="170" fill="#ffffff" stroke="#111111" stroke-width="3" />
    <text x="36" y="432" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#666666">PANEL 04 // POWER SURGE</text>
    <text x="140" y="505" font-family="'Shippori Mincho', serif" font-size="34" font-weight="900" fill="#111111">ドォォン！</text>
    `,
    // Variant 1: Large Splash focus panel
    `
    <rect x="24" y="24" width="372" height="340" fill="#ffffff" stroke="#111111" stroke-width="3" />
    <line x1="24" y1="24" x2="160" y2="160" stroke="#cccccc" stroke-width="1" />
    <line x1="396" y1="24" x2="260" y2="160" stroke="#cccccc" stroke-width="1" />
    <line x1="24" y1="364" x2="160" y2="240" stroke="#cccccc" stroke-width="1" />
    <line x1="396" y1="364" x2="260" y2="240" stroke="#cccccc" stroke-width="1" />
    <circle cx="210" cy="185" r="70" fill="#f4f4f4" stroke="#111111" stroke-width="2" />
    <text x="210" y="180" font-family="'Shippori Mincho', serif" font-size="28" font-weight="900" text-anchor="middle" fill="#111111">力の探求</text>
    <text x="210" y="208" font-family="'Space Grotesk', sans-serif" font-size="11" text-anchor="middle" fill="#555555">[MAIN ARTWORK PANEL]</text>
    <text x="40" y="340" font-family="'Space Grotesk', sans-serif" font-size="10" fill="#777777">Original student drawing placeholder</text>
    
    <rect x="24" y="380" width="372" height="196" fill="#f8f8f8" stroke="#111111" stroke-width="2.5" />
    <text x="38" y="410" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="bold" fill="#666666">PANEL 02: DIALOGUE</text>
    <text x="38" y="440" font-family="'Shippori Mincho', serif" font-size="16" fill="#222222">「力を手に入れた時、何を選ぶ？」</text>
    <text x="38" y="470" font-family="'Space Grotesk', sans-serif" font-size="12" fill="#555555">"When power awakens, which path will you choose?"</text>
    `,
    // Variant 2: Diagonal dynamic battle/confrontation panels
    `
    <polygon points="24,24 396,24 396,180 24,230" fill="#ffffff" stroke="#111111" stroke-width="2.5" />
    <text x="36" y="52" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#666666">PANEL 01 // MOMENTUM</text>
    <text x="260" y="120" font-family="'Shippori Mincho', serif" font-size="32" font-weight="bold" fill="#222222">ゴゴゴ…</text>
    
    <polygon points="24,244 396,194 396,380 24,380" fill="#f4f4f4" stroke="#111111" stroke-width="2.5" />
    <text x="36" y="275" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#666666">PANEL 02 // CLASH OF INTENT</text>
    <text x="140" y="325" font-family="'Shippori Mincho', serif" font-size="20" fill="#111111">「止まれ！まだ制御できていない！」</text>
    
    <rect x="24" y="394" width="372" height="182" fill="#ffffff" stroke="#111111" stroke-width="2.5" />
    <text x="36" y="420" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#666666">PANEL 03 // RESOLVE</text>
    <text x="36" y="455" font-family="'Space Grotesk', sans-serif" font-size="12" fill="#444444">[Replace with scanned student sketch page]</text>
    <text x="36" y="485" font-family="'Shippori Mincho', serif" font-size="18" fill="#111111">「これが…僕の探求だ。」</text>
    `,
    // Variant 3: 4-panel vertical sequential
    `
    <rect x="24" y="24" width="372" height="125" fill="#ffffff" stroke="#111111" stroke-width="2" />
    <text x="36" y="48" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#666666">SCENE I</text>
    <text x="36" y="78" font-family="'Shippori Mincho', serif" font-size="16" fill="#111111">始業のチャイムが鳴り響く校舎</text>

    <rect x="24" y="160" width="372" height="125" fill="#fbfbfb" stroke="#111111" stroke-width="2" />
    <text x="36" y="184" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#666666">SCENE II</text>
    <text x="36" y="214" font-family="'Shippori Mincho', serif" font-size="16" fill="#111111">日常の裏側に潜む微かな異変</text>

    <rect x="24" y="296" width="372" height="125" fill="#ffffff" stroke="#111111" stroke-width="2" />
    <text x="36" y="320" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#666666">SCENE III</text>
    <text x="36" y="350" font-family="'Shippori Mincho', serif" font-size="16" fill="#111111">掌に宿る未知の脈動</text>

    <rect x="24" y="432" width="372" height="144" fill="#111111" stroke="#111111" stroke-width="2" />
    <text x="36" y="460" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="bold" fill="#aaaaaa">SCENE IV</text>
    <text x="36" y="500" font-family="'Shippori Mincho', serif" font-size="22" font-weight="bold" fill="#ffffff">探求の幕が上がる。</text>
    `
  ];

  const layout = variants[variant % variants.length];

  const svgContent = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 600" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="background-color: #fafafa; display: block;">
    <defs>
      <pattern id="screentone-${pageNumber}" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.75" fill="#555555" opacity="0.25" />
      </pattern>
    </defs>
    
    <!-- Manga Page Canvas background with screentone texture -->
    <rect width="420" height="600" fill="#fafafa" />
    <rect width="420" height="600" fill="url(#screentone-${pageNumber})" />

    <!-- Outer Manga Safe Trim / Border marks -->
    <line x1="8" y1="8" x2="20" y2="8" stroke="#999999" stroke-width="0.8" />
    <line x1="8" y1="8" x2="8" y2="20" stroke="#999999" stroke-width="0.8" />
    <line x1="412" y1="8" x2="400" y2="8" stroke="#999999" stroke-width="0.8" />
    <line x1="412" y1="8" x2="412" y2="20" stroke="#999999" stroke-width="0.8" />
    <line x1="8" y1="592" x2="20" y2="592" stroke="#999999" stroke-width="0.8" />
    <line x1="8" y1="592" x2="8" y2="580" stroke="#999999" stroke-width="0.8" />
    <line x1="412" y1="592" x2="400" y2="592" stroke="#999999" stroke-width="0.8" />
    <line x1="412" y1="592" x2="412" y2="580" stroke="#999999" stroke-width="0.8" />

    <!-- Manga Panels Content -->
    ${layout}

    <!-- Bottom Page Running Head and Number (Authentic Manga Running Header) -->
    <rect x="24" y="582" width="372" height="14" fill="#ffffff" opacity="0.9" />
    <text x="26" y="591" font-family="'Space Grotesk', sans-serif" font-size="9" fill="#777777" letter-spacing="1">XPLORATION OF POWERS - CH.01</text>
    <text x="394" y="591" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="bold" fill="#111111" text-anchor="end">${pageNumber}</text>
  </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}

// Initial Chapter 1 pages (12 full authentic pages placeholder ready for student upload)
const INITIAL_CHAPTER_PAGES = Array.from({ length: 12 }, (_, i) => ({
  id: `p-${i + 1}`,
  pageNumber: i + 1,
  placeholderTitle: `Page ${i + 1}`,
  placeholderNotes: i === 0 ? 'Chapter Cover & Title Splash' : `Story Sequence ${i + 1}`,
}));

export const INITIAL_CHAPTERS: MangaChapter[] = [
  {
    id: 'ch-1',
    number: 1,
    title: 'The Beginning',
    subtitle: '始まりの刻 (The Hour of Beginning)',
    isAvailable: true,
    pages: INITIAL_CHAPTER_PAGES,
    releaseNote: 'Chapter 01 debut for school circulation.',
  },
];

const LOCAL_STORAGE_CHAPTERS_KEY = 'xop_manga_chapters_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'xop_manga_orders_v1';
const LOCAL_STORAGE_COVER_KEY = 'xop_manga_custom_cover_v1';

export function getStoredChapters(): MangaChapter[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_CHAPTERS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored chapters', e);
  }
  return INITIAL_CHAPTERS;
}

export function saveStoredChapters(chapters: MangaChapter[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_CHAPTERS_KEY, JSON.stringify(chapters));
  } catch (e) {
    console.error('Error saving chapters', e);
  }
}

export function getStoredOrders(): OrderRequest[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading orders', e);
  }
  return [];
}

export function saveOrderRequest(order: Omit<OrderRequest, 'id' | 'createdAt' | 'status'>): OrderRequest {
  const existing = getStoredOrders();
  const newOrder: OrderRequest = {
    ...order,
    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    status: 'Pending',
  };
  const updated = [newOrder, ...existing];
  try {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving order', e);
  }
  return newOrder;
}

export function getCustomCover(): string | null {
  try {
    return localStorage.getItem(LOCAL_STORAGE_COVER_KEY);
  } catch {
    return null;
  }
}

export function setCustomCover(dataUrl: string | null) {
  try {
    if (dataUrl) {
      localStorage.setItem(LOCAL_STORAGE_COVER_KEY, dataUrl);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_COVER_KEY);
    }
  } catch (e) {
    console.error('Error setting cover', e);
  }
}
