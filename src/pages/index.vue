<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <defaultLayout>
    Salut
  </defaultLayout>

</template>


<script lang="ts" setup>
import defaultLayout from '@/layouts/defaultLayout.vue';
import {ref, onMounted} from 'vue';
import {useUserStore} from '@/stores/user';
import {useApi} from "@/composables/apiCall";
import {useI18n} from 'vue-i18n';
import {useRouter} from 'vue-router';

// Traductions
const {t, locale} = useI18n();

// Instance du router
const router = useRouter(); // Initialisation du router

// Gestion de l'authentification
const userStore = useUserStore();
const {getUserInfo} = useApi();

// Créer une référence réactive pour stocker les informations utilisateur
const userInfo = ref(null);

// Récupération des informations utilisateur
const loadUserInfo = async () => {
  try {
    const response = await getUserInfo();
    userInfo.value = response;
    userStore.setUserInfo(response);
  } catch (error) {
    console.warn('Erreur lors de la récupération des informations utilisateur:', error);
    // Gérer l'erreur ici, par exemple en redirigeant vers la page de connexion
    await router.push('/loginUser');
  }
};

onMounted(() => {
  loadUserInfo();
});

</script>

