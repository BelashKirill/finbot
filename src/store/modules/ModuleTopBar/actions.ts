export default {
  openLeftMenu(context, data: boolean) {
    if (data) {
      context.commit("openLeftMenu", false);
    } else {
      context.commit("openLeftMenu", true);
    }
  },
};
