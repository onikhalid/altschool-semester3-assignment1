<template>
  <span :class="spinnerClass">
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
      <path :class="pathClassName" d="M28 16a12 12 0 1 1-8.292-11.413" stroke="rgb(117, 90, 226)" stroke-linecap="round"
        stroke-linejoin="round" stroke-width="2" />
    </svg>
    <span class="sr-only">Loading</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  pathClassName: {
    type: String,
    default: '',
  },
});

const spinnerClass = computed(() => cn('flex animate-spin items-center justify-center', props.className));
</script>