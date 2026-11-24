<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();
useHead({ title: "頁面無法開啟" });
</script>

<template>
  <SiteHeader />
  <main class="site-shell page-space min-h-[65vh]">
    <div class="panel mx-auto max-w-[560px] p-10 text-center">
      <p class="font-display text-6xl">{{ error.statusCode }}</p>
      <h1 class="mt-3 text-2xl font-bold">
        {{ error.statusCode === 404 ? "找不到頁面" : "頁面暫時無法開啟" }}
      </h1>
      <button
        class="more mt-6"
        type="button"
        @click="clearError({ redirect: '/' })"
      >
        返回首頁
      </button>
    </div>
  </main>
  <SiteFooter />
  <WalletDialog />
</template>
