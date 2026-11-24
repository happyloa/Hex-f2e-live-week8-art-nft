<script setup lang="ts">
import { birdColors, birdTypes, networks, statuses } from "~/data/catalog";
import type { Filters } from "~/data/filters";

const filters = defineModel<Filters>({ required: true });
defineProps<{ showBirdTraits: boolean }>();
</script>

<template>
  <div class="filter-list">
    <details open>
      <summary>網路</summary>
      <label v-for="network in networks" :key="network" class="check-option">
        <input v-model="filters.network" type="checkbox" :value="network" />
        {{ network }}
      </label>
    </details>
    <details open>
      <summary>狀態</summary>
      <label v-for="status in statuses" :key="status" class="check-option">
        <input v-model="filters.status" type="checkbox" :value="status" />
        {{ status }}
      </label>
    </details>
    <details open>
      <summary>價格</summary>
      <div
        class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-center gap-2 py-1"
      >
        <label>
          <span class="sr-only">最低價格</span>
          <input
            v-model.number="filters.min"
            class="choice w-full"
            type="number"
            min="0"
            step="any"
            placeholder="最低"
          />
        </label>
        <span aria-hidden="true">－</span>
        <label>
          <span class="sr-only">最高價格</span>
          <input
            v-model.number="filters.max"
            class="choice w-full"
            type="number"
            min="0"
            step="any"
            placeholder="最高"
          />
        </label>
        <span class="font-display">ETH</span>
      </div>
    </details>
    <details v-if="showBirdTraits" open>
      <summary>屬性</summary>
      <p class="my-2 font-bold">品種</p>
      <label v-for="species in birdTypes" :key="species" class="check-option">
        <input v-model="filters.species" type="checkbox" :value="species" />
        {{ species }}
      </label>
      <label class="select-option">
        <span>鳥的數量</span>
        <select v-model="filters.birds" class="choice">
          <option value="">全部</option>
          <option v-for="count in 4" :key="count" :value="String(count)">
            {{ count }} 隻
          </option>
        </select>
      </label>
      <label class="select-option">
        <span>是否有花草</span>
        <select v-model="filters.flowers" class="choice">
          <option value="">全部</option>
          <option value="yes">有</option>
          <option value="no">無</option>
        </select>
      </label>
      <label class="select-option">
        <span>鳥的顏色</span>
        <select v-model="filters.color" class="choice">
          <option value="">全部</option>
          <option v-for="color in birdColors" :key="color">{{ color }}</option>
        </select>
      </label>
    </details>
  </div>
</template>

<style scoped>
.filter-list > details {
  border-bottom: 1px solid;
  padding: 12px 16px;
}
.filter-list > details > summary {
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 700;
}
.check-option {
  display: flex;
  min-height: 34px;
  cursor: pointer;
  align-items: center;
  gap: 8px;
}
.check-option input {
  width: 16px;
  height: 16px;
  accent-color: var(--color-accent-dark);
}
.select-option {
  display: grid;
  grid-template-columns: 1fr minmax(82px, 0.8fr);
  align-items: center;
  gap: 8px;
  border-top: 1px solid #ddd;
  padding-block: 8px;
}
</style>
