<template>
    <div class="flex items-center gap-16 py-4 px-8 bg-charcoal">
        <router-link to="/">
            <FontAwesomeIcon :icon="faGithub" size="3x" />
        </router-link>

        <section class="flex items-center gap-6 text-sm max-md:hidden [&>*]:cursor-pointer">
            <p>Explore</p>
            <p>Features</p>
            <p>Business</p>
            <p>Marketplace</p>
        </section>

        <section class="ml-auto flex items-center gap-4">
            <FontAwesomeIcon :icon="faBell" size="xl" />
            <div class="cursor-pointer" @click="$emit('toggleDarkMode')">
                <font-awesome-icon :icon="isDarkMode ? faMoon : faSun" size="xl" />
            </div>

            <div class="md:hidden">
                <template v-if="loadingRepos || loadingProfile">
                    <div class="w-10 h-10 bg-foreground rounded-full"></div>
                </template>
                <template v-else-if="!loadingProfile && userData">
                    <Popover>
                        <PopoverTrigger>
                            <div className="flex items-center gap-2">
                                <img :src="userData.avatar_url" :alt="userData.login"
                                    className="w-10 h-10 rounded-full" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>

                            <SideBar />
                        </PopoverContent>
                    </Popover>
                </template>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMoon, faSun, faBell } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import SideBar from './SideBar.vue'
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { type UserProfileType } from '@/types/github';

const loadingProfile = inject('loadingProfile');
const userData = inject<UserProfileType | undefined>('userProfile');
const loadingRepos = inject('loadingRepos');

const props = defineProps({
    isDarkMode: Boolean,
});

const emit = defineEmits(['toggleDarkMode']);
</script>