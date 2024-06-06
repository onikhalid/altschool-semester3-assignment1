<script setup lang="ts">
import { onMounted, onUnmounted, reactive, provide } from 'vue'
import { octokit } from '../utils'
import { sideBarResultFallback } from '../constants'

const state = reactive({
  userData: null,
  isLoadingUserData: true,
  repos: [],
  isLoadingRepos: true
})

const fetchData = async () => {
  try {
    const userProfileResult = await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    const userRepoResult = await octokit.request('GET /users/onikhalid/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    const storedFakeRepos = JSON.parse(localStorage.getItem('fakeRepos')) || []
    state.repos = [...storedFakeRepos, ...userRepoResult.data]
    state.userData = userProfileResult.data
  } catch (error) {
    console.error(error)
    state.userData = sideBarResultFallback.data
  } finally {
    state.isLoadingUserData = false
    state.isLoadingRepos = false
  }
}

const accessTokenChangeListener = (e: MessageEvent) => {
  if (e.data === 'localReposUpdated') {
    fetchData()
  }
}

onMounted(() => {
  fetchData()
  window.addEventListener('message', accessTokenChangeListener)
})

onUnmounted(() => {
  window.removeEventListener('message', accessTokenChangeListener)
})

provide('userData', state.userData)
provide('isLoadingUserData', state.isLoadingUserData)
provide('repos', state.repos)
provide('isLoadingRepos', state.isLoadingRepos)
</script>