<template>
    <div class="flex flex-col w-full max-h-full md:my-1 overflow-hidden md:px-4 @container">
        <main class="grow relative flex flex-col overflow-hidden max-md:pb-2.5 max-md:pt-0">
            <p v-for="(error, index) in boundaryError" :key="index">
                {{ error }}
            </p>
        </main>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    setup() {
        const boundaryError = ref([]);
        const currentTab = ref('home');
        return {
            currentTab,
            boundaryError,
        };
    },
};
</script>