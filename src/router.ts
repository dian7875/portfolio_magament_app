import { createRouter, createWebHistory } from "vue-router";
import Test from "./shared/components/Test.vue";
import MyProfile from "./feautures/profile/page/MyProfile.vue";

const routes = [
  {
    path: "/",
    name: "start",
    component: Test,
  },
  {
    path: "/usuario",
    name:"User",
    component: MyProfile
  }

];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router