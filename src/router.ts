import { createRouter, createWebHistory } from "vue-router";
import Test from "./shared/components/Test.vue";
import MyProfile from "./feautures/profile/page/MyProfile.vue";
import LanguageManagment from "./feautures/languages/page/LanguageManagment.vue";
import EducationManagment from "./feautures/education/page/EducationManagment.vue";
import SocialNetRefsManagment from "./feautures/socialNetworks/page/SocialNetRefsManagment.vue";
import WorkExperienceManagment from "./feautures/workExperience/page/WorkExperienceManagment.vue";
import SkillsManagment from "./feautures/skills/page/SkillsManagment.vue";
import ProjectsManagment from './feautures/projects/page/ProjectsManagment.vue';
import Dashboard from "./feautures/profile/page/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "start",
    component: Test,
  },
  {
    path: "/home",
    name: "home",
    component: Dashboard,
  },
  {
    path: "/usuario",
    name: "User",
    component: MyProfile,
  },
  {
    path: "/idiomas",
    name: "Languages",
    component: LanguageManagment,
  },
  {
    path: "/educacion",
    name: "Education",
    component: EducationManagment,
  },
  {
    path: "/redes-sociales",
    name: "SocialNetworks",
    component: SocialNetRefsManagment,
  },
  {
    path: "/experiencia",
    name: "WorkExperience",
    component: WorkExperienceManagment,
  },
  {
    path: "/habilidades",
    name: "Skills",
    component: SkillsManagment,
  },
  {
    path: "/proyectos",
    name: "Projects",
    component: ProjectsManagment,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
