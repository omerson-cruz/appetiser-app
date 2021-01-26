import store from "../store/index";
import cookies from "vue-cookies";

export default (to, from, next) => {
  if (to.path === "/" && !store.getters.user) {
    next({
      path: "/login",
    });
  } else if (
    to.path === "/" &&
    store.getters.user &&
    !store.getters.user.email_verified
  ) {
    next({
      path: "/verify",
    });
  } else if (to.path === "/verify" && !store.getters.user) {
    next({
      path: "/login",
    });
  } else {
    next();
  }
};
