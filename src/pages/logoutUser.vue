<template>
</template>

<script lang="ts" setup>
import {useApi} from "@/composables/apiCall";
import router from "@/router";
import {ref, onMounted} from 'vue';

const {apiLogout} = useApi();


const logout = async () => {
  await apiLogout();
  await localStorage.clear();
  await router.push('/loginUser');
};

onMounted(() => {
  logout()
})

</script>
