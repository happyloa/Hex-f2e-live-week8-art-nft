<script setup lang="ts">
import { ArrowRight, ChevronDown, Diamond, X } from "@lucide/vue";
import {
  artistPath,
  artworks,
  collectionPath,
  formatNumber,
  getArtist,
  getArtwork,
  getCollection,
} from "~/data/catalog";

definePageMeta({ key: (route) => route.path });
const route = useRoute();
const artwork = getArtwork(String(route.params.id));
if (!artwork)
  throw createError({ statusCode: 404, statusMessage: "找不到藝術品" });

const artist = getArtist(artwork.artist)!;
const collection = artwork.collection
  ? getCollection(artwork.collection)
  : undefined;
useHead({
  title: artwork.title,
  meta: [{ name: "description", content: artwork.description }],
});

const { wallet, openWallet } = useWallet();
const { bids, addBid } = useDemoBids(artwork.id);
const bidOpen = ref(false);
const amount = ref<number | "">("");
const notice = ref("");
const dateTime = new Intl.DateTimeFormat("zh-TW", {
  dateStyle: "short",
  timeStyle: "short",
});
const offers = [
  { id: "offer-1", price: 0.044, term: "3 個月後", avatar: "user01" },
  { id: "offer-2", price: 0.054, term: "1 個月後", avatar: "user02" },
  { id: "offer-3", price: 0.056, term: "2 週後", avatar: "artist03" },
  { id: "offer-4", price: 0.044, term: "2 週後", avatar: "user03" },
];
const allOffers = computed(() => [
  ...bids.value.map((bid) => ({
    id: bid.id,
    price: bid.price,
    term: dateTime.format(bid.placedAt),
    avatar: "user01",
  })),
  ...offers,
]);
const highestBid = computed(() =>
  allOffers.value.reduce((highest, bid) =>
    bid.price > highest.price ? bid : highest,
  ),
);
const attributes =
  collection?.id === "birds"
    ? [
        { name: "品種", value: artwork.species },
        { name: "鳥的數量", value: `${artwork.birds} 隻` },
        { name: "是否有花草", value: artwork.flowers ? "是" : "否" },
        { name: "鳥的顏色", value: artwork.color },
      ]
    : [{ name: "刊登狀態", value: artwork.status }];
const info = [
  { name: "擁有者", value: "0xa543x…1283" },
  { name: "代幣 ID", value: "#1234" },
  { name: "合約地址", value: "0xa429…a163" },
  { name: "區塊鏈", value: artwork.network },
];
const related =
  artwork.id === "two-birds"
    ? ["bird-gathering", "penguin-like", "little-birds", "hurt-bird"].map(
        (id) => getArtwork(id)!,
      )
    : [
        ...artworks.filter(
          (item) =>
            item.id !== artwork.id &&
            collection &&
            item.collection === collection.id,
        ),
        ...artworks.filter(
          (item) =>
            item.id !== artwork.id &&
            (!collection || item.collection !== collection.id),
        ),
      ].slice(0, 4);

function startBid() {
  notice.value = "";
  if (!wallet.value) {
    void openWallet();
    return;
  }
  amount.value = "";
  bidOpen.value = true;
}

function submitBid() {
  if (
    !wallet.value ||
    typeof amount.value !== "number" ||
    !Number.isFinite(amount.value) ||
    amount.value <= 0
  )
    return;
  notice.value = addBid(amount.value)
    ? "已新增示範出價。"
    : "已新增暫時出價，瀏覽器無法儲存。";
  bidOpen.value = false;
}
</script>

<template>
  <div class="site-shell page-space">
    <section class="grid lg:grid-cols-2 lg:gap-6" aria-labelledby="work-title">
      <div class="panel bg-white p-3 md:p-6">
        <ArtPicture
          :name="artwork.image"
          :alt="artwork.title"
          priority
          class="aspect-square w-full object-cover lg:aspect-[4/3]"
          sizes="(min-width: 1024px) 580px, 94vw"
        />
      </div>
      <div class="panel border-t-0 lg:border-t">
        <div class="p-5 md:p-8">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <h1
              id="work-title"
              class="text-3xl leading-tight font-bold xl:text-5xl"
            >
              {{ artwork.title }}
            </h1>
            <NuxtLink
              :to="artistPath(artist.id)"
              class="inline-flex items-center gap-2 font-display text-lg hover:underline"
            >
              <ArtPicture
                :name="artist.image"
                class="size-8 rounded-full border object-cover"
                sizes="32px"
              />{{ artist.name }}
            </NuxtLink>
          </div>
          <div class="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div v-if="artwork.status === '拍賣中'">
              <p class="text-sm text-neutral-700">最高出價</p>
              <p
                class="mt-1 flex items-center gap-2 font-display text-xl"
                aria-live="polite"
              >
                <ArtPicture
                  :name="highestBid.avatar"
                  class="size-8 rounded-full object-cover"
                  sizes="32px"
                />
                <ArrowRight :size="15" aria-hidden="true" />
                <span>{{ formatNumber(highestBid.price) }} ETH</span>
              </p>
            </div>
            <p v-else class="flex items-center gap-2 font-display text-xl">
              <Diamond :size="16" aria-hidden="true" />
              {{ formatNumber(artwork.price) }} ETH
            </p>
            <button
              v-if="artwork.status === '拍賣中'"
              class="action min-w-28"
              type="button"
              @click="startBid"
            >
              出價
            </button>
            <span v-else class="border px-3 py-2 text-sm">{{
              artwork.status
            }}</span>
          </div>
          <p v-if="notice" class="mt-3 text-sm text-up" role="status">
            {{ notice }}
          </p>
        </div>
        <div class="border-t border-ink p-5 md:p-8">
          <p class="leading-7">{{ artwork.description }}</p>
          <NuxtLink
            v-if="collection"
            :to="collectionPath(collection.id)"
            class="mt-4 inline-block font-bold underline underline-offset-4"
            >查看系列：{{ collection.name }}</NuxtLink
          >
        </div>
      </div>
    </section>

    <section class="details-layout mt-6 grid gap-4" aria-label="作品資訊">
      <details class="panel attributes" open>
        <summary>屬性<ChevronDown :size="20" aria-hidden="true" /></summary>
        <dl class="grid grid-cols-2">
          <div
            v-for="item in attributes"
            :key="item.name"
            class="grid gap-1 px-4 py-4"
          >
            <dt class="text-sm font-bold">{{ item.name }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </details>
      <details class="panel property" open>
        <summary>基本資訊<ChevronDown :size="20" aria-hidden="true" /></summary>
        <dl class="grid">
          <div
            v-for="item in info"
            :key="item.name"
            class="flex items-center justify-between gap-2 border-b border-ink/20 px-4 py-3 last:border-b-0"
          >
            <dt class="font-bold">{{ item.name }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </details>
      <details class="panel offers" open>
        <summary>出價<ChevronDown :size="20" aria-hidden="true" /></summary>
        <table class="w-full table-fixed text-left">
          <caption class="sr-only">
            示範出價紀錄
          </caption>
          <thead class="border-b border-ink">
            <tr>
              <th scope="col" class="px-4 py-3">價格</th>
              <th scope="col" class="px-4 py-3">期限／出價時間</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="offer in allOffers"
              :key="offer.id"
              class="border-b border-ink/20 last:border-b-0"
            >
              <td class="px-4 py-3 font-display text-lg">
                <span class="flex items-center gap-2"
                  ><ArtPicture
                    :name="offer.avatar"
                    class="size-7 rounded-full object-cover"
                    sizes="28px"
                  />{{ formatNumber(offer.price) }} ETH</span
                >
              </td>
              <td class="px-4 py-3">{{ offer.term }}</td>
            </tr>
          </tbody>
        </table>
      </details>
      <details class="panel history" open>
        <summary>交易歷史<ChevronDown :size="20" aria-hidden="true" /></summary>
        <table class="w-full table-fixed text-left">
          <caption class="sr-only">
            示範交易歷史
          </caption>
          <thead class="border-b border-ink">
            <tr>
              <th scope="col" class="px-4 py-3">事件</th>
              <th scope="col" class="px-4 py-3">價格</th>
              <th scope="col" class="px-4 py-3">時間</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-ink/20">
              <td class="px-4 py-3">上架</td>
              <td class="px-4 py-3">{{ formatNumber(artwork.price) }} ETH</td>
              <td class="px-4 py-3">2 個月前</td>
            </tr>
            <tr>
              <td class="px-4 py-3">轉移</td>
              <td class="px-4 py-3">—</td>
              <td class="px-4 py-3">3 個月前</td>
            </tr>
          </tbody>
        </table>
      </details>
    </section>
    <section v-reveal class="site-section">
      <SectionRail
        english="Other"
        label="其餘作品"
        :href="collection ? collectionPath(collection.id) : '/explore'"
      />
      <ArtGallery :items="related" />
    </section>

    <AppDialog :open="bidOpen" label="示範出價" @close="bidOpen = false">
      <form class="p-5 md:p-6" @submit.prevent="submitBid">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-xl font-bold">示範出價</h2>
          <button
            type="button"
            aria-label="關閉出價"
            class="grid size-8 place-items-center"
            @click="bidOpen = false"
          >
            <X :size="23" aria-hidden="true" />
          </button>
        </div>
        <label class="my-4 grid gap-2">
          <span>出價金額（ETH）</span>
          <input
            v-model.number="amount"
            class="choice"
            type="number"
            min="0.001"
            step="0.001"
            required
          />
        </label>
        <button class="action w-full" type="submit">確認示範出價</button>
      </form>
    </AppDialog>
  </div>
</template>

<style scoped>
.details-layout {
  grid-template-areas: "attributes" "offers" "property" "history";
}
.attributes {
  grid-area: attributes;
}
.property {
  grid-area: property;
}
.offers {
  grid-area: offers;
}
.history {
  grid-area: history;
}
summary {
  display: flex;
  cursor: pointer;
  list-style: none;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px;
  font-size: 1.125rem;
  font-weight: 700;
}
summary::-webkit-details-marker {
  display: none;
}
details[open] summary {
  border-bottom: 1px solid;
}
details[open] summary > svg {
  rotate: 180deg;
}
@media (min-width: 1024px) {
  .details-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas: "attributes offers" "property history";
    gap: 24px;
    align-items: start;
  }
}
</style>
