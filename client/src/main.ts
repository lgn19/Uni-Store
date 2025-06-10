import { createSSRApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import uviewPlus from "uview-plus";

export function createApp() {
  console.log(store, "main的store");
  const app = createSSRApp(App);
  app.use(uviewPlus);
  app.use(store);
  return {
    app,
  };
}
