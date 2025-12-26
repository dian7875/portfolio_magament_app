<template>
    <Breadcrumb title="Perfil"/>
    <main class=" bg-white rounded-2xl p-4 shadow">
        <ProfileMenu />
    </main>
</template>

<script setup lang="ts">
import Breadcrumb from "../../../shared/layout/Breadcrumb.vue";
import ProfileMenu from "../screens/ProfileMenu.vue";
</script>
