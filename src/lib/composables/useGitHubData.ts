import { ref, watch, type Ref, inject } from 'vue';
import { Octokit } from 'octokit';
import type { UserProfile, UserRepo } from '@/types/github';
import { useDataStore } from '@/stores';

export function useGitHubData(reloadTrigger: Ref<boolean>) {
  const dataStore = inject('dataStore') as ReturnType<typeof useDataStore> | undefined;
  console.log(dataStore)
  const userProfile = ref<UserProfile | null>(null);
  const userRepos = ref<UserRepo[]>([]);

  const fetchGitHubData = async () => {
    dataStore?.setLoadingProfile(true);
    dataStore?.setLoadingRepos(true);
    console.log('Fetching GitHub data...');
    try {
      const octokit = new Octokit({ auth: import.meta.env.VITE_GITHUB_SECRET });
      const userProfileResult = await octokit.request('GET /user', {
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });
      const userRepoResult = await octokit.request('GET /users/onikhalid/repos', {
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });
      console.log('GitHub data fetched successfully', userProfileResult, userRepoResult);
      const storedFakeRepos = JSON.parse(localStorage.getItem('fakeRepos') || '[]');
      userProfile.value = userProfileResult.data;
      userRepos.value = [...storedFakeRepos, ...userRepoResult.data];
      dataStore?.setRepos([...storedFakeRepos, ...userRepoResult.data]);
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
    } finally {
      dataStore?.setLoadingProfile(false);
      dataStore?.setLoadingRepos(false);
      console.log('GitHub data fetch process completed');
    }
  };

  // Fetch data on component mount
  fetchGitHubData();

  // Watch the reloadTrigger to refetch data
  watch(reloadTrigger, () => {
    fetchGitHubData();
  });

  return { userProfile, userRepos, fetchGitHubData };
}
