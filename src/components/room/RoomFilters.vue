<script setup>
import { computed } from 'vue'
import { FACILITY_LIST } from '@/data/facilities'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const props = defineProps({
  facilities: { type: Array, default: () => [] },
  onlyAvailable: { type: Boolean, default: false }
})

const emit = defineEmits([
  'update:facilities',
  'update:onlyAvailable'
])

const toggleFacility = (id) => {
  const current = [...props.facilities]
  const idx = current.indexOf(id)
  if (idx >= 0) current.splice(idx, 1)
  else current.push(id)
  emit('update:facilities', current)
}

const activeFilters = computed(() => {
  const arr = []
  if (props.onlyAvailable) arr.push('Hanya yang kosong')
  return arr
})

const emitClearAll = () => {
  emit('update:facilities', [])
  emit('update:onlyAvailable', false)
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-4 pt-2 border-t border-line">
      <div>
        <label class="text-sm font-medium text-ink-700 mb-2 block">Fasilitas</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="fac in FACILITY_LIST"
            :key="fac.id"
            :class="[
              'px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-1.5',
              facilities.includes(fac.id) ? 'bg-red-600 text-white' : 'bg-white border border-line text-ink-700 hover:border-ink-400'
            ]"
            @click="toggleFacility(fac.id)"
          >
            <BaseIcon :name="fac.icon" :size="14" />
            {{ fac.label }}
          </button>
        </div>
      </div>

      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          :checked="onlyAvailable"
          class="sr-only peer"
          @change="emit('update:onlyAvailable', $event.target.checked)"
        />
        <div class="w-5 h-5 border border-line rounded peer-checked:bg-red-600 peer-checked:border-red-600" />
        <span class="text-sm text-ink-700">Hanya yang kosong</span>
      </label>
    </div>

    <div v-if="activeFilters.length > 0" class="flex items-center gap-2 flex-wrap">
      <span class="text-sm text-ink-500">Filter aktif:</span>
      <span
        v-for="f in activeFilters"
        :key="f"
        class="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs"
      >
        {{ f }}
      </span>
      <button class="text-xs text-red-600 hover:underline" @click="emitClearAll">
        Hapus semua
      </button>
    </div>
  </div>
</template>