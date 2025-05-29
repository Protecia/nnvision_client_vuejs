import axios from 'axios';
import {ref} from 'vue';

export const loading = ref(false);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true, // Inclure les cookies dans les requêtes
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 403) {
      // Gérer silencieusement le 403 pour tous les appels
      return Promise.reject(new Error('Non autorisé (403)'));
    }

    if (error.response && error.response.status === 401) {
      // Gérer silencieusement le 401 pour tous les appels
      return Promise.reject(new Error('Non autorisé (401)'));
    }

    if (error.code === 'ERR_NETWORK') {
      // Gérer la connexion refusée
      return Promise.reject(new Error('Erreur réseau (ERR_NETWORK)'));
    }
    console.log('Base URL:', import.meta.env.VITE_BACKEND_API_URL);

    return Promise.reject(error);
  }
);

export default axiosInstance;
