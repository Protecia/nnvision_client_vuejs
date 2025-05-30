/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
import {setupLayouts} from 'virtual:generated-layouts'
import {routes} from 'vue-router/auto-routes'

import {useApi} from "@/composables/apiCall";
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

// Gestion de l'authentification
const {getUserInfo} = useApi();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Garde globale d'authentification
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);
  console.log('Garde d\'authentification activée pour la route :', to.path);

  // Si userInfo n'est pas chargé, on tente de le récupérer
  if (!userInfo.value || !userInfo.value.username) {
    try {
      const { getUserInfo } = useApi();
      const info = await getUserInfo();
      userStore.setUserInfo(info);
    } catch (error) {
      // Si on est sur /loginUser, on laisse passer même si l'appel échoue
      if (to.path === '/loginUser' || to.meta?.skipAuth) {
        return next();
      }
      return next('/loginUser');
    }
  }

  // Si on est sur /loginUser et déjà authentifié, on redirige vers /
  if (to.path === '/loginUser' && userInfo.value && userInfo.value.username) {
    return next('/');
  }

  next();
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
