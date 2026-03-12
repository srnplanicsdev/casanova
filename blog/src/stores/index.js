import { createStore } from "vuex";
import auth from "./auth";
import blog from "./blog";

export default createStore({
  modules: {
    auth,
    blog,
  },
});
