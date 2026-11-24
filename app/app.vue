<template>
  <a href="#main-content" class="skip-link">跳至主要內容</a>
  <SiteHeader />
  <main id="main-content" tabindex="-1" class="min-h-[65vh]">
    <NuxtPage />
  </main>
  <SiteFooter />
  <WalletDialog />
</template>
