<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import { Octokit } from 'octokit';
import { RouterView, useRoute, RouterLink } from 'vue-router';
import { cn } from '@/lib/utils';
import AppBar from '@/components/AppBar.vue';
import SideBar from '@/components/SideBar.vue';
import { type UserProfileType, type UserRepo } from './types/github';

const userProfile = ref<UserProfileType | null>(null);
const userRepos = ref<UserRepo[]>([]); // Provide userRepos as an empty array initially
const loadingProfile = ref(true);
const loadingRepos = ref(true);
const reloadTrigger = ref(false);
const isDarkMode = ref(true);

const currentRoute = useRoute();

const fetchGitHubData = async () => {
  try {
    loadingProfile.value = true;
    loadingRepos.value = true;

    const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_SECRET });

    const userProfileResult = await octokit.request('GET /user', {
      headers: { 'X-GitHub-Api-Version': '2022-11-28' },
    });

    const userRepoResult = await octokit.request('GET /users/onikhalid/repos', {
      headers: { 'X-GitHub-Api-Version': '2022-11-28' },
    });

    const savedRepos = localStorage.getItem('fakeRepos');
    const parsedRepos = JSON.parse(savedRepos || "[]");

    userProfile.value = userProfileResult.data;
    userRepos.value = [...parsedRepos, ...userRepoResult.data];
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
  } finally {
    loadingProfile.value = false;
    loadingRepos.value = false;
  }
};

const triggerReload = () => {
  reloadTrigger.value = !reloadTrigger.value;
  fetchGitHubData();
};

const routesList = [
  { path: "/", name: "Overview" },
  { path: "/repos", name: "Repositories" },
  { path: "/error", name: "Error 404" },
  { path: "/boundary", name: "Boundary" }
];

provide('userProfile', userProfile);
provide('userRepos', userRepos);
provide('loadingProfile', loadingProfile);
provide('loadingRepos', loadingRepos);
provide('triggerReload', triggerReload);

onMounted(fetchGitHubData);
</script>



<template>
  <div :class="cn('flex flex-col w-screen h-screen bg-background text-foreground', isDarkMode && 'dark')">
    <header>
      <AppBar :isDarkMode="isDarkMode" @toggleDarkMode="isDarkMode = !isDarkMode" />
    </header>


    <section className="grow flex flex-col md:flex-row overflow-y-hidden w-full max-w-[1800px] mx-auto">
      <aside
        className='hidden md:flex flex-col items-center justify-center p-5 max-w-[350px] min-w-[10rem] lg:min-w-[20rem]'>
        <SideBar />
      </aside>

      <div className="flex-1 overflow-y-hidden flex lg:m-2 md:p-4 md:pb-0 bg-charcoal md:rounded-xl shadow-2xl">
        <main class="grow relative overflow-y-scroll grid grid-rows-[max-content_1fr]">
          <nav class="flex gap-4 px-4 overflow-x-scroll sticky top-0 pb-2  mb-4 border-b-2 z-50 bg-background">
            <RouterLink v-for="route in routesList"
              :class="cn('linetaboption !min-w-max', currentRoute.fullPath == route.path && 'active')" :to="route.path"
              v-bind:key="route.path">{{ route.name }}</RouterLink>
          </nav>
          <RouterView />
        </main>
      </div>
    </section>


    <!-- <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

<section className="grow flex flex-col md:flex-row overflow-y-hidden w-full max-w-[1800px] mx-auto">
    <SideBar/>

    <div className="flex-1 overflow-y-auto flex lg:m-2 md:p-4 md:pb-0 bg-charcoal md:rounded-xl">
        <Outlet context={[isDarkMode]}/>
    </div>
</section> -->
  </div>
</template>
