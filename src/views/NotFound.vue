<template>
  <div class="flex flex-col items-center justify-center">
    <font-awesome-icon :icon="['fas', 'triangle-exclamation']" size="10x" />
    <h1 class="mt-8 text-4xl">404</h1>
    <p class="text-center max-w-[25ch]">
      The page you are looking for could not be found.
    </p>
    <router-link to="/"
      class="mt-8 px-4 py-2 bg-background text-foreground rounded-md hover:bg-primary-foreground cursor-pointer">
      Go back home
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound',
}
</script>