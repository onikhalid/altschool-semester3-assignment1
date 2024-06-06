import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', () => {
  const repos = ref([] as any[])
  const loadingProfile = ref(true)
  const loadingRepos = ref(true)

  function setRepos(value: any[]) {
    repos.value = value
  }

  function setLoadingProfile(value: boolean) {
    loadingProfile.value = value
  }

  function setLoadingRepos(value: boolean) {
    loadingRepos.value = value
  }

  return { repos, loadingProfile, loadingRepos, setRepos, setLoadingProfile, setLoadingRepos }
})
