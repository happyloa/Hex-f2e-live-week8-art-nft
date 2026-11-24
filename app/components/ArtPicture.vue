<script setup lang="ts">
import imageData from "~/data/images.json";

const props = withDefaults(
  defineProps<{
    name: string;
    alt?: string;
    priority?: boolean;
    sizes?: string;
  }>(),
  {
    alt: "",
    priority: false,
    sizes: "(min-width: 768px) 33vw, 50vw",
  },
);

const sources: Record<
  string,
  {
    src: string;
    width: number;
    height: number;
    variants: Record<string, string>;
  }
> = imageData;
const image = computed(() => sources[props.name]);
const srcset = computed(() =>
  image.value
    ? Object.entries(image.value.variants)
        .map(([width, path]) => `${path} ${width}w`)
        .join(", ")
    : undefined,
);
</script>

<template>
  <img
    :src="image?.src ?? `/images/${name}.webp`"
    :srcset="srcset"
    :sizes="srcset ? sizes : undefined"
    :width="image?.width"
    :height="image?.height"
    :alt="alt"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
  />
</template>
