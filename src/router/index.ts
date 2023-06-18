import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import AllPaysPage from "@/views/AllPaysPage.vue";
import ToDoPays from "@/views/ToDoPays.vue";
import Properties from "@/views/PropertiesPage.vue";

function isUserLog(to, from, next) {
  if (
    document.cookie
      .split(";")
      .filter((item) => item.trim().startsWith("token=")).length
  ) {
    next();
    return;
  } else {
    router.push({ name: "LoginPage" });
  }
}

function logIn() {
  if (
    document.cookie
      .split(";")
      .filter((item) => item.trim().startsWith("token=")).length
  ) {
    router.push({ name: "MainPage" });
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
    beforeEnter: isUserLog,
  },
  {
    path: "/all",
    name: "AllPaysPage",
    component: AllPaysPage,
    beforeEnter: isUserLog,
  },
  {
    path: "/properties",
    name: "PropertiesPage",
    component: Properties,
    beforeEnter: isUserLog,
  },
  {
    path: "/todo",
    name: "ToDoPays",
    component: ToDoPays,
    beforeEnter: isUserLog,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    beforeEnter: logIn,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
