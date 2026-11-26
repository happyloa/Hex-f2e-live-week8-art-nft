<script setup lang="ts">
import { SlidersHorizontal, X } from "@lucide/vue";
import {
  artistPath,
  artworks,
  getArtist,
  getCollection,
  queryText,
} from "~/data/catalog";
import { filterQuery, matchesFilters, readFilters } from "~/data/filters";

definePageMeta({ key: (route) => route.path });
const route = useRoute();
const router = useRouter();
const collection = getCollection(String(route.params.id));
if (!collection)
  throw createError({ statusCode: 404, statusMessage: "找不到藝術品系列" });

const artist = getArtist(collection.artist)!;
useHead({ title: collection.name });
const all = artworks.filter((item) => item.collection === collection.id);
const labels = [
  { label: "項目", index: 0 },
  { label: "擁有者", index: 1 },
  { label: "底價", index: 3 },
  { label: "總額", index: 2 },
];
const availableSorts = ["latest", "price-asc", "price-desc", "name"];
const sorts = [
  { id: "latest", text: "最新上架" },
  { id: "price-asc", text: "價格由低到高" },
  { id: "price-desc", text: "價格由高到低" },
  { id: "name", text: "作品名稱" },
];

const showBirdTraits = collection.id === "birds";
const filtersFromUrl = () => readFilters(route.query, showBirdTraits);
const applied = computed(filtersFromUrl);
const draft = ref(filtersFromUrl());
const filterOpen = ref(false);
const filterError = ref("");
const activeCount = computed(
  () => Object.values(filterQuery(applied.value)).filter(Boolean).length,
);
const sort = computed(() => {
  const current = queryText(route.query.sort);
  return availableSorts.includes(current) ? current : "latest";
});
const results = computed(() => {
  const items = all.filter((item) => matchesFilters(item, applied.value));
  if (sort.value === "price-asc")
    return items.sort((a, b) => a.price - b.price);
  if (sort.value === "price-desc")
    return items.sort((a, b) => b.price - a.price);
  if (sort.value === "name")
    return items.sort((a, b) => a.title.localeCompare(b.title, "zh-Hant"));
  if (collection.id === "birds") {
    const order = [
      "penguin-like",
      "two-birds",
      "bird-gathering",
      "joy-of-sharing",
      "metal-bird",
      "big-and-small",
      "window-birds",
      "little-birds",
      "hurt-bird",
      "branches",
    ];
    return items.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }
  return items;
});

watch(applied, () => {
  draft.value = filtersFromUrl();
  filterError.value = "";
});

function openFilters() {
  draft.value = filtersFromUrl();
  filterError.value = "";
  filterOpen.value = true;
}

async function applyFilters() {
  const { min, max } = draft.value;
  if (min !== "" && max !== "" && min > max) {
    filterError.value = "最低價格需小於或等於最高價格。";
    return;
  }
  await router.push({ query: { ...route.query, ...filterQuery(draft.value) } });
  filterError.value = "";
  filterOpen.value = false;
}

async function resetFilters() {
  draft.value = readFilters({});
  await applyFilters();
}

function changeSort(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  void router.push({
    query: { ...route.query, sort: value === "latest" ? undefined : value },
  });
}
</script>

<template>
  <div class="site-shell page-space collection-layout">
    <aside class="hidden self-start lg:block" aria-label="系列作品篩選">
      <form class="panel" @submit.prevent="applyFilters">
        <CollectionFilters v-model="draft" :show-bird-traits="showBirdTraits" />
        <p v-if="filterError" class="px-4 pt-3 text-sm text-down" role="alert">
          {{ filterError }}
        </p>
        <div class="flex gap-3 p-4">
          <button
            type="button"
            class="choice flex-1 hover:bg-paper"
            @click="resetFilters"
          >
            清除
          </button>
          <button type="submit" class="action flex-1">確認</button>
        </div>
      </form>
    </aside>
    <div class="min-w-0">
      <header class="panel collection-header p-5 md:p-8">
        <div class="collection-intro">
          <NuxtLink
            :to="artistPath(artist.id)"
            class="collection-artist inline-flex items-center gap-2 font-display text-lg hover:underline"
          >
            <ArtPicture
              :name="artist.image"
              class="size-8 rounded-full object-cover"
              sizes="32px"
            />{{ artist.name }}
          </NuxtLink>
          <h1 class="mt-3 text-3xl font-bold md:text-5xl">
            {{ collection.name }}
          </h1>
          <p class="collection-description mt-4 max-w-165 leading-7">
            {{ collection.description }}
          </p>
        </div>
        <dl
          class="collection-stats mt-5 grid grid-cols-4 border border-ink text-center"
        >
          <div
            v-for="{ label, index } in labels"
            :key="label"
            class="grid gap-1 border-l border-ink px-1 py-3 first:border-l-0"
          >
            <dt class="text-sm font-bold">{{ label }}</dt>
            <dd class="font-display text-xl md:text-2xl">
              {{ collection.stats[index] }}
            </dd>
          </div>
        </dl>
      </header>
      <div
        class="collection-toolbar my-5 flex items-center justify-between gap-3"
      >
        <p role="status" class="text-sm lg:sr-only">
          {{ results.length }} 件作品
        </p>
        <label>
          <span class="sr-only">作品排序</span>
          <select :value="sort" class="choice" @change="changeSort">
            <option v-for="item in sorts" :key="item.id" :value="item.id">
              {{ item.text }}
            </option>
          </select>
        </label>
      </div>
      <ArtGallery
        v-if="results.length"
        :items="results"
        :columns="3"
        class="collection-gallery"
        :price-currency="
          applied.currency === 'BNB' ? applied.currency : undefined
        "
      />
      <div v-else class="panel p-8 text-center">
        <p class="mb-4">沒有符合篩選條件的作品。</p>
        <button type="button" class="more" @click="resetFilters">
          清除條件
        </button>
      </div>
    </div>
    <button
      class="mobile-filter fixed bottom-4 left-1/2 z-10 flex min-h-12 -translate-x-1/2 items-center gap-2 border border-black bg-black px-5 py-2 font-bold text-white lg:hidden"
      type="button"
      @click="openFilters"
    >
      <SlidersHorizontal :size="17" aria-hidden="true" />篩選條件
      <span v-if="activeCount" class="font-display text-xl">{{
        activeCount
      }}</span>
    </button>
    <AppDialog :open="filterOpen" label="篩選條件" @close="filterOpen = false">
      <form
        class="flex min-h-dvh flex-col md:min-h-0"
        @submit.prevent="applyFilters"
      >
        <header class="relative border-b border-ink px-12 py-4 text-center">
          <h2 class="text-xl">篩選條件</h2>
          <button
            type="button"
            aria-label="關閉篩選"
            class="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center"
            @click="filterOpen = false"
          >
            <X :size="23" aria-hidden="true" />
          </button>
        </header>
        <CollectionFilters v-model="draft" :show-bird-traits="showBirdTraits" />
        <p v-if="filterError" class="px-4 pt-3 text-sm text-down" role="alert">
          {{ filterError }}
        </p>
        <div class="sticky bottom-0 mt-auto grid border-t border-ink bg-white">
          <button
            type="button"
            class="justify-self-center px-4 py-2 text-sm underline"
            @click="resetFilters"
          >
            清除
          </button>
          <button type="submit" class="action w-full">確認</button>
        </div>
      </form>
    </AppDialog>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .collection-layout {
    display: grid;
    grid-template-columns: minmax(225px, 306fr) minmax(0, 966fr);
    gap: 24px;
    padding-bottom: 32px;
  }
  .collection-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, min(45%, 418px));
    align-items: start;
    gap: 24px;
    min-height: 138px;
    padding: 0;
    border: 0;
    background: transparent;
  }
  .collection-artist {
    display: flex;
    width: fit-content;
    gap: 16px;
    font-size: 16px;
  }
  .collection-intro h1 {
    margin-top: 4px;
    font-size: 32px;
    line-height: 48px;
  }
  .collection-description {
    margin-top: 6px;
    line-height: 24px;
  }
  .collection-stats {
    margin-top: 46px;
    background: white;
    text-align: left;
  }
  .collection-stats > div {
    min-width: 0;
    min-height: 90px;
    gap: 0;
    padding: 0;
  }
  .collection-stats dt {
    padding: 12px 6px 0;
    font-size: 16px;
    font-weight: 400;
  }
  .collection-stats dd {
    align-self: end;
    border-bottom: 1px solid;
    padding: 0 6px 1px;
  }
  .collection-toolbar {
    justify-content: flex-end;
    margin-block: 40px;
  }
  .collection-toolbar select {
    min-width: 128px;
    min-height: 40px;
  }
  .collection-gallery.is-masonry :deep(.gallery-item) {
    margin-bottom: 0;
    padding-bottom: 47px;
  }
  .collection-gallery :deep(.art-hover) {
    gap: 16px;
    padding: 32px;
  }
  .collection-gallery :deep(.art-hover::after) {
    position: absolute;
    inset: 16px;
    border: 1px solid rgb(255 255 255 / 60%);
    content: "";
  }
  .collection-gallery :deep(.art-hover .more) {
    min-width: min(132px, 100%);
  }
}
</style>
