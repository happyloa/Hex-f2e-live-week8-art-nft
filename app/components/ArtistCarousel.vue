<script setup lang="ts">
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { artistPath, getArtist } from "~/data/catalog";

const slides = ["michael", "antony-wu", "kemus-wu", "joanne"].map((id) =>
  getArtist(id)!,
);
const modules = [A11y, Keyboard, Pagination];
const pagination = {
  clickable: true,
  bulletElement: "button",
};
</script>

<template>
  <Swiper
    class="artist-carousel"
    :modules="modules"
    :space-between="12"
    :initial-slide="1"
    :speed="280"
    slides-per-view="auto"
    centered-slides
    :keyboard="{ enabled: true }"
    :pagination="pagination"
    :a11y="{
      paginationBulletMessage: '前往藝術家 {{index}}',
      containerMessage: '熱門藝術家輪播',
    }"
    :breakpoints="{ 768: { spaceBetween: 24 } }"
  >
    <SwiperSlide v-for="artist in slides" :key="artist.id" class="artist-slide">
      <div class="artist-photo relative">
        <ArtPicture
          :name="artist.image"
          class="h-full w-full object-cover"
          sizes="(min-width: 768px) 636px, calc(100vw - 24px)"
        />
        <h3
          class="artist-title absolute top-5 left-5 max-w-[60%] text-white md:top-6 md:left-6"
        >
          {{ artist.name }}
        </h3>
        <div class="artist-caption">
          <p
            class="bg-white/90 p-4 text-sm leading-6 md:max-w-77 md:p-6 md:text-base"
          >
            {{ artist.bio }}
          </p>
          <NuxtLink
            :to="artistPath(artist.id)"
            class="more justify-self-end"
            :aria-label="`認識藝術家 ${artist.name}`"
            >MORE</NuxtLink
          >
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.artist-carousel {
  padding-bottom: 56px;
}
.artist-slide {
  width: 100%;
}
.artist-photo > img {
  height: 232px;
}
.artist-title {
  font: 400 3rem/0.9 var(--font-display);
  text-shadow: 0 1px 8px #0008;
}
.artist-caption {
  display: grid;
  background: white;
  padding: 0 12px 12px;
  gap: 8px;
}
.artist-caption > p {
  padding-left: 0;
}
.artist-carousel :deep(.swiper-pagination-bullet) {
  border-radius: 0;
  opacity: 1;
  background: black;
}
.artist-carousel :deep(.swiper-pagination-bullet-active) {
  width: 16px;
  background: var(--color-accent);
}
@media (min-width: 768px) {
  .artist-slide {
    width: min(636px, 58%);
    align-self: center;
  }
  .artist-photo > img {
    height: clamp(260px, 33vw, 439px);
  }
  .artist-title {
    font-size: clamp(3rem, 6vw, 5rem);
  }
  .artist-caption {
    position: absolute;
    inset: auto 24px 24px;
    grid-template-columns: 1fr auto;
    align-items: end;
    background: transparent;
    padding: 0;
  }
  .artist-caption > p {
    padding-left: 24px;
  }
  .artist-slide:not(.swiper-slide-active) .artist-photo > img {
    height: clamp(170px, 20vw, 262px);
    filter: grayscale(1);
  }
  .artist-slide:not(.swiper-slide-active) .artist-title,
  .artist-slide:not(.swiper-slide-active) .artist-caption {
    visibility: hidden;
  }
}
</style>
