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
      <v-btn variant="text" to="/">{{ t("index.menu.home") }}</v-btn>
      <v-btn variant="text" to="/qrCode">{{ t("index.menu.add_camera") }}</v-btn>
      <v-btn variant="text" to="/logoutUser">{{ t("index.menu.logout") }}</v-btn>

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
          <v-list-item-title>{{ t("index.menu.home") }}</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/qrCode">
          <v-list-item-title>{{ t("index.menu.add_camera") }}</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/logoutUser">
          <v-list-item-title>{{ t("index.menu.logout") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { smAndDown: isMobile } = useDisplay();
</script>

