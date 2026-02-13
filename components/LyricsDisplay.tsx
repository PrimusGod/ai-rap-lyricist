import React, { useState } from 'react';
import Loader from './Loader';
import type { LyricsDisplayProps } from '../types';

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ lyrics, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!lyrics) return;
    try {
      await navigator.clipboard.writeText(lyrics);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderLyricsWithFormatting = (text: string) => {
    // We can use a regex to highlight text inside [brackets]
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span key={i} className="text-cyan-400 font-bold tracking-tight bg-cyan-400/10 px-1 rounded">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-12">
          <Loader />
          <p className="mt-4 text-gray-400 animate-pulse font-medium">Laying down the tracks...</p>
          <p className="text-xs text-gray-500 mt-2">Engineering advanced wordplay & rhythmic pockets...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 font-semibold">An Error Occurred</p>
          <p className="text-center text-sm mt-1">{error}</p>
        </div>
      );
    }
    if (lyrics) {
      return (
        <div className="relative group w-full">
          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-600 transition-all duration-200 flex items-center gap-2 text-xs font-bold uppercase tracking-wider z-10"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
          <div className="whitespace-pre-wrap font-mono text-gray-300 text-sm sm:text-base leading-relaxed pt-10">
            {renderLyricsWithFormatting(lyrics)}
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="mt-4 font-medium italic">"The mic is open... drop your concept above."</p>
      </div>
    );
  };

  return (
    <div className="mt-8 w-full min-h-[400px] bg-gray-950/50 border border-gray-800 rounded-xl p-6 shadow-2xl flex flex-col items-start overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default LyricsDisplay;
          
