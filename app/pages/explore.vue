<script setup lang="ts">
import {
  artists,
  artistPath,
  artworks,
  collectionPath,
  collections,
  exploreIds,
  getArtist,
  getArtwork,
  matchesSearch,
  queryText,
} from "~/data/catalog";

useHead({ title: "探索" });
const route = useRoute();
const query = computed(() => queryText(route.query.q).trim());
const results = computed(() => {
  if (!query.value) return exploreIds.map((id) => getArtwork(id)!);
  return artworks.filter((item) =>
    matchesSearch(`${item.title} ${getArtist(item.artist)?.name}`, query.value),
  );
});
const matchingArtists = computed(() =>
  query.value
    ? artists.filter((artist) => matchesSearch(artist.name, query.value))
    : [],
);
const matchingCollections = computed(() =>
  query.value
    ? collections.filter((collection) =>
        matchesSearch(collection.name, query.value),
      )
    : [],
);
</script>

<template>
  <div class="site-shell page-space">
    <h1 v-if="!query" class="sr-only">探索藝術品</h1>
    <template v-else>
      <h1 class="text-2xl font-bold md:text-4xl">搜尋「{{ query }}」</h1>
      <nav
        v-if="matchingArtists.length || matchingCollections.length"
        aria-label="符合的藝術家與系列"
        class="my-4 flex flex-wrap gap-2"
      >
        <NuxtLink
          v-for="artist in matchingArtists"
          :key="artist.id"
          :to="artistPath(artist.id)"
          class="choice hover:bg-accent/15"
          >{{ artist.name }}</NuxtLink
        >
        <NuxtLink
          v-for="collection in matchingCollections"
          :key="collection.id"
          :to="collectionPath(collection.id)"
          class="choice hover:bg-accent/15"
          >{{ collection.name }}</NuxtLink
        >
      </nav>
      <p class="my-4" role="status">{{ results.length }} 件作品</p>
    </template>
    <ArtGallery v-if="results.length" :items="results" />
    <div v-else class="panel p-8 text-center">
      <p class="mb-4">沒有符合的作品，試試其他作品名稱或藝術家。</p>
      <NuxtLink to="/explore" class="more">探索全部</NuxtLink>
    </div>
  </div>
</template>
