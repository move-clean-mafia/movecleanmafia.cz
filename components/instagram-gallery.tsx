'use client';

import { useEffect, useState } from 'react';

const items = [
  ['/images/instagram-work/work-1-v2.jpg', 'https://www.instagram.com/stehomafia/reel/Dbygv9whF6X/'],
  ['/images/instagram-work/work-2.jpg', 'https://www.instagram.com/stehomafia/p/DW1-nAYjYQ-/'],
  ['/images/instagram-work/work-3.jpg', 'https://www.instagram.com/stehomafia/p/DWMWYbVDVCo/'],
] as const;

export function InstagramGallery() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % items.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const [image, url] = items[active];
  return (
    <div className="mx-auto w-full max-w-[520px]">
      <a href={url} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-2xl border border-[#d6b977]/50 bg-[#111]">
        <div className="aspect-square w-full bg-[#111] p-3 sm:p-5">
          <img src={image} alt="MoveCleanMafia — skutečná práce" className="h-full w-full rounded-xl object-contain transition duration-500 group-hover:scale-[1.02]" />
        </div>
        <div className="border-t border-[#d6b977]/20 p-3 text-center text-sm text-[#d6b977]">Instagram @stehomafia →</div>
      </a>
      <div className="mt-4 flex justify-center gap-2" aria-label="Instagram gallery navigation">
        {items.map((_, index) => (
          <button key={index} type="button" aria-label={`Show Instagram photo ${index + 1}`} onClick={() => setActive(index)} className={`h-2.5 w-2.5 rounded-full transition ${index === active ? 'bg-[#d6b977] scale-110' : 'bg-[#d6b977]/30'}`} />
        ))}
      </div>
    </div>
  );
}
