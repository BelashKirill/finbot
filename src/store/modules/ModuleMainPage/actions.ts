import axios from "axios";
import { dataInfo } from "@/constants";
import { getCookie } from "@/heplers";

const { urlServer } = dataInfo;

export default {
  async getLastPays(context: {
    commit: (arg0: string, arg1: boolean) => void;
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(urlServer + "/api/exp", {
          params: {
            format: "json",
            num: 6,
            user: getCookie("id"),
            token: getCookie("token"),
          },
        })
        .then((response) => {
          context.commit("setLastPays", response.data);
          context.commit("isLoadLastPays", false);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getTopCategories(context: {
    commit: (arg0: string, arg1: boolean) => void;
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(urlServer + "/api/cat", {
          params: {
            format: "json",
            num: 6,
            user: getCookie("id"),
            token: getCookie("token"),
          },
        })
        .then((response) => {
          context.commit("setTopCategories", response.data);
          context.commit("isLoadTopCategories", false);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getTopExpensivePay(context: {
    commit: (arg0: string, arg1: boolean) => void;
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(urlServer + "/api/max", {
          params: {
            format: "json",
            num: 6,
            user: getCookie("id"),
            token: getCookie("token"),
          },
        })
        .then((response) => {
          context.commit("setTopExpensivePay", response.data);
          context.commit("isLoadTopExpensivePay", false);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
