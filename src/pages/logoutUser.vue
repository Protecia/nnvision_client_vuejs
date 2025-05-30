<template>
</template>

<script lang="ts" setup>
import {useApi} from "@/composables/apiCall";
import router from "@/router";
import {ref, onMounted} from 'vue';
import { useUserStore } from '@/stores/user';

const {apiLogout} = useApi();
const userStore = useUserStore();


const logout = async () => {
  await apiLogout();
  userStore.setUserInfo({
    avatar: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  })
  await localStorage.clear();
  await router.push('/loginUser');
};

onMounted(() => {
  logout()
})

</script>
