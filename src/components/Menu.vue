<template>
  <v-app-bar app dense>
    <!-- Logo -->
    <v-row class="d-flex align-center">
      <v-img
        src="/logo_protecia.jpg"
        alt="Logo Protecia"
        contain
        height="60"
        width="60"
      ></v-img>
      <v-spacer></v-spacer>

    </v-row>

    <!-- Menu de navigation -->
    <v-spacer></v-spacer>
    <v-row v-if="!isMobile" class="d-flex align-center">
      <v-btn variant="text" to="/">Accueil</v-btn>
      <v-btn variant="text" to="/logoutUser">Logout</v-btn>
    </v-row>

    <!-- Menu hamburger pour mobile -->
    <v-menu v-if="isMobile" offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link to="/">
          <v-list-item-title>Accueil</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/services">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDisplay } from 'vuetify';

export default defineComponent({
  name: 'App',
  setup() {
    const { smAndDown } = useDisplay();
    const isMobile = smAndDown;

    return { isMobile };
  },
});
</script>

