<template>
  <div class="h-[95dvh] w-full flex items-center justify-center">
    <DecorativeBg />
    <div
      class="z-50 flex flex-col items-center justify-center w-full md:w-2/3 max-w-md px-6 py-10 gap-8 bg-white rounded-xl shadow-lg"
    >
      <LoginForm />
      <RouterLink
        class="underline text-gray-500 hover:text-blue-700"
        to="/registro"
        >No tienes una cuenta? Registrate aqui.</RouterLink
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import DecorativeBg from "../componets/forms/DecorativeBg.vue";
import LoginForm from "../componets/forms/LoginForm.vue";
</script>
