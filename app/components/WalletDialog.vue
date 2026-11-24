<script setup lang="ts">
import { Check, X } from "@lucide/vue";
import { walletProviders } from "~/data/catalog";

const { wallet, isWalletOpen, closeWallet, connectWallet, restoreWallet } =
  useWallet();
const selected = ref("");
const providers = [0, 1, 2, 3, 4, 5].map((i) => ({
  name: walletProviders[i]!,
  src: `/images/connect0${i + 1}.png`,
}));

onMounted(restoreWallet);
watch(isWalletOpen, (open) => {
  if (open) selected.value = wallet.value ?? "";
});

function submit() {
  if (!selected.value) return;
  connectWallet(selected.value);
  void closeWallet();
}
</script>

<template>
  <AppDialog :open="isWalletOpen" label="連結你的錢包" @close="closeWallet">
    <form class="flex min-h-dvh flex-col md:min-h-0" @submit.prevent="submit">
      <header
        class="flex items-center justify-between gap-3 border-b border-ink px-3 py-4 md:px-6"
      >
        <h2 class="text-xl font-bold">連結你的錢包</h2>
        <button
          type="button"
          aria-label="關閉錢包視窗"
          class="grid size-8 place-items-center"
          @click="closeWallet"
        >
          <X :size="25" aria-hidden="true" />
        </button>
      </header>
      <fieldset class="grid gap-3 p-3 md:grid-cols-2 md:p-6">
        <legend class="sr-only">選擇錢包</legend>
        <label
          v-for="provider in providers"
          :key="provider.name"
          class="flex min-h-[58px] cursor-pointer items-center gap-3 border border-ink px-4 py-3 text-sm font-bold hover:bg-paper has-checked:border-accent-dark has-checked:bg-[#fdf0ed] has-focus-visible:outline-2 has-focus-visible:outline-accent-dark"
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
            width="24"
            height="24"
            alt=""
            class="size-6 object-contain"
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
      <div class="mt-auto px-3 pb-6 md:px-6">
        <p class="mb-3 text-center text-sm text-neutral-650">
          錢包連結為作業示範。
        </p>
        <button class="action w-full" type="submit" :disabled="!selected">
          連結錢包
        </button>
        <button
          v-if="wallet"
          type="button"
          class="mt-3 w-full py-2 text-sm underline"
          @click="
            connectWallet(null);
            closeWallet();
          "
        >
          中斷示範連結
        </button>
      </div>
    </form>
  </AppDialog>
</template>
