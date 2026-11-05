<script setup>
import { ref } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

defineProps({
  items: { type: Array, default: () => [] }
})

const openId = ref(null)

const toggle = (id) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="divide-y divide-line border border-line rounded-lg overflow-hidden">
    <div v-for="item in items" :key="item.id">
      <button
        class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface transition-colors"
        @click="toggle(item.id)"
      >
        <span class="font-medium text-ink-700">{{ item.title }}</span>
        <BaseIcon
          name="ChevronDown"
          :size="18"
          class="text-ink-400 transition-transform"
          :class="openId === item.id && 'rotate-180'"
        />
      </button>
      <div v-show="openId === item.id" class="px-4 pb-4 text-sm text-ink-500">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>