<script setup lang="ts">
const props = defineProps<{ open: boolean; label: string }>();
const emit = defineEmits<{ close: [] }>();
const element = ref<HTMLDialogElement>();

function sync() {
  if (!element.value) return;
  if (props.open && !element.value.open) element.value.showModal();
  if (!props.open && element.value.open) element.value.close();
}

watch(() => props.open, sync, { flush: "post" });
onMounted(sync);
</script>

<template>
  <dialog
    ref="element"
    :aria-label="label"
    class="app-dialog m-auto max-h-[min(90dvh,760px)] max-w-none border border-black bg-white p-0 text-ink backdrop:bg-black/55"
    @cancel.prevent="emit('close')"
    @click.self="emit('close')"
  >
    <div>
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
.app-dialog { width: min(500px, calc(100% - 24px)); }
@media (max-width: 767px) {
  .app-dialog {
    width: 100%;
    height: 100%;
    max-height: 100dvh;
    border: 0;
  }
}
</style>
