"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  const currentImage = images[index] ?? images[0] ?? "";

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 md:h-96">
      <Image src={currentImage} alt={alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <button
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian/70"
            aria-label="Önceki görsel"
          >
            <ChevronLeft size={16} className="text-porcelain" />
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian/70"
            aria-label="Sonraki görsel"
          >
            <ChevronRight size={16} className="text-porcelain" />
          </button>
        </div>
      )}
    </div>
  );
}
