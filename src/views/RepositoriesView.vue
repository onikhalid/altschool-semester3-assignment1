<template>
  <div v-if="loadingRepos" class="flex items-center justify-center w-full h-full row-span-3">
    <span class="flex animate-spin items-center justify-center">
      <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
        <path class="text-primary-foreground" d="M28 16a12 12 0 1 1-8.292-11.413" stroke="rgb(117, 90, 226)"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
      <span class="sr-only">Loading</span>
    </span>
  </div>
  <div v-else class="flex flex-col">
    <header class="sticky top-0 z-[2] p-4 bg-charcoal shadow-lg max-md:pt-1 md:px-1">
      <!-- <div class="relative">
        <input type="text"
          class="bg-background px-5 pl-10 md:px-8 md:pl-12 py-1.5 md:py-2.5 text-xs md:text-sm text-foreground rounded-full outline-none focus:border-primary-foreground ring-2 focus:ring-primary-foreground w-full transition-all duration-300 ease-in-out"
          placeholder="Search repo name, description, language..." v-model="searchText" @input="handleSearch" />
        <FontAwesomeIcon :icon="['fas', 'search']"
          class="absolute top-1/2 left-4 transform -translate-y-1/2 text-foreground" />
      </div> -->
      <div class="md:hidden mt-2">
        <CreateRepoModal />
      </div>
    </header>
    <section class="grow flex items-start overflow-y-hidden">
      <div
        class="grid lg:grid-cols-2 2xl:grid-cols-3 items-center justify-center max-h-full gap-5 overflow-y-scroll max-md:p-4 md:pl-4 pt-4 max-md:mx-auto">
        <RepoCard v-for="repo in currentItems" :key="repo.id" :repo="repo" />
        <div v-if="!loadingRepos && currentItems.length === 0"
          class="flex items-center justify-center lg:col-span-2 2xl:col-span-3">
          <ErrorCard title="No repo found"
            message="There are no repos that match your search parameter. Change it and try again." />
        </div>
      </div>
    </section>
    <footer class="sticky bottom-0 mt-2.5 mt-auto flex items-center gap-2 md:gap-6 justify-center bg-background">
      <div class="flex items-center gap-4 flex-wrap text-sm">
        <label class="max-md:hidden">Repos per page: </label>
        <Select class="flex items-center" v-model="itemsPerPage">
          <SelectTrigger class="w-[60px]">
            <SelectValue defaultValue="10" placeholder="Select items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Repos per page:</SelectLabel>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="flex items-center gap-4 flex-wrap text-sm">
        <label>Page: </label>
        <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1"
          class="px-2 py-1 text-sm bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed">
          <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
        </button>
        <div class="flex items-center gap-1">
          <button v-for="pageNumber in totalPages" :key="pageNumber" @click="handlePageChange(pageNumber)"
            :class="['px-2 py-1 text-sm transition-colors duration-300', currentPage !== pageNumber ? 'bg-background text-foreground' : 'bg-gray-200 text-background']">
            {{ pageNumber }}
          </button>
        </div>
        <button @click="handlePageChange(currentPage + 1)"
          :disabled="currentPage === totalPages || totalPages === 1 || totalPages === 0 || currentItems.length === 0"
          class="px-2 py-1 text-sm bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed">
          <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
        </button>
      </div>
      <button @click="triggerReload">Trigger Reload</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue';
import RepoCard from '@/components/RepoCard.vue';
import ErrorCard from '@/components/ErrorCard.vue';
import CreateRepoModal from '@/components/CreateRepoModal.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { cn, convertKebabAndSnakeToLowerCase } from '../lib/utils';
import type { UserRepo } from '@/types/github';

const userRepos = inject<UserRepo[] | any[]>('userRepos', []);
const loadingRepos = inject<boolean>('loadingRepos', false);
const triggerReload = inject<() => void>('triggerReload', () => { });

if (!userRepos || !loadingRepos || !triggerReload) {
  throw new Error('Failed to inject required dependencies');
}

const searchText = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const currentTab = ref('Repositories');

const reposToDisplay = ref<UserRepo[]>([]);

const handleSearch = () => {
  const convertedText = convertKebabAndSnakeToLowerCase(searchText.value);
  if (Array.isArray(userRepos)) {
    reposToDisplay.value = userRepos.filter(repo => {
      return (
        convertKebabAndSnakeToLowerCase(repo.name)?.includes(convertedText) ||
        convertKebabAndSnakeToLowerCase(repo.description!)?.includes(convertedText) ||
        convertKebabAndSnakeToLowerCase(repo.visibility!)?.includes(convertedText) ||
        ((repo.fake && (convertKebabAndSnakeToLowerCase(repo.fake)?.includes(convertedText) || 'fake'.includes(convertedText)))) ||
        convertKebabAndSnakeToLowerCase(repo.language!)?.includes(convertedText)
      );
    });
  }
};

const indexOfLastItem = computed(() => currentPage.value * itemsPerPage.value);
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage.value);
const currentItems = computed(() => reposToDisplay.value.slice(indexOfFirstItem.value, indexOfLastItem.value));
const totalPages = computed(() => Math.ceil(reposToDisplay.value.length / itemsPerPage.value));

const handlePageChange = (pageNumber: number) => {
  currentPage.value = pageNumber;
};

const setCurrentTab = (tab: string) => {
  currentTab.value = tab;
};

// Watch searchText and update reposToDisplay
watch(searchText, handleSearch);
watch(itemsPerPage, handleSearch);

// Watch userRepos and update reposToDisplay initially
watch(
  userRepos,
  (newValue) => {
    if (Array.isArray(newValue)) {
      reposToDisplay.value = [...newValue];
    }
  },
  { immediate: true }
);

</script>
