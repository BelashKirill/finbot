import { createStore } from "vuex";
import ModuleMainPage from "./modules/ModuleMainPage/";
import ModuleLoginPage from "./modules/ModuleLoginPage/";
import ModuleAllPays from "./modules/ModuleAllPays/";
import ModuleTopBar from "./modules/ModuleTopBar/";
import ModuleProperties from "./modules/ModuleProperties/";
import ModuleToDoPays from "./modules/ModuleToDoPays/";

const {
  state: stateModuleMainPage,
  mutations: mutationsModuleMainPage,
  actions: actionsModuleMainPage,
} = ModuleMainPage;

const {
  state: stateModuleLoginPage,
  mutations: mutationsModuleLoginPage,
  actions: actionsModuleLoginPage,
} = ModuleLoginPage;

const {
  state: stateModuleAllPays,
  mutations: mutationsModuleAllPays,
  actions: actionsModuleAllPays,
} = ModuleAllPays;

const {
  state: stateModuleTopBar,
  mutations: mutationsModuleTopBar,
  actions: actionsModuleTopBar,
} = ModuleTopBar;

const {
  state: stateModuleProperties,
  mutations: mutationsModuleProperties,
  actions: actionsModuleProperties,
} = ModuleProperties;

const {
  state: stateModuleToDoPays,
  mutations: mutationsModuleToDoPays,
  actions: actionsModuleToDoPays,
} = ModuleToDoPays;

export default createStore({
  state: {
    ...stateModuleMainPage,
    ...stateModuleLoginPage,
    ...stateModuleAllPays,
    ...stateModuleTopBar,
    ...stateModuleProperties,
    ...stateModuleToDoPays,
  },
  getters: {},
  mutations: {
    ...mutationsModuleMainPage,
    ...mutationsModuleLoginPage,
    ...mutationsModuleAllPays,
    ...mutationsModuleTopBar,
    ...mutationsModuleProperties,
    ...mutationsModuleToDoPays,
  },
  actions: {
    ...actionsModuleMainPage,
    ...actionsModuleLoginPage,
    ...actionsModuleAllPays,
    ...actionsModuleTopBar,
    ...actionsModuleProperties,
    ...actionsModuleToDoPays,
  },
  modules: {},
});
