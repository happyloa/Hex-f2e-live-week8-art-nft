<script setup lang="ts">
import {
  artPath,
  artworks,
  collectionPath,
  collections,
  getArtist,
  getArtwork,
  latestIds,
  queryText,
} from "~/data/catalog";

definePageMeta({ key: (route) => route.path });
const route = useRoute();
const artist = getArtist(String(route.params.id));
if (!artist)
  throw createError({ statusCode: 404, statusMessage: "找不到藝術家" });

useHead({ title: artist.name });
const showCollection = computed(
  () => queryText(route.query.tab) === "collection",
);
const stats = ["販售中", "地板價格", "7 日成交", "30 日成交"];
const series = collections
  .filter((item) => item.artist === artist.id)
  .sort((a, b) => (a.id === "flowers" ? -1 : b.id === "flowers" ? 1 : 0))
  .map((item) => ({
    ...item,
    artwork: artworks
      .filter((artwork) => artwork.collection === item.id)
      .slice(0, 4),
  }));
const collected =
  artist.id === "michael"
    ? latestIds.map((id) => getArtwork(id)!)
    : artworks.filter((item) => item.artist !== artist.id).slice(0, 8);
</script>

<template>
  <div class="site-shell page-space">
    <section class="artist-profile" aria-labelledby="artist-title">
      <ArtPicture
        :name="artist.image"
        :alt="artist.name"
        priority
        class="panel h-full min-h-60 w-full object-cover"
        sizes="(min-width: 1024px) 416px, 100vw"
      />
      <div class="panel border-t-0 p-5 lg:border-t lg:border-l-0 lg:p-8">
        <h1 id="artist-title" class="font-display text-5xl md:text-6xl">
          {{ artist.name }}
        </h1>
        <p class="mt-3 font-display text-lg">{{ artist.address }}</p>
        <p class="mt-4 leading-7">{{ artist.bio }}</p>
      </div>
      <dl
        class="panel grid grid-cols-2 divide-x divide-y divide-ink text-center"
      >
        <div
          v-for="(label, index) in stats"
          :key="label"
          class="grid content-center gap-1 px-2 py-3 md:py-4"
        >
          <dt class="text-sm font-bold">{{ label }}</dt>
          <dd class="font-display text-2xl">
            {{ artist.stats[index] }}
            <span v-if="index" class="text-sm">ETH</span>
          </dd>
        </div>
      </dl>
    </section>
    <nav class="mt-8 flex border-b border-ink md:mt-12" aria-label="藝術家內容">
      <NuxtLink
        :to="{ path: route.path }"
        :aria-current="!showCollection ? 'page' : undefined"
        class="artist-tab"
        :class="{ active: !showCollection }"
        >Art Works <span>系列作品</span></NuxtLink
      >
      <NuxtLink
        :to="{ path: route.path, query: { tab: 'collection' } }"
        :aria-current="showCollection ? 'page' : undefined"
        class="artist-tab"
        :class="{ active: showCollection }"
        >Collection <span>收藏品</span></NuxtLink
      >
    </nav>
    <ArtGallery
      v-if="showCollection"
      :items="collected"
      class="mt-6 md:mt-10"
    />
    <section
      v-else
      class="mt-6 grid gap-8 md:mt-10 md:gap-14"
      aria-label="作品系列"
    >
      <article
        v-for="item in series"
        :key="item.id"
        class="panel series-card relative p-5 lg:p-8"
      >
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-[820px]">
            <h2 class="text-[1.75rem] font-bold lg:text-[2rem]">
              {{ item.name }}
            </h2>
            <p class="mt-2">{{ item.description }}</p>
          </div>
          <NuxtLink
            :to="collectionPath(item.id)"
            class="more ml-auto"
            :aria-label="`查看系列 ${item.name}`"
            >MORE</NuxtLink
          >
        </div>
        <div class="mt-5 grid gap-3 md:grid-cols-4 md:gap-6">
          <NuxtLink
            v-for="(work, index) in item.artwork"
            :key="work.id"
            :to="artPath(work.id)"
            class="border-4 border-ink bg-white p-2 hover:border-accent"
            :class="{ 'hidden md:block': index > 0 }"
            :aria-label="`查看作品 ${work.title}`"
          >
            <ArtPicture
              :name="work.image"
              :alt="work.title"
              class="aspect-[4/3] w-full object-cover"
              sizes="(min-width: 768px) 23vw, 88vw"
            />
          </NuxtLink>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.artist-profile {
  display: grid;
}
.artist-profile > dl {
  border-top: 0;
}
.artist-tab {
  border: 1px solid transparent;
  border-bottom: 0;
  padding: 8px 12px;
  font: 400 1.5rem/1.25 var(--font-display);
}
.artist-tab > span {
  font: 700 0.75rem/1.25 var(--font-sans);
}
.artist-tab.active {
  border-color: var(--color-ink);
  background: white;
  box-shadow: 0 1px white;
}
.artist-tab:hover {
  background: white;
}
.series-card::before,
.series-card::after {
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  background: #080808;
  content: "";
}
.series-card::before {
  left: 0;
  clip-path: polygon(0 0, 100% 0, 0 100%);
}
.series-card::after {
  right: 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}
@media (min-width: 1024px) {
  .artist-profile {
    grid-template-columns: minmax(0, 416fr) minmax(0, 550fr) minmax(0, 330fr);
    min-height: 236px;
  }
  .artist-profile > dl {
    margin-left: 24px;
    border-top: 1px solid;
  }
  .artist-tab {
    padding-inline: 24px;
    font-size: 2.25rem;
  }
  .artist-tab > span {
    font-size: 0.9rem;
  }
}
</style>
