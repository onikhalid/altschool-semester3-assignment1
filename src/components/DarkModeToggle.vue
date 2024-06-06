<template>
    <div class="cursor-pointer" @click="$emit('toggleDarkMode')">
        <font-awesome-icon :icon="isDarkMode ? faMoon : faSun" size="xl" />
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isDarkMode: Boolean,
});

const emit = defineEmits(['toggleDarkMode']);
</script>
