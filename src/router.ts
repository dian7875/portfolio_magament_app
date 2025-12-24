import { createRouter, createWebHistory } from "vue-router";
import Test from "./shared/components/Test.vue";
import MyProfile from "./feautures/profile/page/MyProfile.vue";
import LanguageManagment from "./feautures/languages/page/LanguageManagment.vue";
import EducationManagment from "./feautures/education/page/EducationManagment.vue";

const routes = [
  {
    path: "/",
    name: "start",
    component: Test,
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
