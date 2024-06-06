<template>
    <div v-if="loadingProfile" class="grow flex items-center justify-center h-full w-full">
        <span class="flex animate-spin items-center justify-center">
            <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
                <path class="text-primary-foreground" d="M28 16a12 12 0 1 1-8.292-11.413" stroke="rgb(117, 90, 226)"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            <span class="sr-only">Loading</span>
        </span>
    </div>
    <section v-else-if="!loadingProfile && userProfile">
        <article class="flex flex-col items-center justify-center text-center px-5 max-md:hidden">
            <div class="w-[80%] rounded-[2.5rem] max-w-[200px] overflow-hidden">
                <img :src="userProfile?.avatar_url" :alt="userProfile?.login" class="w-full" />
            </div>

            <section class="my-2">
                <h3 class="font-medium text-2xl">{{ userProfile?.name }}</h3>
                <p class="text-muted-foreground">@{{ userProfile?.login }}</p>
                <p class="text-[0.8125rem] text-muted-foreground">{{ userProfile?.bio }}</p>
            </section>

            <section class="flex items-center gap-5 mt-8 mb-6">
                <section class="flex items-center gap-5 mt-8 mb-6">
                    <a :href="`https://twitter.com/${userProfile?.twitter_username}`" target="_blank"
                        rel="noopener noreferrer">
                        <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
                    </a>
                    <a :href="`https://facebook.com/${userProfile?.twitter_username}`" target="_blank"
                        rel="noopener noreferrer">
                        <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
                    </a>
                    <a :href="`https://instagram.com/${userProfile?.twitter_username}`" target="_blank"
                        rel="noopener noreferrer">
                        <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
                    </a>
                </section>
            </section>

            <section class="flex items-center gap-4 mt-7">
                <FollowersModal :count="userProfile?.followers" />
                <FollowingModal :count="userProfile?.following" />
            </section>

            <Button class="rounded-xl text-sm bg-primary-foreground text-white my-2 px-8 tracking-wider">
                EDIT PROFILE
            </Button>
        </article>
        <article class="md:hidden">
            <div class="flex flex-col items-center gap-2">
                <img :src="userProfile?.avatar_url" :alt="userProfile?.login" class="w-20 h-20 rounded-full" />
                <h3 class="text-lg font-semibold">{{ userProfile?.name }}</h3>
                <p class="text-muted-foreground">@{{ userProfile?.login }}</p>
                <p class="text-[0.8125rem] text-muted-foreground">{{ userProfile?.bio }}</p>
            </div>

            <section class="flex items-center justify-center gap-5 mt-8 mb-6">
                <section class="flex items-center gap-5 mt-8 mb-6">
                    <a :href="`https://twitter.com/${userProfile?.twitter_username}`" target="_blank"
                        rel="noopener noreferrer">
                        <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
                    </a>
                    <a :href="`https://facebook.com/${userProfile?.twitter_username}`" target="_blank"
                        rel="noopener noreferrer">
                        <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
                    </a>
                    <a :href="`https://instagram.com/${userProfile?.twitter_username}`" target="_blank"
                        rel="noopener noreferrer">
                        <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
                    </a>
                </section>
            </section>
        </article>
    </section>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Button } from "./ui/button";
import { type UserProfileType } from '@/types/github';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const userProfile = inject<UserProfileType>('userProfile');
const loadingProfile = inject<boolean>('loadingProfile');

if (!userProfile || !loadingProfile) {
    throw new Error('Failed to inject required dependencies');
}
</script>