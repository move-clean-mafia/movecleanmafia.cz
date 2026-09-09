'use client';

import { useEffect, useState } from 'react';

const items = [
  ['/images/instagram-work/work-1-final.jpg', 'https://www.instagram.com/stehomafia/reel/Dct2QPAt1Ci/'],
  ['/images/instagram-work/work-2-final.jpg', 'https://www.instagram.com/stehomafia/reel/DcE0p3WBrBB/'],
  ['/images/instagram-work/work-3-final.jpg', 'https://www.instagram.com/stehomafia/reel/DXZnqhIDSXG/'],
] as const;

export function InstagramGallery() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % items.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="relative h-[360px] sm:h-[430px]">
        {items.map(([image, url], index) => {
          const position = (index - active + items.length) % items.length;
          const classes = position === 0
            ? 'left-1/2 z-20 w-[min(78vw,420px)] -translate-x-1/2 scale-100 opacity-100'
            : position === 1
              ? 'left-[12%] sm:left-[20%] z-10 w-[min(48vw,300px)] -translate-x-1/2 scale-90 opacity-70'
              : 'left-[88%] sm:left-[80%] z-10 w-[min(48vw,300px)] -translate-x-1/2 scale-90 opacity-70';
          return (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer" className={`absolute top-0 block overflow-hidden rounded-2xl border border-[#d6b977]/50 bg-[#111] shadow-xl transition-all duration-700 ${classes}`}>
              <div className="aspect-[9/16] w-full bg-[#111] p-3 sm:p-5">
                <img src={image} alt="MoveCleanMafia — skutečná práce" className="h-full w-full rounded-xl object-contain" />
              </div>
              <div className="border-t border-[#d6b977]/20 p-3 text-center text-sm text-[#d6b977]">Instagram @stehomafia →</div>
            </a>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center gap-2" aria-label="Instagram gallery navigation">
        {items.map((_, index) => (
          <button key={index} type="button" aria-label={`Show Instagram photo ${index + 1}`} onClick={() => setActive(index)} className={`h-2.5 w-2.5 rounded-full transition ${index === active ? 'bg-[#d6b977] scale-110' : 'bg-[#d6b977]/30'}`} />
        ))}
      </div>
    </div>
  );
}
