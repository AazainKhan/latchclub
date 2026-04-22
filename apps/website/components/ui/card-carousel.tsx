"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface CarouselSlide {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  images: CarouselSlide[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 5000,
  showPagination = true,
  showNavigation = true,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const css = `
  .latchclub-carousel .swiper {
    width: 100%;
    padding: 0 60px 60px;
  }

  .latchclub-carousel .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: auto;
  }

  .latchclub-carousel .swiper-slide img {
    display: block;
    width: 100%;
  }

  .latchclub-carousel .swiper-3d .swiper-slide-shadow-left,
  .latchclub-carousel .swiper-3d .swiper-slide-shadow-right {
    background-image: none;
    background: none;
  }

  /* Pagination bullets */
  .latchclub-carousel .swiper-pagination {
    bottom: 12px;
  }
  .latchclub-carousel .swiper-pagination-bullet {
    background: rgba(245, 247, 247, 0.3);
    opacity: 1;
    width: 8px;
    height: 8px;
    transition: all 0.2s ease;
  }
  .latchclub-carousel .swiper-pagination-bullet-active {
    background: #F5F7F7;
    width: 24px;
    border-radius: 4px;
  }

  /* Mobile: internal arrows visible */
  .latchclub-carousel .swiper-button-next,
  .latchclub-carousel .swiper-button-prev {
    color: rgba(245, 247, 247, 0.9);
    width: 38px;
    height: 38px;
    border-radius: 9999px;
    background: rgba(245, 247, 247, 0.14);
    border: 1px solid rgba(245, 247, 247, 0.25);
    transition: background 0.2s ease, color 0.2s ease;
    top: 42%;
    margin-top: 0;
  }
  .latchclub-carousel .swiper-button-next:hover,
  .latchclub-carousel .swiper-button-prev:hover {
    color: #F5F7F7;
    background: rgba(245, 247, 247, 0.24);
  }
  .latchclub-carousel .swiper-button-next::after,
  .latchclub-carousel .swiper-button-prev::after {
    font-size: 14px;
    font-weight: 700;
  }
  .latchclub-carousel .swiper-button-disabled {
    opacity: 0.25;
  }

  /* Desktop: hide internal arrows — external buttons are used instead */
  @media (min-width: 768px) {
    .latchclub-carousel .swiper-button-next,
    .latchclub-carousel .swiper-button-prev {
      display: none;
    }
  }
  `;

  const ExternalBtn = ({
    dir,
  }: {
    dir: "prev" | "next";
  }) => (
    <button
      onClick={() =>
        dir === "prev"
          ? swiperRef.current?.slidePrev()
          : swiperRef.current?.slideNext()
      }
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="hidden md:flex shrink-0 items-center justify-center w-11 h-11 rounded-full border border-white/25 bg-white/10 text-white/85 hover:bg-white/20 hover:text-white transition-colors"
    >
      {dir === "prev" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );

  return (
    <div className="latchclub-carousel w-full">
      <style>{css}</style>

      {/* Flex row: [prev btn] [swiper] [next btn] — btn only visible on md+ */}
      <div className="flex items-center gap-3">
        <ExternalBtn dir="prev" />

        <div className="flex-1 min-w-0">
          <Swiper
            onSwiper={(s) => { swiperRef.current = s; }}
            spaceBetween={50}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={showPagination ? { clickable: true } : false}
            navigation={showNavigation}
            touchStartPreventDefault={false}
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-4">
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src={image.src}
                      width={500}
                      height={500}
                      className="size-full"
                      alt={image.alt}
                    />
                  </div>
                  {(image.title || image.description) && (
                    <div className="px-1 text-center">
                      {image.title && (
                        <p className="text-bone text-lg font-medium tracking-tight">
                          {image.title}
                        </p>
                      )}
                      {image.description && (
                        <p className="text-bone/50 text-sm mt-1">
                          {image.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <ExternalBtn dir="next" />
      </div>
    </div>
  );
};
