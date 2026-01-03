import { createRouter, createWebHistory } from "vue-router";
import MyProfile from "./feautures/profile/page/MyProfile.vue";
import LanguageManagment from "./feautures/languages/page/LanguageManagment.vue";
import EducationManagment from "./feautures/education/page/EducationManagment.vue";
import SocialNetRefsManagment from "./feautures/socialNetworks/page/SocialNetRefsManagment.vue";
import WorkExperienceManagment from "./feautures/workExperience/page/WorkExperienceManagment.vue";
import SkillsManagment from "./feautures/skills/page/SkillsManagment.vue";
import ProjectsManagment from "./feautures/projects/page/ProjectsManagment.vue";
import Dashboard from "./feautures/profile/page/Dashboard.vue";
import Login from "./feautures/auth/Page/Login.vue";
import Register from "./feautures/auth/Page/Register.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { showHeader: false, public: true },
  },
  {
    path: "/registro",
    name: "Register",
    component: Register,
    meta: { showHeader: false, public: true },
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

router.beforeEach((to, _from, next) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!to.meta.public && !accessToken) {
    return next({ name: "Login" });
  }

  next();
});
export default router;
