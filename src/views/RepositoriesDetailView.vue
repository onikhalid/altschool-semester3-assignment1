<template>
    <div class="flex flex-col w-full max-h-full md:my-1 overflow-hidden px-4">
        <div v-if="isLoadingRepoInfo && isLoadingTreesInfo && !repoInfo"
            class="flex items-center justify-center w-full h-full row-span-3">
            <span class="flex animate-spin items-center justify-center">
                <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
                    <path class="text-primary-foreground" d="M28 16a12 12 0 1 1-8.292-11.413" stroke="rgb(117, 90, 226)"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
                <span class="sr-only">Loading</span>
            </span>
        </div>
        <div v-else-if="!isLoadingRepoInfo && !isLoadingTreesInfo && repoTrees && repoInfo">
            <main class="grow relative flex flex-col overflow-hidden max-md:pb-2.5 max-md:pt-0">
                <header class="flex flex-wrap md:items-center justify-between pb-3 mb-3 border-b-2 border-foreground">
                    <section>
                        <div class="flex items-center gap-2">
                            <img :src="repoInfo.owner.avatar_url" alt="" class="w-10 h-10 rounded-full" />
                            <h1 class="text-base leading-snug md:text-lg font-semibold">{{ repoInfo.name }}</h1>
                            <span class="text-[10px] px-3 sm:py-0.5 rounded-full border-muted-foreground border">
                                {{ repoInfo.private ? "PRIVATE" : "PUBLIC" }}
                            </span>
                        </div>
                    </section>
                    <section class="flex items-center gap-2 text-xs">
                        <span class="flex items-center gap-2 px-3 py-1 rounded-md border-foreground border-[1.5px]">
                            <font-awesome-icon :icon="['far', 'eye']" />
                            Watchers: {{ repoInfo.watchers_count }}
                        </span>
                        <span class="flex items-center gap-2 px-3 py-1 rounded-md border-foreground border-[1.5px]">
                            <font-awesome-icon :icon="['far', 'star']" />
                            Stars: {{ repoInfo.stargazers_count }}
                        </span>
                        <span class="flex items-center gap-2 px-3 py-1 rounded-md border-foreground border-[1.5px]">
                            <font-awesome-icon :icon="['fas', 'code-fork']" />
                            Forks: {{ repoInfo.forks_count }}
                        </span>
                    </section>
                </header>
                <button @click="handleGoBack"
                    class="flex items-center gap-4 px-4 py-2 mb-2 text-sm bg-background max-w-max text-foreground border-2 border-transparent hover:border-foreground rounded-md transition-all duration-300">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" />
                    Back
                </button>
                <div
                    class="relative flex flex-col-reverse max-xl:gap-4 gap-8 md:flex-row overflow-hidden max-md:pt-8 w-full xl:w-[88%] max-w-[1000px] mx-auto xl:mt-8 max-md:overflow-y-scroll">
                    <section class="flex flex-col w-full xl:w-3/5 lg:pr-4 md:overflow-y-scroll pb-4">
                        <ul
                            class="border-[1.5px] rounded-md divide-y-[1.5px] divide-foreground w-full border-foreground">
                            <li class="flex justify-between items-center p-4 bg-background rounded-t-md">
                                <div class="flex items-center flex-wrap gap-2">
                                    <img :src="repoInfo.owner.avatar_url" alt="" class="w-8 h-8 rounded-full" />
                                    <a :href="`https://github.com/${repoInfo.owner.login}`" target="_blank"
                                        class="text-sm font-medium">
                                        {{ repoInfo.owner.login }}
                                    </a>
                                </div>
                                <p class="text-xs">
                                    {{ formatDistanceToNow(new Date(repoInfo.created_at), { addSuffix: true }) }}
                                </p>
                            </li>
                            <li v-for="(tree, index) in sortedRepoTrees" :key="index"
                                class="flex items-center gap-2 px-4 py-2 text-sm">
                                <font-awesome-icon
                                    :icon="[tree.type === 'blob' ? 'far' : 'fas', tree.type === 'blob' ? 'file' : 'folder']"
                                    class="text-[0.9rem] text-muted-foreground" />
                                <a :href="getTreeUrl(tree)" target="_blank">
                                    <span>{{ tree.path }}</span>
                                </a>
                            </li>
                        </ul>
                    </section>
                    <article class="flex flex-col gap-3 md:gap-6 w-full lg:w-2/5 md:pl-4 md:overflow-y-scroll">
                        <section>
                            <h2 class="text font-medium mb-1.5">About</h2>
                            <p class="text-[0.9rem]">{{ repoInfo.description }}</p>
                        </section>
                        <a :href="repoInfo.html_url" target="_blank"
                            class="flex flex-wrap gap-1.5 items-center text-xs">
                            <font-awesome-icon :icon="['fas', 'link']" />
                            {{ repoInfo.html_url }}
                        </a>
                        <div class="flex flex-col text-left text-sm mt-2 text-muted-foreground">
                            <p class="flex items-center gap-2 py-1 rounded-md">
                                <font-awesome-icon :icon="['far', 'eye']" />
                                <span>
                                    {{ repoInfo.watchers_count }} watching
                                </span>
                            </p>
                            <p class="flex items-center gap-2 py-1 rounded-md">
                                <font-awesome-icon :icon="['far', 'star']" />
                                <span>
                                    {{ repoInfo.stargazers_count }} stars
                                </span>
                            </p>
                            <p class="flex items-center gap-2 py-1 rounded-md">
                                <font-awesome-icon :icon="['fas', 'code-fork']" />
                                {{ repoInfo.forks_count }} forks
                            </p>
                        </div>
                        <div v-if="repoInfo.fake" class="border-2 border-foreground rounded-md p-4">
                            <h3><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /> Fake Repo Notice!</h3>
                            <p class="text-sm mt-3">
                                Please note that this repository is a fake repository created for the purpose of this
                                project. The data shown here is not real.
                                Every file and folder is dynamically generated and does not exist in an actual git
                                repository.
                            </p>
                            <p class="text-xs mt-3 text-muted-foreground">
                                This is done as a protection against abuse, since this link will be open to all, I
                                deemed it necessary to prevent people from creating, editing repos in my name
                                whilst still complying with the necessary requirements for submission.
                            </p>
                        </div>
                    </article>
                </div>
            </main>
        </div>
        <div v-else class="grow flex items-center justify-center">
            <ErrorCard>
                <template #message>
                    <p>There was a problem fetching the details of this repo. Either it doesn't exist or there's a
                        problem with your internet connection.</p>
                    <Button class="mt-4" @click="handleGoBack">Go back</Button>
                </template>
            </ErrorCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faCodeFork, faFolder, faLink, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faEye, faFile, faStar } from '@fortawesome/free-regular-svg-icons';
import ErrorCard from '@/components/ErrorCard.vue';
import { Button } from '@/components/ui/button';
import { cn, octokit } from '@/lib/utils';

interface RepoInfo {
    owner: {
        avatar_url: string;
        login: string;
    };
    name: string;
    private: boolean;
    watchers_count: number;
    stargazers_count: number;
    forks_count: number;
    created_at: string;
    description: string;
    html_url: string;
    default_branch: string;
    fake?: boolean;
}

interface Tree {
    path: string;
    type: 'blob' | 'tree';
}

interface RepoTree {
    tree: Tree[];
}

const route = useRoute();
const router = useRouter();
const params = route.params as { repoName: string };
const repoInfo = ref<RepoInfo | null>(null);
const repoTrees = ref<RepoTree | null>(null);
const isLoadingRepoInfo = ref(true);
const isLoadingTreesInfo = ref(true);

const handleGoBack = () => {
    router.back();
};

const fetchData = async () => {
    try {
        const isFakeRepo = JSON.parse(localStorage.getItem('fakeRepos') || '[]').some((repo: RepoInfo) => repo.name === params.repoName);
        if (isFakeRepo) {
            const fakeRepo = JSON.parse(localStorage.getItem('fakeRepos') || '[]').find((repo: RepoInfo) => repo.name === params.repoName);
            repoInfo.value = fakeRepo;
            repoTrees.value = generateFakeTree();
            return;
        }

        const repoInfoResult = await octokit.request(`GET /repos/onikhalid/${params.repoName}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        const repoTreesResult = await octokit.request(`GET /repos/onikhalid/${params.repoName}/git/trees/${repoInfoResult.data.default_branch}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        repoInfo.value = repoInfoResult.data;
        repoTrees.value = repoTreesResult.data;
    } catch (error) {
        repoInfo.value = null;
        repoTrees.value = null;
    } finally {
        isLoadingRepoInfo.value = false;
        isLoadingTreesInfo.value = false;
    }
};

const generateFakeTree = (): RepoTree => {
    const fakeTree: RepoTree = { tree: [] };
    const numFiles = Math.floor(Math.random() * 10) + 3;
    const numFolders = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < numFiles; i++) {
        const fileName = `file${i}.txt`;
        fakeTree.tree.push({ path: fileName, type: 'blob' });
    }

    for (let i = 0; i < numFolders; i++) {
        const folderName = `folder${i}`;
        fakeTree.tree.push({ path: folderName, type: 'tree' });
    }

    return fakeTree;
};

const sortedRepoTrees = computed(() => {
    return [...(repoTrees.value?.tree || [])].sort((a) => (a.type === 'blob' ? 1 : -1));
});

const getTreeUrl = (tree: Tree) => {
    return tree.type === 'blob'
        ? `https://github.com/onikhalid/${params.repoName}/blob/${repoInfo.value?.default_branch}/${tree.path}`
        : `https://github.com/onikhalid/${params.repoName}/tree/${repoInfo.value?.default_branch}/${tree.path}`;
};

onMounted(() => {
    fetchData();
});
</script>
