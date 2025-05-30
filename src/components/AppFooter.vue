<template>
  <v-footer
    app
    height="40"
  >
    <a
      v-for="item in items"
      :key="item.title"
      class="d-inline-block mx-2 social-link"
      :href="item.href"
      rel="noopener noreferrer"
      target="_blank"
      :title="item.title"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      &copy; 2024-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">nnvision SAS</span>
      —
      <a
        class="text-decoration-none on-surface"
        href="https://opensource.org/license/mit"
        rel="noopener noreferrer"
        target="_blank"
      >
        MIT License
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const items = [
  {
    title: 'Protecia Documentation',
    icon: 'mdi-file-document-outline',
    href: 'https://protecia.com/',
    isImage: true,
  },
  {
    title: 'Protecia GitHub',
    icon: `mdi-github`,
    href: 'https://github.com/protecia',
  },
]
</script>

