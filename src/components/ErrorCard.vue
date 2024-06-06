<template>
    <article class="flex items-center justify-center">
        <div
            class="flex flex-col items-center justify-center text-center px-8 py-12 sm:p-16 sm:py-20 w-[90%] max-w-[400px] my-[1vh] mt-5 mb-10 bg-gradient-to-tr from-primary-foreground via-primary-[#D9D9D9] to-transparent rounded-xl">
            <div>
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" size="5x" class="text-red-500" />
            </div>
            <h3 :class="cn('font-medium text-lg my-2')">
                {{ title || "An error occurred" }}
            </h3>
            <div class="text-sm mt-4">
                <slot></slot>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { cn } from '@/lib/utils';

interface Props {
    message?: string;
    title?: string;
}

const props = defineProps<Props>();

const defaultMessage = computed(() => props.title || "An error occurred");
</script>