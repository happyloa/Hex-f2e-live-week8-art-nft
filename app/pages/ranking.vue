<script setup lang="ts">
import { Diamond, Minus, Plus } from "@lucide/vue";
import {
  artPath,
  formatNumber,
  formatPercent,
  getArtwork,
  marketRanking,
} from "~/data/catalog";

useHead({ title: "市值排行榜" });
const expanded = ref<string[]>([]);
const entries = marketRanking.map((item) => ({
  ...item,
  artwork: getArtwork(item.id)!,
}));
const metrics = [
  { key: "day", name: "24h %" },
  { key: "week", name: "7d %" },
  { key: "floor", name: "地板價" },
  { key: "owners", name: "擁有者" },
  { key: "items", name: "作品數量" },
] as const;

function toggle(id: string) {
  expanded.value = expanded.value.includes(id)
    ? expanded.value.filter((item) => item !== id)
    : [...expanded.value, id];
}

function metricText(
  entry: (typeof entries)[number],
  metric: (typeof metrics)[number]["key"],
) {
  if (metric === "day" || metric === "week")
    return formatPercent(entry[metric]);
  if (metric === "floor") return entry.floor.toFixed(2);
  return entry[metric];
}
</script>

<template>
  <div class="site-shell page-space">
    <header class="mb-8 text-center md:mb-10">
      <h1 class="text-3xl font-bold lg:text-5xl">市價排行榜</h1>
      <p class="mt-3">由近期交易資訊整理出的藝術品市值排行</p>
    </header>
    <table
      class="hidden w-full border-separate border-spacing-y-3 text-left lg:table"
    >
      <caption class="sr-only">
        藝術品市值排行
      </caption>
      <thead>
        <tr class="font-bold">
          <th scope="col" class="w-13 px-2">
            <span class="sr-only">排名</span>
          </th>
          <th scope="col" class="py-3">系列</th>
          <th scope="col">價值</th>
          <th v-for="item in metrics" :key="item.key" scope="col" class="px-2">
            {{ item.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in entries"
          :key="entry.id"
          class="rank-table-row bg-white"
        >
          <td class="border-l px-2 text-center font-display text-2xl">
            {{ index + 1 }}
          </td>
          <th scope="row">
            <NuxtLink
              :to="artPath(entry.id)"
              class="flex items-center gap-3 pr-2 font-bold hover:underline"
            >
              <ArtPicture
                :name="entry.artwork.image"
                class="size-[64px] shrink-0 border-x border-ink object-cover"
                sizes="64px"
              />
              {{ entry.artwork.title }}
            </NuxtLink>
          </th>
          <td class="px-2 font-display text-lg">
            <span class="flex items-center gap-1"
              ><Diamond :size="13" aria-hidden="true" />{{
                formatNumber(entry.price)
              }}</span
            >
          </td>
          <td
            v-for="item in metrics"
            :key="item.key"
            class="px-2 font-display text-lg last:border-r"
            :class="{
              'text-up':
                (item.key === 'day' || item.key === 'week') &&
                entry[item.key] > 0,
              'text-down':
                (item.key === 'day' || item.key === 'week') &&
                entry[item.key] < 0,
            }"
          >
            {{ metricText(entry, item.key) }}
          </td>
        </tr>
      </tbody>
    </table>
    <ol class="divide-y divide-ink border border-ink bg-white lg:hidden">
      <li v-for="(entry, index) in entries" :key="entry.id">
        <div
          class="relative grid min-h-19 grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2 pr-2 text-sm"
        >
          <span
            class="grid h-full place-items-center border-r border-ink font-display text-2xl"
          >
            {{ index + 1 }}
          </span>
          <NuxtLink
            :to="artPath(entry.id)"
            class="flex min-w-0 items-center gap-2 font-bold hover:underline"
          >
            <ArtPicture
              :name="entry.artwork.image"
              class="size-11 shrink-0 rounded-full object-cover"
              sizes="44px"
            />
            <span>{{ entry.artwork.title }}</span>
          </NuxtLink>
          <span class="flex items-center gap-0.5 font-display text-base"
            ><Diamond :size="12" aria-hidden="true" />{{
              formatNumber(entry.price)
            }}</span
          >
          <button
            type="button"
            class="rank-toggle absolute right-0 bottom-0 grid size-11 items-end justify-items-end p-1 text-white"
            :aria-label="`${expanded.includes(entry.id) ? '收合' : '展開'}${entry.artwork.title}市值資訊`"
            :aria-expanded="expanded.includes(entry.id)"
            :aria-controls="`rank-${entry.id}`"
            @click="toggle(entry.id)"
          >
            <Minus
              v-if="expanded.includes(entry.id)"
              :size="14"
              aria-hidden="true"
            />
            <Plus v-else :size="14" aria-hidden="true" />
          </button>
        </div>
        <dl
          v-show="expanded.includes(entry.id)"
          :id="`rank-${entry.id}`"
          class="grid grid-cols-6 gap-y-3 border-t border-ink px-2 py-4 text-center text-sm"
        >
          <div
            v-for="item in metrics"
            :key="item.key"
            class="col-span-2"
            :class="{ 'col-start-2': item.key === 'owners' }"
          >
            <dt class="font-bold">{{ item.name }}</dt>
            <dd
              class="mt-1 font-display text-lg"
              :class="{
                'text-up':
                  (item.key === 'day' || item.key === 'week') &&
                  entry[item.key] > 0,
                'text-down':
                  (item.key === 'day' || item.key === 'week') &&
                  entry[item.key] < 0,
              }"
            >
              {{ metricText(entry, item.key) }}
            </dd>
          </div>
        </dl>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.rank-table-row > * {
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: var(--color-ink);
}
.rank-toggle::before {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 34px;
  height: 34px;
  background: var(--color-ink);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  content: "";
}
.rank-toggle[aria-expanded="true"]::before {
  background: var(--color-accent-dark);
}
.rank-toggle > svg {
  position: relative;
}
.rank-toggle:focus-visible {
  outline-offset: -2px;
}
</style>
