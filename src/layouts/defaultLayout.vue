<template>
  <Menu/>
  <v-main>
    <v-container>
      <v-overlay v-model="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <slot>
        <!-- This is where the content of the page will be injected -->
      </slot>
    </v-container>
  </v-main>

  <AppFooter/>
</template>

<script lang="ts" setup>
import Menu from "@/components/Menu.vue";
import AppFooter from "@/components/AppFooter.vue";
import {loading} from '@/composables/useAxios'; // Import de l'état de chargement global
import {computed} from 'vue';

// Utilisation de computed pour réagir aux changements de l'état de chargement
const isLoading = computed(() => loading.value);
</script>
