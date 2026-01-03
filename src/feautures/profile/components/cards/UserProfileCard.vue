<template>
  <div
    class="cursor-default bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-4"
  >
    <div
      class="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200"
    >
      <img
        :src="photoUrl ?? placeholder"
        alt="Foto de perfil"
        class="object-cover w-full h-full"
      />
    </div>

    <div class="text-center">
      <h2 class="text-xl font-semibold text-gray-900">{{ userName }}</h2>
      <p v-if="title" class="text-gray-600 text-sm">{{ title }}</p>
    </div>

    <div class="text-gray-600 text-sm text-center">
      <p v-if="bio" class="mb-1">{{ bio }}</p>
      <p v-if="location">{{ location }}</p>
    </div>

    <div class="flex flex-col items-center text-gray-500 text-sm gap-1 mt-2">
      <p v-if="email">📧 {{ email }}</p>
      <p v-if="phone">📱 {{ phone }}</p>
      <a target="blank" :href="hostUrl" v-if="hostUrl">🛜 {{ hostUrl }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string;
  userName: string;
  email: string;
  phone: string;
  bio: string | null;
  title: string | null;
  location: string | null;
  photoUrl: string | null;
  hostUrl: string | null;
}>();

const placeholder = "/images/avatar-placeholder.png";
</script>
