<template>
  <div class="p-6 flex flex-col gap-6">
    <div v-if="isLoading" class="animate-pulse">
      <DashboardSekeleton />
    </div>

    <div v-else class="flex flex-col gap-6">
      <section class="mb-6">
        <h1 class="text-2xl font-bold">Hola, {{ me?.name }}</h1>
        <p class="text-gray-600">Bienvenido a tu panel de control</p>
      </section>

      <UserProfileCard
        v-if="me"
        :id="me.id"
        :user-name="me.name"
        :phone="me.phone"
        :email="me.email"
        :bio="me.bio"
        :title="me.title"
        :subtitle="me.subTitle"
        :location="me.location"
        :host-url="me.hostUrl"
        :photo-url="me.photoUrl"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          title="Idiomas"
          :count="summary?.languages ?? 0"
          @click="goToSection('Languages')"
        />
        <SummaryCard
          title="Habilidades"
          :count="summary?.skills ?? 0"
          @click="goToSection('Skills')"
        />
        <SummaryCard
          title="Educación"
          :count="summary?.education ?? 0"
          @click="goToSection('Education')"
        />
        <SummaryCard
          title="Experiencia Laboral"
          :count="summary?.experiences ?? 0"
          @click="goToSection('WorkExperience')"
        />
        <SummaryCard
          title="Proyectos"
          :count="summary?.projects ?? 0"
          @click="goToSection('Projects')"
        />
        <SummaryCard
          title="Redes Sociales"
          :count="summary?.socialMedias ?? 0"
          @click="goToSection('SocialNetworks')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { UserService } from "../service/userService";
import { useRouter } from "vue-router";
import SummaryCard from "../components/cards/SummaryCard.vue";
import type { UserType, Summary } from "../type/userType";
import UserProfileCard from "../components/cards/UserProfileCard.vue";
import { computed } from "vue";
import DashboardSekeleton from "../components/loaders/DashboardSekeleton.vue";

const { data: me, isLoading: isLoadingMe } = useQuery<UserType>({
  queryKey: ["me"],
  queryFn: () => UserService.getMe(),
});

const { data: summary, isLoading: isLoadingSummary } = useQuery<Summary>({
  queryKey: ["sumary"],
  queryFn: () => UserService.getSummary(),
});

const isLoading = computed(() => isLoadingMe.value || isLoadingSummary.value);

const router = useRouter();

function goToSection(section: string) {
  router.push({
    name: section,
  });
}
</script>
