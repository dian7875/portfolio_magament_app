<template>
  <ProfileSkeleton v-if="isLoading" />
  <div v-else-if="isError" class="text-red-600">
    {{ error?.message }}
  </div>
  <template v-else-if="me">
    <section class="flex items-center gap-3 w-full max-md:flex-col">
      <div class="shrink-0">
        <ProfileImgCard :photo-url="me.photoUrl" :photo-path="me.photoPath" />
      </div>
      <div class="flex-1 min-w-0 max-md:w-full">
        <BasicInfoCard
          :id="me.id"
          :user-name="me.name"
          :phone="me.phone"
          :email="me.email"
          :bio="me.bio"
          :title="me.title"
          :subtitle="me.subTitle"
          :location="me.location"
          :host-url="me.hostUrl"
        />
      </div>
    </section>
    <section class="pt-6">
      <CardCv :cv-path="me.cvPath" :cv-url="me.cvUrl" />
    </section>
  </template>
</template>
<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { UserService } from "../service/userService";
import BasicInfoCard from "../components/cards/BasicInfoCard.vue";
import type { UserType } from "../type/userType";
import CardCv from "../components/cards/CardCv.vue";
import ProfileImgCard from "../components/cards/ProfileImgCard.vue";
import ProfileSkeleton from "../components/loaders/profileSkeleton.vue";

const {
  data: me,
  isLoading,
  isError,
  error,
} = useQuery<UserType>({
  queryKey: ["me"],
  queryFn: UserService.getMe,
  retry: false,
});
</script>
