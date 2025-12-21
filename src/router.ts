import { createRouter, createWebHistory } from "vue-router";
import Test from "./shared/components/Test.vue";

const routes = [
  {
    path: "/",
    name: "start",
    component: Test,
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router