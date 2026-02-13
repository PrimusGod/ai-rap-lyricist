import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LyricsForm from './components/LyricsForm';
import LyricsDisplay from './components/LyricsDisplay';
import { generateLyrics } from './services/geminiService';
import { 
  StylePreset, 
  RhymeComplexity, 
  StorytellingDepth, 
  EmotionalTone,
  VocabularyLevel,
  AdLibIntensity,
  RegionalFlavor,
  EnergyLevel
} from './types';

const App: React.FC = () => {
  const [idea, setIdea] = useState<string>('');
  const [isExplicit, setIsExplicit] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<StylePreset>('ERB');
  
  // Customization Controls
  const [rhymeComplexity, setRhymeComplexity] = useState<RhymeComplexity>('COMPLEX');
  const [storytellingDepth, setStorytellingDepth] = useState<StorytellingDepth>('LINEAR');
  const [emotionalTone, setEmotionalTone] = useState<EmotionalTone>('AGGRESSIVE');
  const [vocabularyLevel, setVocabularyLevel] = useState<VocabularyLevel>('BALANCED');
  const [adLibIntensity, setAdLibIntensity] = useState<AdLibIntensity>('SPARSE');
  const [regionalFlavor, setRegionalFlavor] = useState<RegionalFlavor>('GLOBAL');
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>('MODERATE');

  const [lyrics, setLyrics] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLyrics = useCallback(async () => {
    if (!idea.trim()) {
      setError('Please enter an idea for your lyrics.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setLyrics('');
    try {
      const result = await generateLyrics({
        idea,
        isExplicit,
        preset: selectedPreset,
        rhymeComplexity,
        storytellingDepth,
        emotionalTone,
        vocabularyLevel,
        adLibIntensity,
        regionalFlavor,
        energyLevel
      });
      setLyrics(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [
    idea, isExplicit, selectedPreset, rhymeComplexity, 
    storytellingDepth, emotionalTone, vocabularyLevel, 
    adLibIntensity, regionalFlavor, energyLevel
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl">
        <Header />
        <main className="mt-8">
          <LyricsForm
            idea={idea}
            setIdea={setIdea}
            isExplicit={isExplicit}
            setIsExplicit={setIsExplicit}
            selectedPreset={selectedPreset}
            setSelectedPreset={setSelectedPreset}
            rhymeComplexity={rhymeComplexity}
            setRhymeComplexity={setRhymeComplexity}
            storytellingDepth={storytellingDepth}
            setStorytellingDepth={setStorytellingDepth}
            emotionalTone={emotionalTone}
            setEmotionalTone={setEmotionalTone}
            vocabularyLevel={vocabularyLevel}
            setVocabularyLevel={setVocabularyLevel}
            adLibIntensity={adLibIntensity}
            setAdLibIntensity={setAdLibIntensity}
            regionalFlavor={regionalFlavor}
            setRegionalFlavor={setRegionalFlavor}
            energyLevel={energyLevel}
            setEnergyLevel={setEnergyLevel}
            onSubmit={handleGenerateLyrics}
            isLoading={isLoading}
          />
          <LyricsDisplay
            lyrics={lyrics}
            isLoading={isLoading}
            error={error}
          />
        </main>
         <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Gemini 3 Pro • The Architect Lyrical Engine</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
    
