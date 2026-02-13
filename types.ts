import type React from 'react';

export type StylePreset = 'ERB' | 'ICP' | 'OLD_SCHOOL' | 'MODERN_TRAP' | 'UK_DRILL' | 'SOUTHERN_GOSICK';
export type RhymeComplexity = 'SIMPLE' | 'COMPLEX' | 'GOD_TIER';
export type StorytellingDepth = 'LINEAR' | 'FRAGMENTED' | 'CONVOLUTED';
export type EmotionalTone = 'AGGRESSIVE' | 'INTROSPECTIVE' | 'HUMOROUS' | 'DARK' | 'TRIUMPHANT';
export type VocabularyLevel = 'STREET' | 'BALANCED' | 'LITERARY';
export type AdLibIntensity = 'NONE' | 'SPARSE' | 'HEAVY';
export type RegionalFlavor = 'GLOBAL' | 'EAST_COAST' | 'WEST_COAST' | 'SOUTHERN' | 'UK';
export type EnergyLevel = 'CHILL' | 'MODERATE' | 'HIGH_ENERGY';

export interface LyricsFormProps {
  idea: string;
  setIdea: React.Dispatch<React.SetStateAction<string>>;
  isExplicit: boolean;
  setIsExplicit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPreset: StylePreset;
  setSelectedPreset: React.Dispatch<React.SetStateAction<StylePreset>>;
  rhymeComplexity: RhymeComplexity;
  setRhymeComplexity: React.Dispatch<React.SetStateAction<RhymeComplexity>>;
  storytellingDepth: StorytellingDepth;
  setStorytellingDepth: React.Dispatch<React.SetStateAction<StorytellingDepth>>;
  emotionalTone: EmotionalTone;
  setEmotionalTone: React.Dispatch<React.SetStateAction<EmotionalTone>>;
  vocabularyLevel: VocabularyLevel;
  setVocabularyLevel: React.Dispatch<React.SetStateAction<VocabularyLevel>>;
  adLibIntensity: AdLibIntensity;
  setAdLibIntensity: React.Dispatch<React.SetStateAction<AdLibIntensity>>;
  regionalFlavor: RegionalFlavor;
  setRegionalFlavor: React.Dispatch<React.SetStateAction<RegionalFlavor>>;
  energyLevel: EnergyLevel;
  setEnergyLevel: React.Dispatch<React.SetStateAction<EnergyLevel>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export interface LyricsDisplayProps {
  lyrics: string;
  isLoading: boolean;
  error: string | null;
}
