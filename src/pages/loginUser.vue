<template>
  <v-container class="fill-height" fluid>
    <v-row class="d-flex justify-center align-center" style="min-height: 100vh">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-toolbar dark color="rgb(66, 133, 188)">
            <v-toolbar-title>{{ t('login.login_title') }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" @submit.prevent="loginWithDjango">
              <v-text-field
                prepend-icon="mdi-account"
                name="login"
                :label="t('login.username')"
                type="text"
                v-model="username"
                outlined
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                :label="t('login.password')"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                outlined
                @keyup.enter="loginWithDjango"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-card-actions class="">
                <v-spacer></v-spacer>
                <v-btn color="rgb(66, 133, 188)" type="submit">{{ t('login.login') }}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center flex-wrap">
            <v-btn color="secondary" @click="loginWithMicrosoft">
              <v-icon left>mdi-microsoft</v-icon>
              {{ t('login.microsoft_login') }}
            </v-btn>
            <v-btn color="rgb(255, 204, 0)" dark @click="loginWithGoogle">
              <v-icon left>mdi-google</v-icon>
              {{ t('login.Google_login') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts" setup>
import {ref} from 'vue';
import {useUserStore} from '@/stores/user'
import router from "@/router";
import {useApi} from "@/composables/apiCall";
import {useI18n} from 'vue-i18n';

const showPassword = ref(false);
// Traductions
const {t, locale} = useI18n();
const username = ref('');
const password = ref('');
const userStore = useUserStore()
const {apiCheckUserPassword} = useApi()

const form = ref(null);

const loginWithDjango = async () => {
  if (!username.value || !password.value) {
    console.log('missing credentials')
    return;
  }

  // Check if the user exists
  try {
    const isUser = await apiCheckUserPassword(username.value, password.value);
    if (!isUser) {
      console.log('bad credentials')
      return;
    }
    await router.push('/');
  } catch (error) {
    console.warn('Erreur lors de la connexion:', error);
    // Gérer l'erreur ici, par exemple en affichant un message d'erreur à l'utilisateur
    // ou en redirigeant vers une page d'erreur
  }
};

const loginWithGoogle = () => {
  console.log('Connexion avec Google');
};

const loginWithMicrosoft = () => {
  console.log('Connexion avec Microsoft');
};
</script>


<style scoped>
v-card-actions {
  padding: 16px;
}
</style>
