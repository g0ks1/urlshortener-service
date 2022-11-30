import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/links",
    name: "links",
    component: () => import("./components/LinksList.vue"),
  },
  {
    path: "/links/:id",
    name: "link-details",
    component: () => import("./components/LinkDetails.vue"),
  },
  {
    path: "/",
    name: "add",
    component: () => import("./components/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
