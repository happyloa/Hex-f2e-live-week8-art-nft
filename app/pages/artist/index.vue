<script setup lang="ts">
import { artistPath, artists } from "~/data/catalog";

useHead({ title: "藝術家" });
</script>

<template>
  <section class="site-shell page-space">
    <h1 class="mb-6 border-b border-ink pb-4 font-display text-5xl md:mb-10">
      Artist <span class="font-sans text-xl font-bold">藝術家</span>
    </h1>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="artist in artists" :key="artist.id" class="panel">
        <NuxtLink
          :to="artistPath(artist.id)"
          class="group block"
          :aria-label="`認識藝術家 ${artist.name}`"
        >
          <ArtPicture
            :name="artist.image"
            class="aspect-4/3 w-full border-b object-cover group-hover:brightness-90"
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 47vw, 94vw"
          />
          <div class="p-5">
            <h2 class="font-display text-3xl">{{ artist.name }}</h2>
            <p class="mt-2">{{ artist.bio }}</p>
          </div>
        </NuxtLink>
      </article>
    </div>
  </section>
</template>
