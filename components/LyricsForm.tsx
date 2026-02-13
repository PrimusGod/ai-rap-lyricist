import React, { useState } from 'react';
import type { 
  LyricsFormProps, 
  StylePreset, 
  RhymeComplexity, 
  StorytellingDepth, 
  EmotionalTone,
  VocabularyLevel,
  AdLibIntensity,
  RegionalFlavor,
  EnergyLevel
} from '../types';

const styles: { id: StylePreset; label: string; description: string; icon: string }[] = [
  { id: 'ERB', label: 'ERB Battle', description: 'Quick-fire historical references.', icon: '⚔️' },
  { id: 'ICP', label: 'Dark Carnival', description: 'Horrorcore theatrical storytelling.', icon: '🤡' },
  { id: 'OLD_SCHOOL', label: 'Old School', description: 'Classic boom-bap, lyrical miracles.', icon: '📻' },
  { id: 'MODERN_TRAP', label: 'Modern Trap', description: 'Triplet flows & 808-heavy vibes.', icon: '💎' },
  { id: 'UK_DRILL', label: 'UK Drill', description: 'Aggressive sliding bass & slang.', icon: '💂' },
  { id: 'SOUTHERN_GOSICK', label: 'Crunk/South', description: 'High energy, repetitive anthems.', icon: '🐊' }
];

const ControlGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-3">
    <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-500/80 font-black block pl-1">
      {label}
    </span>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const SegmentedControl: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  currentValue: string;
  onChange: (val: any) => void;
  disabled?: boolean;
}> = ({ label, options, currentValue, onChange, disabled }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center px-1">
      <span className="text-xs font-bold text-gray-400">{label}</span>
    </div>
    <div className="flex bg-gray-950/80 p-1 rounded-xl border border-gray-800 shadow-inner">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          disabled={disabled}
          className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-black transition-all duration-200 uppercase tracking-wider ${
            currentValue === opt.value 
              ? 'bg-cyan-600 text-white shadow-lg scale-[1.02] z-10' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const LyricsForm: React.FC<LyricsFormProps> = ({ 
  idea, setIdea, 
  isExplicit, setIsExplicit, 
  selectedPreset, setSelectedPreset,
  rhymeComplexity, setRhymeComplexity,
  storytellingDepth, setStorytellingDepth,
  emotionalTone, setEmotionalTone,
  vocabularyLevel, setVocabularyLevel,
  adLibIntensity, setAdLibIntensity,
  regionalFlavor, setRegionalFlavor,
  energyLevel, setEnergyLevel,
  onSubmit, isLoading 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-800/50 space-y-8">
      {/* Concept Input */}
      <div>
        <label htmlFor="idea-input" className="flex items-center gap-2 text-lg font-black text-gray-100 mb-4 tracking-tight uppercase">
          <span className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">1</span>
          The Concept
        </label>
        <textarea
          id="idea-input"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="What's the track about? Be specific or abstract..."
          className="w-full h-32 p-5 bg-black/40 border border-gray-800 rounded-2xl text-white placeholder-gray-600 focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all resize-none shadow-2xl"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Presets Column */}
        <div className="lg:col-span-5 space-y-6">
          <label className="flex items-center gap-2 text-lg font-black text-gray-100 mb-2 tracking-tight uppercase">
            <span className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">2</span>
            Style Core
          </label>
          <div className="grid grid-cols-1 gap-3">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedPreset(style.id)}
                disabled={isLoading}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${
                  selectedPreset === style.id
                    ? 'bg-cyan-950/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] translate-x-1'
                    : 'bg-black/20 border-gray-800 hover:border-gray-700 hover:bg-black/30'
                }`}
              >
                <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">{style.icon}</span>
                <div className="flex flex-col">
                  <span className={`font-black text-sm tracking-wide ${selectedPreset === style.id ? 'text-cyan-400' : 'text-gray-300'}`}>
                    {style.label}
                  </span>
                  <p className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">{style.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Refinement Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex justify-between items-center">
             <label className="flex items-center gap-2 text-lg font-black text-gray-100 tracking-tight uppercase">
                <span className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">3</span>
                The Fine Print
            </label>
            <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-[10px] font-black uppercase text-cyan-500 hover:text-cyan-400 transition-colors tracking-widest border-b border-cyan-500/30"
            >
                {showAdvanced ? 'Simple View' : 'All Controls'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <ControlGroup label="Technical Structure">
              <SegmentedControl 
                label="Rhyme Level"
                currentValue={rhymeComplexity}
                onChange={setRhymeComplexity}
                disabled={isLoading}
                options={[
                    { value: 'SIMPLE', label: 'Classic' },
                    { value: 'COMPLEX', label: 'Technical' },
                    { value: 'GOD_TIER', label: 'Infinite' }
                ]}
              />
              <SegmentedControl 
                label="Energy Output"
                currentValue={energyLevel}
                onChange={setEnergyLevel}
                disabled={isLoading}
                options={[
                    { value: 'CHILL', label: 'Chill' },
                    { value: 'MODERATE', label: 'Mid' },
                    { value: 'HIGH_ENERGY', label: 'Hype' }
                ]}
              />
            </ControlGroup>

            <ControlGroup label="Content Logic">
              <SegmentedControl 
                label="Story Path"
                currentValue={storytellingDepth}
                onChange={setStorytellingDepth}
                disabled={isLoading}
                options={[
                    { value: 'LINEAR', label: 'Story' },
                    { value: 'FRAGMENTED', label: 'Poetic' },
                    { value: 'CONVOLUTED', label: 'Mazy' }
                ]}
              />
              <SegmentedControl 
                label="Vibe / Tone"
                currentValue={emotionalTone}
                onChange={setEmotionalTone}
                disabled={isLoading}
                options={[
                    { value: 'AGGRESSIVE', label: 'Aggro' },
                    { value: 'INTROSPECTIVE', label: 'Deep' },
                    { value: 'HUMOROUS', label: 'Witty' }
                ]}
              />
            </ControlGroup>

            {showAdvanced && (
              <>
                <ControlGroup label="Verbal Mastery">
                  <SegmentedControl 
                    label="Vocabulary"
                    currentValue={vocabularyLevel}
                    onChange={setVocabularyLevel}
                    disabled={isLoading}
                    options={[
                        { value: 'STREET', label: 'Street' },
                        { value: 'BALANCED', label: 'Mixed' },
                        { value: 'LITERARY', label: 'Scholar' }
                    ]}
                  />
                  <SegmentedControl 
                    label="Ad-lib Pop"
                    currentValue={adLibIntensity}
                    onChange={setAdLibIntensity}
                    disabled={isLoading}
                    options={[
                        { value: 'NONE', label: 'Dry' },
                        { value: 'SPARSE', label: 'Few' },
                        { value: 'HEAVY', label: 'Loud' }
                    ]}
                  />
                </ControlGroup>

                <ControlGroup label="Regional Dialect">
                  <SegmentedControl 
                    label="Flavor Profile"
                    currentValue={regionalFlavor}
                    onChange={setRegionalFlavor}
                    disabled={isLoading}
                    options={[
                        { value: 'GLOBAL', label: 'Standard' },
                        { value: 'EAST_COAST', label: 'NYC/East' },
                        { value: 'WEST_COAST', label: 'LA/West' },
                        { value: 'SOUTHERN', label: 'South' },
                        { value: 'UK', label: 'UK' }
                    ]}
                  />
                  <div className="pt-2">
                    <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-gray-800">
                        <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Explicit Check</span>
                        </div>
                        <label htmlFor="explicit-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            id="explicit-toggle" 
                            className="sr-only peer"
                            checked={isExplicit}
                            onChange={() => setIsExplicit(!isExplicit)}
                            disabled={isLoading}
                        />
                        <div className="w-10 h-5 bg-gray-800 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600 after:peer-checked:bg-white"></div>
                        </label>
                    </div>
                  </div>
                </ControlGroup>
              </>
            )}
          </div>
        </div>
      </div>
      
      {!showAdvanced && (
          <div className="flex items-center justify-center">
            <label className="flex items-center gap-3 cursor-pointer group">
                <span className="text-xs font-bold text-gray-500 group-hover:text-gray-400 transition-colors uppercase tracking-widest">Explicit Content</span>
                <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-cyan-600 focus:ring-cyan-500 transition-all"
                    checked={isExplicit}
                    onChange={() => setIsExplicit(!isExplicit)}
                    disabled={isLoading}
                />
            </label>
          </div>
      )}

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="group relative w-full overflow-hidden py-5 px-8 bg-gradient-to-br from-cyan-600 via-cyan-500 to-blue-700 text-white font-black rounded-2xl shadow-[0_20px_40px_-15px_rgba(6,182,212,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] outline-none"
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <span className="relative z-10 flex items-center justify-center gap-3 tracking-[0.3em] uppercase text-sm sm:text-base">
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Architecting Bars...
            </>
          ) : (
            <>
              Generate Masterpiece
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default LyricsForm;
  
