<script setup lang="ts">
import { Diamond } from "@lucide/vue";
import { artPath, formatNumber } from "~/data/catalog";
import type { Artwork } from "~/data/catalog";
import { priceInCurrency, type PriceCurrency } from "~/data/filters";

defineProps<{
  artwork: Artwork;
  priceCurrency?: PriceCurrency;
  mobileCover?: string;
}>();

const coverRatios: Record<string, string> = {
  "private-life": "258 / 254",
  "eves-scandal": "258 / 327",
  "blue-beer-sea": "258 / 254",
  "nobody-loves-me": "258 / 169",
  "tears-like-pearls": "258 / 174",
  "ten-more-minutes": "258 / 254",
  "do-i-look-good": "258 / 395",
  "hurt-bird": "258 / 254",
};
</script>

<template>
  <article
    class="group border-b border-ink/65"
    :class="{ 'mobile-cover': mobileCover }"
  >
    <NuxtLink
      :to="artPath(artwork.id)"
      class="block"
      :aria-label="`查看作品 ${artwork.title}`"
    >
      <div class="bg-white p-2 md:p-4 lg:p-6">
        <div class="relative">
          <ArtPicture
            :name="artwork.image"
            class="art-cover h-auto w-full object-cover"
            :style="{
              '--cover-ratio': coverRatios[artwork.id],
              '--mobile-cover-ratio': mobileCover,
            }"
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 29vw, 42vw"
          />
          <div
            class="pointer-events-none absolute inset-0 hidden flex-col gap-3 bg-black/70 p-3 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:flex lg:p-4"
          >
            <p class="line-clamp-3 font-bold">{{ artwork.description }}</p>
            <p
              v-if="!priceCurrency"
              class="flex items-center gap-1 font-display text-xl"
            >
              <Diamond :size="14" aria-hidden="true" />{{
                formatNumber(artwork.price)
              }}
            </p>
            <span
              class="more pointer-events-none mt-auto ml-auto hidden min-w-23! sm:inline-flex"
              >MORE</span
            >
          </div>
        </div>
      </div>
      <div class="art-label py-3 md:py-4">
        <h3 class="text-sm font-bold md:text-base">{{ artwork.title }}</h3>
        <p v-if="priceCurrency" class="mt-1 font-display">
          {{ formatNumber(priceInCurrency(artwork.price, priceCurrency)) }}
          {{ priceCurrency }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.art-cover {
  aspect-ratio: var(--cover-ratio, auto);
}
@media (max-width: 767px) {
  .mobile-cover .art-cover {
    aspect-ratio: var(--mobile-cover-ratio);
  }
  .mobile-cover .art-label {
    padding: 4px 8px 11px;
  }
  .mobile-cover h3 {
    font-weight: 400;
  }
}
</style>
