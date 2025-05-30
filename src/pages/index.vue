<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <defaultLayout>
    Salut {{ userStore.userInfo.username }}
  </defaultLayout>

</template>


<script lang="ts" setup>
import defaultLayout from '@/layouts/defaultLayout.vue';
import {useUserStore} from '@/stores/user';
import {useI18n} from 'vue-i18n';

// Traductions
const {t, locale} = useI18n();

const userStore = useUserStore();


</script>

