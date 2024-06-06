<template>
  <div v-if="hasError">
    <div class="fixed flex flex-col items-center justify-center w-screen h-screen bg-background text-foreground z-[100] top-0 left-0">
      <font-awesome-icon :icon="['fas', 'triangle-exclamation']" size="10x" />
      <h1 class="mt-8 text-4xl">{{ errorStatus === 404 ? '404' : 'Oops!' }}</h1>
      <p class="text-center max-w-[25ch]">
        {{ errorStatus === 404 ? 'The page you are looking for could not be found.' : 'Sorry, an unexpected error has occurred.' }}
      </p>
      <p v-if="errorStatus !== 404" class="max-w-[30ch] mt-4 px-4 py-2 text-sm italic text-muted-foreground border-2 rounded-md border-foreground">
        <i>{{ errorMessage }}</i>
      </p>
      <a @click.prevent="refreshPage" class="mt-8 px-4 py-2 bg-background text-foreground rounded-md hover:bg-primary-foreground cursor-pointer">
        Go back home
      </a>
    </div>
  </div>
  <component :is="component" v-else />
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';

library.add(faTriangleExclamation);

export default {
  name: 'ErrorBoundary',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      hasError: false,
      errorStatus: null,
      errorMessage: '',
      component: null,
    };
  },
  created() {
    this.component = this.$slots.default()[0];
  },
  errorCaptured(err, vm, info) {
    this.hasError = true;
    this.errorStatus = err.status || 500;
    this.errorMessage = err.message || 'An unexpected error occurred.';

    return false;
  },
  methods: {
    refreshPage() {
      this.$router.push('/').then(() => {
        this.hasError = false;
        this.errorStatus = null;
        this.errorMessage = '';
      });
    },
  },
};
</script>
