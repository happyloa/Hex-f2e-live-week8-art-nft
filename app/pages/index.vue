<script setup lang="ts">
import { Diamond, PencilRuler, Shapes, Tags, Wallet } from "@lucide/vue";
import {
  artistPath,
  artPath,
  collectionPath,
  getArtist,
  getArtwork,
  latestIds,
  ranking,
} from "~/data/catalog";

useHead({ title: "首頁" });
const { openWallet } = useWallet();
const hero = ["flowing-gaze", "ocean-wave", "window-birds"].map((id) => {
  const artwork = getArtwork(id)!;
  return { ...artwork, collectionHref: collectionPath(artwork.collection!) };
});
const latest = latestIds.map((id) => getArtwork(id)!);
const leaders = ranking
  .slice(0, 6)
  .map((entry) => ({ ...entry, artwork: getArtwork(entry.id)! }));
const guide = [
  {
    title: "設置你的錢包",
    copy: "設置好您選擇的錢包後，點擊右上角的錢包圖標進行連接。",
    icon: Wallet,
  },
  {
    title: "創建您的主頁",
    copy: "註冊成為會員，編輯您的資料，讓大家了解你。",
    icon: PencilRuler,
  },
  {
    title: "添加你的 NFT",
    copy: "上傳你的作品，添加標題和描述。",
    icon: Shapes,
  },
  {
    title: "列出它們出售",
    copy: "選擇出售 NFT 的方式並設定價格，等待有緣人。",
    icon: Tags,
  },
];
</script>

<template>
  <div class="home-page">
    <section class="home-hero site-shell md:mt-10" aria-label="推薦系列">
      <div class="hero-main">
        <div class="hero-rail hidden md:flex" aria-hidden="true">
          <span>Recommend</span><span>推薦系列</span>
        </div>
        <NuxtLink
          :to="hero[0]!.collectionHref"
          class="hero-media block"
          aria-label="探索瞳孔:流動的脈絡"
        >
          <ArtPicture
            :name="hero[0]!.image"
            priority
            class="h-full w-full object-cover"
            sizes="(min-width: 1280px) 756px, (min-width: 768px) 55vw, 100vw"
          />
        </NuxtLink>
        <div class="hero-copy">
          <NuxtLink
            :to="artistPath(hero[0]!.artist)"
            class="font-display text-lg hover:underline"
            >{{ getArtist(hero[0]!.artist)?.name }}</NuxtLink
          >
          <h1 class="my-2 text-[2rem] leading-tight font-bold xl:text-5xl">
            {{ hero[0]!.title }}
          </h1>
          <p class="my-5">{{ hero[0]!.description }}</p>
          <NuxtLink
            :to="hero[0]!.collectionHref"
            class="more mt-auto self-end"
            :aria-label="`查看系列 ${hero[0]!.title}`"
            >MORE</NuxtLink
          >
        </div>
      </div>
      <div class="hero-pair">
        <article
          v-for="item in hero.slice(1)"
          :key="item.id"
          class="hero-small"
        >
          <NuxtLink
            :to="item.collectionHref"
            class="hero-media block"
            :aria-label="`探索${item.title}`"
          >
            <ArtPicture
              :name="item.image"
              class="h-full w-full object-cover"
              sizes="(min-width: 1280px) 330px, (min-width: 768px) 24vw, 100vw"
            />
          </NuxtLink>
          <div class="hero-copy">
            <NuxtLink
              :to="artistPath(item.artist)"
              class="font-display text-lg hover:underline"
              >{{ getArtist(item.artist)?.name }}</NuxtLink
            >
            <h2 class="my-2 text-[2rem] leading-tight font-bold">
              {{ item.title }}
            </h2>
            <p class="my-4">{{ item.description }}</p>
            <NuxtLink
              :to="item.collectionHref"
              class="more mt-auto self-end"
              :aria-label="`查看系列 ${item.title}`"
              >MORE</NuxtLink
            >
          </div>
        </article>
      </div>
    </section>

    <section v-reveal class="site-shell site-section">
      <SectionRail english="Ranking" label="市價排行榜" href="/ranking" quiet />
      <ol class="rank-leaders">
        <li
          v-for="(entry, index) in leaders"
          :key="entry.id"
          class="rank-card panel"
          :class="{ prominent: index < 3 }"
        >
          <NuxtLink
            :to="artPath(entry.id)"
            class="group rank-link"
            :aria-label="`第 ${index + 1} 名 ${entry.artwork.title}`"
          >
            <span class="rank-number">{{ index + 1 }}</span>
            <div class="relative h-full">
              <ArtPicture
                :name="entry.artwork.image"
                class="h-full w-full object-cover transition-[filter] group-hover:brightness-60"
                sizes="(min-width: 1024px) 416px, 90px"
              />
              <span
                class="more pointer-events-none absolute right-0 bottom-0 hidden opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 lg:inline-flex"
                >MORE</span
              >
            </div>
            <div class="min-w-0 self-stretch">
              <h3 class="truncate py-3 pl-3 text-base font-bold lg:px-4">
                {{ entry.artwork.title }}
              </h3>
              <p
                class="flex items-center justify-between gap-2 border-t border-ink px-3 py-1.5 font-display lg:px-4"
              >
                {{ getArtist(entry.artwork.artist)?.name }}
                <span class="flex items-center gap-1"
                  ><Diamond :size="13" aria-hidden="true" />300</span
                >
              </p>
            </div>
          </NuxtLink>
        </li>
      </ol>
    </section>

    <section v-reveal class="site-shell site-section">
      <SectionRail english="Artist" label="熱門藝術家" href="/artist" quiet />
      <ArtistCarousel />
    </section>

    <section v-reveal class="site-shell site-section">
      <SectionRail english="Artwork" label="最新藝術品" href="/explore" />
      <ArtGallery :items="latest" />
    </section>

    <section
      v-reveal
      class="site-section text-center"
      aria-labelledby="join-title"
    >
      <div class="pb-7 md:pb-10">
        <h2 id="join-title" class="font-display text-4xl md:text-5xl">
          Join Us
        </h2>
        <p class="mt-2 text-lg font-bold">創建並出售你的藝術品</p>
      </div>
      <div class="border-t-[7px] border-double border-ink">
        <div
          class="site-shell grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-4 lg:py-20"
        >
          <div
            v-for="step in guide"
            :key="step.title"
            class="mx-auto max-w-[240px]"
          >
            <component
              :is="step.icon"
              :size="44"
              :stroke-width="2.5"
              aria-hidden="true"
              class="mx-auto mb-3 text-accent-dark"
            />
            <button
              v-if="step.icon === Wallet"
              class="text-lg font-bold hover:underline"
              type="button"
              @click="openWallet"
            >
              {{ step.title }}
            </button>
            <h3 v-else class="text-lg font-bold">{{ step.title }}</h3>
            <p class="mt-4 leading-6">{{ step.copy }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-main,
.hero-pair {
  border: 1px solid var(--color-ink);
  background: white;
}
.hero-pair {
  border-top: 0;
}
.hero-media {
  height: auto;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}
.hero-main .hero-media {
  aspect-ratio: 360 / 238;
}
.hero-copy {
  display: flex;
  flex-direction: column;
  min-height: 253px;
  padding: 26px 12px 24px;
}
.hero-small + .hero-small {
  border-top: 1px solid;
}
.rank-leaders {
  display: grid;
  gap: 16px;
}
.rank-link {
  display: grid;
  grid-template-columns: 50px 86px minmax(0, 1fr);
  min-height: 90px;
  align-items: center;
}
.rank-link > .relative {
  height: 90px;
}
.rank-number {
  text-align: center;
  font:
    400 1.5rem/1 "Paytone One",
    var(--font-display);
}
@media (max-width: 767px) {
  .home-hero {
    width: 100%;
  }
  .hero-main,
  .hero-pair {
    border-inline: 0;
  }
}
@media (min-width: 768px) {
  .hero-main {
    display: grid;
    grid-template-columns: 80px minmax(0, 1.7fr) minmax(248px, 1fr);
    min-height: 450px;
  }
  .hero-main .hero-media,
  .hero-small .hero-media {
    aspect-ratio: auto;
  }
  .hero-rail {
    align-items: center;
    gap: 16px;
    padding: 24px 12px;
    writing-mode: vertical-rl;
    background: #000;
    color: white;
  }
  .hero-rail > span:first-child {
    font: 400 2.6rem/1 var(--font-display);
  }
  .hero-rail > span:nth-child(2) {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.2em;
  }
  .hero-copy {
    min-height: 0;
    padding: 32px 24px 24px;
  }
  .hero-main .hero-copy {
    padding-top: 56px;
  }
  .hero-pair {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .hero-small {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
  .hero-small .hero-media {
    grid-area: 1 / 2;
    position: relative;
    min-height: 340px;
  }
  .hero-small .hero-media > img {
    position: absolute;
    inset: 0;
  }
  .hero-small .hero-copy {
    min-height: 340px;
  }
  .hero-small + .hero-small {
    border-top: 0;
    border-left: 1px solid;
  }
  .rank-leaders {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}
@media (min-width: 1024px) {
  .hero-main {
    grid-template-columns: 100px minmax(0, 1.73fr) minmax(320px, 1fr);
  }
  .rank-leaders {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .prominent .rank-link {
    position: relative;
    display: block;
  }
  .prominent .rank-link > .relative {
    height: clamp(235px, 28vw, 375px);
    border-bottom: 1px solid;
  }
  .prominent:first-child img {
    object-position: center top;
  }
  .prominent .rank-number {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: grid;
    width: 62px;
    height: 65px;
    place-items: center;
    border-right: 1px solid;
    border-bottom: 1px solid;
    background: white;
  }
  .hero-rail > span:first-child {
    font-size: 3rem;
  }
}
@media (min-width: 1280px) {
  .hero-main {
    height: 500px;
  }
  .hero-main .hero-copy {
    padding-top: 76px;
  }
}
</style>
