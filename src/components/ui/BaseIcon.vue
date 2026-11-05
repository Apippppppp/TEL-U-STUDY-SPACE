<script setup>
import { computed } from 'vue'
import {
  Armchair, GlassWater, Mic, Monitor, SquarePen, Tv, Wifi, Wind, Zap,
  AlertCircle, Check, ChevronLeft, ChevronRight, ChevronDown, Clock, DoorOpen,
  Minus, Plus, Users, X, Menu, Home, Search, CalendarCheck, User,
  CheckCircle, Info, Inbox, HelpCircle,
} from 'lucide-vue-next'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 20 },
  strokeWidth: { type: Number, default: 1.75 }
})

// Explicit map so the icon library is tree-shaken instead of bundling all 1500 icons.
const ICONS = {
  Armchair, GlassWater, Mic, Monitor, SquarePen, Tv, Wifi, Wind, Zap,
  AlertCircle, Check, ChevronLeft, ChevronRight, ChevronDown, Clock, DoorOpen,
  Minus, Plus, Users, X, Menu, Home, Search, CalendarCheck, User,
  CheckCircle, Info, Inbox, HelpCircle,
}

const iconComponent = computed(() => ICONS[props.name] || HelpCircle)
</script>

<template>
  <component
    :is="iconComponent"
    :size="size"
    :stroke-width="strokeWidth"
  />
</template>