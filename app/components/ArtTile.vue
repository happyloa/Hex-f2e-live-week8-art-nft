<script setup lang="ts">
import { Diamond } from "@lucide/vue";
import { artPath, formatNumber } from "~/data/catalog";
import type { Artwork } from "~/data/catalog";

defineProps<{ artwork: Artwork }>();

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
  <article class="group border-b border-ink/65">
    <NuxtLink
      :to="artPath(artwork.id)"
      class="block"
      :aria-label="`查看作品 ${artwork.title}`"
    >
      <div class="bg-white p-2 md:p-4 lg:p-6">
        <div class="relative">
          <ArtPicture
            :name="artwork.image"
            class="h-auto w-full object-cover"
            :style="{ aspectRatio: coverRatios[artwork.id] }"
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 29vw, 42vw"
          />
          <div
            class="pointer-events-none absolute inset-0 hidden flex-col gap-3 bg-black/70 p-3 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:flex lg:p-4"
          >
            <p class="line-clamp-3 font-bold">{{ artwork.description }}</p>
            <p class="flex items-center gap-1 font-display text-xl">
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
      <h3 class="py-3 text-sm font-bold md:py-4 md:text-base">
        {{ artwork.title }}
      </h3>
    </NuxtLink>
  </article>
</template>
