<script setup>
import { onMounted, ref } from "vue";
import { hideLoader } from "@/utils/loaderDelayFunc";
import { getAuthToken } from "@/utils/checkAuthenticated";
const status = ref(true); 
const auth = ref("")

onMounted(async () => {
  status.value = await hideLoader(2000, status.value); 
  auth.value = await getAuthToken("tokenDokon")
});
</script>

<template>
  <NuxtLayout>
      <NuxtRouteAnnouncer />

      <!-- Show Loader if Checking Auth -->
      <Loader v-if="status" />

      <!-- Show Page Content After Auth Check -->
      <NuxtPage v-else />
    </NuxtLayout>
</template>
