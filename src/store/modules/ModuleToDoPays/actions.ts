import axios from "axios";
import { dataInfo } from "@/constants";
import { getCookie } from "@/heplers";

const { urlServer } = dataInfo;

export default {
  async getListToDo(context: {
    commit: (arg0: string, arg1: unknown) => void;
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(urlServer + "/api/plan", {
          params: {
            format: "json",
            user: getCookie("id"),
            token: getCookie("token"),
          },
        })
        .then((response) => {
          context.commit("setListToDoPays", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async addNewToDoPay(context: unknown, data: object) {
    return new Promise((resolve, reject) => {
      axios
        .post(urlServer + "/api/plan/", {
          user: getCookie("id"),
          token: getCookie("token"),
          ...data,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
