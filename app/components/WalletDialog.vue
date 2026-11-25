<script setup lang="ts">
import { Check, X } from "@lucide/vue";
import { walletProviders } from "~/data/catalog";

const { wallet, isWalletOpen, closeWallet, connectWallet, restoreWallet } =
  useWallet();
const selected = ref("");
const providers = walletProviders.map((name, index) => ({
  name,
  src: `/images/connect0${index + 1}.png`,
}));

onMounted(restoreWallet);
watch(
  [isWalletOpen, wallet],
  ([open, currentWallet]) => {
    if (open) selected.value = currentWallet ?? "";
  },
  { immediate: true },
);

function submit() {
  if (!selected.value) return;
  connectWallet(selected.value);
  void closeWallet();
}
</script>

<template>
  <AppDialog :open="isWalletOpen" label="連結你的錢包" @close="closeWallet">
    <form class="flex min-h-dvh flex-col md:min-h-0" @submit.prevent="submit">
      <header class="relative border-b border-ink px-12 py-4 text-center">
        <h2 class="text-xl">連結你的錢包</h2>
        <button
          type="button"
          aria-label="關閉錢包視窗"
          class="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center"
          @click="closeWallet"
        >
          <X :size="25" aria-hidden="true" />
        </button>
      </header>
      <fieldset class="grid gap-2 px-3 py-6 md:grid-cols-2 md:px-4">
        <legend class="sr-only">選擇錢包</legend>
        <label
          v-for="provider in providers"
          :key="provider.name"
          class="flex min-h-12 cursor-pointer items-center gap-3 border border-ink px-3 py-2 font-display text-base hover:bg-paper has-checked:border-accent-dark has-focus-visible:outline-2 has-focus-visible:outline-accent-dark"
        >
          <input
            v-model="selected"
            class="sr-only"
            type="radio"
            name="wallet"
            :value="provider.name"
          />
          <img
            :src="provider.src"
            width="20"
            height="20"
            alt=""
            class="size-5 object-contain"
          />
          <span>{{ provider.name }}</span>
          <Check
            v-if="selected === provider.name"
            :size="18"
            class="ml-auto text-accent-dark"
            aria-hidden="true"
          />
        </label>
      </fieldset>
      <div class="mt-auto grid justify-items-center md:px-4 md:pb-6">
        <p class="mb-3 px-3 text-center text-sm text-neutral-700">
          錢包連結為作業示範。
        </p>
        <button
          v-if="wallet"
          type="button"
          class="mb-2 px-4 py-2 text-sm underline"
          @click="
            connectWallet(null);
            closeWallet();
          "
        >
          中斷示範連結
        </button>
        <button
          class="action w-full md:w-42"
          type="submit"
          :disabled="!selected"
        >
          連結錢包
        </button>
      </div>
    </form>
  </AppDialog>
</template>
