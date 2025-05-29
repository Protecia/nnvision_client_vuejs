<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <default-layout>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-map-marker</v-icon>
            Mes localisations
          </v-card-title>
          <v-list>
            <v-list-item
              v-for="loc in localisations"
              :key="loc.id"
              @click="fetchWifi(loc)"
              class="d-flex align-center"
              style="cursor:pointer;"
            >
              <!-- Point à gauche -->
              <v-icon class="mr-3" style="font-size: 3em;">mdi-circle-small</v-icon>
              <!-- Tout le contenu sur une ligne -->
              <span class="text-body-1 font-weight-medium mr-2">{{ loc.adress }}</span>
              <span class="grey--text mr-2">|</span>
              <span class="mr-2">{{ loc.city }}</span>
              <span class="grey--text">({{ loc.cp }})</span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog pour les Wifi -->
    <!-- Dialog pour les Wifi -->
    <v-dialog v-model="wifiDialog" max-width="600">
      <v-card>
        <v-card-title>
          <v-icon class="mr-2">mdi-wifi</v-icon>
          WiFi de {{ selectedLocalisation?.adress }} ({{ selectedLocalisation?.city }})
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="wifi in wifis"
              :key="wifi.id"
              class="d-flex flex-column"
            >
              <div class="text-body-1 font-weight-medium">
                <!-- SSID cliquable : ouvre le QR code -->
                <span
                  style="color:#1976d2; cursor:pointer; text-decoration: underline;"
                  @click="showQrCode(wifi)"
                >
                    SSID : {{ wifi.ssid }}
                  </span>
                <span v-if="wifi.active" class="ml-2 text-success">[actif]</span>
              </div>
            </v-list-item>

            <v-list-item v-if="wifis.length === 0">
              <div class="text-body-1">Aucun réseau WiFi</div>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="wifiDialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog pour le QR code -->
    <v-dialog v-model="qrDialog" max-width="400">
      <v-card>
        <v-card-title>
          QR Code pour <span v-if="selectedWifi">"{{ selectedWifi.ssid }}"</span>
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          <img
            v-if="qrUrl"
            :src="qrUrl"
            :alt="`QR Code pour ${selectedWifi?.ssid}`"
            style="max-width: 300px;"
          >
          <div v-else>Chargement…</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click="qrDialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  </default-layout>
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

type Localisation = {
  id: number;
  adress: string;
  city: string;
  cp: string;
  // Ajoute d’autres champs si besoin
};

const localisations = ref<Localisation[]>([]);

type Wifi = {
  id: number;
  ssid: string;
  active: boolean;
  // autres champs
};
const wifis = ref<Wifi[]>([]);

const selectedLocalisation = ref<Localisation | null>(null);
const wifiDialog = ref(false);
const selectedWifi = ref<Wifi | null>(null);
const api = useApi();
const qrUrl = ref('');
const qrDialog = ref(false);

onMounted(async () => {
  localisations.value = await api.getUserLocalisations();
});

const fetchWifi = async (loc: Localisation) => {
  selectedLocalisation.value = loc;
  wifis.value = await api.getLocalisationWifis(loc.id);
  wifiDialog.value = true;
};

// Fonction pour afficher le QR code
const showQrCode = async (wifi: Wifi) => {
  selectedWifi.value = wifi;
  qrUrl.value = await api.getQrCodeUrl(wifi.id); // Récupère l'URL à partir de l'API
  qrDialog.value = true;
};

</script>

