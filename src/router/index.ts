import { createRouter, createWebHistory } from "vue-router";
import GameDetail from "../views/GameDetail.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/game/:id",
    name: "game-detail",
    component: GameDetail,
    props: (route) => ({
      id: Number(route.params.id),
      referrer: route.query.from || "home",
    }),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
