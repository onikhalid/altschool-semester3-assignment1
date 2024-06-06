<template>
    <div class="flex flex-col w-full max-h-full md:my-1 overflow-hidden md:px-4 @container">
        <main class="grow relative flex flex-col overflow-hidden max-md:pb-2.5 max-md:pt-0">
            <p v-for="(error, index) in boundaryError" :key="index">
                {{ error }}
            </p>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const currentTab = ref('home');
const boundaryError = ref([]);

throw new Error('An error occurred, Error boundary has come to the rescue! 🚀');

</script>