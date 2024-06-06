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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookBookmark, faBookOpen, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import NavTabs from '../components/NavTabs.vue';
import CreateRepoModal from '../components/CreateRepoModal.vue';


export default {

    setup() {
        const boundaryError = ref([]);



        return {
            currentTab,
            boundaryError,
            categoryArray,
            setCurrentTab,
        };
    },
};
</script>