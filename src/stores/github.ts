// store.js
import { reactive } from 'vue'

interface State {
    userData: any,
    repoData: any,
    loading: boolean,
    error: any,
    triggerState: any,
}

const state: State = reactive({
    userData: null,
    repoData: null,
    loading: false,
    error: null,
    triggerState: null,
})

const setUserData = (data: any): void => {
    state.userData = data
}

const setRepoData = (data: any): void => {
    state.repoData = data
}

const setLoading = (isLoading: boolean) => {
  state.loading = isLoading
}

const setError = (error:any) => {
  state.error = error
}

const setTriggerState = (newState: any) => {
  state.triggerState = newState
}

export default {
  state,
  setUserData,
  setRepoData,
  setLoading,
  setError,
  setTriggerState,
}
