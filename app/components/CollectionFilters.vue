<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { birdColors, birdTypes, networks, statuses } from "~/data/catalog";
import { demoBnbPerEth, priceCurrencies } from "~/data/filters";
import type { Filters } from "~/data/filters";

const filters = defineModel<Filters>({ required: true });
defineProps<{ showBirdTraits: boolean }>();
</script>

<template>
  <div class="filter-list">
    <details open>
      <summary>網路<ChevronDown :size="16" aria-hidden="true" /></summary>
      <label v-for="network in networks" :key="network" class="check-option">
        {{ network }}
        <input v-model="filters.network" type="checkbox" :value="network" />
      </label>
    </details>
    <details open>
      <summary>狀態<ChevronDown :size="16" aria-hidden="true" /></summary>
      <label v-for="status in statuses" :key="status" class="check-option">
        {{ status }}
        <input v-model="filters.status" type="checkbox" :value="status" />
      </label>
    </details>
    <details open>
      <summary>價格<ChevronDown :size="16" aria-hidden="true" /></summary>
      <div
        class="grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 py-1"
      >
        <label>
          <span class="sr-only">價格幣別</span>
          <select v-model="filters.currency" class="choice currency-choice">
            <option v-for="currency in priceCurrencies" :key="currency">
              {{ currency }}
            </option>
          </select>
        </label>
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
      </div>
      <p
        v-if="filters.currency === 'BNB'"
        class="mt-2 text-xs text-neutral-700"
      >
        示範換算 1 ETH = {{ demoBnbPerEth }} BNB
      </p>
    </details>
    <details v-if="showBirdTraits" open>
      <summary>屬性<ChevronDown :size="16" aria-hidden="true" /></summary>
      <p class="my-2 font-bold">品種</p>
      <label v-for="species in birdTypes" :key="species" class="check-option">
        {{ species }}
        <input v-model="filters.species" type="checkbox" :value="species" />
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
  display: flex;
  cursor: pointer;
  list-style: none;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-weight: 700;
}
.filter-list > details[open] > summary {
  margin-bottom: 8px;
}
summary::-webkit-details-marker {
  display: none;
}
details[open] > summary > svg {
  rotate: 180deg;
}
.currency-choice.choice {
  padding-right: 27px;
  background-position: right 7px center;
}
.check-option {
  display: flex;
  min-height: 34px;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.check-option input {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  accent-color: var(--color-ink);
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
