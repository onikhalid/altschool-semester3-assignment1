<template>
    <Dialog :open="isModalOpen">
        <DialogTrigger>
            <Button @click="setModalOpen(true)" variant="unstyled"
                class="flex items-center gap-2 py-2 border-2 border-foreground !h-max text-xs md:text-sm hover:bg-foreground hover:text-background">
                <FontAwesomeIcon :icon="faPlusCircle" />
                <p>Create New Repo</p>
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]" @pointerdownoutside="setModalOpen(false)">
            <DialogHeader>
                <div class="flex items-center justify-between">
                    <DialogTitle>Create New Repository</DialogTitle>
                    <DialogClose @click="setModalOpen(false)">
                        <p>Close</p>
                    </DialogClose>
                </div>
                <DialogDescription class="!mt-4">
                    For <span class="font-semibold">security measures</span>, I've made sure that every repo that is
                    created here is <span class="font-semibold">not real</span> and only saved on your computer local
                    storage. I wouldn't want just anybody
                    to be able to create a real repository on my behalf.
                </DialogDescription>
            </DialogHeader>
            <div>
                <form @submit.prevent="handleSubmit" id="create-fake-form" class="grid gap-4 py-4">
                    <div>
                        <label class="text-sm" for="repoName">Name:</label>
                        <input type="text" id="repoName" v-model="repoName"
                            class="w-full bg-background px-4 py-2 text-sm text-foreground rounded-md outline-none border-gray-400 border-2 focus:border-primary-foreground transition-all duration-300 ease-in-out" />
                        <p v-if="nameError" class="text-red-500 text-xs">{{ nameErrorMsg }}</p>
                    </div>
                    <div>
                        <label class="text-sm" for="desc">Description:</label>
                        <textarea id="desc" rows="5" v-model="repoDescription"
                            class="w-full bg-background px-4 py-2 text-sm text-foreground rounded-md outline-none border-gray-400 border-2 focus:border-primary-foreground transition-all duration-300 ease-in-out resize-none"></textarea>
                        <p v-if="descriptionError" class="text-red-500 text-xs">{{ descriptionErrorMsg }}</p>
                    </div>
                </form>
            </div>
            <DialogFooter>
                <Button form="create-fake-form" type="submit">Create</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script>
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { validateRepoName } from "../lib/utils";
import { toast } from "sonner";
import { ref, inject } from "vue";

export default {
    components: {
        Dialog,
        DialogTrigger,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogClose,
        DialogDescription,
        DialogFooter,
        Button,
        FontAwesomeIcon,
    },
    setup() {
        const triggerReload = inject ('triggerReload', () => { });
        const repoName = ref('');
        const repoDescription = ref('');
        const isModalOpen = ref(false);
        const nameError = ref(false);
        const nameErrorMsg = ref('');
        const descriptionError = ref(false);
        const descriptionErrorMsg = ref('');

        const setModalOpen = (isOpen) => {
            isModalOpen.value = isOpen;
        };

        const handleSubmit = () => {
            if (repoName.value.trim().length === 0) {
                nameError.value = true;
                nameErrorMsg.value = 'Repository name cannot be empty';
                return;
            }
            if (repoDescription.value.trim().length === 0) {
                descriptionError.value = true;
                descriptionErrorMsg.value = 'Repository description cannot be empty';
                return;
            }
            descriptionError.value = false;
            nameError.value = false;
            nameErrorMsg.value = '';
            descriptionErrorMsg.value = '';
            const isNameValid = validateRepoName(repoName.value);
            const isDescriptionValid = repoDescription.value.length > 0;

            if (!isNameValid) {
                nameErrorMsg.value = 'Repository name cannot contain white spaces or special characters';
                return;
            } else if (!isDescriptionValid) {
                descriptionErrorMsg.value = 'Repository description cannot be empty';
                return;
            }

            // Check if the repository name already exists
            const existingRepos = JSON.parse(localStorage.getItem('fakeRepos')) || [];
            const isRepoExists = existingRepos.some(repo => repo.name.toLowerCase() === repoName.value.toLowerCase());
            if (isRepoExists) {
                nameError.value = true;
                nameErrorMsg.value = 'Repository with this name already exists';
                return;
            }

            const newFakeRepo = {
                name: repoName.value,
                description: repoDescription.value,
            };

            const repoWithInfo = appendRepoInfo(newFakeRepo);
            let existingArray = JSON.parse(localStorage.getItem('fakeRepos')) || [];
            existingArray.push(repoWithInfo);

            let updatedArrayString = JSON.stringify(existingArray);
            localStorage.setItem('fakeRepos', updatedArrayString);

            setModalOpen(false);
            repoName.value = '';
            repoDescription.value = '';
            nameError.value = false;
            descriptionError.value = false;
            toast("Repository has been successfully created.");
            triggerReload()
            window.postMessage('localReposUpdated', window?.location.href);
        };

        // Function to append additional information to the fake repositories
        const appendRepoInfo = (repo) => {
            const reposWithInfo = {
                ...repo,
                id: Math.floor(Math.random() * 1000000),
                html_url: `https://github.com/example/${repo.name.replace(/\s/g, '-')}`,
                owner: {
                    login: "onikhalid",
                    avatar_url: "https://avatars.githubusercontent.com/u/73073198?v=4",
                },
                private: false,
                fake: true,
                watchers_count: Math.floor(Math.random() * 100),
                stargazers_count: Math.floor(Math.random() * 1000),
                forks_count: Math.floor(Math.random() * 50),
                open_issues_count: Math.floor(Math.random() * 10),
                created_at: new Date().toISOString(),
                default_branch: "main",
            };

            return reposWithInfo;
        };

        return {
            repoName,
            repoDescription,
            isModalOpen,
            nameError,
            nameErrorMsg,
            descriptionError,
            descriptionErrorMsg,
            handleSubmit,
            setModalOpen,
        };
    },
};
</script>
