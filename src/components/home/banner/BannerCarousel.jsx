"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import heroOne from "@/assets/hero-1.png";
import heroTwo from "@/assets/hero-2.png";

const slides = [heroOne, heroTwo];

const BannerCarousel = () => {
    return (
        <div className="relative w-full">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                // Nav arrows were always shown before, even on tiny screens — hide them until md
                className="[&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden md:[&_.swiper-button-next]:flex md:[&_.swiper-button-prev]:flex"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/*
              Old bug: <Image width={300} height={80} /> forced every slide into a
              tiny fixed 300x80 box no matter how big the source image was, which
              is why "object-cover" had almost nothing to actually cover.
              Fix: give the slide a real, responsive height and let the image
              "fill" that box instead of hard-coding pixel dimensions.
            */}
                        <div className="relative h-[320px] w-full sm:h-[420px] lg:h-[560px]">
                            <Image
                                src={slide}
                                alt={`Banner slide ${index + 1}`}
                                fill
                                priority={index === 0}
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerCarousel;