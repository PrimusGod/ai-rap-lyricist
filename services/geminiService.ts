import { GoogleGenAI } from "@google/genai";
import { 
  StylePreset, 
  RhymeComplexity, 
  StorytellingDepth, 
  EmotionalTone,
  VocabularyLevel,
  AdLibIntensity,
  RegionalFlavor,
  EnergyLevel
} from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getStyleInstructions = (preset: StylePreset): string => {
  switch (preset) {
    case 'ERB':
      return `
        BASE STYLE: EPIC RAP BATTLES OF HISTORY (ERB).
        - [Beat: High-energy, orchestral strings, cinematic impacts, heavy boom-bap rhythm]
        - [Vocal: Competitive, projecting, historical announcer vibe]
        - Focus: Dense pop-culture/historical references and lethal "face-off" energy.
      `;
    case 'ICP':
      return `
        BASE STYLE: INSANE CLOWN POSSE (ICP) / HORRORCORE.
        - [Beat: Eerie funhouse synths, distorted circus melodies, heavy thumping bass]
        - [Vocal: Theatrical, raspy, eccentric, sinister carnival energy]
        - Focus: Theatrical "Dark Carnival" lore, horrorcore imagery, and storytelling.
      `;
    case 'OLD_SCHOOL':
      return `
        BASE STYLE: OLD SCHOOL HIP HOP (90s Boom Bap).
        - [Beat: Dusty vinyl samples, classic soul loops, steady 4/4 breakbeats]
        - [Vocal: Smooth, rhythmically precise, laid-back but authoritative]
        - Focus: Social commentary, knowledge, and pure rhythmic mastery.
      `;
    case 'MODERN_TRAP':
      return `
        BASE STYLE: MODERN TRAP.
        - [Beat: Rattling 808s, sharp hi-hat rolls, dark ambient pads]
        - [Vocal: Melodic, rhythmic triplets, heavy emphasis on "bounce"]
        - Focus: Sonic mood, catchy cadences, and rhythmic syncopation.
      `;
    case 'UK_DRILL':
      return `
        BASE STYLE: UK DRILL.
        - [Beat: Sliding 808 basslines, haunting piano loops, fast-paced percussion]
        - [Vocal: Aggressive, cold, distinct UK cadence, focus on rhythmic intensity]
        - Focus: Gritty realism, territorial pride, and complex flow patterns.
      `;
    case 'SOUTHERN_GOSICK':
      return `
        BASE STYLE: SOUTHERN CRUNK / DIRTY SOUTH.
        - [Beat: Loud brass, repetitive high-energy chants, massive distorted bass]
        - [Vocal: High volume, energetic, chanting style, repetitive hooks]
        - Focus: Club energy, anthemic chants, and southern drawl.
      `;
    default:
      return '';
  }
};

interface GenerateParams {
  idea: string;
  isExplicit: boolean;
  preset: StylePreset;
  rhymeComplexity: RhymeComplexity;
  storytellingDepth: StorytellingDepth;
  emotionalTone: EmotionalTone;
  vocabularyLevel: VocabularyLevel;
  adLibIntensity: AdLibIntensity;
  regionalFlavor: RegionalFlavor;
  energyLevel: EnergyLevel;
}

export const generateLyrics = async ({
  idea,
  isExplicit,
  preset,
  rhymeComplexity,
  storytellingDepth,
  emotionalTone,
  vocabularyLevel,
  adLibIntensity,
  regionalFlavor,
  energyLevel
}: GenerateParams): Promise<string> => {
  const styleInfo = getStyleInstructions(preset);
  
  const rhymeInstruction = {
    'SIMPLE': "RHYME SCHEME: Traditional AABB/ABAB. Simple, accessible end-rhymes.",
    'COMPLEX': "RHYME SCHEME: Technical. Use internal rhymes, multisyllabic stacks, and slant rhymes.",
    'GOD_TIER': "RHYME SCHEME: Elite. Use mosaic rhymes, perfect internal chains, 5+ syllable stacks, and non-stop vowel-matching."
  }[rhymeComplexity];

  const storyInstruction = {
    'LINEAR': "STORY: A clear, chronological narrative. Start to finish.",
    'FRAGMENTED': "STORY: Abstract, jumpy, poetic. Use non-linear snapshots of memory.",
    'CONVOLUTED': "STORY: Extremely complex. Layers of metaphors, riddles, and hidden meanings. Hard to follow on first listen."
  }[storytellingDepth];

  const toneInstruction = {
    'AGGRESSIVE': "TONE: Visceral and punchy. High-impact word choices.",
    'INTROSPECTIVE': "TONE: Melancholic, reflective, and quiet. Philosophical depth.",
    'HUMOROUS': "TONE: Witty and light. Heavy use of puns and self-irony.",
    'DARK': "TONE: Ominous and brooding. Gothic or horrorcore themes.",
    'TRIUMPHANT': "TONE: Anthemic and inspiring. Focus on growth and victory."
  }[emotionalTone];

  const vocabInstruction = {
    'STREET': "VOCABULARY: Raw street slang, gritty terminology, and colloquialisms.",
    'BALANCED': "VOCABULARY: Standard contemporary hip hop language. Accessible but sharp.",
    'LITERARY': "VOCABULARY: Elevated, academic, and archaic. Use rare words and scholarly allusions."
  }[vocabularyLevel];

  const adLibInstruction = {
    'NONE': "AD-LIBS: None. Focus purely on the primary vocal track.",
    'SPARSE': "AD-LIBS: Occasional emphasizes at the end of key bars. (e.g., 'Facts!', 'Word!')",
    'HEAVY': "AD-LIBS: Constant vocal interjections, reaction noises, and melodic repetitions. (e.g., 'Skrt skrt!', 'Grrrrt!', 'Yeah!')"
  }[adLibIntensity];

  const flavorInstruction = {
    'GLOBAL': "DIALECT: Standard Global English.",
    'EAST_COAST': "DIALECT: NYC/East Coast flavor. Phrases like 'deadass', 'son', 'word is bond'.",
    'WEST_COAST': "DIALECT: West Coast / LA flavor. Laid back, G-funk slang, sunny but dangerous.",
    'SOUTHERN': "DIALECT: Southern Drawl. Double-time southern terminology, focus on cadence.",
    'UK': "DIALECT: UK Slang. Terms like 'mandem', 'bruv', 'innit', 'pagan'."
  }[regionalFlavor];

  const energyInstruction = {
    'CHILL': "ENERGY: Low BPM feel, relaxed breathing, effortless flow.",
    'MODERATE': "ENERGY: Standard performance level. Professional and steady.",
    'HIGH_ENERGY': "ENERGY: High BPM energy, intense breathing patterns, rapid-fire delivery."
  }[energyLevel];

  const explicitInstruction = isExplicit
    ? "EXPLICIT: Unfiltered. Include profanity and gritty descriptions for maximum realism."
    : "EXPLICIT: Radio Clean. No profanity. Use creative replacements for mature themes.";

  const prompt = `
    You are 'The Architect', the world's most versatile and technical rap ghostwriter.
    MISSION: Write a high-quality, full-length rap anthem based on this idea: "${idea}".

    CONSTRAINTS:
    - Include technical metadata in square brackets [ ] for: [Beat Style], [Vocal Style], [Energy], [Flow Pattern], [Ad-libs], and [Structural Section].
    - Ensure EVERY structural section (Intro, Verse, Chorus, etc.) has specific vocal and flow directions.
    
    STYLE SPECS:
    ${styleInfo}
    ${rhymeInstruction}
    ${storyInstruction}
    ${toneInstruction}
    ${vocabInstruction}
    ${adLibInstruction}
    ${flavorInstruction}
    ${energyInstruction}
    ${explicitInstruction}

    TECHNICAL DIRECTIVES:
    1. WORDPLAY: Use complex double-entendres and triple-entendres where possible.
    2. SONICS: Use alliteration, assonance, and consonance to ensure the verse "hits" even on paper.
    3. STRUCTURE: Must include [Intro], [Verse 1], [Chorus], [Verse 2], [Chorus], [Bridge], [Verse 3], and [Outro].
    
    LENGTH: Aim for approximately 2,800 characters. Detailed, substantial, and elite.
    OUTPUT: Provide ONLY the lyrics and metadata. No conversational pre-text.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          temperature: 0.88,
          thinkingConfig: { thinkingBudget: 0 }
        }
    });
    
    const text = response.text;
    if (!text) throw new Error("Empty response from the AI Architect.");

    return text.trim();
  } catch (error) {
    console.error("Generation error:", error);
    throw new Error("The Architect encountered a technical glitch. Check your inputs and try again.");
  }
};
  
