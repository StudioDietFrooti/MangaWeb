import React, { useRef } from 'react';
import { Upload, RefreshCw, Image as ImageIcon } from 'lucide-react';

interface MangaCoverProps {
  customCover: string | null;
  onCoverChange: (dataUrl: string | null) => void;
  className?: string;
}

export const MangaCover: React.FC<MangaCoverProps> = ({
  customCover,
  onCoverChange,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onCoverChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`relative group ${className}`} id="manga-cover-container">
      {/* Aspect ratio container matching standard B5/Tankobon manga ratio (1 : 1.414 or 2 : 3) */}
      <div className="relative w-full aspect-[2/3] max-w-[340px] mx-auto bg-neutral-900 border-2 border-neutral-700 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 hover:-translate-y-1">
        {customCover ? (
          <img
            src={customCover}
            alt="Xploration of Powers Manga Cover"
            className="w-full h-full object-cover select-none"
            id="cover-real-image"
          />
        ) : (
          /* High-Craft Original Black & White Manga Cover Placeholder */
          <div
            className="w-full h-full p-4 flex flex-col justify-between screentone-dots bg-[#fcfcfc] text-[#111111] border border-neutral-300 relative overflow-hidden select-none"
            id="cover-placeholder-graphic"
          >
            {/* Ink Speedline accents in corners */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-neutral-200 to-transparent opacity-40 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-8 border-neutral-200/60 pointer-events-none" />

            {/* Top header banner */}
            <div className="relative z-10 border-b-2 border-[#111111] pb-2 flex justify-between items-start">
              <div>
                <span className="text-[10px] tracking-widest font-mono font-bold uppercase text-neutral-600 block">
                  ORIGINAL STUDENT EDITION
                </span>
                <span className="font-japanese text-xl font-black tracking-wide text-neutral-950 block">
                  力の探求
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block px-1.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold tracking-wider">
                  VOL. 1
                </span>
                <span className="block text-[9px] text-neutral-500 font-mono mt-0.5">
                  ACT 01
                </span>
              </div>
            </div>

            {/* Center Visual Art Frame */}
            <div className="relative z-10 my-auto py-4">
              <div className="border-2 border-[#111111] p-3 bg-white shadow-[3px_3px_0px_0px_#111111] text-center relative">
                {/* Kanji watermarked symbol */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none font-japanese text-8xl font-black">
                  力
                </div>
                <div className="py-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-2 border-dashed border-neutral-400 flex items-center justify-center mb-3">
                    <ImageIcon className="w-7 h-7 text-neutral-500" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800">
                    MANGA COVER PLACEHOLDER
                  </span>
                  <span className="text-[11px] text-neutral-500 max-w-[190px] mt-1 leading-tight font-sans-body">
                    Upload your scanned front cover drawing or keep this clean placeholder
                  </span>
                </div>
              </div>

              {/* Main Title typography */}
              <div className="mt-4 text-center">
                <h3 className="font-manga-title text-3xl font-black tracking-wider text-neutral-950 leading-none">
                  XPLORATION OF POWERS
                </h3>
                <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase mt-1">
                  CHIKARA NO TANKYŪ
                </p>
              </div>
            </div>

            {/* Bottom metadata footer */}
            <div className="relative z-10 border-t-2 border-[#111111] pt-2 flex justify-between items-center text-[10px] font-mono text-neutral-700">
              <span>SCHOOL CIRCULATION</span>
              <span className="font-bold">CHAPTER 01</span>
            </div>
          </div>
        )}

        {/* Upload / Change Cover control */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-neutral-950/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFile}
            accept="image/*"
            className="hidden"
            id="cover-upload-input"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-white text-black text-xs font-mono font-bold tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shadow-sm"
            id="btn-upload-cover"
          >
            <Upload className="w-3.5 h-3.5" />
            {customCover ? 'Change Cover' : 'Upload Real Cover'}
          </button>
          {customCover && (
            <button
              type="button"
              onClick={() => onCoverChange(null)}
              className="px-2 py-1.5 bg-neutral-800 text-white text-xs font-mono hover:bg-neutral-700 transition-colors"
              title="Reset to default placeholder"
              id="btn-reset-cover"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
