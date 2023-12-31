import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "@/quasar-user-options";
import axios from "axios";
import VueAxios from "vue-axios";
import vClickOutside from "click-outside-vue3";

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(vClickOutside)
  .mount("#app");
