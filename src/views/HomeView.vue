<template>
  <section class="my-12">
    <h4>Profile stats</h4>
    <section class="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(max-content,200px))] gap-3 md:gap-5 mt-3">
      <article class="flex items-stretch gap-4 bg-background p-3 rounded-2xl" v-for="stat in profileStats"
        :key="stat.title">
        <div
          :class="['grid place-content-center', stat.iconBg, 'rounded-md md:rounded-xl aspect-square w-[1.5rem] md:w-[3.15rem]']">
          <FontAwesomeIcon :icon="stat.icon" size="lg" class="max-md:hidden" />
          <FontAwesomeIcon :icon="stat.icon" size="sm" class="md:hidden" />
        </div>
        <div>
          <h4 class="text-muted-foreground text-sm md:text-base">{{ stat.title }}</h4>
          <p class="md:text-xl font-medium">{{ stat.value }}</p>
        </div>
      </article>
    </section>
  </section>

  <section class="my-12">
    <h4>Coding stats</h4>
    <div class="flex items-start gap-4 mt-3 flex-wrap max-lg:justify-center">
      <img height="180em"
        src="https://github-readme-stats.vercel.app/api?username=onikhalid&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&theme=dark" />
      <img height="180em"
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=onikhalid&langs_count=7&theme=dark" />
    </div>
  </section>


  <section class="my-12">
    <h4>Top Repositories</h4>
    <div class="flex items-start gap-4 mt-3 flex-wrap max-lg:justify-center">
      <img height="180em"
        src="https://github-readme-stats.vercel.app/api/pin/?username=onikhalid&repo=archi-ng&theme=dark" />
      <img height="180em"
        src="https://github-readme-stats.vercel.app/api/pin/?username=onikhalid&repo=countries-app&theme=dark" />
      <img height="180em"
        src="https://github-readme-stats.vercel.app/api/pin/?username=onikhalid&repo=.dev-old&theme=dark" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBookBookmark, faComment, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { inject } from 'vue';
import { type UserProfileType } from '@/types/github'

const userProfile: UserProfileType | undefined = inject('userProfile');
const loadingProfile = inject('loadingProfile');



const profileStats = ref([
  {
    title: 'Repositories',
    icon: faBookBookmark,
    iconBg: 'md:bg-primary-foreground',
    value: userProfile.value.public_repos || 50,
  },
  {
    title: 'Gists',
    icon: faComment,
    iconBg: 'md:bg-pink-500',
    value: userProfile.value.public_gists || 10,
  },
  {
    title: 'Followers',
    icon: faUser,
    iconBg: 'md:bg-orange-500',
    value: userProfile.value.followers || 10,
  },
  {
    title: 'Following',
    icon: faUserPlus,
    iconBg: 'md:bg-blue-500',
    value: userProfile.value.following || 19,
  }
]);
</script>
