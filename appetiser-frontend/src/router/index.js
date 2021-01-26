import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AuthGuard from "../router/AuthGuard.js";

Vue.use(VueRouter);

const Register = (resolve) => {
  require.ensure(
    ["../views/Register.vue"],
    () => {
      resolve(require("../views/Register.vue"));
    },
    "user" // [[ 16 - 26 @06:00 ]] we can also group them into one bundle by having the argv2 like this 'user' group bundle
  );
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    exact: true,
    beforeEnter: AuthGuard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/verify",
    name: "Verify",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Verify.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
