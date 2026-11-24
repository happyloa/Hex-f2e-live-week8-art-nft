<script setup lang="ts">
defineProps<{
  english: string;
  label: string;
  href?: string;
  quiet?: boolean;
}>();
</script>

<template>
  <div class="section-rail">
    <h2 class="word-pair" :aria-label="label">
      <span>{{ english }}</span><span>{{ label }}</span>
    </h2>
    <NuxtLink
      v-if="href"
      :to="href"
      class="more"
      :class="{ 'more-quiet': quiet }"
      :aria-label="`查看${label}`"
      >MORE</NuxtLink
    >
  </div>
</template>
