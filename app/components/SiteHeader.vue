<script setup lang="ts">
import { ArrowLeft, Menu, Search, Wallet, X } from "@lucide/vue";
import { queryText } from "~/data/catalog";

const route = useRoute();
const { wallet, openWallet } = useWallet();
const desktopInput = ref("");
const mobileInput = ref<HTMLInputElement>();
const mobile = ref<"search" | "menu">();
const searchTrigger = ref<HTMLButtonElement>();
const menuTrigger = ref<HTMLButtonElement>();
const nav = [
  { label: "探索", to: "/explore" },
  { label: "市值", to: "/ranking" },
];

watch(
  () => route.fullPath,
  () => {
    desktopInput.value = queryText(route.query.q);
    mobile.value = undefined;
  },
  { immediate: true },
);

async function search() {
  const q = desktopInput.value.trim();
  mobile.value = undefined;
  await navigateTo({ path: "/explore", query: q ? { q } : {} });
}

async function showSearch() {
  mobile.value = "search";
  await nextTick();
  mobileInput.value?.focus();
}

async function closeMobile() {
  const trigger =
    mobile.value === "search" ? searchTrigger.value : menuTrigger.value;
  mobile.value = undefined;
  await nextTick();
  trigger?.focus();
}

function walletFromMenu() {
  mobile.value = undefined;
  void openWallet();
}
</script>

<template>
  <header
    class="relative z-20 border-b border-ink bg-paper"
    @keydown.esc="closeMobile"
  >
    <div
      class="site-shell relative flex h-[49px] items-center justify-between md:h-[103px]"
    >
      <form
        v-if="mobile === 'search'"
        class="absolute inset-0 flex items-center gap-3 md:hidden"
        role="search"
        @submit.prevent="search"
      >
        <button
          type="button"
          aria-label="關閉搜尋"
          class="grid size-10 shrink-0 place-items-center"
          @click="closeMobile"
        >
          <ArrowLeft :size="22" aria-hidden="true" />
        </button>
        <label class="sr-only" for="mobile-search"
          >搜尋作品名稱、藝術家名稱</label
        >
        <input
          id="mobile-search"
          ref="mobileInput"
          v-model="desktopInput"
          class="min-w-0 flex-1 py-2 text-sm"
          type="search"
          placeholder="搜尋作品名稱、藝術家名稱"
        />
        <button
          type="submit"
          aria-label="搜尋"
          class="grid size-10 shrink-0 place-items-center"
        >
          <Search :size="22" aria-hidden="true" />
        </button>
      </form>
      <NuxtLink
        v-show="mobile !== 'search'"
        to="/"
        aria-label="ART NFT 首頁"
        class="shrink-0"
      >
        <img
          src="/images/logo.svg"
          width="190"
          height="40"
          alt="ART NFT"
          class="w-[114px] md:w-[190px]"
        />
      </NuxtLink>
      <div class="hidden h-full items-stretch md:flex">
        <form
          role="search"
          class="flex w-[clamp(220px,30vw,432px)] items-center gap-3 border-l border-ink px-5 lg:px-10"
          @submit.prevent="search"
        >
          <label class="sr-only" for="desktop-search"
            >搜尋作品名稱、藝術家名稱</label
          >
          <input
            id="desktop-search"
            v-model="desktopInput"
            class="w-full min-w-0 py-2"
            type="search"
            placeholder="搜尋作品名稱、藝術家名稱"
          />
          <button
            class="grid size-10 shrink-0 place-items-center hover:text-accent-dark"
            type="submit"
            aria-label="搜尋"
          >
            <Search :size="24" :stroke-width="3" aria-hidden="true" />
          </button>
        </form>
        <nav aria-label="主選單" class="flex">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="grid w-23 place-items-center border-l border-ink font-bold hover:bg-white lg:w-32"
            >{{ item.label }}</NuxtLink
          >
        </nav>
        <button
          class="grid w-15 place-items-center border-l border-ink hover:bg-white lg:w-[76px]"
          :aria-label="wallet ? '管理錢包示範' : '連結錢包'"
          type="button"
          @click="openWallet"
        >
          <Wallet
            :size="27"
            :stroke-width="2.8"
            aria-hidden="true"
            :class="{ 'text-accent-dark': wallet }"
          />
        </button>
      </div>
      <div v-show="mobile !== 'search'" class="flex items-center md:hidden">
        <button
          ref="searchTrigger"
          class="grid size-10 place-items-center"
          type="button"
          aria-label="開啟搜尋"
          @click="showSearch"
        >
          <Search :size="22" aria-hidden="true" />
        </button>
        <button
          ref="menuTrigger"
          class="grid size-10 place-items-center"
          type="button"
          :aria-label="mobile === 'menu' ? '關閉選單' : '開啟選單'"
          :aria-expanded="mobile === 'menu'"
          aria-controls="mobile-menu"
          @click="mobile === 'menu' ? closeMobile() : (mobile = 'menu')"
        >
          <X v-if="mobile === 'menu'" :size="24" aria-hidden="true" />
          <Menu v-else :size="24" aria-hidden="true" />
        </button>
      </div>
    </div>
    <button
      v-if="mobile === 'menu'"
      type="button"
      tabindex="-1"
      aria-label="關閉選單"
      class="fixed inset-x-0 top-[50px] bottom-0 bg-black/50 md:hidden"
      @click="closeMobile"
    />
    <nav
      id="mobile-menu"
      v-show="mobile === 'menu'"
      class="absolute inset-x-0 top-full z-10 grid bg-white px-3 pb-5 text-center font-bold md:hidden!"
      aria-label="行動版主選單"
    >
      <NuxtLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="border-b border-ink py-4 hover:bg-paper"
        @click="mobile = undefined"
        >{{ item.label }}</NuxtLink
      >
      <button
        class="action mx-auto mt-5 w-full max-w-[336px]"
        type="button"
        @click="walletFromMenu"
      >
        {{ wallet ? "管理錢包示範" : "連結錢包" }}
      </button>
    </nav>
  </header>
</template>
