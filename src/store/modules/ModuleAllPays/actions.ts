import axios from "axios";
import { dataInfo } from "@/constants";
import { getCookie } from "@/heplers";

const { urlServer } = dataInfo;

export default {
  async getSearchResult(context, data: object) {
    return new Promise((resolve, reject) => {
      axios
        .get(urlServer + "/api/total_exp/", {
          params: {
            format: "json",
            user: getCookie("id"),
            token: getCookie("token"),
            ordering: data["ordering"]["value"],
            page: data["page"],
            page_size: data["pageSize"],
            date_start: data["from"],
            date_end: data["to"],
          },
        })
        .then((response) => {
          context.commit("setResultSearch", response.data);
          context.commit("isLoadFilter", false);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateLoadFilterResult(context, data) {
    context.commit("isLoadFilter", data);
  },
};
