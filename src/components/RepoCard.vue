<template>
    <article :key="repo.name"
        class="flex items-stretch gap-4 bg-background py-3 px-4 h-36 rounded-2xl border-foreground border-2 hover:[box-shadow:3px_3px_0px_3px_hsl(var(--foreground))]  hover:-translate-x-[1%] hover:-translate-y-[5%] transition-all duration-300">
        <section class="flex flex-col relative w-full">
            <header class="max-w-full">
                <h4 class="flex items-center flex-wrap gap-2 text-sm">
                    <FontAwesomeIcon :icon="faBookBookmark" size="lg" class="mt-2" />

                    {{ repo.name }}
                    <span v-if="repo.private"
                        class="text-[10px] sm:text-xs px-3 py-0.5 rounded-full border-muted-foreground border">
                        PRIVATE
                    </span>
                    <span v-else-if="repo.fake"
                        class="text-[10px] sm:text-xs px-3 py-0.5 rounded-full border-muted-foreground border">
                        FAKE
                    </span>

                    <Popover>
                        <PopoverTrigger class="ml-auto">
                            <FontAwesomeIcon :icon="faEllipsis" size="lg" class="mt-2" />
                        </PopoverTrigger>

                        <PopoverContent align="end" class="p-0.5 bg-background max-w-max">
                            <div class="flex flex-col gap-1 bg-background">
                                <router-link :to="`/repos/${repo.name}`"
                                    class="flex items-center gap-2 p-1.5 pr-5 text-xs text-foreground hover:bg-primary-foreground/50 hover:text-foreground rounded-md">
                                    <FontAwesomeIcon :icon="faEye" />
                                    View Details
                                </router-link>
                                <template v-if="repo.fake">
                                    <!-- <EditRepoModal :repoData="repo" @update="onUpdate" /> -->

                                    <button @click="onDelete"
                                        class="flex items-center gap-2 p-1.5 pr-5 text-xs text-foreground hover:bg-primary-foreground/50 hover:text-foreground rounded-md">
                                        <FontAwesomeIcon :icon="faTrashAlt" />
                                        Delete Repo
                                    </button>
                                </template>
                            </div>
                        </PopoverContent>
                    </Popover>
                </h4>
                <p v-if="repo.description" class="text-xs h-[2lh] mt-2 max-w-full text-muted-foreground px-4">{{
                    repo.description.substring(0, 75) }}{{ repo.description.length > 75 && "..." }}</p>
            </header>

            <footer class="flex items-center gap-6 w-full mt-auto">
                <p v-if="repo.language" class="flex items-center gap-2 text-xs">
                    <span class="inline-block bg-primary-foreground rounded-full h-2.5 w-2.5"></span>
                    {{ repo.language }}
                </p>
                <p class="flex items-center gap-2 text-xs">
                    <span class="inline-block">
                        <FontAwesomeIcon :icon="faStar" />
                    </span>
                    {{ repo.stargazers_count }}
                </p>
                <p class="flex items-center gap-2 text-xs max-md:hidden">
                    <span class="inline-block">
                        <FontAwesomeIcon :icon="faCodeFork" />
                    </span>
                    {{ repo.forks_count }}
                </p>
                <router-link :to="`/repos/${repo.name}`"
                    class="flex items-center gap-2 text-xs border-foreground border-2 hover:bg-primary-foreground px-4 py-1.5 rounded-md  ml-auto ">
                    View Details
                    <FontAwesomeIcon :icon="faArrowUpRightFromSquare" />
                </router-link>
            </footer>
        </section>
    </article>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faEye, faStar, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faArrowUpRightFromSquare, faBookBookmark, faCodeFork, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
//   import EditRepoModal from "./EditRepoModal"
import { cn } from "@/lib/utils"
import { inject } from 'vue'


const triggerReload = inject('triggerReload', () => { });

export default {
    props: {
        repo: Object
    },
    components: {
        FontAwesomeIcon,
        Popover,
        PopoverContent,
        PopoverTrigger,
        //   EditRepoModal
    },

    methods: {

        onUpdate(updatedRepo) {
            try {
                const existingRepos = JSON.parse(localStorage.getItem('fakeRepos')) || [];
                const index = existingRepos.findIndex(repo => repo.id === updatedRepo.id);
                if (index === -1) {
                    throw new Error('Repository not found');
                }

                existingRepos[index] = updatedRepo;
                localStorage.setItem('fakeRepos', JSON.stringify(existingRepos));
                triggerReload()
            } catch (error) {
                console.error('Error updating repository:', error.message);
            }
        },
        onDelete() {
            try {
                const existingRepos = JSON.parse(localStorage.getItem('fakeRepos')) || [];
                const filteredRepos = existingRepos.filter(repo => repo.id !== this.repo.id);
                localStorage.setItem('fakeRepos', JSON.stringify(filteredRepos));
                triggerReload()
            } catch (error) {
                console.error('Error deleting repository:', error.message);
            }
        }
    },
    computed: {
        faBookBookmark() {
            return faBookBookmark;
        },
        faTrashAlt() {
            return faTrashAlt;
        },
        faEllipsis() {
            return faEllipsis;
        },
        faEye() {
            return faEye;
        },
        faArrowUpRightFromSquare() {
            return faArrowUpRightFromSquare;
        },
        faCodeFork() {
            return faCodeFork;
        },
        faStar() {
            return faStar;
        },
    }
}
</script>