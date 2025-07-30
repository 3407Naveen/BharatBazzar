import React from 'react';

export function VoiceWaveform() {
  return (
    <div className="flex items-center justify-center space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-orange-500 voice-wave rounded-full"
          style={{
            animationDelay: `${i * 0.1}s`,
            height: '20px'
          }}
        ></div>
      ))}
    </div>
  );
}