<template>
  <Dialog
    v-model:visible="visibleModel"
    modal
    header="Generador de CV"
    :style="{ width: '32rem' }"
    :draggable="false"
    @update:visible="resetForm"
  >
    <form>
      <StepTemplate
        v-if="page === 1"
        :options="cvTemplates"
        v-model="formData.templateId"
      />

      <StepItems
        v-if="page === 2"
        :options="projects"
        label-key="title"
        v-model="formData.projectsIds"
      />

      <StepItems
        v-if="page === 3"
        :options="skills"
        label-key="name"
        v-model="formData.skillsIds"
      />

      <StepItems
        v-if="page === 4"
        :options="languages"
        label-key="language"
        v-model="formData.languagesIds"
      />

      <StepItems
        v-if="page === 5"
        :options="education"
        label-key="title"
        v-model="formData.educationIds"
      />

      <StepItems
        v-if="page === 6"
        :options="experiences"
        label-key="company"
        v-model="formData.experienceIds"
      />

      <div class="flex w-full justify-between pt-4">
        <FwbButton
          color="alternative"
          type="button"
          @click="prevPage"
          :disabled="page === 1"
        >
          Anterior
        </FwbButton>

        <FwbButton
          color="alternative"
          type="button"
          @click="nexPage"
          v-if="page !== 6"
          :disabled="!canNext"
        >
          Siguiente
        </FwbButton>

        <FwbButton
          v-else
          @click.prevent="submit"
          :disabled="isPending"
          :loading="isPending"
        >
          Generar
        </FwbButton>
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { Dialog } from "primevue";
import { computed, reactive, ref } from "vue";
import StepItems from "../cards/StepItems.vue";
import type { LanguageType } from "../../../languages/type/LanguageType";
import { useQuery } from "@tanstack/vue-query";
import { CvGenService } from "../../service/cvGeneratorService";
import type { EducationType } from "../../../education/type/EducationType";
import type { SkillsType } from "../../../skills/type/SkillsType";
import type { Project } from "../../../projects/type/ProjectType";
import type { ExperiencesType } from "../../../workExperience/type/ExperiencesType";
import StepTemplate from "../cards/StepTemplate.vue";
import type { CvTemplate } from "../../type/generateCvPayload";
import { UseGenerateCv } from "../../composables/GenerateCv";

const page = ref<number>(1);

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

const visibleModel = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});

const nexPage = () => {
  if (!canNext.value) return;
  if (page.value < 6) page.value++;
};

const prevPage = () => {
  page.value--;
};

const formData = reactive({
  templateId: "",
  projectsIds: [] as number[],
  skillsIds: [] as number[],
  languagesIds: [] as number[],
  educationIds: [] as number[],
  experienceIds: [] as number[],
});

const languagesQuery = useQuery<LanguageType[]>({
  queryKey: ["cv-gen", "languages"],
  queryFn: CvGenService.getLanguages,
  retry: false,
  enabled: computed(() => page.value === 4),
});

const skillsQuery = useQuery<SkillsType[]>({
  queryKey: ["cv-gen", "skills"],
  queryFn: CvGenService.getSkills,
  retry: false,
  enabled: computed(() => page.value === 3),
});

const projectsQuery = useQuery<Project[]>({
  queryKey: ["cv-gen", "projects"],
  queryFn: CvGenService.getProjects,
  retry: false,
  enabled: computed(() => page.value === 2),
});

const experiencesQuery = useQuery<ExperiencesType[]>({
  queryKey: ["cv-gen", "experiences"],
  queryFn: CvGenService.getExperiences,
  retry: false,
  enabled: computed(() => page.value === 6),
});

const educationQuery = useQuery<EducationType[]>({
  queryKey: ["cv-gen", "education"],
  queryFn: CvGenService.getEducation,
  retry: false,
  enabled: computed(() => page.value === 5),
});

const cvTemplates: CvTemplate[] = [
  {
    id: "1",
    name: "Basico",
    preview: "/cv-templates/1/cv1.png",
  },
];

const languages = computed(() => languagesQuery.data.value ?? []);
const skills = computed(() => skillsQuery.data.value ?? []);
const projects = computed(() => projectsQuery.data.value ?? []);
const experiences = computed(() => experiencesQuery.data.value ?? []);
const education = computed(() => educationQuery.data.value ?? []);

const canNext = computed(() => {
  switch (page.value) {
    case 1:
      return formData.templateId !== "";

    case 2:
      return formData.projectsIds.length > 0;

    case 3:
      return formData.skillsIds.length > 0;

    case 4:
      return formData.languagesIds.length > 0;

    case 5:
      return formData.educationIds.length > 0;

    case 6:
      return formData.experienceIds.length > 0;

    default:
      return false;
  }
});

const resetForm = () => {
  page.value = 1;

  formData.templateId = "";
  formData.projectsIds.length = 0;
  formData.skillsIds.length = 0;
  formData.languagesIds.length = 0;
  formData.educationIds.length = 0;
  formData.experienceIds.length = 0;
};

const { mutate, isPending } = UseGenerateCv();

const submit = () => {
  const payload = {
    ...formData,
  };

  mutate(payload, {
    onSuccess: () => {
      emit("update:visible", false);
    },
  });
};
</script>
