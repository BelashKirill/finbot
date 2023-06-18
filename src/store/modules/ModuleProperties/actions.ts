import axios from "axios";
import { dataInfo } from "@/constants";
import { getCookie } from "@/heplers";

const { urlServer } = dataInfo;

export default {
  async getLimitsWidget(context: {
    commit: (arg0: string, arg1: unknown) => void;
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(urlServer + "/profile/limit", {
          params: {
            format: "json",
            user: getCookie("id"),
            // token: getCookie("token"),
          },
        })
        .then((response) => {
          context.commit("setLimitsUserWidget", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async updateLimitsUserWidget(context: unknown, data: object) {
    return new Promise((resolve, reject) => {
      axios
        .put(urlServer + "/profile/limit/", {
          user: getCookie("id"),
          token: getCookie("token"),
          day_limit: data["dayLimit"],
          month_limit: data["mouthLimit"],
          day_text: data["textAlertDay"],
          month_text: data["textAlertMouth"],
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
