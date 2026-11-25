<script setup lang="ts">
import type Masonry from "masonry-layout";
import type { Artwork } from "~/data/catalog";
import type { PriceCurrency } from "~/data/filters";

const props = withDefaults(
  defineProps<{
    items: Artwork[];
    columns?: 3 | 4;
    priceCurrency?: PriceCurrency;
  }>(),
  { columns: 4 },
);
const grid = ref<HTMLElement>();
let layout: Masonry | undefined;
let observer: ResizeObserver | undefined;
let mounted = false;

function relayout() {
  layout?.layout?.();
}

onMounted(async () => {
  mounted = true;
  const { default: MasonryLayout } = await import("masonry-layout");
  if (!grid.value || !mounted) return;
  grid.value.classList.add("is-masonry");
  layout = new MasonryLayout(grid.value, {
    itemSelector: ".gallery-item",
    columnWidth: ".gallery-size",
    gutter: ".gallery-gutter",
    percentPosition: true,
    horizontalOrder: true,
    transitionDuration: 0,
  });
  observer = new ResizeObserver(relayout);
  observer.observe(grid.value);
});

watch(
  () => props.items,
  async () => {
    await nextTick();
    layout?.reloadItems?.();
    relayout();
  },
);

onBeforeUnmount(() => {
  mounted = false;
  observer?.disconnect();
  layout?.destroy?.();
});
</script>

<template>
  <div ref="grid" class="art-gallery" :class="{ 'three-cols': columns === 3 }">
    <div class="gallery-size" aria-hidden="true" />
    <div class="gallery-gutter" aria-hidden="true" />
    <div
      v-for="artwork in items"
      :key="artwork.id"
      class="gallery-item"
      @load.capture="relayout"
    >
      <ArtTile :artwork="artwork" :price-currency="priceCurrency" />
    </div>
  </div>
</template>

<style scoped>
.art-gallery {
  --gap: 12px;
  --cols: 2;
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  align-items: start;
  gap: calc(var(--gap) * 2) var(--gap);
}
.gallery-size,
.gallery-gutter {
  display: none;
}
.art-gallery.is-masonry {
  display: block;
}
.is-masonry .gallery-size,
.is-masonry .gallery-gutter {
  display: block;
  height: 0;
}
.is-masonry .gallery-size,
.is-masonry .gallery-item {
  width: calc((100% - (var(--cols) - 1) * var(--gap)) / var(--cols));
}
.is-masonry .gallery-gutter {
  width: var(--gap);
}
.is-masonry .gallery-item {
  margin-bottom: calc(var(--gap) * 2);
}
@media (min-width: 768px) {
  .art-gallery {
    --cols: 3;
    --gap: 24px;
  }
}
@media (min-width: 1100px) {
  .art-gallery:not(.three-cols) {
    --cols: 4;
  }
}
</style>
